import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { ZoomTransform } from "d3-zoom";
import { useEffect, useState } from "react";

export default function EmptySeat({
  id,
  canvasTransform,
}: {
  id: UniqueIdentifier;
  canvasTransform: ZoomTransform;
}) {
  const { setNodeRef, active, over, isOver } = useDroppable({ id: id });
  const [validIsOver, setValidIsOver] = useState(false);

  useEffect(() => {
    if (!isOver) {
      setValidIsOver(false);
    }
    if (isOver && active && over) {
      if (id.toString().includes(active.id.toString())) {
        setValidIsOver(false);
      } else {
        setValidIsOver(true);
      }
    }
  }, [isOver, over]);

  return (
    <div
      className={`h-12 w-24 flex items-center justify-center rounded-md ${
        validIsOver ? "bg-primary text-primary-foreground" : "bg-accent"
      }`}
      ref={setNodeRef}
    ></div>
  );
}
