import { SeatingPlan } from "@/lib/supabase/types/additional.types";
import NameInput from "./name-input";
import SaveButton from "./save-button";

export default function SettingsBar({
  seatingPlan,
}: {
  seatingPlan: SeatingPlan;
}) {
  return (
    <div className="absolute top-3 left-4 w-[calc(100%-4rem)] z-10 flex items-center justify-between">
      <NameInput
        seatingPlanName={seatingPlan.name}
        seatingPlanId={seatingPlan.id}
      />
      <div className="bg-white border border-sidebar-border rounded-md">
        <SaveButton seatingPlan={seatingPlan} />
      </div>
    </div>
  );
}
