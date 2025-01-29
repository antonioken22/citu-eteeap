"use client";

import { useState } from "react";

import { ArrowDownZaIcon } from "lucide-react";
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

import { Timestamp } from "firebase/firestore";
import { ApplicationStatusLog } from "@/types/ApplicationStatusLog";

import { useApplicationStatus } from "@/hooks/firebase-firestore/useApplicationStatus";

type DrawerProps = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  applicationId: string;
};

export function ApplicationStatusInfoDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  applicationId,
}: DrawerProps) {
  const {
    fetchStatusLogsByApplicationId,
    loading: useApplicationStatusLoading,
  } = useApplicationStatus();

  const [statusLogs, setStatusLogs] = useState<ApplicationStatusLog[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const handleFetchStatusLogs = async () => {
    const statusLogs = await fetchStatusLogsByApplicationId(applicationId);
    setStatusLogs(statusLogs ?? []);
    setIsDataFetched(true);
  };

  // Sort statusLogs by applicationStatusLogId in descending order before rendering
  const sortedStatusLogs = [...statusLogs].sort((a, b) => {
    if (!a.applicationStatusLogId || !b.applicationStatusLogId) return 0;
    return b.applicationStatusLogId.localeCompare(a.applicationStatusLogId);
  });

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex flex-row items-center justify-between">
            <div>
              <DrawerTitle>Application Status Log</DrawerTitle>
              <DrawerDescription>{applicationId}</DrawerDescription>
            </div>
            <div>
              <Button
                variant="outline"
                onClick={handleFetchStatusLogs}
                disabled={useApplicationStatusLoading}
              >
                {!isDataFetched ? "Fetch Data" : "Refresh"}
              </Button>
            </div>
          </DrawerHeader>

          {/* Status Logs Section */}
          <div className="mt-4 h-64 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="flex flex-row items-center">
                    Date Edited <ArrowDownZaIcon size={20} />
                  </TableHead>
                  <TableHead>Old Status</TableHead>
                  <TableHead>New Status</TableHead>
                  <TableHead>Editor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedStatusLogs.length > 0 ? (
                  sortedStatusLogs.map((log) => (
                    <TableRow
                      key={log.applicationStatusLogId}
                      className="text-xs"
                    >
                      <TableCell>
                        {(log.dateEdited as Timestamp)
                          .toDate()
                          .toLocaleString()}
                      </TableCell>
                      <TableCell>{log.oldApplicationStatus}</TableCell>
                      <TableCell>{log.newApplicationStatus}</TableCell>
                      <TableCell>
                        {log.editorFirstname} {log.editorLastname}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-muted-foreground"
                    >
                      No status logs available
                    </TableCell>
                  </TableRow>
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
