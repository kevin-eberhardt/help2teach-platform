import { StudentSeatingPlanElementType } from "@/lib/types/seating-plan";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ZoomTransform } from "d3-zoom";

export default function Seat({
  id,
  element,
  canvasTransform,
}: {
  id: UniqueIdentifier;
  element: StudentSeatingPlanElementType;
  canvasTransform: ZoomTransform;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id, data: element });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      style={{
        ...style,
      }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onPointerDown={(e) => {
        listeners?.onPointerDown?.(e);
        e.preventDefault();
      }}
      className="flex justify-center items-center gap-4"
    >
      <div className="bg-primary text-primary-foreground h-12 w-24 flex items-center justify-center rounded-md">
        {element.data.name}
      </div>
    </div>
  );
}
