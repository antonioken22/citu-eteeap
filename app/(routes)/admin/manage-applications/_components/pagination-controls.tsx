import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Table as ReactTable } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ApplicantData } from "@/types/ApplicantData";

interface PaginationControlsProps {
  table: ReactTable<ApplicantData>;
}

export function PaginationControls({ table }: PaginationControlsProps) {
  const currentPage = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  const handlePageClick = (pageIndex: number) => {
    table.setPageIndex(pageIndex);
  };

  return (
    <div className="flex justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeft />
      </Button>

      {/* Page numbers in a popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            ...
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-4">
          <p className="text-sm text-muted-foreground pb-2">
            Select a page to navigate.
          </p>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: pageCount }).map((_, index) => (
              <Button
                key={index}
                variant={index === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageClick(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
