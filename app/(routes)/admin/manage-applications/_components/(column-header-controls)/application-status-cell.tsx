import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApplicationStatus } from "@/hooks/use-application-status";
import { ApplicationStatusInfoDrawer } from "./(info-drawers)/application-status-info-drawer";

interface ApplicationStatusCellProps {
  applicationId: string;
  isApplicationStatusEdited: boolean;
  currentApplicationStatus: string;
}

export const ApplicationStatusCell: React.FC<ApplicationStatusCellProps> = ({
  applicationId,
  isApplicationStatusEdited,
  currentApplicationStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(
    currentApplicationStatus || "Unreviewed"
  );
  const { updateApplicationStatus, loading } = useApplicationStatus();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer open state

  const statusOptions = [
    { value: "Transferred", bgColor: "bg-green-500" },
    { value: "Declined", bgColor: "bg-red-500" },
    { value: "INC Document", bgColor: "bg-purple-500" },
    { value: "Unreviewed", bgColor: "bg-gray-500" },
  ];

  const currentStatus = statusOptions.find(
    (option) => option.value === selectedStatus
  );

  const handleStatusChange = async (newApplicationStatus: string) => {
    setSelectedStatus(newApplicationStatus);
    await updateApplicationStatus(
      applicationId,
      currentApplicationStatus,
      newApplicationStatus
    );
  };

  return (
    <>
      <div className="relative w-full flex justify-between items-center">
        {/* Dropdown Menu Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex-1">
              <Button
                className={`flex w-full items-center px-4 py-2 rounded text-white transition-colors ${
                  loading
                    ? "bg-muted-foreground"
                    : currentStatus?.bgColor || "bg-gray-500"
                }`}
                disabled={loading}
              >
                {loading ? "Updating..." : selectedStatus}
                <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            {statusOptions.map((option) => (
              <DropdownMenuItem key={option.value} asChild>
                <div
                  className={`px-4 py-2 cursor-pointer text-sm ${
                    selectedStatus === option.value
                      ? "font-bold"
                      : "font-normal"
                  } `}
                  onClick={() => handleStatusChange(option.value)}
                >
                  {option.value}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Info Icon positioned in the lower right of the button */}
        {/* Rendered when the application status is edited */}
        {isApplicationStatusEdited && (
          <div
            className="absolute right-0 bottom-0 p-1 cursor-pointer"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Info className="w-4 h-4 text-secondary-foreground hover:text-secondary" />
          </div>
        )}
      </div>

      {/* Pass isDrawerOpen to DrawerDemo and control its visibility */}
      <ApplicationStatusInfoDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        applicationId={applicationId}
      />
    </>
  );
};
