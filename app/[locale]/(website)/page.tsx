import DescriptionSection from "@/components/ui/homepage-sections/description";
import FeaturesSection from "@/components/ui/homepage-sections/features";
import HeroSection from "@/components/ui/homepage-sections/hero";
import VideoSection from "@/components/ui/homepage-sections/video";

export default function HomePage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12 items-center">
      <HeroSection />
      <DescriptionSection />
      <VideoSection />
      <FeaturesSection />
    </div>
  );
}
