import { Seat as SeatProps } from "@/lib/types/seating-plan";
import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Seat({ id, student }: SeatProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`h-12 w-20 rounded-md ${
        isOver ? "bg-primary" : "bg-accent"
      } flex items-center justify-center`}
    >
      {student && <p>{student.name}</p>}
    </div>
  );
}
