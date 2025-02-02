import { Button } from "@/components/ui/button";
import ToolbarItem from "./item";
import { SeatingPlanElementTypes } from "@/lib/types/seating-plan";
import { RectangleHorizontal, TextCursorInput } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Toolbar() {
  const t = useTranslations("seating-plan");
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 h-auto bg-white border border-accent rounded-md p-4 z-10 flex gap-4 shadow-md w-auto min-w-52">
      <ToolbarItem
        type={SeatingPlanElementTypes.TwoSeatsDesk}
        tooltipContent={t("toolbar.two-seats-desk-tooltip")}
      >
        <Button
          variant="outline"
          className="hover:bg-white shadow-md h-14 [&_svg]:size-14"
          size="lg"
        >
          <RectangleHorizontal className="size-10 fill-accent text-accent" />
          <RectangleHorizontal className="size-10 fill-accent text-accent" />
        </Button>
      </ToolbarItem>
      <ToolbarItem
        type={SeatingPlanElementTypes.OneSeatDesk}
        tooltipContent={t("toolbar.one-seat-desk-tooltip")}
      >
        <Button
          variant="outline"
          className="hover:bg-white shadow-md h-14 [&_svg]:size-14"
          size="lg"
        >
          <RectangleHorizontal className="size-10 fill-accent text-accent" />
        </Button>
      </ToolbarItem>
      <ToolbarItem
        type={SeatingPlanElementTypes.CustomText}
        tooltipContent={t("toolbar.custom-tooltip")}
      >
        <Button
          variant="outline"
          className="hover:bg-white shadow-md h-14 [&_svg]:size-10"
          size="lg"
        >
          <TextCursorInput className="size-8 fill-accent text-accent" />
        </Button>
      </ToolbarItem>
    </div>
  );
}
