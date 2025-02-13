"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { firestore } from "@/firebase/config";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  getDoc,
  Unsubscribe,
} from "firebase/firestore";

import { toast } from "sonner";

import { ActiveUser } from "@/types/ActiveUser";

import { useUser } from "@clerk/clerk-react";

// Helper functions in setting the docId (YY-MM-DD, HH:00 - HH:59)
const getFullDateTimeRange = () => {
  const date = new Date();
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");

  return `${year}-${month}-${day}, ${hours}:00 - ${hours}:59`;
};

// Helper function in getting the today's date
const getTodayDate = () => {
  const date = new Date();
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const useActiveUsers = () => {
  const { user } = useUser();

  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const userUnsubscribeRef = useRef<Unsubscribe | null>(null);
  const adminUnsubscribeRef = useRef<Unsubscribe | null>(null);

  // Cleanup onSnapshot subscriptions on unmount
  useEffect(() => {
    return () => {
      if (userUnsubscribeRef.current) {
        userUnsubscribeRef.current();
        userUnsubscribeRef.current = null;
      }
      if (adminUnsubscribeRef.current) {
        adminUnsubscribeRef.current();
        adminUnsubscribeRef.current = null;
      }
    };
  }, []);

  // READ active users (USERS)
  const fetchActiveUsers = useCallback(() => {
    if (!user) {
      toast.error("You are not logged in.");
      return;
    }

    // Clean up existing subscription if any
    if (userUnsubscribeRef.current) {
      userUnsubscribeRef.current();
    }

    setLoading(true);

    const todayDate = getTodayDate();

    const activeUsersCollection = collection(firestore, "activeUsers");

    userUnsubscribeRef.current = onSnapshot(
      activeUsersCollection,
      (snapshot) => {
        const data = snapshot.docs
          .map((doc) => {
            const id = doc.id;
            if (id.startsWith(todayDate)) {
              return {
                time: id.split(" @ ")[1],
                ...doc.data(),
              } as ActiveUser;
            }
            return null;
          })
          .filter((doc) => doc !== null);

        data.sort((a, b) => a.time.localeCompare(b.time));
        setActiveUsers(data);
        setLoading(false);
      },
      (error) => {
        toast.error("Error fetching active users: " + error);
        console.error("Error fetching active users: ", error);
        setLoading(false);
      }
    );

    return () => {
      if (userUnsubscribeRef.current) {
        userUnsubscribeRef.current();
        userUnsubscribeRef.current = null;
      }
    };
  }, [user]);

  // CREATE active user (USER)
  const logActiveUser = useCallback(
    async (
      userId: string,
      userEmail: string,
      userFirstName: string,
      userLastName: string
    ) => {
      if (!user) {
        toast.error("You are not logged in.");
        return;
      }

      setLoading(true);

      const fullDateTimeRange = getFullDateTimeRange();
      const docRef = doc(firestore, "activeUsers", fullDateTimeRange);

      const userData = {
        userId,
        userEmail,
        userFirstName,
        userLastName,
      };

      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const existingData = docSnap.data();
          const existingUsers = existingData.users || [];

          const userAlreadyLogged = existingUsers.some(
            (user: any) => user.userId === userId
          );

          if (!userAlreadyLogged) {
            await updateDoc(docRef, {
              count: (existingData.count || 0) + 1,
              users: [...existingUsers, userData],
            });
          }
        } else {
          await setDoc(docRef, {
            activeUsersLogId: fullDateTimeRange,
            count: 1,
            users: [userData],
          });
        }
      } catch (error) {
        toast.error("Error logging active user: " + error);
        console.error("Error logging active user: " + error);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  return { activeUsers, fetchActiveUsers, logActiveUser, loading };
};
