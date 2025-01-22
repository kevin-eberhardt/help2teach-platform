import { useDraggable } from "@dnd-kit/core/dist";
import { ZoomTransform } from "d3-zoom";
import Table from "./desk";
import { TwoSeatsDeskElement } from "@/lib/types/seating-plan";

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

  return (
    <Table
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
      <div className="h-12 w-20 bg-accent rounded-md" />
      <div className="h-12 w-20 bg-accent rounded-md" />
    </Table>
  );
}
