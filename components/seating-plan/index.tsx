"use client";
import {
  SeatingPlanProps,
  Student as StudentProps,
} from "@/lib/supabase/types/additional.types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

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
import { useHistory } from "@/hooks/use-history";
import Controls from "./controls";
import LastSavedState from "./last-saved-state";
import { saveElements } from "./actions";
import { SeatingPlanProvider } from "@/hooks/use-seating-plan";

export function makeStudentSeatingPlanElements(
  students: StudentProps[]
): StudentListSeatingPlanElementType {
  return {
    id: "student-list",
    type: SeatingPlanElementTypes.StudentList,
    coordinates: { x: 0, y: 100 },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
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
  const [transform, setTransform] = useState(() => {
    const nodes = seatingPlan.nodes as SeatingPlanElementType[];
    // Überprüfe ob Elemente vorhanden sind
    if (!nodes || nodes.length === 0) {
      return zoomIdentity
        .translate(window.innerWidth / 2, window.innerHeight / 2)
        .scale(0.8);
    }

    console.log(seatingPlan.nodes);
    // Berechne die Grenzen aller Elemente unter Berücksichtigung der Elementgrößen
    const bounds = nodes.reduce(
      (acc, element) => {
        // Annahme: Jedes Element hat eine Breite und Höhe von mindestens 50px
        const elementSize = 50;
        acc.minX = Math.min(acc.minX, element.coordinates.x - elementSize / 2);
        acc.maxX = Math.max(acc.maxX, element.coordinates.x + elementSize / 2);
        acc.minY = Math.min(acc.minY, element.coordinates.y - elementSize / 2);
        acc.maxY = Math.max(acc.maxY, element.coordinates.y + elementSize / 2);
        return acc;
      },
      { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
    );

    // Füge mehr Padding hinzu für bessere Sichtbarkeit
    const padding = 150;
    const contentWidth = bounds.maxX - bounds.minX + padding * 2;
    const contentHeight = bounds.maxY - bounds.minY + padding * 2;

    // Berechne den Zoom-Faktor mit etwas Abstand zum Rand
    const scaleX = (window.innerWidth * 0.9) / contentWidth;
    const scaleY = (window.innerHeight * 0.9) / contentHeight;
    const scale = Math.min(scaleX, scaleY, 1);

    // Berechne die Zentrierung
    const centerX =
      (window.innerWidth - contentWidth * scale) / 2 -
      bounds.minX * scale +
      padding * scale;
    const centerY =
      (window.innerHeight - contentHeight * scale) / 2 -
      bounds.minY * scale +
      padding * scale;

    return zoomIdentity.translate(centerX, centerY).scale(scale);
  });
  const elementList = seatingPlan.nodes
    ? (seatingPlan.nodes as SeatingPlanElementType[])
    : [makeStudentSeatingPlanElements(initStudents)];
  const {
    history: elements,
    setHistory: setElements,
    undo,
    redo,
    store,
    undoStack,
    redoStack,
  } = useHistory<SeatingPlanElementType[]>(elementList);
  const [draggedElementType, setDraggedElementType] =
    useState<SeatingPlanElementTypes | null>(null);

  const touchSensor = useSensor(TouchSensor);
  const mouseSensor = useSensor(MouseSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(touchSensor, mouseSensor, keyboardSensor);

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

    const delayDebounceFn = setTimeout(() => {
      saveElements(elements, seatingPlan.id);
      console.log("Saved");
    }, 5000);
    return () => clearTimeout(delayDebounceFn);
  }, [elements]);

  const [containerDimensions, setContainerDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setContainerDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setDraggedElementType(active.data.current?.type);
      }}
      onDragEnd={addToolbarItem}
      id="canvas"
    >
      <SeatingPlanProvider>
        <LastSavedState lastEdit={seatingPlan.edited_at} />
        <Toolbar />
        <Controls
          zoom={transform}
          setZoom={setTransform}
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
      </SeatingPlanProvider>
    </DndContext>
  );
}
