"use client";

import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";
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

import { columns } from "./Columns";

type ApplicantDataRowActionsProps = {
  row: {
    original: ApplicantData;
  };
};

export const ApplicantDataRowActions = ({
  row,
}: ApplicantDataRowActionsProps) => {
  // Function to copy the full row as Spreadsheet pasteable format (Tab-delimited)
  const copyRowAsTabDelimited = () => {
    const { original } = row;

    // Use the columns array to extract values in the correct order
    const columnOrder = columns
      .filter((col) => (col as { accessorKey: string }).accessorKey || col.id) // Ensure we only include columns with accessorKey or id
      .map((col) => {
        const key = (col as { accessorKey: string }).accessorKey ?? col.id; // Use accessorKey if available, fallback to id
        return original[key as keyof ApplicantData]; // Access the value dynamically
      });

    // Join the values with tab delimiters
    const tabDelimitedRow = columnOrder.join("\t");

    // Copy to clipboard
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
        {/* Copy Entire Column Header */}
        <DropdownMenuItem
          onClick={() => {
            const columnHeaders = columns.map((col) => col.header);
            navigator.clipboard.writeText(columnHeaders.join("\t"));
            toast.success("Column headers copied");
          }}
        >
          Copy Entire Column Header
        </DropdownMenuItem>

        {/* Copy Entire Row as Tab-delimited */}
        <DropdownMenuItem onClick={copyRowAsTabDelimited}>
          Copy Entire Row (Excel pasteable)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
