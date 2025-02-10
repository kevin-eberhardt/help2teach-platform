import { SeatingPlan } from "@/lib/supabase/types/additional.types";
import { useFormatter, useTranslations } from "next-intl";

export default function LastSavedText({
  lastSavedDate,
}: {
  lastSavedDate: SeatingPlan["edited_at"];
}) {
  if (!lastSavedDate) return null;
  const t = useTranslations("seating-plan");
  const format = useFormatter();
  const lastSaved = format.dateTime(new Date(lastSavedDate), {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <span className="text-xs text-muted-foreground pl-4 backdrop-blur-sm">
      {t("last-saved")} {lastSaved}
    </span>
  );
}
