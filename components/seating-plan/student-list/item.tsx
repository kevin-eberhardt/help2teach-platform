import { Student } from "@/lib/supabase/types/additional.types";
import { SeatingPlanElementType } from "@/lib/types/seating-plan";
import { useDraggable } from "@dnd-kit/core/dist";
import { ZoomTransform } from "d3-zoom";

export default function StudentListItem({
  student,
  transform: canvasTransform,
}: {
  student: Student;
  transform?: ZoomTransform;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: student.id,
    data: {
      ...student,
      type: SeatingPlanElementType.Student,
    },
  });
  return (
    <div
      className="border border-accent rounded-md p-2"
      ref={setNodeRef}
      style={{
        transformOrigin: "top left",
        ...(transform
          ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0px) scale(${canvasTransform?.k})`,
            }
          : {
              transform: `scale(${canvasTransform?.k})`,
            }),
      }}
      {...listeners}
      {...attributes}
      onPointerDown={(e) => {
        listeners?.onPointerDown?.(e);
        e.preventDefault();
      }}
    >
      <p>{student.name}</p>
    </div>
  );
}
