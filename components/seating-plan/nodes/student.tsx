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
    <GenericNode key={id} id={id} data={data} selected={selected}>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`${
          type === "student-list" && isDragging ? "opacity-40" : "opacity-100"
        }`}
      >
        <div className="text-center">{data.name}</div>
      </div>
    </GenericNode>
  );
}
