"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { firestore } from "@/firebase/config";
import {
  Unsubscribe,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import { toast } from "sonner";

import { UserData } from "@/types/UserData";

import { useUser } from "@clerk/clerk-react";

export const useUsers = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [adminUsers, setAdminUsers] = useState<UserData[]>([]);
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
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

  // READ admin users (USERS)
  const fetchAdminUsers = useCallback(() => {
    if (!user) {
      toast.error("You are not logged in.");
      return;
    }

    // Clean up existing subscription if any
    if (userUnsubscribeRef.current) {
      userUnsubscribeRef.current();
    }

    setLoading(true);

    const usersCollection = collection(firestore, "users");
    const q = query(usersCollection, where("role", "==", "admin"));

    userUnsubscribeRef.current = onSnapshot(
      q,
      (querySnapshot) => {
        const updatedUsers: UserData[] = querySnapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
            } as UserData)
        );

        setAdminUsers(updatedUsers);
        setLoading(false);
      },
      (error) => {
        toast.error("Error fetching admin users: " + error);
        console.error("Error fetching admin users: " + error);
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

  // READ all users (USERS)
  const fetchAllUsers = useCallback(() => {
    if (!user || user?.publicMetadata.role !== "admin") {
      toast.error("Unauthorized access.");
      return;
    }

    // Clean up existing subscription if any
    if (adminUnsubscribeRef.current) {
      adminUnsubscribeRef.current();
    }

    setLoading(true);

    const usersCollection = collection(firestore, "users");
    const q = query(usersCollection, where("isDeleted", "==", false));

    adminUnsubscribeRef.current = onSnapshot(
      q,
      (querySnapshot) => {
        const updatedUsers: UserData[] = querySnapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
            } as UserData)
        );

        setAllUsers(updatedUsers);
        setLoading(false);
      },
      (error) => {
        toast.error("Error fetching all users: " + error);
        console.error("Error fetching all users: " + error);
        setLoading(false);
      }
    );
  }, [user]);

  return { adminUsers, fetchAdminUsers, allUsers, fetchAllUsers, loading };
};
