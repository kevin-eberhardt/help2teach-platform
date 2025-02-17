import CreateSeatingPlanDialog from "@/components/seating-plan/dialogs/create-dialog";
import SeatingPlanPreviewCard from "@/components/seating-plan/preview-card";
import { getSeatingPlansByClassId } from "@/lib/supabase/queries";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("sidebar");
  return {
    title: `${t("seating-plans")}`,
  };
}

export default async function SeatingPlansPage({
  params,
}: {
  params: Promise<{ locale: string; class_id: string }>;
}) {
  const { class_id } = await params;
  const seatingPlans = await getSeatingPlansByClassId(class_id);
  let t = await getTranslations("general");
  const heading = t("seating-plans");

  if (seatingPlans?.length === 0) {
    t = await getTranslations("seating-plan");
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold">{heading}</h1>
        <div className="mt-4 flex gap-4">
          <p className="text-xl">{t("no-seating-plans.description")}</p>
        </div>
        <CreateSeatingPlanDialog classId={parseInt(class_id)} />
      </div>
    );
  } else {
    return (
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{heading}</h1>
          <CreateSeatingPlanDialog classId={parseInt(class_id)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {seatingPlans?.map((seatingPlan) => (
            <SeatingPlanPreviewCard key={seatingPlan.id} {...seatingPlan} />
          ))}
        </div>
      </div>
    );
  }
}
