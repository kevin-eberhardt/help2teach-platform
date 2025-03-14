import CallToActionSection from "@/components/ui/homepage-sections/call-to-action";
import DescriptionSection from "@/components/ui/homepage-sections/description";
import FeaturesSection from "@/components/ui/homepage-sections/features";
import HeroSection from "@/components/ui/homepage-sections/hero";
import VideoSection from "@/components/ui/homepage-sections/video";
import { getUser } from "@/lib/supabase/queries";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("homepage.metadata");
  return {
    title: t("title"),
    description: t("description"),
  };
}
export default async function HomePage() {
  const user = await getUser();
  return (
    <div className="flex-1 w-full flex flex-col gap-12 items-center">
      <HeroSection user={user} />
      <FeaturesSection />
      <VideoSection />
      <DescriptionSection />
      <CallToActionSection user={user} />
    </div>
  );
}
