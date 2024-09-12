"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "sonner";

import { firestore } from "@/firebase/config";

export function UserNav() {
  const router = useRouter();
  const { user, isLoaded } = useUser(); // Clerk user hook

  const checkAndCreateUser = useCallback(async () => {
    if (!user) return;

    const userId = user.id;

    try {
      const userDocRef = doc(firestore, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // If user already exists in Firestore, show a message or perform any necessary logic
        // toast.info("Welcome back, " + user.firstName + "!");
      } else {
        // If user doesn't exist in Firestore, create the document
        await setDoc(userDocRef, {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.primaryEmailAddress?.emailAddress,
          imageUrl: user.imageUrl,
          role: "user",
          pushNotificationStatus: false,
        });
        toast.success("User registered successfully.");
      }
    } catch (error) {
      // console.error("Error checking/creating user in Firestore:", error);
      toast.error("Error registering the user.");
    }
  }, [user]);

  useEffect(() => {
    if (isLoaded && user) {
      checkAndCreateUser();
    }
  }, [isLoaded, user, checkAndCreateUser]);

  return <UserButton afterSwitchSessionUrl="/sign-in" />;
}
