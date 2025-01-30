import SeatingPlan from "@/components/seating-plan";
import SeatingPlanSettingsBar from "@/components/seating-plan/settings-bar";
import {
  getSeatingPlanById,
  getStudentsByClassId,
} from "@/lib/supabase/queries";
import { notFound } from "next/navigation";

export default async function SeatingPlanPage({
  params,
}: {
  params: { locale: string; class_id: string; seatingplan_id: string };
}) {
  const { seatingplan_id, class_id } = await params;
  const seatingPlan = await getSeatingPlanById(seatingplan_id);
  const students = await getStudentsByClassId(class_id);
  if (!students) {
    return notFound();
  }

  if (!seatingPlan) {
    return notFound();
  }
  return (
    <div>
      <SeatingPlanSettingsBar seatingPlan={seatingPlan} />
      <SeatingPlan students={students} seatingPlan={seatingPlan} />
    </div>
  );
}
