import { Button } from "@/components/ui/button";
import ToolbarItem from "./item";
import { RectangleHorizontal, TextCursorInput } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Toolbar() {
  const t = useTranslations("seating-plan");
  return (
    <div className="invisible md:visible absolute bottom-3 left-1/2 -translate-x-1/2 h-auto bg-sidebar border border-accent rounded-none p-4 z-10 flex gap-4 shadow-sm w-auto min-w-52">
      <ToolbarItem
        type={"twoSeatsDesk"}
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
        type={"oneSeatDesk"}
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
      <ToolbarItem type={"text"} tooltipContent={t("toolbar.text-tooltip")}>
        <Button
          variant="outline"
          className="hover:bg-white shadow-md h-14 [&_svg]:size-14"
          size="lg"
        >
          <TextCursorInput className="size-10 fill-accent text-accent" />
        </Button>
      </ToolbarItem>
    </div>
  );
}
