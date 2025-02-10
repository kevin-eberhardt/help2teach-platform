import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Combine, Replace, Sparkle } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="flex flex-col items-center gap-8 py-12 px-4">
      <div className="mx-auto grid gap-8 sm:max-w-3xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
        <Card>
          <CardHeader>
            <Combine className="size-10 text-primary" />
            <CardTitle className="text-lg">Eigene Anordnung</CardTitle>
            <CardDescription className="text-base">
              Du kannst Einzeltische und Zweiertische ganz nach Bedarf in den
              Plan einfügen. Die Schüler*innen lassen sich mit einem Klick auf
              die Plätze setzen und bei Bedarf unkompliziert verschieben.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Replace className="size-10 text-primary" />
            <CardTitle className="text-lg">Eigene Elemente</CardTitle>
            <CardDescription className="text-base">
              Um den Plan realistischer zu gestalten, kannst Du
              benutzerdefinierte Elemente, wie z.B. Tafel oder den Pult mit in
              den Sitzplan aufnehmen.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Sparkle className="size-10 text-primary" />
            <CardTitle className="text-lg">Individuell</CardTitle>
            <CardDescription className="text-base">
              Erstelle für unterschiedliche Anlässe oder Unterrichtsphasen
              verschiedene Sitzpläne und speichere diese für eine einfache
              Verwaltung.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}
