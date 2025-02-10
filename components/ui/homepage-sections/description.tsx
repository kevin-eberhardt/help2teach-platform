"use client";
import dynamic from "next/dynamic";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
import animationData from "@/assets/media/teaching.json";
import { useTranslations } from "next-intl";

export default function DescriptionSection() {
  const t = useTranslations("homepage");

  return (
    <section className="mx-auto container p-4 flex flex-col-reverse md:flex-row items-center gap-4">
      <DynamicLottie animationData={animationData} />
      <div>
        <h2 className="text-xl md:text-3xl font-bold mb-4">
          {t("info.heading")}
        </h2>
        <div className="text-base text-muted-foreground">
          {t.rich("info.text", {
            b: (chunks) => <p>{chunks}</p>,
            s: (chunks) => (
              <span className="font-bold text-black">{chunks}</span>
            ),
          })}
        </div>
      </div>
    </section>
  );
}
