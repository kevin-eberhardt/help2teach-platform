"use client";
import dynamic from "next/dynamic";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
import animationData from "@/assets/media/teacher-hero.json";
import { useTranslations } from "next-intl";

export default function HomeHero() {
  const t = useTranslations("homepage");
  return (
    <section className="w-full bg-[rgb(249,249,249)]">
      <div className="max-w-7xl flex flex-col md:flex-row gap-4 mx-auto">
        <DynamicLottie animationData={animationData} />
        <div className="px-4 xl:px-0 pt-24 lg:pt-32 pb-24">
          <h1 className="font-semibold text-4xl xl:text-6xl">
            <span className="text-primary">Help2Teach:</span>
            <br />
            {t("heading")}
          </h1>
          <div className="max-w-4xl">
            <p className="mt-5 text-neutral-500 text-lg">{t("text")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
