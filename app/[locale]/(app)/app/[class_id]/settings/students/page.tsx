import { getTranslations } from "next-intl/server";

export default async function StudentsSettingsPage() {
  const t = await getTranslations("students");
  return (
    <div>
      <h1 className="text-4xl">{t("page.heading")}</h1>
    </div>
  );
}
