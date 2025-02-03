import { SeatingPlanProps } from "@/lib/supabase/types/additional.types";
import NameEditInput from "./edit-name-input";
import { getTranslations } from "next-intl/server";
import ExportImage from "./export-image";
import SaveButton from "./save-button";

export default async function SeatingPlanSettingsBar({
  seatingPlan,
}: {
  seatingPlan: SeatingPlanProps;
}) {
  const t = await getTranslations("seating-plan");
  return (
    <div className="absolute w-full bg-white flex items-center justify-between p-2 z-10 shadow-sm">
      <NameEditInput
        id={seatingPlan.id}
        name={
          seatingPlan.name ? seatingPlan.name : t("settings.undefined-name")
        }
      />
      <div className="flex items-center gap-2">
        <SaveButton />
        <ExportImage />
      </div>
    </div>
  );
}
