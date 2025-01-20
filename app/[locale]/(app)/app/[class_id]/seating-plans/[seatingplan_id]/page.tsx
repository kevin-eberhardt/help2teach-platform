import SeatingPlan from "@/components/seating-plan";
import { getSeatingPlanById } from "@/lib/supabase/queries";
import { notFound } from "next/navigation";

export default async function SeatingPlanPage({
  params,
}: {
  params: { locale: string; class_id: string; seatingplan_id: string };
}) {
  const { seatingplan_id } = await params;
  const seatingPlan = await getSeatingPlanById(seatingplan_id);
  if (!seatingPlan) {
    return notFound();
  }
  return (
    <div>
      <h1 className="text-4xl">{seatingPlan.name}</h1>
      <SeatingPlan seatingPlan={seatingPlan} />
    </div>
  );
}
