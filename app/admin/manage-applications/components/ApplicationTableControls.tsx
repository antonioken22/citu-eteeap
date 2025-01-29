"use client";

import * as XLSX from "xlsx";
import { format } from "date-fns";

import { toast } from "sonner";
import { Table as ReactTable } from "@tanstack/react-table";
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

import { ApplicantData } from "@/types/ApplicantData";

import { useUser } from "@clerk/nextjs";
import { useApplications } from "@/hooks/firebase-firestore/useApplications";
import { Timestamp } from "firebase/firestore";
import { Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type ApplicationTableControlsProps = {
  selectedApplications: ApplicantData[];
  table?: ReactTable<ApplicantData>;
};

export const ApplicationTableControls = ({
  selectedApplications,
  table,
}: ApplicationTableControlsProps) => {
  const { user } = useUser();
  const {
    updateCanEdit,
    deleteApplication,
    loading: useApplicationsLoading,
  } = useApplications();

  const exportToExcel = () => {
    if (!table) {
      toast.error("Table not found.");
      return;
    }
    // Prepare data for export
    const rows = table.getPreFilteredRowModel().rows.map((row) =>
      row.getVisibleCells().reduce((acc, cell) => {
        // Exclude specific columns
        if (cell.column.id === "select" || cell.column.id === "Row Actions") {
          return acc;
        }

        let value = cell.getValue();

        // Format specific columns & data types
        if (value instanceof Timestamp) {
          value = format(value.toDate(), "MMMM dd, yyyy, hh:mm:ss a");
        } else if (value instanceof Date) {
          value = format(value, "MMMM dd, yyyy, hh:mm:ss a");
        }

        acc[cell.column.id] = value;
        return acc;
      }, {} as Record<string, unknown>)
    );

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    // Auto-resize columns
    const columnWidths = Object.keys(rows[0] || {}).map((col) => {
      const maxLength = Math.max(
        ...rows.map((row) => row[col]?.toString()?.length || 0),
        col.length // Include column header length
      );
      return { wch: maxLength };
    });
    worksheet["!cols"] = columnWidths;

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "CIT-U ETEEAP Applications"
    );

    // Export the workbook
    XLSX.writeFile(workbook, "citu-eteeap-applications-data.xlsx");
  };

  // Handler for allowing users to edit their response
  const handleAllowEditResponse = async () => {
    if (selectedApplications.length <= 0) {
      toast.error("No applications selected.");
      return;
    }

    for (const application of selectedApplications) {
      await updateCanEdit(application.applicationId as string, {
        canEdit: true,
      });
    }
  };

  // Handler for disallowing users to edit their response
  const handleDisallowEditResponse = async () => {
    if (selectedApplications.length <= 0) {
      toast.error("No applications selected.");
      return;
    }

    for (const application of selectedApplications) {
      await updateCanEdit(application.applicationId as string, {
        canEdit: false,
      });
    }
  };

  // Handler for deleting selected applications
  const handleDeleteSelectedApplications = async () => {
    if (selectedApplications.length <= 0) {
      toast.error("No applications selected.");
      return;
    }

    for (const application of selectedApplications) {
      await deleteApplication(application.applicationId as string);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-2 mt-4">
      {user?.publicMetadata.role == "admin" && (
        <div className="flex flex-row items-center gap-2">
          {/* Allow Edit Response */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleAllowEditResponse}
            disabled={
              useApplicationsLoading || selectedApplications.length === 0
            }
          >
            Yes Response Edit
          </Button>

          {/* Disallow Edit Response */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleDisallowEditResponse}
            disabled={
              useApplicationsLoading || selectedApplications.length === 0
            }
          >
            No Response Edit
          </Button>

          {/* Delete Button */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                disabled={
                  useApplicationsLoading || selectedApplications.length === 0
                }
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
        </div>
      )}
      <Separator orientation="horizontal" className="w-full md:hidden" />
      <div className="flex flex-row gap-2">
        {/* Export to Excel Button */}
        <Button variant="default" size="sm" onClick={exportToExcel}>
          Export to Excel <Download className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
