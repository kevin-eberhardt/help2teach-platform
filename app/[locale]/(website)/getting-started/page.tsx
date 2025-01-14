import CreateSchoolClassForm from "@/components/ui/school-classes/create-dialog/form";
import { getTranslations } from "next-intl/server";

export default async function CreateSchoolClassPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "school-class" });

  return (
    <div className="p-4 w-full md:max-w-lg mx-auto">
      <h1 className="text-4xl mb-4">{t("create-page.heading")}</h1>
      <p className="mb-6">
        {t.rich("create-page.description", {
          quotes: (chunks) => <q>{chunks}</q>,
        })}
      </p>
      <CreateSchoolClassForm />
    </div>
  );
}
