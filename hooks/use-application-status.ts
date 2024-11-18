import { useCallback, useState } from "react";
import { toast } from "sonner";
import { doc, updateDoc, setDoc, collection, query, where, getDocs, orderBy, limit, onSnapshot  } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";

import { firestore } from "@/firebase/config";
import { ApplicationStatusLog } from "@/types/ApplicationStatusLog";

// Helper function to format the ID with leading zeros
const formatLogId = (number: number): string => {
  return String(number).padStart(9, '0'); // Ensures the number is 9 digits with leading zeros
};

export const useApplicationStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusLogs, setStatusLogs] = useState<ApplicationStatusLog[]>([]);
  const { user } = useUser(); 

  // READ
  // Fetch status logs with real-time updates using onSnapshot
const fetchStatusLogs = useCallback((applicationId: string) => {
  setLoading(true);
  setError(null);

  const statusLogQuery = query(
    collection(firestore, "applicationStatusLog"),
    where("applicationId", "==", applicationId)
  );

  const unsubscribe = onSnapshot(
    statusLogQuery,
    (querySnapshot) => {
      const logs: ApplicationStatusLog[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as ApplicationStatusLog),
        dateEdited: doc.data().dateEdited.toDate(), // Convert Firestore timestamp to Date object
      }));

      setStatusLogs(logs);
      setLoading(false);
    },
    (error) => {
      // console.error("Error fetching status logs: ", error);
      toast.error("Failed to fetch status logs.");
      setError("Failed to fetch status logs");
      setLoading(false);
    }
  );

  return () => unsubscribe(); // Clean up the listener on unmount
}, []);

  // CREATE
  // Get the latest applicationStatusLogId and increment it
  const getNextApplicationStatusLogId = async (): Promise<string> => {
    const logsCollection = collection(firestore, "applicationStatusLog");
    const latestLogQuery = query(logsCollection, orderBy("applicationStatusLogId", "desc"), limit(1));

    const querySnapshot = await getDocs(latestLogQuery);
    
    let nextIdNumber = 1; // Start with 1 if no logs are found

    if (!querySnapshot.empty) {
      const latestLog = querySnapshot.docs[0].data() as ApplicationStatusLog;
      const latestId = latestLog.applicationStatusLogId || "".split(' ')[0]; // Extract the number part (before the space)
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

  // UPDATE
  // Update applicationStatus and Create the update log
  const updateApplicationStatus = async (
    applicationId: string,
    oldApplicationStatus: string,
    newApplicationStatus: string
  ) => {
    setLoading(true);
    setError(null);

    // Check if a user is logged in
    if (!user) {
      toast.error("Cannot update status. No user information available.");
      setError("No user information available");
      setLoading(false);
      return;
    }

    try {
      // Update the application status in Firestore
      const applicationDoc = doc(firestore, "applications", applicationId);
      await updateDoc(applicationDoc, {
        isApplicationStatusEdited: true,
        applicationStatus: newApplicationStatus,
      });

      // Generate the next applicationStatusLogId
      const applicationStatusLogId = await getNextApplicationStatusLogId();

      // Create log entry in Firestore
      const dateEdited = new Date();

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
    } catch (e) {
      // console.error("Error updating status: ", e);
      toast.error("Failed to update application status.");
      setError("Failed to update application status");
    } finally {
      setLoading(false);
    }
  };

  return { updateApplicationStatus, fetchStatusLogs, statusLogs, loading, error };
};