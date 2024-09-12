"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

import { firestore } from "@/firebase/config";
import { Spinner } from "@/components/spinner";

const RedirectToDashboard = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser(); // Clerk user hook
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0); // Progress bar state
  const [loadingMessage, setLoadingMessage] = useState("Fetching user data...");

  const checkFirestoreForUser = useCallback(async () => {
    if (!user) return;

    const userId = user.id;

    try {
      const userDocRef = doc(firestore, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // If user doesn't exist in Firestore, create the document
        await setDoc(userDocRef, {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.primaryEmailAddress?.emailAddress,
          imageUrl: user.imageUrl,
          role: "user",
          pushNotificationStatus: false,
        });
      }

      setIsLoading(false);
      router.push("/dashboard");
    } catch (error) {
      setIsLoading(false);
      toast.error("Error loading the web application.");
      router.push("/dashboard");
    }
  }, [user, router]);

  useEffect(() => {
    // Check every second for user existence
    const intervalId = setInterval(() => {
      if (isLoaded && user) {
        clearInterval(intervalId); // Stop interval when user is found
        setLoadingMessage("Initializing the web application...");
        checkFirestoreForUser();
      }
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [isLoaded, user, checkFirestoreForUser]);

  // Progress bar effect
  useEffect(() => {
    if (progress < 100) {
      const intervalId = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 20);
      }, 1000);

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, [progress]);

  // If still loading after progress reaches 100, redirect to sign-in
  useEffect(() => {
    if (!isLoaded && progress >= 100) {
      router.push("/sign-in");
    }
  }, [isLoaded, progress, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center absolute inset-y-0 h-full w-full bg-background/80 z-50">
        <div className="space-y-4 text-center">
          {/* Centered Spinner */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <Spinner size="lg" />
            <h2>{loadingMessage}</h2>
          </div>
          {/* Progress Bar */}
          <div className="relative w-64 h-2 bg-gray-200 rounded-full overflow-hidden mt-4">
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p>{progress}% completed</p>
        </div>
      </div>
    );
  }

  if (!isLoading && user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <h2>All good! Redirecting to Dashboard.</h2>
      </div>
    );
  }

  return null;
};

export default RedirectToDashboard;
