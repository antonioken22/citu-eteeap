import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ApplicantData } from "@/types/ApplicantData";

interface RowActionsProps {
  row: {
    original: ApplicantData;
  };
}

const RowActions: React.FC<RowActionsProps> = ({ row }) => {
  // Function to copy the full row as Spreadsheet pasteable format (Tab-delimited)
  const copyRowAsTabDelimited = () => {
  const { original } = row;

  // Dynamically extract all values from the row object
  const tabDelimitedRow = Object.values(original).join("\t");

  navigator.clipboard.writeText(tabDelimitedRow).then(() => {
    toast.success("Row copied as Tab-delimited (Excel Pasteable)");
  });
};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Row Actions</DropdownMenuLabel>

        {/* Copy Firstname Lastname */}
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(
              `${row.original.firstName} ${row.original.lastName}`
            );
            toast.success("Full Name (Firstname Lastname) copied");
          }}
        >
          Copy Full Name (Firstname Lastname)
        </DropdownMenuItem>

        {/* Copy Lastname, Firstname */}
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(
              `${row.original.lastName}, ${row.original.firstName}`
            );
            toast.success("Full Name (Lastname, Firstname) copied");
          }}
        >
          Copy Full Name (Lastname, Firstname)
        </DropdownMenuItem>

        {/* Copy Email Address */}
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(row.original.activeEmail);
            toast.success("Email address copied");
          }}
        >
          Copy Email Address
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Copy Entire Row as Tab-delimited */}
        <DropdownMenuItem onClick={copyRowAsTabDelimited}>
          Copy Entire Row (Excel pasteable)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RowActions;
