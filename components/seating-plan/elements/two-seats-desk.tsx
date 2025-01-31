import {
  StudentSeatingPlanElementType,
  TwoSeatsDeskSeatingPlanElementType,
} from "@/lib/types/seating-plan";
import { useDraggable } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { ZoomTransform } from "d3-zoom";
import Seat from "@/components/seating-plan/elements/seat";
import SeatingPlanElement from "./element";

export default function TwoSeatsDesk({
  element,
  canvasTransform,
}: {
  element: TwoSeatsDeskSeatingPlanElementType;
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
        items={element.students}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex justify-center items-center gap-4">
          {element.students.map((item: StudentSeatingPlanElementType) => {
            const isEmpty = item.id.toString().includes("empty");
            return (
              <Seat
                key={item.id}
                id={item.id}
                element={item}
                canvasTransform={canvasTransform}
                isEmpty={isEmpty}
              />
            );
          })}
        </div>
      </SortableContext>
    </SeatingPlanElement>
  );
}
