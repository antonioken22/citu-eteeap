"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

import { data } from "./data";
import { useApplications } from "@/hooks/use-applications";
import { useUser } from "@clerk/nextjs";

interface ApplicationControlsProps {
  selectedApplicationIds: string[]; // Accept selected application IDs
}

export const ApplicationControls: React.FC<ApplicationControlsProps> = ({
  selectedApplicationIds,
}) => {
  const { createApplication, deleteApplication, loading, error } =
    useApplications();
  const { user } = useUser();

  // Handler for saving data from data.ts to Firestore
  const handleSaveToFirestore = async () => {
    try {
      for (const applicant of data) {
        await createApplication(applicant); // Store each applicant to Firestore
      }
    } catch (error) {
      console.error("Error saving data: " + error);
    }
  };

  // Handler for deleting selected applications
  const handleDeleteSelectedApplications = async () => {
    if (selectedApplicationIds.length > 0) {
      try {
        // Loop through all selected application IDs and delete them
        for (const applicationId of selectedApplicationIds) {
          await deleteApplication(applicationId);
        }
      } catch (error) {
        console.error("Error deleting applications: " + error);
      }
    }
  };

  return (
    <div className="flex gap-2">
      {user?.publicMetadata.role == "admin" && (
        <>
          {/* Button to save data to Firestore */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveToFirestore}
            disabled={loading}
          >
            Create Data
          </Button>

          {/* Button to delete the selected applications */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleDeleteSelectedApplications}
            disabled={loading || selectedApplicationIds.length === 0}
          >
            Delete
          </Button>
        </>
      )}
    </div>
  );
};

export default ApplicationControls;
