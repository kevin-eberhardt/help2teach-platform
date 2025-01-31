import { OneSeatDeskSeatingPlanElementType } from "@/lib/types/seating-plan";
import { useDraggable } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { ZoomTransform } from "d3-zoom";
import Seat from "@/components/seating-plan/elements/seat";
import SeatingPlanElement from "./element";

export default function OneSeatDesk({
  element,
  canvasTransform,
}: {
  element: OneSeatDeskSeatingPlanElementType;
  canvasTransform: ZoomTransform;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: element.id,
      data: element,
    });

  return (
    <SeatingPlanElement
      isActive={isDragging}
      element={element}
      style={{
        position: "absolute",
        top: `${element.coordinates.y * canvasTransform.k}px`,
        left: `${element.coordinates.x * canvasTransform.k}px`,
        transformOrigin: "top left",
        ...(transform
          ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0px) scale(${canvasTransform.k})`,
            }
          : {
              transform: `scale(${canvasTransform.k})`,
            }),
      }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="overflow-clip"
      onPointerDown={(e) => {
        listeners?.onPointerDown?.(e);
        e.preventDefault();
      }}
    >
      <SortableContext
        id={element.id.toString()}
        items={[element.student]}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex justify-center items-center gap-4">
          <Seat
            key={element.student.id}
            id={element.student.id}
            element={element.student}
            canvasTransform={canvasTransform}
            isEmpty={element.student.id.toString().includes("empty")}
          />
        </div>
      </SortableContext>
    </SeatingPlanElement>
  );
}
