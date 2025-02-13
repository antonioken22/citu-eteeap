"use client";

import { useEffect, useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
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

import { columns } from "../Columns";
import { ApplicantData } from "@/types/ApplicantData";

import { useApplications } from "@/hooks/firebase-firestore/use-applications";

const formatCellValue = (value: any): React.ReactNode => {
  if (value === null || value === undefined) return "-"; // Handle null or undefined values
  if (value instanceof Date) return value.toLocaleString(); // Format Date objects
  if (typeof value === "object" && value.toDate)
    return value.toDate().toLocaleString(); // Handle Firestore Timestamp
  if (Array.isArray(value)) return value.join(", "); // Convert arrays to comma-separated strings
  return value.toString(); // Default conversion to string
};

type DrawerProps = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  applicationId: string;
  applicantId: string;
  applicantEmail: string;
};

const getColumnOrder = (columns: ColumnDef<ApplicantData>[]) =>
  columns
    .filter((col) => {
      const excludedFields = ["select", "Row Actions", "Index"];
      return (
        ((col as { accessorKey?: string }).accessorKey || col.id) &&
        !excludedFields.includes(col.id as string) &&
        !excludedFields.includes(
          (col as { accessorKey?: string }).accessorKey ?? ""
        )
      );
    })
    .map((col) => ({
      label: col.id, // Displayed as row header
      key: (col as { accessorKey?: string }).accessorKey ?? col.id, // Used to access data
    }));

export function ApplicationEditedDiffInfoDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  applicationId,
  applicantId,
  applicantEmail,
}: DrawerProps) {
  const {
    fetchApplicationByApplicationId,
    fetchOldApplicationsByApplicantId,
    loading: useApplicationsLoading,
  } = useApplications();

  const [currentApplication, setCurrentApplication] =
    useState<ApplicantData | null>(null);
  const [oldApplications, setOldApplications] = useState<ApplicantData[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const handleFetchData = async () => {
    const currentApplication = await fetchApplicationByApplicationId(
      applicationId
    );
    setCurrentApplication(currentApplication);
    const oldApplications = await fetchOldApplicationsByApplicantId(
      applicantId
    );
    setOldApplications(oldApplications ?? []);
    setIsDataFetched(true);
  };

  const renderDiffHighlight = (oldValue: any, currentValue: any) => {
    const formattedOldValue = formatCellValue(oldValue);
    const formattedCurrentValue = formatCellValue(currentValue);
    if (formattedOldValue !== formattedCurrentValue) {
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
            className={`text-xs max-w-[150px] truncate ${highlightClass}`}
          >
            {formatCellValue(oldApp[field])}
          </TableCell>
        );
      })}
      <TableCell
        className={`text-xs max-w-[150px] truncate ${
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
          <DrawerHeader className="flex flex-row items-center justify-between">
            <div>
              <DrawerTitle>Application Edited Diff</DrawerTitle>
              <DrawerDescription>{applicantEmail}</DrawerDescription>
            </div>
            <div>
              <Button
                variant="outline"
                onClick={handleFetchData}
                disabled={useApplicationsLoading}
              >
                {!isDataFetched ? "Fetch Data" : "Refresh"}
              </Button>
            </div>
          </DrawerHeader>

          <div className="overflow-x-auto overflow-y-auto max-h-[50vh] border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px] truncate">Field</TableHead>
                  {oldApplications.map((_, index) => (
                    <TableHead key={index}>
                      Old Application {index + 1}
                    </TableHead>
                  ))}
                  <TableHead>Current Application</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getColumnOrder(columns).map(({ label, key }) =>
                  renderRow(key as keyof ApplicantData, label as string)
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
