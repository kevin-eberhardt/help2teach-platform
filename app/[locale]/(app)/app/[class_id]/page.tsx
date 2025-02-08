import SeatingPlanCard from "@/components/pages/overview/seating-plans/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/routing";
import {
  getSchoolClassById,
  getSeatingPlansByClassId,
} from "@/lib/supabase/queries";
import { getTranslations } from "next-intl/server";
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
  const seatingPlans = await getSeatingPlansByClassId(class_id, 4);
  const t = await getTranslations("general");
  return (
    <div className="p-4 flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold">{t("seating-plans")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {seatingPlans?.map((seatingPlan) => (
            <SeatingPlanCard key={seatingPlan.id} {...seatingPlan} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Link href={`/app/${class_id}/seating-plans`}>
            <Button variant="outline">{t("see-all")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
