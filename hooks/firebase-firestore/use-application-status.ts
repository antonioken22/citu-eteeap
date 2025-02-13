"use client";

import { useEffect, useRef, useState } from "react";
import { firestore } from "@/firebase/config";
import {
  doc,
  updateDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  Unsubscribe,
} from "firebase/firestore";

import { toast } from "sonner";

import { ApplicationStatusLog } from "@/types/ApplicationStatusLog";

import { useUser } from "@clerk/clerk-react";

// Helper function to generate the applicationStatusLogId
const getNextApplicationStatusLogId = async (): Promise<string> => {
  const date = new Date();
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}, ${hours}:${minutes}:${seconds}`;
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

      // Generate the applicationStatusLogId
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
