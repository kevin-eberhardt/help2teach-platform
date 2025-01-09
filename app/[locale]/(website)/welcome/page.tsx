import Link from "next/link";
import WelcomeAnimation from "./animation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function WelcomePage() {
  const t = useTranslations("welcome-page");
  return (
    <div className="w-full md:max-w-lg mx-auto mt-6 space-y-4">
      <WelcomeAnimation />
      <div className="space-y-4">
        <h1 className="text-4xl">{t("heading")}</h1>
        <p>{t("text")}</p>
      </div>
      <div>
        <Link href="/login">
          <Button>{t("login-button")}</Button>
        </Link>
      </div>
    </div>
  );
}
