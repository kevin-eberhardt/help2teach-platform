import { Active, DragOverlay } from "@dnd-kit/core";
import { Viewport } from "@xyflow/react";
import GenericNode from "../nodes/generic";
import { RectangleHorizontal } from "lucide-react";
import { ONE_SEAT_DESK_SETTINGS, TWO_SEATS_DESK_SETTINGS } from "../utils";
import { Node } from "@/lib/types/seating-plan";

export default function ToolbarOverlay({
  viewPort,
  active,
}: {
  viewPort: Viewport | null;
  active: Active | null;
}) {
  const zoom = viewPort?.zoom || 1;
  const current = active?.data.current as Node;
  if (current) {
    if (current.type === "twoSeatsDesk") {
      return (
        <DragOverlay>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              scale: zoom,
              width: TWO_SEATS_DESK_SETTINGS.width,
              height: TWO_SEATS_DESK_SETTINGS.height,
            }}
          >
            <GenericNode
              className="flex items-center justify-center"
              id={current.id}
              data={current}
            >
              <RectangleHorizontal className="size-10 fill-accent text-accent" />
              <RectangleHorizontal className="size-10 fill-accent text-accent" />
            </GenericNode>
          </div>
        </DragOverlay>
      );
    }

    if (current.type === "oneSeatDesk") {
      return (
        <DragOverlay>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              scale: zoom,
              width: ONE_SEAT_DESK_SETTINGS.width,
              height: ONE_SEAT_DESK_SETTINGS.height,
            }}
          >
            <GenericNode
              className="flex items-center justify-center"
              id={current.id}
              data={current}
            >
              <RectangleHorizontal className="size-10 fill-accent text-accent" />
            </GenericNode>
          </div>
        </DragOverlay>
      );
    }
  }
}
