import { StudentSeatingPlanElementType } from "@/lib/types/seating-plan";
import { useDraggable } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { ZoomTransform } from "d3-zoom";
import Seat from "@/components/seating-plan/elements/seat";
import EmptySeat from "./empty-seat";

export default function TwoSeatsDesk({
  element,
  canvasTransform,
}: {
  element: any;
  canvasTransform: ZoomTransform;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
    data: element,
  });

  return (
    <div
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
      className="border border-gray-200 rounded-md p-4"
      onPointerDown={(e) => {
        listeners?.onPointerDown?.(e);
        e.preventDefault();
      }}
    >
      Table
      <SortableContext
        id={element.id}
        items={element.students}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex justify-center items-center gap-4">
          {element.students.length === 2 ? (
            element.students.map((item: StudentSeatingPlanElementType) => (
              <Seat
                key={item.id}
                id={item.id}
                element={item}
                canvasTransform={canvasTransform}
              />
            ))
          ) : element.students.length === 1 ? (
            <>
              <Seat
                key={element.students[0].id}
                id={element.students[0]}
                element={element.students[0]}
                canvasTransform={canvasTransform}
              />
              <EmptySeat
                id={`${element.id}-right`}
                canvasTransform={canvasTransform}
              />
            </>
          ) : (
            <>
              <EmptySeat
                id={`${element.id}-left`}
                canvasTransform={canvasTransform}
              />
              <EmptySeat
                id={`${element.id}-right`}
                canvasTransform={canvasTransform}
              />
            </>
          )}
        </div>
      </SortableContext>
    </div>
  );
}
