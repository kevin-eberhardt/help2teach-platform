import { Student } from "@/lib/supabase/types/additional.types";
import { ColumnDef } from "@tanstack/react-table";
import { ActionCell, GenderCell, NameCell } from "./cells";
import { NameHeader } from "./headers";

export function columns(t?: (key: string) => string): ColumnDef<Student>[] {
  return [
    {
      accessorKey: "name",
      header: NameHeader,
      cell: NameCell,
    },
    {
      accessorKey: "gender",
      header: t ? t("edit-table.column-header-gender") : "Gender",
      cell: GenderCell,
    },
    {
      id: "actions",
      cell: ActionCell,
    },
  ];
}
