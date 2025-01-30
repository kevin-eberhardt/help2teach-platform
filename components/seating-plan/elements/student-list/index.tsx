import {
  SeatingPlanElementTypes,
  StudentListSeatingPlanElementType,
  StudentSeatingPlanElementType,
} from "@/lib/types/seating-plan";
import { useDraggable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ZoomTransform } from "d3-zoom";
import Seat from "@/components/seating-plan/elements/seat";
import SeatingPlanElement from "../element";
import StudentListItem from "./item";

export default function StudentList({
  element,
  canvasTransform,
}: {
  element: StudentListSeatingPlanElementType;
  canvasTransform: ZoomTransform;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
    data: element,
  });

  return (
    <SeatingPlanElement
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
      className="bg-accent top-1/2 left-1/4"
      onPointerDown={(e) => {
        listeners?.onPointerDown?.(e);
        e.preventDefault();
      }}
    >
      <SortableContext
        id={element.id.toString()}
        items={element.students}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col justify-center items-center gap-4">
          {element.students.map((item: StudentSeatingPlanElementType) => {
            return (
              <StudentListItem
                key={item.id}
                id={item.id}
                element={item}
                canvasTransform={canvasTransform}
              />
            );
          })}
        </div>
      </SortableContext>
    </SeatingPlanElement>
  );
}
