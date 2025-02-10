import DescriptionSection from "@/components/ui/homepage-sections/description";
import FeaturesSection from "@/components/ui/homepage-sections/features";
import HeroSection from "@/components/ui/homepage-sections/hero";
import VideoSection from "@/components/ui/homepage-sections/video";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("homepage.metadata");
  return {
    title: t("title"),
    description: t("description"),
  };
}
export default function HomePage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12 items-center">
      <HeroSection />
      <FeaturesSection />
      <VideoSection />
      <DescriptionSection />
    </div>
  );
}
