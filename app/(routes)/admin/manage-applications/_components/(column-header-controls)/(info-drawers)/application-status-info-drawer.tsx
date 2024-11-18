import * as React from "react";

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

import { useApplicationStatus } from "@/hooks/use-application-status";

interface DrawerDemoProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  applicationId: string;
}

export function ApplicationStatusInfoDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  applicationId,
}: DrawerDemoProps) {
  const { statusLogs, fetchStatusLogs } = useApplicationStatus();

  React.useEffect(() => {
    if (applicationId) {
      fetchStatusLogs(applicationId);
    }
  }, [applicationId, fetchStatusLogs]);

  // Sort statusLogs by applicationStatusLogId in descending order before rendering
  const sortedStatusLogs = [...statusLogs].sort((a, b) => {
    if (!a.applicationStatusLogId || !b.applicationStatusLogId) return 0;
    return b.applicationStatusLogId.localeCompare(a.applicationStatusLogId);
  });

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Application Status Log</DrawerTitle>
            <DrawerDescription>{applicationId}</DrawerDescription>
          </DrawerHeader>

          {/* Status Logs Section */}
          <div className="mt-4 h-64 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date Edited</TableHead>
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
                        {new Date(log.dateEdited).toLocaleString()}
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
