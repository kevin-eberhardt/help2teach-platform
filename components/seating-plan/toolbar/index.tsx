import { Button } from "@/components/ui/button";
import ToolbarItem from "./item";
import { SeatingPlanElementTypes } from "@/lib/types/seating-plan";
import { RectangleHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Toolbar() {
  const t = useTranslations("seating-plan");
  return (
    <div className="absolute bottom-10 left-[calc(50%-6.5rem)] h-auto bg-white border border-accent rounded-md p-4 z-10 flex gap-4 shadow-md w-52">
      <ToolbarItem
        type={SeatingPlanElementTypes.TwoSeatsDesk}
        tooltipContent={t("toolbar.two-seats-desk-tooltip")}
      >
        <Button variant="outline" className="hover:bg-white">
          <RectangleHorizontal className="size-10 fill-accent text-accent" />
          <RectangleHorizontal className="size-10 fill-accent text-accent" />
        </Button>
      </ToolbarItem>
      <ToolbarItem
        type={SeatingPlanElementTypes.OneSeatDesk}
        tooltipContent={t("toolbar.one-seat-desk-tooltip")}
      >
        <Button variant="outline" className="hover:bg-white">
          <RectangleHorizontal className="size-10 fill-accent text-accent" />
        </Button>
      </ToolbarItem>
    </div>
  );
}
