import { SeatingPlanElementTypes } from "@/lib/types/seating-plan";
import { useDraggable } from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";

export default function ToolbarItem({
  type,
  children,
}: {
  type: SeatingPlanElementTypes;
  children?: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: uuidv4(),
    data: { type },
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
