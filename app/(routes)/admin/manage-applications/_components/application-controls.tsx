"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useApplications } from "@/hooks/use-applications";
import { useUser } from "@clerk/nextjs";

interface ApplicationControlsProps {
  selectedApplicationIds: string[]; // Accept selected application IDs
}

export const ApplicationControls = ({
  selectedApplicationIds,
}: ApplicationControlsProps) => {
  const { updateApplication, deleteApplication, loading } = useApplications();
  const { user } = useUser();

  // Handler for allowing users to edit their response
  const handleAllowEditResponse = async () => {
    if (selectedApplicationIds.length > 0) {
      try {
        // Loop through all selected application IDs and update isSubmitted to false
        for (const applicationId of selectedApplicationIds) {
          await updateApplication(applicationId, { canEdit: true });
        }
      } catch (error) {
        console.error("Error updating applications: " + error);
      }
    }
  };

  // Handler for disallowing users to edit their response
  const handleDisallowEditResponse = async () => {
    if (selectedApplicationIds.length > 0) {
      try {
        // Loop through all selected application IDs and update isSubmitted to false
        for (const applicationId of selectedApplicationIds) {
          await updateApplication(applicationId, { canEdit: false });
        }
      } catch (error) {
        console.error("Error updating applications: " + error);
      }
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
    <div className="flex flex-col sm:flex-row gap-2 mt-4">
      {user?.publicMetadata.role == "admin" && (
        <>
          {/* Allow Edit Response */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleAllowEditResponse}
            disabled={loading || selectedApplicationIds.length === 0}
          >
            Allow Edit Response
          </Button>

          {/* Disallow Edit Response */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleDisallowEditResponse}
            disabled={loading || selectedApplicationIds.length === 0}
          >
            Disallow Edit Response
          </Button>

          {/* Delete Button */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                disabled={loading || selectedApplicationIds.length === 0}
              >
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete the selected applications?
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteSelectedApplications}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
};
