import { SeatingPlan } from "@/lib/supabase/types/additional.types";
import NameInput from "./name-input";
import { Menu } from "./menu";
import LastSavedText from "./last-saved-text";
import { useEffect, useState } from "react";

export default function SettingsBar({
  seatingPlan: initialSeatingPlan,
  setSeatingPlan: setInitialSeatingPlan,
}: {
  seatingPlan: SeatingPlan;
  setSeatingPlan: (seatingPlan: SeatingPlan) => void;
}) {
  const [seatingPlan, setSeatingPlan] = useState(initialSeatingPlan);

  useEffect(() => {
    setSeatingPlan(initialSeatingPlan);
  }, [initialSeatingPlan]);

  useEffect(() => {
    setInitialSeatingPlan(seatingPlan);
  }, [seatingPlan]);

  return (
    <div className="absolute top-3 left-4 w-auto z-10">
      <div className="flex items-center justify-between bg-background shadow-md gap-2 p-2">
        <div>
          <NameInput
            seatingPlanName={seatingPlan.name}
            seatingPlanId={seatingPlan.id}
          />
        </div>
        <Menu seatingPlan={seatingPlan} />
      </div>
      <LastSavedText lastSavedDate={seatingPlan.edited_at} />
    </div>
  );
}
