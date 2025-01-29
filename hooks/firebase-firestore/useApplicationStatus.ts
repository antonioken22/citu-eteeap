"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { firestore } from "@/firebase/config";
import {
  doc,
  updateDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";

import { toast } from "sonner";

import { ApplicationStatusLog } from "@/types/ApplicationStatusLog";

import { useUser } from "@clerk/clerk-react";

// Helper function to format the ID with leading zeros
const formatLogId = (number: number): string => {
  return String(number).padStart(9, "0"); // Ensures the number is 9 digits with leading zeros
};

export const useApplicationStatus = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
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

  // READ status logs by applicationId (ADMIN)
  const fetchStatusLogsByApplicationId = async (
    applicationId: string
  ): Promise<ApplicationStatusLog[] | null> => {
    if (!user || user?.publicMetadata.role !== "admin") {
      toast.error("Unauthorized access.");
      return null;
    }

    setLoading(true);

    try {
      const logsCollection = collection(firestore, "applicationStatusLog");
      const logsQuery = query(
        logsCollection,
        where("applicationId", "==", applicationId)
      );
      const logsSnapshot = await getDocs(logsQuery);
      const logs: ApplicationStatusLog[] = logsSnapshot.docs.map(
        (doc) => doc.data() as ApplicationStatusLog
      );
      return logs;
    } catch (error) {
      toast.error("Error fetching status logs: " + error);
      console.error("Error fetching status logs:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // CREATE status log (ADMIN)
  const getNextApplicationStatusLogId = async (): Promise<string> => {
    const logsCollection = collection(firestore, "applicationStatusLog");
    const latestLogQuery = query(
      logsCollection,
      orderBy("applicationStatusLogId", "desc"),
      limit(1)
    );

    const querySnapshot = await getDocs(latestLogQuery);

    let nextIdNumber = 1; // Start with 1 if no logs are found

    if (!querySnapshot.empty) {
      const latestLog = querySnapshot.docs[0].data() as ApplicationStatusLog;
      const latestId = latestLog.applicationStatusLogId || "".split(" ")[0]; // Extract the number part (before the space)
      nextIdNumber = parseInt(latestId, 10) + 1; // Increment the numerical part
    }

    // Format the number part to have leading zeros
    const formattedNumber = formatLogId(nextIdNumber);

    // Get current date and time formatted as required
    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
      .replace(/\//g, "-");

    // Return the formatted log ID
    return `${formattedNumber} ${formattedDate}`;
  };

  // UPDATE applicationStatus and CREATE statusLog (ADMIN)
  const updateApplicationStatus = async (
    applicationId: string,
    oldApplicationStatus: string,
    newApplicationStatus: string
  ) => {
    if (!user || user?.publicMetadata.role !== "admin") {
      toast.error("Unauthorized access.");
      return;
    }

    setLoading(true);

    try {
      // Update the application status in Firestore
      const applicationDoc = doc(firestore, "applications", applicationId);
      await updateDoc(applicationDoc, {
        isApplicationStatusEdited: true,
        applicationStatus: newApplicationStatus,
      });

      // Generate the next applicationStatusLogId
      const applicationStatusLogId = await getNextApplicationStatusLogId();
      const dateEdited = new Date();

      // Create log entry in Firestore
      const logData: ApplicationStatusLog = {
        applicationStatusLogId,
        applicationId,
        oldApplicationStatus,
        newApplicationStatus: newApplicationStatus,
        dateEdited,
        editorUserId: user.id,
        editorLastname: user.lastName || "-",
        editorFirstname: user.firstName || "-",
      };

      const applicationStatusLogDoc = doc(
        firestore,
        "applicationStatusLog",
        applicationStatusLogId
      );
      await setDoc(applicationStatusLogDoc, logData);

      toast.success("Application status updated and logged successfully.");
    } catch (error) {
      toast.error("Failed to update application status: " + error);
      console.error("Failed to update application status: " + error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchStatusLogsByApplicationId, updateApplicationStatus, loading };
};
