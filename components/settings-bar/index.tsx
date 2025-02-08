import { SeatingPlan } from "@/lib/supabase/types/additional.types";
import NameInput from "./name-input";
import { Menu } from "./menu";
import LastSavedText from "./last-saved-text";
import { useEffect, useState } from "react";
import {
  getNodesBounds,
  getViewportForBounds,
  useReactFlow,
} from "@xyflow/react";
import { toPng } from "html-to-image";
import { updateSeatingPlanPreview } from "../seating-plan/canvas/actions";

export default function SettingsBar({
  seatingPlan: initialSeatingPlan,
  setSeatingPlan: setInitialSeatingPlan,
}: {
  seatingPlan: SeatingPlan;
  setSeatingPlan: (seatingPlan: SeatingPlan) => void;
}) {
  const [seatingPlan, setSeatingPlan] = useState(initialSeatingPlan);
  const { getNodes } = useReactFlow();

  function handleSave() {
    const imageWidth = 1024;
    const imageHeight = 768;
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.65,
      0.9,
      1
    );

    const element = document.querySelector(".react-flow__viewport");
    if (!element) return;

    toPng(element as HTMLElement, {
      backgroundColor: "rgba(255,255,255,0)",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth.toString(),
        height: imageHeight.toString(),
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(async (dataUrl) => {
      const { data, error } = await updateSeatingPlanPreview(
        seatingPlan.id,
        dataUrl
      );
      console.log(data, error);
    });
  }
  useEffect(() => {
    setSeatingPlan(initialSeatingPlan);
    handleSave();
  }, [initialSeatingPlan]);

  useEffect(() => {
    setInitialSeatingPlan(seatingPlan);
  }, [seatingPlan]);

  return (
    <div className="absolute top-3 left-4 w-auto z-10">
      <div className="flex items-center justify-between bg-background shadow-md gap-2 p-2">
        <div>
          <NameInput
            seatingPlanName={seatingPlan.name}
            seatingPlanId={seatingPlan.id}
          />
        </div>
        <Menu seatingPlan={seatingPlan} />
      </div>
      <LastSavedText lastSavedDate={seatingPlan.edited_at} />
    </div>
  );
}
