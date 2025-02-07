import SeatingPlanCard from "@/components/pages/overview/seating-plans/card";
import {
  getSchoolClassById,
  getSeatingPlansByClassId,
} from "@/lib/supabase/queries";
import { notFound } from "next/navigation";

export default async function ClassPage({
  params,
}: {
  params: Promise<{ locale: string; class_id: string }>;
}) {
  const { class_id } = await params;
  const currentSchoolClass = await getSchoolClassById(class_id);
  if (!currentSchoolClass) {
    return notFound();
  }
  const seatingPlans = await getSeatingPlansByClassId(class_id);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">{currentSchoolClass.name}</h1>
      <div className="flex flex-col gap-4 mt-4">
        {seatingPlans?.map((seatingPlan) => (
          <SeatingPlanCard key={seatingPlan.id} {...seatingPlan} />
        ))}
      </div>
    </div>
  );
}
