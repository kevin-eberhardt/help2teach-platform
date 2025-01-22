import { Button } from "@/components/ui/button";
import ToolbarItem from "./item";
import { RectangleHorizontal } from "lucide-react";
import { SeatingPlanElementType } from "@/lib/types/seating-plan";

export default function Toolbar() {
  return (
    <div className="absolute bottom-4 left-1/2 h-16 shadow-md rounded-md flex gap-4 justify-center items-center z-10 px-4">
      <ToolbarItem type={SeatingPlanElementType.TwoSeatsDesk}>
        <Button variant="outline">
          <RectangleHorizontal className="size-8" />
          <RectangleHorizontal className="size-8" />
        </Button>
      </ToolbarItem>
      <ToolbarItem type={SeatingPlanElementType.OneSeatDesk}>
        <Button variant="outline">
          <RectangleHorizontal className="size-8" />
        </Button>
      </ToolbarItem>
    </div>
  );
}
