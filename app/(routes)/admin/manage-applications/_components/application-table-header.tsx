import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpAZ, ArrowUpZA } from "lucide-react";
import { flexRender, Table as ReactTable } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ApplicantData } from "@/types/ApplicantData";

interface ApplicationTableHeaderProps {
  table: ReactTable<ApplicantData>;
  columns: ColumnDef<ApplicantData>[];
}

export function ApplicationTableHeader({
  table,
  columns,
}: ApplicationTableHeaderProps) {
  return (
    <div className="rounded-md border">
      <Table>
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
                    className="border border-muted"
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
                          {sortDirection === "desc" && <ArrowUpZA size={16} />}
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
                  <TableCell key={cell.id} className="border border-muted">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
