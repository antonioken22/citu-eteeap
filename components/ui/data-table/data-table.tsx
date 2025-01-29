"use client";

import * as React from "react";
import {
  Table as ReactTable,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpAZ, ArrowUpZA, ChevronDown } from "lucide-react";

import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDataLoading?: boolean;
  defaultPageSize?: number;
  defaultSortedColumn?: SortingState;
  defaultHiddenColumns?: VisibilityState;
  onTableReady?: (table: ReactTable<TData>) => void;
  onRowSelectionChange?: (selectedData: TData[]) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onDataLoading = false,
  defaultPageSize = 10,
  defaultSortedColumn,
  defaultHiddenColumns,
  onTableReady,
  onRowSelectionChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>(
    defaultSortedColumn || []
  );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(defaultHiddenColumns || {});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: { pageSize: defaultPageSize ?? 10 },
    },
  });

  // Pass the table instance to the parent via the callback
  React.useEffect(() => {
    if (onTableReady) {
      onTableReady(table);
    }
  }, [table, onTableReady]);

  // Pass the selected data to the parent via the callback
  React.useEffect(() => {
    if (onRowSelectionChange) {
      const selectedData = table.getSelectedRowModel().flatRows.map((row) => {
        return row.original;
      });
      onRowSelectionChange(selectedData);
    }
  }, [rowSelection, onRowSelectionChange, table, data]);

  // Update the row selection when the table rows change
  React.useEffect(() => {
    const visibleRowIds = new Set(
      table.getRowModel().rows.map((row) => row.id)
    );

    setRowSelection((prev) => {
      const newSelection = { ...prev };
      Object.keys(newSelection).forEach((key) => {
        if (!visibleRowIds.has(key)) {
          delete newSelection[key];
        }
      });
      return newSelection;
    });
  }, [table, setRowSelection]);

  if (onDataLoading) {
    return (
      <div className="w-full mt-6 space-y-4">
        {/* Filter Components */}
        <div className="flex items-center justify-between space-x-2">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-8 w-1/4" />
        </div>
        {/* Data Table Component */}
        <div className="flex flex-col space-y-1">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-screen w-full" />
        </div>
        {/* Pagination Component */}
        <div className="flex items-center justify-between space-x-2">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-8 w-1/4 hidden md:inline" />
          <Skeleton className="h-8 w-1/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-6 space-y-4">
      {/* Filter Components */}
      <div className="flex items-center justify-between space-x-2">
        <Input
          placeholder="Global filter..."
          value={globalFilter}
          onChange={(e) => {
            setGlobalFilter(e.target.value);
            table.setGlobalFilter(e.target.value);
          }}
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="max-h-[300px] overflow-y-auto"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value: boolean) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Data Table Component */}
      <div className="border rounded-md overflow-hidden">
        <Table className="[&_td]:border [&_th]:border">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSorted = header.column.getIsSorted();
                  const sortDirection = isSorted
                    ? header.column.getIsSorted()
                    : null;
                  return (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      role="button"
                    >
                      <div className="flex items-center cursor-pointer">
                        {/* Render the header content */}
                        {!header.isPlaceholder &&
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                        {/* Sorting button */}
                        {header.column.getCanSort() && (
                          <span className="ml-2">
                            {sortDirection === "asc" && <ArrowUpAZ size={16} />}
                            {sortDirection === "desc" && (
                              <ArrowUpZA size={16} />
                            )}
                            {!sortDirection && (
                              <span className="invisible">
                                <ArrowUpAZ size={16} />
                              </span>
                            )}
                          </span>
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Component */}
      <div>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
