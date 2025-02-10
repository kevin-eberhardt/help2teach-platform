import { Undo } from "lucide-react";
import { useTranslations } from "next-intl";
export default function VideoSection() {
  const t = useTranslations("homepage");
  return (
    <section id="tutorial-video" className="mx-auto container">
      <div className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl font-bold">{t("tutorial-video.heading")}</h2>
        <div className="flex justify-center items-center gap-2 max-w-lg ">
          <Undo className="-rotate-45" />
          <p className="text-base">{t("tutorial-video.text")}</p>
        </div>
        <video autoPlay loop muted className="rounded-md w-full aspect-video ">
          <source src={"/seating-plan_video.mp4"} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
