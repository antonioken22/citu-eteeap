"use client";

import * as React from "react";
import { toast } from "sonner";

import { data } from "./data";
import useApplications from "@/hooks/use-applications";
import { Button } from "@/components/ui/button";

interface ApplicationControlsProps {
  selectedApplicationIds: string[]; // Accept selected application IDs
}

export const ApplicationControls: React.FC<ApplicationControlsProps> = ({
  selectedApplicationIds,
}) => {
  const { createApplication, deleteApplication, loading, error } =
    useApplications();

  // Handler for saving data from data.ts to Firestore
  const handleSaveToFirestore = async () => {
    try {
      for (const applicant of data) {
        await createApplication(applicant); // Store each applicant to Firestore
      }
      toast.success("Data saved successfully to Firestore!");
    } catch (error) {
      toast.error("Error saving data: " + error);
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
        toast.success("Selected applications deleted successfully!");
      } catch (error) {
        toast.error("Error deleting applications: " + error);
      }
    } else {
      toast.error("No applications selected for deletion.");
    }
  };

  return (
    <div className="mt-4 flex gap-4">
      {/* Button to save data to Firestore */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleSaveToFirestore}
        disabled={loading}
      >
        Save Data to Firestore
      </Button>
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}

      {/* Button to delete the selected applications */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleDeleteSelectedApplications}
        disabled={loading || selectedApplicationIds.length === 0}
      >
        Delete Selected Applications
      </Button>
    </div>
  );
};

export default ApplicationControls;
