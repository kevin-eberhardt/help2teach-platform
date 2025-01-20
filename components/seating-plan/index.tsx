import { SeatingPlan as SeatingPlanProps } from "@/lib/supabase/types/additional.types";

export default function SeatingPlan({
  seatingPlan,
}: {
  seatingPlan: SeatingPlanProps;
}) {
  return (
    <>
      <h1>SeatingPlanPage #{seatingPlan.id}</h1>
    </>
  );
}
