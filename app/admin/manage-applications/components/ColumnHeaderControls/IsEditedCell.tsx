"use client";

import { useState } from "react";

import { Info } from "lucide-react";

import { ApplicationEditedDiffInfoDrawer } from "../InfoDrawers/ApplicationEditedDiffInfoDrawer";

type IsEditedCellProps = {
  isEdited: boolean;
  applicationId: string;
  applicantId: string;
  applicantEmail: string;
};

export const IsEditedCell = ({
  isEdited,
  applicationId,
  applicantId,
  applicantEmail,
}: IsEditedCellProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="w-[100px]">
        {isEdited ? (
          <div className="flex justify-center items-center space-x-2">
            <p className="text-xs text-center">Edited.</p>
            <button onClick={() => setIsDrawerOpen(true)}>
              <Info />
            </button>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center">
            Not yet edited.
          </p>
        )}
      </div>

      <ApplicationEditedDiffInfoDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        applicationId={applicationId}
        applicantId={applicantId}
        applicantEmail={applicantEmail}
      />
    </>
  );
};
