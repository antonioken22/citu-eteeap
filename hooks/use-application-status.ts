import { useState } from "react";
import { toast } from "sonner";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react"; 

import { firestore } from "@/firebase/config";
import { ApplicationStatusLog } from "@/types/ApplicationStatusLog";

const useApplicationStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser(); 

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

      // Create log entry in Firestore
      const dateEdited = new Date();
      const applicationStatusLogId = dateEdited
        .toLocaleString("en-US", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        .replace(/\//g, "-");

      const logData: ApplicationStatusLog = {
        applicationStatusLogId,
        applicationId,
        oldApplicationStatus,
        newApplicationStatus: newApplicationStatus,
        dateEdited,
        editorUserId: user.id,
        editorLastname: user.lastName || "unknown",
        editorFirstname: user.firstName || "unknown",
      };

      const applicationStatusLogDoc = doc(
        firestore,
        "applicationStatusLog",
        applicationStatusLogId
      );
      await setDoc(applicationStatusLogDoc, logData);

      toast.success("Application status updated and logged successfully.");
    } catch (e) {
      console.error("Error updating status: ", e);
      toast.error("Failed to update application status.");
      setError("Failed to update application status");
    } finally {
      setLoading(false);
    }
  };

  return { updateApplicationStatus, loading, error };
};

export default useApplicationStatus;
