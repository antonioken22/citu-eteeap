import { useState } from "react";

import { Info } from "lucide-react";

import { ApplicationEditedDiffInfoDrawer } from "./(info-drawers)/application-edited-diff-info-drawer";

interface IsEditedCellProps {
  isEdited: boolean;
  applicantId: string;
  applicantEmail: string;
}

export const IsEditedCell = ({
  isEdited,
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
        applicantId={applicantId}
        applicantEmail={applicantEmail}
      />
    </>
  );
};
