"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ImageDown } from "lucide-react";

export default function ExportImage() {
  async function onClick() {
    try {
      const canvas = document.getElementById("canvas");
      if (!canvas) return;

      // html2canvas in ein separates Import-Statement auslagern
      const html2canvas = (await import("html2canvas")).default;

      const image = await html2canvas(canvas);

      // Bild als Download anbieten
      const link = document.createElement("a");
      link.download = "seating-plan.png";
      link.href = image.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Fehler beim Exportieren des Bildes:", error);
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={onClick}>
            <ImageDown />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Export Image</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
