import SeatingPlanCard from "@/components/pages/overview/seating-plans/card";
import { getSeatingPlansByClassId } from "@/lib/supabase/queries";
import { getTranslations } from "next-intl/server";

export default async function SeatingPlansPage({
  params,
}: {
  params: Promise<{ locale: string; class_id: string }>;
}) {
  const { class_id } = await params;
  const seatingPlans = await getSeatingPlansByClassId(class_id);
  const t = await getTranslations("general");
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{t("seating-plans")}</h1>
      <ul>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {seatingPlans?.map((seatingPlan) => (
            <SeatingPlanCard key={seatingPlan.id} {...seatingPlan} />
          ))}
        </div>
      </ul>
    </div>
  );
}
