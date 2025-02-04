"use client";
import { SeatingPlanProps } from "@/lib/supabase/types/additional.types";
import { Loader2 } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

export default function LastSavedState({
  lastEdit,
  isSaving,
}: {
  lastEdit: SeatingPlanProps["edited_at"];
  isSaving: boolean;
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
      {isSaving ? (
        <div className="animate-pulse flex items-center gap-2">
          <Loader2 className="animate-spin" /> {t("saving")}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {t("last-saved")} {lastEditDate}
        </div>
      )}
    </div>
  );
}
