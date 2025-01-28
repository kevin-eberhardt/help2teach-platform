import { Button } from "@/components/ui/button";
import ToolbarItem from "./item";
import { SeatingPlanElementTypes } from "@/lib/types/seating-plan";
import { RectangleHorizontal } from "lucide-react";

export default function Toolbar() {
  return (
    <div className="absolute bottom-16 left-1/2 h-auto bg-white border border-accent rounded-md p-4 z-10">
      <ToolbarItem type={SeatingPlanElementTypes.TwoSeatsDesk}>
        <Button variant="outline">
          <RectangleHorizontal className="size-8" />
          <RectangleHorizontal className="size-8" />
        </Button>
      </ToolbarItem>
    </div>
  );
}
