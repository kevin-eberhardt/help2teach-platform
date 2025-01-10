import Footer from "@/components/layout/website/footer";
import Header from "@/components/layout/website/header";
import CreateSchoolClassForm from "@/components/ui/classes/create-dialog/form";
import { useTranslations } from "next-intl";

export default function NewPage() {
  const t = useTranslations("school-class");
  return (
    <>
      <Header />
      <div className="w-full max-w-lg mx-auto mt-6">
        <h1 className="text-4xl font-bold mb-4">{t("create-page.heading")}</h1>
        <p className="text-lg mb-6">
          {t.rich("create-page.description", {
            quotes: (chunks) => `"${chunks}"`,
          })}
        </p>
        <CreateSchoolClassForm />
      </div>
      <Footer />
    </>
  );
}
