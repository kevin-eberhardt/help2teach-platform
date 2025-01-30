"use client";

import { Redo2, Undo2 } from "lucide-react";
import { Button } from "../../ui/button";
import { useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import ZoomButton from "./zoom-button";
import { ZoomTransform } from "d3-zoom";

export default function Controls({
  zoom,
  setZoom,
  undo,
  redo,
  isUndoDisabled,
  isRedoDisabled,
}: {
  zoom: ZoomTransform;
  setZoom: (zoom: ZoomTransform) => void;
  undo: () => void;
  redo: () => void;
  isUndoDisabled: boolean;
  isRedoDisabled: boolean;
}) {
  const t = useTranslations("seating-plan");
  return (
    <div className="absolute bottom-10 left-4 flex gap-4 z-10">
      <TooltipProvider>
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <ZoomButton zoom={zoom} setZoom={setZoom} />
          </TooltipTrigger>
          <TooltipContent>{t("undo")}</TooltipContent>
        </Tooltip> */}
        <div className="space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                onClick={undo}
                variant="outline"
                disabled={isUndoDisabled}
              >
                <Undo2 className="size-10" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("undo")}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                onClick={redo}
                variant="outline"
                disabled={isRedoDisabled}
              >
                <Redo2 className="size-10" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("redo")}</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
