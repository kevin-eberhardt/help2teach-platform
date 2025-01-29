import {
  SeatingPlanElementTypes,
  StudentSeatingPlanElementType,
} from "@/lib/types/seating-plan";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ZoomTransform } from "d3-zoom";
import { useEffect, useState } from "react";

export default function Seat({
  id,
  element,
  isEmpty = false,
}: {
  id: UniqueIdentifier;
  element: StudentSeatingPlanElementType;
  canvasTransform: ZoomTransform;
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
  });

  const [validIsOver, setValidIsOver] = useState(false);

  const style = {
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
      }
    ),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  useEffect(() => {
    if (!isOver) {
      setValidIsOver(false);
    }

    if (isOver && active && over) {
      if (
        over.id.toString().includes(active.id.toString()) ||
        active.data.current?.type === SeatingPlanElementTypes.TwoSeatsDesk ||
        active.data.current?.type === SeatingPlanElementTypes.OneSeatDesk
      ) {
        setValidIsOver(false);
      } else if (over.data.current && active.data.current) {
        if (
          active.data.current?.sortable &&
          active.data.current?.sortable.containerId ===
            over.data.current?.sortable.containerId
        ) {
          setValidIsOver(false);
        } else {
          setValidIsOver(true);
        }
      }
    }
  }, [isOver]);

  return (
    <div
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
      className="flex justify-center items-center gap-4"
    >
      {isEmpty ? (
        <div
          className={`${
            validIsOver ? "bg-primary text-primary-foreground" : "bg-accent"
          } h-12 w-24 flex items-center justify-center rounded-md`}
          ref={setDroppableNodeRef}
        ></div>
      ) : (
        <div
          className={`${
            validIsOver ? "bg-primary/40" : "bg-primary text-primary-foreground"
          } h-12 w-24 flex items-center justify-center rounded-md`}
        >
          {element.data.name}
        </div>
      )}
    </div>
  );
}
