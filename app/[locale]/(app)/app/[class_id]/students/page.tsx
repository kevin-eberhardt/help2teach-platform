import { getTranslations } from "next-intl/server";

export default async function StudentsPage() {
  const t = await getTranslations("students");
  return (
    <div className="p-4">
      <div className="max-w-lg">
        <h1 className="text-4xl">{t("page.heading")}</h1>
        <p>{t("page.description")}</p>
      </div>
    </div>
  );
}
