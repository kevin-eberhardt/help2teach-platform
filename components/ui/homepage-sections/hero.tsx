"use client";
import dynamic from "next/dynamic";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
import animationData from "@/assets/media/teacher-hero.json";
import { useTranslations } from "next-intl";
import { Button } from "../button";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "@/lib/i18n/routing";
import { User } from "@/lib/supabase/types/additional.types";

export default function HeroSection({ user }: { user: User }) {
  const t = useTranslations("homepage");

  function scrollSmoothly() {
    document?.querySelector("#tutorial-video")?.scrollIntoView({
      behavior: "smooth",
    });
  }
  return (
    <>
      <div className="w-full bg-[rgb(249,249,249)]">
        <section className="mx-auto container px-4 py-12 md:py-24 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold sm:text-5xl xl:text-6xl/none">
                  {t("hero.heading")}
                </h1>
                <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                  {t("hero.sub-heading")}
                </p>
              </div>
              <div className="flex flex-col gap-3 md:flex-row">
                <Link
                  href={`${user ? "/app" : "/register"}`}
                  className="w-full md:w-auto"
                >
                  <Button size="lg" className="gap-2 w-full">
                    {t("hero.start-button")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2"
                  onClick={scrollSmoothly}
                >
                  {t("hero.demo-button")}
                  <PlayCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <DynamicLottie animationData={animationData} />
          </div>
        </section>
      </div>
    </>
  );
}
