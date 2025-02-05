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
    active,
    over,
    setDroppableNodeRef,
    isDragging,
  } = useSortable({
    id: id,
    data: element,
    disabled: element.id.toString().includes("empty"),
  });

  const style = {
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
      }
    ),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      className="flex justify-center items-center gap-4"
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
    >
      {isEmpty ? (
        <div
          className={`${
            isOver ? "bg-primary text-primary-foreground" : "bg-accent"
          } h-12 w-24 flex items-center justify-center rounded-md`}
          ref={setDroppableNodeRef}
        ></div>
      ) : (
        <div
          className={`${
            isOver ? "bg-primary/40" : "bg-primary text-primary-foreground"
          } h-12 w-24 flex items-center justify-center rounded-md`}
        >
          <p>{element.name}</p>
        </div>
      )}
    </div>
  );
}
