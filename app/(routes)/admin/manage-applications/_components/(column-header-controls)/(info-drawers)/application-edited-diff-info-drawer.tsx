import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { columns } from "../../columns";
import { ApplicantData } from "@/types/ApplicantData";

import { useApplications } from "@/hooks/use-applications";
import { ColumnDef } from "@tanstack/react-table";

const formatCellValue = (value: any): React.ReactNode => {
  if (value === null || value === undefined) return "-"; // Handle null or undefined values
  if (value instanceof Date) return value.toLocaleString(); // Format Date objects
  if (typeof value === "object" && value.toDate)
    return value.toDate().toLocaleString(); // Handle Firestore Timestamp
  if (Array.isArray(value)) return value.join(", "); // Convert arrays to comma-separated strings
  return value.toString(); // Default conversion to string
};

interface DrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  applicantId: string;
  applicantEmail: string;
}

export function ApplicationEditedDiffInfoDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  applicantId,
  applicantEmail,
}: DrawerProps) {
  const { allApplications, allOldApplications } = useApplications();
  const [currentApplication, setCurrentApplication] =
    useState<ApplicantData | null>(null);
  const [oldApplications, setOldApplications] = useState<ApplicantData[]>([]);

  useEffect(() => {
    if (applicantId) {
      const application = allApplications.find(
        (app) => app.applicantId === applicantId
      );
      const oldApps = allOldApplications.filter(
        (app) => app.applicantId === applicantId
      );
      setCurrentApplication(application || null);
      setOldApplications(oldApps);
    }
  }, [applicantId, allApplications, allOldApplications]);

  const getColumnOrder = (columns: ColumnDef<ApplicantData>[]) =>
    columns
      .filter((col) => (col as { accessorKey: string }).accessorKey || col.id)
      .map((col) => (col as { accessorKey: string }).accessorKey ?? col.id);

  const renderDiffHighlight = (oldValue: any, currentValue: any) => {
    if (oldValue !== currentValue) {
      return "bg-yellow-200 dark:bg-red-800";
    }
    return "";
  };

  const renderRow = (field: keyof ApplicantData, label: string) => (
    <TableRow key={field}>
      <TableCell>{label}</TableCell>
      {oldApplications.map((oldApp, index) => {
        const previousValue =
          index > 0 ? oldApplications[index - 1][field] : null;
        const highlightClass = previousValue
          ? renderDiffHighlight(previousValue, oldApp[field])
          : "";

        return (
          <TableCell
            key={index}
            className={`text-xs max-w-[200px] truncate ${highlightClass}`}
          >
            {formatCellValue(oldApp[field])}
          </TableCell>
        );
      })}
      <TableCell
        className={`text-xs max-w-[200px] truncate ${
          currentApplication
            ? renderDiffHighlight(
                oldApplications[oldApplications.length - 1]?.[field],
                currentApplication[field]
              )
            : ""
        }`}
      >
        {currentApplication ? formatCellValue(currentApplication[field]) : "-"}
      </TableCell>
    </TableRow>
  );
  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl overflow-x-auto">
          <DrawerHeader>
            <DrawerTitle>Application Edited Diff</DrawerTitle>
            <DrawerDescription>{applicantEmail}</DrawerDescription>
          </DrawerHeader>

          <div className="overflow-x-auto overflow-y-auto max-h-[50vh] border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  {oldApplications.map((_, index) => (
                    <TableHead key={index}>
                      Old Application {index + 1}
                    </TableHead>
                  ))}
                  <TableHead>Current Application</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getColumnOrder(columns).map((key) =>
                  renderRow(key as keyof ApplicantData, key)
                )}
              </TableBody>
            </Table>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
