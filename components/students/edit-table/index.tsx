"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { addStudent, deleteStudent, updateStudent } from "./actions";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  schoolClassId: number;
}

export function StudentsEditTable<TData, TValue>({
  columns,
  data: initialData,
  schoolClassId,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    meta: {
      updateRow: (
        studentId: number,
        columnName: "name",
        columnValue: string
      ) => {
        updateStudent({ studentId, columnName, columnValue }).then(
          (student) => {
            setData(
              data.map((s) => {
                if (s.id !== studentId) {
                  return s;
                }
                return student as unknown as TData;
              })
            );
          }
        );
      },
      deleteRow: (studentId: number) => {
        deleteStudent({
          schoolClassId: schoolClassId,
          studentId: studentId,
        }).then(() => {
          setData(data.filter((student) => student.id !== studentId));
          table.reset();
        });
      },
    },
  });
  const t = useTranslations("students");

  function handleAdd() {
    addStudent(schoolClassId)
      .then((student) => {
        setData([student as unknown as TData, ...data]);
        const hasPagination =
          pagination.pageIndex * pagination.pageSize < data.length;
        if (hasPagination && table.getCanNextPage()) {
          setPagination({
            ...pagination,
            pageIndex: pagination.pageIndex + 1,
          });
        }
      })
      .catch((error) => {
        // toast error;
        console.error(error);
      });
  }

  return (
    <div>
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder={t("edit-table.search-placeholder")}
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
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
                  {t("edit-table.no-results")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          {t("edit-table.search-results", {
            count: table.getFilteredRowModel().rows.length,
          })}
        </div>
        <div>
          <Button variant="outline" size="sm" onClick={handleAdd}>
            <Plus className="size-4" />
          </Button>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
