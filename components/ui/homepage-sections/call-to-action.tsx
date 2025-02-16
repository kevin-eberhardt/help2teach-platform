import { MoveRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";

export default async function CallToActionSection() {
  const t = await getTranslations("homepage.call-to-action");
  return (
    <div className="w-full bg-sidebar">
      <div className="container mx-auto">
        <div className="flex flex-col text-center rounded-md p-4 lg:p-14 gap-8 items-center">
          <div>
            <Badge>{t("badge")}</Badge>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
              {t("heading")}
            </h3>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl">
              {t("text")}
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Link href="/login">
              <Button className="gap-4">
                {t("badge")} <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
