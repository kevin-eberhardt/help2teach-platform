"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Student } from "@/lib/supabase/types/additional.types";
import { CellContext } from "@tanstack/react-table";
import { cx } from "class-variance-authority";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function NameCell({
  row,
  getValue,
  table,
  column,
}: CellContext<Student, unknown>) {
  const initialValue: string = getValue() as string;
  const [value, setValue] = useState(initialValue);
  const [isClicked, setIsClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const t = useTranslations("students");

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isChanged && !isFocused && table.options?.meta) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      table?.options?.meta?.updateRow(row.original.id, column.id, value);
      setIsChanged(false);
    }
  }, [isChanged, isFocused]);

  return (
    <Input
      onFocus={() => setIsClicked(true)}
      onBlur={() => setIsClicked(false)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
      type="text"
      defaultValue={value}
      onChange={(e) => {
        setValue(e.target.value);
        setIsChanged(true);
      }}
      placeholder={
        column.id === "name"
          ? t
            ? t("edit-table.student-placeholder")
            : "Student"
          : undefined
      }
      className={`shadow-none max-w-md ${
        !isClicked && !isHovering && "bg-transparent border-transparent"
      }`}
    />
  );
}

export function ActionCell({ row, table }: CellContext<Student, unknown>) {
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        table.options.meta.deleteRow(row.original.id);
      }}
    >
      <Trash2 className="size-4" />
    </Button>
  );
}

const GENDERS = ["male", "female", "diverse"];

export function GenderCell({
  row,
  getValue,
  table,
  column,
}: CellContext<Student, unknown>) {
  const initialValue = getValue() as string;
  const [value, setValue] = useState(initialValue);
  const [isChanged, setIsChanged] = useState(false);
  const t = useTranslations("students");

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function onBlur() {
    if (isChanged) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      table.options.meta.updateRow(row.original.id, column.id, value);
      setIsChanged(false);
    }
  }
  return (
    <Select
      onValueChange={(v) => {
        setValue((prevState: string) => {
          if (prevState !== v) {
            setIsChanged(true);
          }
          return v;
        });
      }}
      defaultValue={value}
    >
      <SelectTrigger
        onBlur={onBlur}
        className={cx("bg-transparent", "shadow-none")}
      >
        <SelectValue placeholder="Geschlecht auswählen" />
      </SelectTrigger>
      <SelectContent>
        {GENDERS.map((g) => (
          <SelectItem key={g} value={g}>
            {t("edit-table.gender-select", { gender: g })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
