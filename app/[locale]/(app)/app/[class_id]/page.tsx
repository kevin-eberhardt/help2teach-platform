import Footer from "@/components/footer";
import SeatingPlanPreviewCard from "@/components/seating-plan/preview-card";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/routing";
import {
  getSchoolClassById,
  getSeatingPlansByClassId,
  getUser,
} from "@/lib/supabase/queries";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Params } from "next/dist/server/request/params";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { class_id } = params;
  if (!class_id) {
    return notFound();
  }
  const currentSchoolClass = await getSchoolClassById(class_id as string);
  if (!currentSchoolClass) {
    return notFound();
  }

  const t = await getTranslations("login-page");
  return {
    title: "Overview",
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
  const t = await getTranslations("general");
  const tSeatingPlan = await getTranslations("seating-plan");
  const user = await getUser();

  return (
    <main className="scroll-smooth">
      <div className="p-4 bg-accent flex flex-col gap-4">
        <div className="text-base md:text-lg">
          <p className="text-xl md:text-2xl font-bold mb-2">
            Willkommen {user.user_metadata.full_name} 👋🏼
          </p>
          <p>
            Vielen Dank, dass Du Help2Teach schon in den Anfängen nutzt!
            <br />
            Wir arbeiten fleißig daran, die Plattform auszubauen und immer mehr
            Features hinzuzufügen!
          </p>
          <p>
            Du kannst bereits jetzt schon deine Schüler*innen anlegen und deine
            Sitzpläne erstellen.
          </p>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-4 flex-1">
        <div id="seating-plans">
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
              <Link href={`/app/${class_id}/seating-plans`}>
                <Button variant="outline">
                  {tSeatingPlan("create-seating-plan")}
                </Button>
              </Link>
            </div>
          )}

          {seatingPlans?.length === 4 && (
            <div className="flex justify-center mt-4">
              <Link href={`/app/${class_id}/seating-plans`}>
                <Button variant="outline">{t("see-all")}</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 bg-accent text-center">
        <p className="text-base md:text-lg">
          Du hast noch weitere Ideen, die du gerne in der Plattform finden
          würdest?
          <br />
          Wir würden gerne mehr darüber erfahren! Schreib uns ganz einfach einen
          Vorschlag mit einer kurzen Beschreibung 🙂
        </p>
        <Button className="mt-2">Idee vorschlagen</Button>
      </div>
      <Footer />
    </main>
  );
}
