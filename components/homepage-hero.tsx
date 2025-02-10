"use client";
import dynamic from "next/dynamic";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
import animationData from "@/assets/media/teacher-hero.json";
import teachingData from "@/assets/media/teaching.json";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import {
  ArrowRight,
  Combine,
  Globe2,
  LineChart,
  MessageSquare,
  PlayCircle,
  Replace,
  Sparkle,
  Undo,
} from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Link } from "@/lib/i18n/routing";

export default function HomeHero() {
  const t = useTranslations("homepage");
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
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg" className="gap-2">
                    Jetzt starten
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Link href="#tutorial-video">
                  <Button variant="outline" size="lg" className="gap-2">
                    Sitzplan-Demo ansehen
                    <PlayCircle className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <DynamicLottie animationData={animationData} />
          </div>
        </section>
      </div>
      <section className="mx-auto max-w-screen-2xl p-4 flex items-center gap-4">
        <DynamicLottie animationData={teachingData} />
        <div>
          <h2 className="text-3xl font-bold mb-4">{t("info.heading")}</h2>
          <div className="text-lg text-muted-foreground">
            {t.rich("info.text", {
              b: (chunks) => <p>{chunks}</p>,
              s: (chunks) => (
                <p className="mt-1 font-bold text-black">{chunks}</p>
              ),
            })}
          </div>
        </div>
      </section>
      <section id="tutorial-video">
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-2xl font-bold">Im Handumdrehen einsatzbereit</h2>
          <div className="flex justify-center items-center gap-2 max-w-lg ">
            <Undo className="-rotate-45" />
            <p className="text-lg">
              See how to go from zero to seating plan in 2 minutes
            </p>
          </div>
          <video autoPlay loop muted className="w-2/3">
            <source
              src="https://cdn.pixabay.com/video/2021/09/11/88207-602915574_large.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </section>
      <section className="flex flex-col items-center gap-8 py-12">
        <div className="mx-auto grid gap-8 sm:max-w-3xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Combine className="h-10 w-10 text-primary" />
              <CardTitle>Eigene Anordnung</CardTitle>
              <CardDescription>
                Du kannst Einzeltische und Zweiertische ganz nach Bedarf in den
                Plan einfügen. Die Schüler*innen lassen sich mit einem Klick auf
                die Plätze setzen und bei Bedarf unkompliziert verschieben.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Replace className="h-10 w-10 text-primary" />
              <CardTitle>Eigene Elemente</CardTitle>
              <CardDescription>
                Um den Plan realistischer zu gestalten, kannst Du
                benutzerdefinierte Elemente, wie z.B. Tafel oder den Pult mit in
                den Sitzplan aufnehmen.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Sparkle className="h-10 w-10 text-primary" />
              <CardTitle>Individuell</CardTitle>
              <CardDescription>
                Erstelle für unterschiedliche Anlässe oder Unterrichtsphasen
                verschiedene Sitzpläne und speichere diese für eine einfache
                Verwaltung.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </>
  );
}
