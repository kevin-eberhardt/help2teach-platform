import { StudentSeatingPlanElementType } from "@/lib/types/seating-plan";
import { useDraggable } from "@dnd-kit/core";
import { ZoomTransform } from "d3-zoom";
import SeatingPlanElement from "@/components/seating-plan/elements/element";

export default function Student({
  element,
  canvasTransform,
}: {
  element: StudentSeatingPlanElementType;
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
      className="h-12 w-24 truncate flex items-center justify-center"
      onPointerDown={(e) => {
        listeners?.onPointerDown?.(e);
        e.preventDefault();
      }}
    >
      {element.data.name}
    </SeatingPlanElement>
  );
}
