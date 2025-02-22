import Footer from "@/components/footer";
import CreateSeatingPlanDialog from "@/components/seating-plan/dialogs/create-dialog";
import SeatingPlanPreviewCard from "@/components/seating-plan/preview-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/routing";
import {
  getSchoolClassById,
  getSeatingPlansByClassId,
  getUser,
} from "@/lib/supabase/queries";
import { Heart } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Params } from "next/dist/server/request/params";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { class_id } = await params;
  if (!class_id) {
    return notFound();
  }
  const currentSchoolClass = await getSchoolClassById(class_id as string);
  if (!currentSchoolClass) {
    return notFound();
  }

  const t = await getTranslations("app-start-page");
  return {
    title: `${t("heading")} | ${currentSchoolClass.name}`,
  };
}

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
  const t = await getTranslations("app-start-page");
  const tSeatingPlan = await getTranslations("seating-plan");
  const user = await getUser();

  return (
    <main className="flex flex-col flex-grow">
      <div className="p-4 flex flex-col gap-4">
        <Alert variant="default" className="bg-sidebar">
          <Heart className="h-4 w-4" />
          <AlertTitle>
            {t("alert.heading", { name: user.user_metadata.full_name })}
          </AlertTitle>
          <AlertDescription>
            <p>{t("alert.description")}</p>
          </AlertDescription>
        </Alert>
      </div>
      <div className="p-4 flex flex-col gap-4 flex-1">
        <div>
          <h2 className="text-2xl font-bold">{t("seating-plans")}</h2>
          {seatingPlans && seatingPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {seatingPlans?.map((seatingPlan) => (
                <SeatingPlanPreviewCard key={seatingPlan.id} {...seatingPlan} />
              ))}
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-xl">
                {tSeatingPlan("no-seating-plans.heading")}
              </p>
              <p className="text-sm text-muted-foreground">
                {tSeatingPlan("no-seating-plans.description")}
              </p>
              <div className="w-auto">
                <CreateSeatingPlanDialog classId={currentSchoolClass.id} />
              </div>
            </div>
          )}

          {seatingPlans?.length === 4 && (
            <div className="flex justify-center mt-4">
              <Link href={`/app/${class_id}/seating-plans`}>
                <Button variant="outline">{t("see-all-button")}</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 bg-sidebar text-center space-y-4">
        <p>{t("feedback.text")}</p>
        <div>
          <Link
            href="https://github.com/orgs/Help2Teach/discussions"
            target="_blank"
          >
            <Button variant="outline">{t("feedback.button")}</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
