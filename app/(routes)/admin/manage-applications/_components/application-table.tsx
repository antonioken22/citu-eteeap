"use client";

import * as React from "react";
import {
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  useReactTable,
} from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import { ApplicationTableHeader } from "./application-table-header";
import { FilterAndColumnControls } from "./filter-and-column-controls";
import { PaginationControls } from "./pagination-controls";
import { columns } from "./columns";
import { ApplicationControls } from "./application-controls";

import { useApplications } from "@/hooks/use-applications";

export function ApplicationTable() {
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "dateSubmitted",
      desc: false,
    },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Use the custom hook for Firestore operations
  const { allApplications } = useApplications(); // We only need applications here

  // Initialize the table with Firestore data
  const table = useReactTable({
    data: allApplications,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    initialState: {
      pagination: { pageSize: 10 }, // Set to paginate n rows at a time
    },
  });

  // Extract selected rows' data and map to get applicationId
  const selectedApplicationIds = table
    .getSelectedRowModel()
    .flatRows.map((row) => row.original.applicationId as string);

  return (
    <div className="w-full">
      <FilterAndColumnControls table={table} />
      <ApplicationTableHeader table={table} columns={columns} />
      <div className="flex justify-end">
        <div className="mr-auto">
          <ApplicationControls
            selectedApplicationIds={selectedApplicationIds}
          />
        </div>
        <PaginationControls table={table} />
      </div>
    </div>
  );
}
