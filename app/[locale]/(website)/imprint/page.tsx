import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/routing";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("imprint-page");
  return {
    title: t("heading") || "Imprint",
  };
}

export default async function FeedbackPage() {
  const t = await getTranslations("imprint-page");

  return (
    <main className="flex flex-col flex-grow container mx-auto">
      <div className="p-4 flex flex-col gap-4 w-4/5">
        <h1 className="text-3xl font-bold">{t("heading")}</h1>
        <div>
          <h2 className="text-2xl mb-2">{t("contact")}</h2>
          <p>Kevin Eberhardt</p>
          <p>Geißbergstr. 9, 72800 Eningen</p>
          <p>
            E-Mail:{" "}
            <Link
              href="mailto:mail@help2teach.de"
              className="text-primary underline"
            >
              mail@help2teach.de
            </Link>
          </p>
        </div>
        <div>
          <h2 className="text-2xl mb-2">{t("copyright.title")}</h2>
          {t.rich("copyright.text", {
            p: (chunks) => <p>{chunks}</p>,
          })}
        </div>
      </div>
    </main>
  );
}
