import { Student } from "@/lib/supabase/types/additional.types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Seat({
  id,
  element,
  isEmpty = false,
}: {
  id: string;
  element: Student;
  isEmpty?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver,
    setDroppableNodeRef,
    isDragging,
  } = useSortable({
    id: id,
    data: { ...element, type: "student" },
    disabled: element.id.toString().includes("empty"),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="flex justify-center items-center gap-4"
    >
      {isEmpty ? (
        <div
          className={`${
            isOver ? "bg-primary text-primary-foreground" : "bg-accent"
          } h-12 w-24 flex items-center justify-center rounded-md`}
          ref={setDroppableNodeRef}
          style={{
            ...style,
          }}
        ></div>
      ) : (
        <div
          className={`${
            isOver ? "bg-primary/40 text-primary-foreground" : "bg-accent"
          } h-12 w-24 flex items-center justify-center rounded-md`}
          style={{
            ...style,
          }}
        >
          {element.name}
        </div>
      )}
    </div>
  );
}
