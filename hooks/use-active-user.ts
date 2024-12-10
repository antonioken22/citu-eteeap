import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-react"; 
import { firestore } from "@/firebase/config"; 
import { ActiveUser } from "@/types/ActiveUser";

const getCurrentHour = () => {
  const date = new Date();
  const hours = date.getHours();
  const period = hours < 12 ? "AM" : "PM";
  const adjustedHours = hours % 12 || 12;
  return `${adjustedHours} ${period}`;
};

const getFullDateTimeRange = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = date.getHours();
  const period = hours < 12 ? "AM" : "PM";
  const adjustedHours = hours % 12 || 12;
  return `${month}-${day}-${year} @ ${adjustedHours}:00 - ${adjustedHours}:59 ${period}`;
};

const getTodayDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}-${day}-${year}`;
};

export const useActiveUsers = () => {
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser(); // Fetch the current user from Clerk

  // Function to log the active user
  const logActiveUser = async (
    userId: string,
    userEmail: string,
    userFirstName: string,
    userLastName: string
  ) => {
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
          count: 1,
          users: [userData],
        });
      }
    } catch (error) {
      console.error("Error logging active user:", error);
    }
  };

  // Real-time listener for active users
  useEffect(() => {
    const todayDate = getTodayDate();
    const unsubscribe = onSnapshot(
      collection(firestore, "activeUsers"),
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
        console.error("Error fetching active users:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Automatically log the current Clerk user as active
  useEffect(() => {
    if (user) {
      const userId = user.id; // Unique Clerk user ID
      const userEmail = user.emailAddresses[0]?.emailAddress || "unknown@example.com";
      const userFirstName = user.firstName || "Unknown";
      const userLastName = user.lastName || "User";

      logActiveUser(userId, userEmail, userFirstName, userLastName);
    }
  }, [user]);

  return { activeUsers, loading, logActiveUser };
};
