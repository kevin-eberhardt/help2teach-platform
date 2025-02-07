import {
  StudentNodeProps,
  StudentSidebarProps,
} from "@/lib/types/seating-plan";
import GenericNode from "./generic";
import { useDraggable } from "@dnd-kit/core";
import { STUDENT_SETTINGS } from "../utils";

export default function StudentNode({
  id,
  data,
  selected,
  type,
}: StudentNodeProps | StudentSidebarProps) {
  const { setNodeRef, attributes, listeners, isDragging } = useDraggable({
    id: data.id,
    data: {
      ...data,
      type: type,
    },
  });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`
        no-drag ${
          isDragging
            ? type === "student-list"
              ? "opacity-40"
              : "opacity-0"
            : "opacity-100"
        }`}
    >
      <GenericNode
        key={id}
        id={id}
        data={data}
        selected={selected}
        style={{
          width: STUDENT_SETTINGS.width,
          height: STUDENT_SETTINGS.height,
        }}
      >
        <p className="text-center">{data.name}</p>
      </GenericNode>
    </div>
  );
}
