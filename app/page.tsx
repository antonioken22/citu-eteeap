"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";

import { firestore } from "@/firebase/config";
import { Spinner } from "@/components/spinner";

const RedirectToDashboard = () => {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleSignIn = async () => {
      if (user) {
        const userId = user.id;
        setIsLoading(true);
        try {
          // Check if user data exists in Firestore
          const userDoc = await getDoc(doc(firestore, "users", userId));
          if (!userDoc.exists()) {
            // Save user data to Firestore after sign in
            await setDoc(doc(firestore, "users", userId), {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.primaryEmailAddress?.emailAddress,
              imageUrl: user.imageUrl,
              role: "user",
              pushNotificationStatus: false,
            });
            // console.log("User data saved to Firestore.");
          } else {
            // console.log("User already exists in Firestore.");
          }
        } catch (error) {
          // console.error("Error saving user data to Firestore: ", error);
        } finally {
          setIsLoading(false);
          // After the Firestore operation is complete, redirect to the dashboard
          router.push("/dashboard");
        }
      }
    };

    handleSignIn();
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center absolute inset-y-0 h-full w-full bg-background/80 z-50">
        <Spinner size="lg" />
        <h2 className="ml-2">Initializing the website...</h2>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      {/* To slow to show in a brief moment. Removed. */}
      {/* <Image
        src="/check.png"
        height="300"
        width="300"
        alt="Check"
        className="dark:hidden"
      />
      <Image
        src="/check-dark.png"
        height="300"
        width="300"
        alt="Check"
        className="hidden dark:block"
      /> */}
      <h2>All good! Redirecting to Dashboard.</h2>
    </div>
  );
};

export default RedirectToDashboard;
