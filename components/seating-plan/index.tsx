"use client";
import {
  SeatingPlanProps,
  Student as StudentProps,
} from "@/lib/supabase/types/additional.types";
import { SeatingPlanElement } from "@/lib/types/seating-plan";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";

import { useState } from "react";
import { calculateCanvasPosition } from "./utils";
import { zoomIdentity } from "d3-zoom";
import SeatingPlanCanvas from "./canvas";

export default function SeatingPlan({
  students: initStudents,
  seatingPlan,
}: {
  students: StudentProps[];
  seatingPlan: SeatingPlanProps[];
}) {
  const [transform, setTransform] = useState(zoomIdentity);

  const [elements, setElements] = useState<SeatingPlanElement[]>([
    {
      coordinates: { x: 0, y: 0 },
      id: "student-1",
      data: {
        text: "Test",
      },
      type: "student",
    },
    {
      coordinates: { x: 0, y: 10 },
      id: "student-2",
      data: {
        text: "Test",
      },
      type: "student",
    },
    {
      coordinates: { x: 100, y: 0 },
      id: 3,
      data: {
        text: "Table",
      },
      type: "table",
      students: [
        {
          id: "student-3",
          data: {
            text: "Test",
          },
          type: "student",
        },
        {
          id: "student-4",
          data: {
            text: "Test",
          },
          type: "student",
        },
      ],
    },
    {
      coordinates: { x: 400, y: 0 },
      id: 4,
      data: {
        text: "Table",
      },
      type: "table",
      students: [
        {
          id: "student-5",
          data: {
            text: "Test",
          },
          type: "student",
        },
        {
          id: "student-6",
          data: {
            text: "Test",
          },
          type: "student",
        },
      ],
    },
  ]);

  function addToolbarItem({ over, active, delta }: DragEndEvent) {
    if (over?.id !== "canvas") return;
    if (!active.rect.current.initial) return;

    setElements([
      {
        id: active.id.toString(),
        coordinates: calculateCanvasPosition(
          active.rect.current.initial,
          over,
          delta,
          transform
        ),
        type: "table",
        students: [],
      },
    ]);
  }
  return (
    <DndContext onDragEnd={addToolbarItem}>
      <SeatingPlanCanvas
        elements={elements}
        setElements={setElements}
        transform={transform}
        setTransform={setTransform}
      />
      <DragOverlay>
        <div
          style={{
            transformOrigin: "top left",
            transform: `scale(${transform.k})`,
          }}
        >
          Test
        </div>
      </DragOverlay>
    </DndContext>
  );
}
