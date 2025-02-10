import { Student } from "@/lib/supabase/types/additional.types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { STUDENT_SETTINGS } from "../utils";

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
    over,
    active,
  } = useSortable({
    id: id,
    data: { ...element, type: "student" },
    disabled: element.id.toString().includes("empty"),
  });
  const [isOverValid, setIsOverValid] = useState(false);

  useEffect(() => {
    if (over && over.id === id && active) {
      if (
        active.data.current?.type === "student" ||
        active.data.current?.type === "student-list"
      ) {
        setIsOverValid(true);
      } else {
        setIsOverValid(false);
      }
    } else {
      setIsOverValid(false);
    }
  }, [isOver]);

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
            isOverValid ? "bg-primary text-primary-foreground" : "bg-accent"
          } flex items-center justify-center rounded-md`}
          ref={setDroppableNodeRef}
          style={{
            ...style,
            width: STUDENT_SETTINGS.width,
            height: STUDENT_SETTINGS.height,
          }}
        ></div>
      ) : (
        <div
          className={`${
            isOverValid ? "bg-primary/40 text-primary-foreground" : "bg-accent"
          } flex items-center justify-center rounded-md`}
          style={{
            ...style,
            width: STUDENT_SETTINGS.width,
            height: STUDENT_SETTINGS.height,
          }}
        >
          {element.name}
        </div>
      )}
    </div>
  );
}
