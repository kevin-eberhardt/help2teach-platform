import { useDraggable } from "@dnd-kit/core/dist";
import { ZoomTransform } from "d3-zoom";
import Desk from "./desk";
import { TwoSeatsDeskElement } from "@/lib/types/seating-plan";
import Seat from "./seat";

export default function TwoSeatsDesk({
  element,
  canvasTransform,
}: {
  element: TwoSeatsDeskElement;
  canvasTransform: ZoomTransform;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
  });

  const leftSeatedStudent =
    element.students && element.students.length > 0
      ? element.students[0]
      : null;
  const rightSeatedStudent =
    element.students && element.students.length > 1
      ? element.students[1]
      : null;

  return (
    <Desk
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
      onPointerDown={(e) => {
        listeners?.onPointerDown?.(e);
        e.preventDefault();
      }}
    >
      <Seat id={element.id + "-left"} student={leftSeatedStudent} />
      <Seat id={element.id + "-right"} student={rightSeatedStudent} />
    </Desk>
  );
}
