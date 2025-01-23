import { useDroppable } from "@dnd-kit/core/dist";
import { useEffect } from "react";

export default function Seat({ id }: { id: string }) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });
  useEffect(() => {
    console.log(isOver);
  }, [isOver]);
  return (
    <div
      className={`h-12 w-20 rounded-md ${isOver ? "bg-primary" : "bg-accent"}`}
      ref={setNodeRef}
    />
  );
}
