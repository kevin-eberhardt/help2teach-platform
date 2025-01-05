import HomeHero from "@/components/layout/homepage/hero";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("homepage");
  return (
    <div className="flex-1 w-full flex flex-col gap-12 items-center">
      <HomeHero />
    </div>
  );
}
