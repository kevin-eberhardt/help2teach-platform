"use client";
import {
  SeatingPlan as SeatingPlanType,
  Student,
} from "@/lib/supabase/types/additional.types";
import { useState } from "react";
import { ZoomTransform, zoomIdentity } from "d3-zoom";
import { Coordinates, DragEndEvent, Translate } from "@dnd-kit/core/dist/types";
import SeatingPlanCanvas from "./canvas";
import { ClientRect, DndContext, DragOverlay, Over } from "@dnd-kit/core/dist";
import {
  SeatingPlanElement,
  SeatingPlanElementType,
} from "@/lib/types/seating-plan";
import Desk from "./elements/desk";
import Toolbar from "./toolbar";
import StudentList from "./student-list";

const calculateCanvasPosition = (
  initialRect: ClientRect,
  over: Over,
  delta: Translate,
  transform: ZoomTransform
): Coordinates => ({
  x:
    (initialRect.left + delta.x - (over?.rect?.left ?? 0) - transform.x) /
    transform.k,
  y:
    (initialRect.top + delta.y - (over?.rect?.top ?? 0) - transform.y) /
    transform.k,
});

export default function SeatingPlan({
  students,
  seatingPlan,
}: {
  students: Student[];
  seatingPlan: SeatingPlanType;
}) {
  const [elements, setElements] = useState<SeatingPlanElement[]>([
    {
      id: "Hello",
      coordinates: { x: 0, y: 0 },
      text: "Hello",
      type: SeatingPlanElementType.TwoSeatsDesk,
      students: [students[0], students[1]],
    },
  ]);
  // store the current transform from d3
  const [transform, setTransform] = useState(zoomIdentity);
  const [draggedElementType, setDraggedElementType] =
    useState<SeatingPlanElementType | null>(null);
  const addDraggedTrayCardToCanvas = ({
    over,
    active,
    delta,
  }: DragEndEvent) => {
    if (over?.id !== "canvas") return;
    if (!active.rect.current.initial) return;
    if (!draggedElementType) return;

    setElements([
      ...elements,
      {
        id: active.id.toString(),
        coordinates: calculateCanvasPosition(
          active.rect.current.initial,
          over,
          delta,
          transform
        ),
        text: active.id.toString(),
        type: draggedElementType,
      },
    ]);
    setDraggedElementType(null);
  };

  return (
    <DndContext
      onDragStart={({ active }) => {
        console.log(active);
        setDraggedElementType(active.data.current?.type);
      }}
      onDragEnd={addDraggedTrayCardToCanvas}
    >
      <Toolbar />
      <SeatingPlanCanvas
        elements={elements}
        setElements={setElements}
        transform={transform}
        setTransform={setTransform}
        students={students}
      />
      <DragOverlay>
        <div
          style={{
            transformOrigin: "top left",
            transform: `scale(${transform.k})`,
          }}
        >
          {draggedElementType === SeatingPlanElementType.TwoSeatsDesk ? (
            <Desk className="w-48">
              <div className="h-12 w-20 bg-accent rounded-md" />
              <div className="h-12 w-20 bg-accent rounded-md" />
            </Desk>
          ) : draggedElementType === SeatingPlanElementType.OneSeatDesk ? (
            <Desk className="w-24">
              <div className="h-12 w-20 bg-accent rounded-md" />
            </Desk>
          ) : (
            <div>ID</div>
          )}
        </div>
      </DragOverlay>
    </DndContext>
  );
}
