import {
  StudentNodeProps,
  StudentSidebarProps,
} from "@/lib/types/seating-plan";
import GenericNode from "./generic";
import { useDraggable } from "@dnd-kit/core";

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
        no-drag ${isDragging ? "opacity-0" : "opacity-100"}
        ${
          type === "student-list" && isDragging ? "opacity-40" : "opacity-100"
        }`}
    >
      <GenericNode key={id} id={id} data={data} selected={selected}>
        {data.name}
      </GenericNode>
    </div>
  );
}
