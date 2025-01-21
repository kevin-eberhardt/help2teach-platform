"use client";

import { Button } from "@/components/ui/button";
import { Student } from "@/lib/supabase/types/additional.types";
import { HeaderContext } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useTranslations } from "next-intl";

export function NameHeader({ column }: HeaderContext<Student, unknown>) {
  const t = useTranslations("students");
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {t ? t("edit-table.column-header-name") : "Name"}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
