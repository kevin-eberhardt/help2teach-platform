"use client";
import {
  SeatingPlanProps,
  Student as StudentProps,
} from "@/lib/supabase/types/additional.types";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";

import { useState } from "react";
import { calculateCanvasPosition } from "./utils";
import { zoomIdentity } from "d3-zoom";
import SeatingPlanCanvas from "./canvas";
import {
  SeatingPlanElementType,
  SeatingPlanElementTypes,
  StudentSeatingPlanElementType,
} from "@/lib/types/seating-plan";
import Toolbar from "./toolbar";
import SeatingPlanElement from "./elements/element";

function makeStudentSeatingPlanElements(
  students: StudentProps[]
): StudentSeatingPlanElementType[] {
  return students.map((student) => ({
    id: student.id,
    type: SeatingPlanElementTypes.Student,
    data: student,
    coordinates: { x: 0, y: 0 }, // Add default coordinates
  }));
}

export default function SeatingPlan({
  students: initStudents,
  seatingPlan,
}: {
  students: StudentProps[];
  seatingPlan: SeatingPlanProps[];
}) {
  const [transform, setTransform] = useState(zoomIdentity);
  const students = makeStudentSeatingPlanElements(initStudents);
  const [draggedElementType, setDraggedElementType] =
    useState<SeatingPlanElementTypes | null>(null);
  const [elements, setElements] = useState<SeatingPlanElementType[]>([
    students[0],
    students[1],
    {
      coordinates: { x: 100, y: 0 },
      id: "table-1",
      data: {
        text: "Table 1",
      },
      type: SeatingPlanElementTypes.TwoSeatsDesk,
      students: [students[2], students[3]],
    },
    {
      coordinates: { x: 400, y: 0 },
      id: "table-2",
      data: {
        text: "Table 2",
      },
      type: SeatingPlanElementTypes.OneSeatDesk,
      students: [students[4]],
    },
  ]);

  function addToolbarItem({ over, active, delta }: DragEndEvent) {
    console.log(over, active, delta);
    if (over?.id !== "canvas") return;
    if (!active.rect.current.initial) return;
    if (draggedElementType === null) return;

    setElements([
      {
        id: active.id.toString(),
        coordinates: calculateCanvasPosition(
          active.rect.current.initial,
          over,
          delta,
          transform
        ),
        type: draggedElementType,
        students: [],
      },
    ]);
    setDraggedElementType(null);
  }
  return (
    <DndContext
      onDragEnd={addToolbarItem}
      onDragStart={({ active }) => {
        console.log(active);
        setDraggedElementType(active.data.current?.type);
      }}
    >
      <Toolbar />

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
          {draggedElementType === SeatingPlanElementTypes.TwoSeatsDesk && (
            <SeatingPlanElement className="w-48">
              <div className="h-12 w-20 bg-accent rounded-md" />
              <div className="h-12 w-20 bg-accent rounded-md" />
            </SeatingPlanElement>
          )}
        </div>
      </DragOverlay>
    </DndContext>
  );
}
