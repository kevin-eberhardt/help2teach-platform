"use client";
import { SeatingPlanProps } from "@/lib/supabase/types/additional.types";
import { useFormatter, useTranslations } from "next-intl";

export default function LastSavedState({
  lastEdit,
}: {
  lastEdit: SeatingPlanProps["edited_at"];
}) {
  const t = useTranslations("seating-plan");
  const format = useFormatter();

  if (!lastEdit) {
    return null;
  }
  const lastEditDate = format.dateTime(new Date(lastEdit), {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="absolute bottom-4 right-4 text-xs text-gray-400 w-auto z-10">
      {t("last-saved")} {lastEditDate}
    </div>
  );
}
