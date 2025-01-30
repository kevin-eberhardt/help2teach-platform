"use client";
import {
  SeatingPlanProps,
  Student as StudentProps,
} from "@/lib/supabase/types/additional.types";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";

import { useEffect, useState } from "react";
import { calculateCanvasPosition, generateEmptySeatsForTable } from "./utils";
import { zoomIdentity } from "d3-zoom";
import SeatingPlanCanvas from "./canvas";
import {
  OneSeatDeskSeatingPlanElementType,
  SeatingPlanElementType,
  SeatingPlanElementTypes,
  StudentListSeatingPlanElementType,
  TwoSeatsDeskSeatingPlanElementType,
} from "@/lib/types/seating-plan";
import Toolbar from "./toolbar";
import SeatingPlanElement from "./elements/element";
import LastEditState from "./last-edit-state";
import { useHistory } from "@/hooks/use-history";
import Controls from "./controls";

function makeStudentSeatingPlanElements(
  students: StudentProps[]
): StudentListSeatingPlanElementType {
  return {
    id: "student-list",
    type: SeatingPlanElementTypes.StudentList,
    coordinates: { x: 0, y: 100 },
    students: students.map((student, index) => ({
      id: student.id,
      type: SeatingPlanElementTypes.Student,
      data: student,
      coordinates: { x: 100, y: 100 + index * 75 },
    })),
  };
}

export default function SeatingPlan({
  seatingPlan,
  students: initStudents,
}: {
  students: StudentProps[];
  seatingPlan: SeatingPlanProps;
}) {
  const [transform, setTransform] = useState(zoomIdentity);
  const studentList = makeStudentSeatingPlanElements(initStudents);
  const {
    history: elements,
    setHistory: setElements,
    undo,
    redo,
    store,
    undoStack,
    redoStack,
  } = useHistory<SeatingPlanElementType[]>([studentList]);
  const [draggedElementType, setDraggedElementType] =
    useState<SeatingPlanElementTypes | null>(null);

  function addToolbarItem({ over, active, delta }: DragEndEvent) {
    if (over?.id !== "canvas") return;
    if (!active.rect.current.initial) return;
    if (draggedElementType === null) return;

    const newElement: SeatingPlanElementType = {
      id: active.id.toString(),
      coordinates: calculateCanvasPosition(
        active.rect.current.initial,
        over,
        delta,
        transform
      ),
      type: draggedElementType,
      data: { text: `Table ${active.id}` },
    } as SeatingPlanElementType;

    if (draggedElementType === SeatingPlanElementTypes.TwoSeatsDesk) {
      (newElement as TwoSeatsDeskSeatingPlanElementType).students =
        generateEmptySeatsForTable(active.id.toString(), 2);
    }

    if (draggedElementType === SeatingPlanElementTypes.OneSeatDesk) {
      (newElement as OneSeatDeskSeatingPlanElementType).student =
        generateEmptySeatsForTable(active.id.toString(), 1)[0];
    }

    setElements([...elements, newElement]);
    setDraggedElementType(null);
  }
  useEffect(() => {
    store();
  }, [elements]);

  return (
    <div className="relative">
      <DndContext
        onDragStart={({ active }) => {
          setDraggedElementType(active.data.current?.type);
        }}
        onDragEnd={addToolbarItem}
        id="canvas"
      >
        <LastEditState lastEdit={seatingPlan.edited_at} />
        <Toolbar />
        <Controls
          undo={undo}
          redo={redo}
          isUndoDisabled={undoStack.length < 1}
          isRedoDisabled={redoStack.length < 1}
        />

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
            {draggedElementType === SeatingPlanElementTypes.TwoSeatsDesk ? (
              <SeatingPlanElement className="w-48">
                <div className="h-12 w-20 bg-accent rounded-md" />
                <div className="h-12 w-20 bg-accent rounded-md" />
              </SeatingPlanElement>
            ) : draggedElementType === SeatingPlanElementTypes.OneSeatDesk ? (
              <SeatingPlanElement className="w-24">
                <div className="h-12 w-20 bg-accent rounded-md" />
              </SeatingPlanElement>
            ) : null}
          </div>
        </DragOverlay>
      </DndContext>
    </div>
  );
}
