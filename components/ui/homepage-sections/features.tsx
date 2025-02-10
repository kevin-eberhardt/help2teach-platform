import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Combine, Replace, Sparkle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FeaturesSection() {
  const t = useTranslations("homepage.features");
  return (
    <section className="flex flex-col items-center gap-8 py-12 px-4">
      <div className="mx-auto grid gap-8 sm:max-w-3xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
        <Card>
          <CardHeader>
            <Combine className="size-10 text-primary" />
            <CardTitle className="text-lg">{t("feature-1.heading")}</CardTitle>
            <CardDescription className="text-base">
              {t("feature-1.description")}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Replace className="size-10 text-primary" />
            <CardTitle className="text-lg">{t("feature-2.heading")}</CardTitle>
            <CardDescription className="text-base">
              {t("feature-2.description")}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Sparkle className="size-10 text-primary" />
            <CardTitle className="text-lg">{t("feature-3.heading")}</CardTitle>
            <CardDescription className="text-base">
              {t("feature-3.description")}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}
