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
  CustomTextSeatingPlanElementType,
  OneSeatDeskSeatingPlanElementType,
  SeatingPlanElementType,
  SeatingPlanElementTypes,
  StudentListSeatingPlanElementType,
  StudentSeatingPlanElementType,
  TwoSeatsDeskSeatingPlanElementType,
} from "@/lib/types/seating-plan";
import Toolbar from "./toolbar";
import SeatingPlanElement from "./elements/element";
import { useHistory } from "@/hooks/use-history";
import Controls from "./controls";
import LastSavedState from "./last-saved-state";
import { saveElements } from "./actions";
import { SeatingPlanProvider } from "@/hooks/use-seating-plan";
import { TextCursorInput } from "lucide-react";
import { ONE_SEAT_DESK, STUDENT, TWO_SEAT_DESK } from "./constants";

export function makeStudentSeatingPlanElements(
  students: StudentProps[] | StudentSeatingPlanElementType[]
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
      width: STUDENT.width,
      height: STUDENT.height,
    })),
    width: ONE_SEAT_DESK.width,
    height: students.length * STUDENT.height,
  };
}

function getElementsWithUnassignedStudents(
  existingElements: SeatingPlanElementType[],
  allStudents: StudentProps[]
): SeatingPlanElementType[] {
  // Finde die existierende Studentenliste
  const studentList = existingElements.find(
    (element) => element.type === SeatingPlanElementTypes.StudentList
  ) as StudentListSeatingPlanElementType | undefined;

  // Sammle alle zugewiesenen Schüler-IDs
  const assignedStudentIds = new Set<string>();
  existingElements.forEach((element) => {
    if (element.type === SeatingPlanElementTypes.TwoSeatsDesk) {
      (element as TwoSeatsDeskSeatingPlanElementType).students.forEach(
        (seat) => seat.id && assignedStudentIds.add(seat.id.toString())
      );
    } else if (element.type === SeatingPlanElementTypes.OneSeatDesk) {
      const seat = (element as OneSeatDeskSeatingPlanElementType).student;
      seat.id && assignedStudentIds.add(seat.id.toString());
    }
  });

  // Filtere nicht zugewiesene Schüler
  const unassignedStudents = allStudents.filter(
    (student) => !assignedStudentIds.has(student.id.toString())
  );

  // Wenn keine Studentenliste existiert und es nicht zugewiesene Schüler gibt,
  // erstelle eine neue Liste
  if (!studentList && unassignedStudents.length > 0) {
    return [
      ...existingElements,
      makeStudentSeatingPlanElements(unassignedStudents),
    ];
  }

  // Wenn eine Studentenliste existiert, aktualisiere sie mit den nicht zugewiesenen Schülern
  if (studentList) {
    const updatedElements = existingElements.filter(
      (element) => element.type !== SeatingPlanElementTypes.StudentList
    );
    return unassignedStudents.length > 0
      ? [...updatedElements, makeStudentSeatingPlanElements(unassignedStudents)]
      : updatedElements;
  }

  return existingElements;
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

    // Berechne die Grenzen aller Elemente unter Berücksichtigung der Elementgrößen
    const bounds = nodes.reduce(
      (acc, element) => {
        // Verwende die tatsächliche Breite und Höhe des Elements
        const elementWidth = element.width || 50;
        const elementHeight = element.height || 50;

        acc.minX = Math.min(acc.minX, element.coordinates.x - elementWidth / 2);
        acc.maxX = Math.max(acc.maxX, element.coordinates.x + elementWidth / 2);
        acc.minY = Math.min(
          acc.minY,
          element.coordinates.y - elementHeight / 2
        );
        acc.maxY = Math.max(
          acc.maxY,
          element.coordinates.y + elementHeight / 2
        );
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
    ? getElementsWithUnassignedStudents(
        seatingPlan.nodes as SeatingPlanElementType[],
        initStudents
      )
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

    let newElement = {
      id: active.id,
      coordinates: calculateCanvasPosition(
        active.rect.current.initial,
        over,
        delta,
        transform
      ),
      type: draggedElementType,
    };
    if (draggedElementType === SeatingPlanElementTypes.CustomText) {
      newElement = {
        ...newElement,
        width: TWO_SEAT_DESK.width,
        height: TWO_SEAT_DESK.height,
        data: { text: `Custom Text` },
      } as SeatingPlanElementType;
    } else {
      newElement = {
        ...newElement,
        data: { text: `Table ${active.id}` },
      } as SeatingPlanElementType;
    }

    if (draggedElementType === SeatingPlanElementTypes.TwoSeatsDesk) {
      newElement = {
        ...newElement,
        width: TWO_SEAT_DESK.width,
        height: TWO_SEAT_DESK.height,
      } as TwoSeatsDeskSeatingPlanElementType;
      (newElement as TwoSeatsDeskSeatingPlanElementType).students =
        generateEmptySeatsForTable(active.id.toString(), 2);
    }

    if (draggedElementType === SeatingPlanElementTypes.OneSeatDesk) {
      newElement = {
        ...newElement,
        width: ONE_SEAT_DESK.width,
        height: ONE_SEAT_DESK.height,
      } as OneSeatDeskSeatingPlanElementType;
      (newElement as OneSeatDeskSeatingPlanElementType).student =
        generateEmptySeatsForTable(active.id.toString(), 1)[0];
    }

    setElements([...elements, newElement as SeatingPlanElementType]);
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
              width: "auto",
              height: "auto",
            }}
          >
            {draggedElementType === SeatingPlanElementTypes.TwoSeatsDesk ? (
              <SeatingPlanElement
                style={{
                  width: TWO_SEAT_DESK.width,
                  height: TWO_SEAT_DESK.height,
                }}
              >
                <div className="h-12 w-24 bg-accent rounded-md" />
                <div className="h-12 w-24 bg-accent rounded-md" />
              </SeatingPlanElement>
            ) : draggedElementType === SeatingPlanElementTypes.OneSeatDesk ? (
              <SeatingPlanElement
                style={{
                  width: ONE_SEAT_DESK.width,
                  height: ONE_SEAT_DESK.height,
                }}
              >
                <div className="h-12 w-24 bg-accent rounded-md" />
              </SeatingPlanElement>
            ) : draggedElementType === SeatingPlanElementTypes.CustomText ? (
              <SeatingPlanElement
                style={{
                  width: TWO_SEAT_DESK.width,
                  height: TWO_SEAT_DESK.height,
                }}
              >
                <TextCursorInput className="h-10 w-full bg-accent rounded-md" />
              </SeatingPlanElement>
            ) : null}
          </div>
        </DragOverlay>
      </SeatingPlanProvider>
    </DndContext>
  );
}
