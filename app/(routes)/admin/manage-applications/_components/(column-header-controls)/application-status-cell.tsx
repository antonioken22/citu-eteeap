import { useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import useApplicationStatus from "@/hooks/use-application-status";

interface ApplicationStatusCellProps {
  applicationId: string;
  currentApplicationStatus: string;
}

const ApplicationStatusCell: React.FC<ApplicationStatusCellProps> = ({
  applicationId,
  currentApplicationStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(
    currentApplicationStatus || "Unreviewed"
  );
  const { updateApplicationStatus, loading } = useApplicationStatus();

  const statusOptions = [
    { value: "Transferred", bgColor: "bg-green-500" },
    { value: "Declined", bgColor: "bg-red-500" },
    { value: "INC Document", bgColor: "bg-purple-500" },
    { value: "Unreviewed", bgColor: "bg-gray-500" },
  ];

  // Find the current selected status background color
  const currentStatus = statusOptions.find(
    (option) => option.value === selectedStatus
  );

  // Handle status change and call the hook to update Firestore and log the change
  const handleStatusChange = async (newApplicationStatus: string) => {
    setSelectedStatus(newApplicationStatus);
    await updateApplicationStatus(
      applicationId,
      currentApplicationStatus,
      newApplicationStatus
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
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
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {statusOptions.map((option) => (
          <DropdownMenuItem key={option.value} asChild>
            <div
              className={`px-4 py-2 cursor-pointer text-sm ${
                selectedStatus === option.value ? "font-bold" : "font-normal"
              } `}
              onClick={() => handleStatusChange(option.value)}
            >
              {option.value}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApplicationStatusCell;
