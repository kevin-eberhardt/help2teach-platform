import {
  SeatingPlanElementType,
  SeatingPlanElementTypes,
  StudentSeatingPlanElementType,
  TwoSeatsDeskSeatingPlanElementType,
} from "@/lib/types/seating-plan";
import {
  Active,
  ClientRect,
  Over,
  Translate,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { Coordinates } from "@dnd-kit/utilities";
import { ZoomTransform } from "d3-zoom";

export function calculateCanvasPosition(
  initialRect: ClientRect,
  over: Over | null,
  delta: Translate,
  transform: ZoomTransform
): Coordinates {
  return {
    x:
      (initialRect.left + delta.x - (over?.rect?.left ?? 0) - transform.x) /
      transform.k,
    y:
      (initialRect.top + delta.y - (over?.rect?.top ?? 0) - transform.y) /
      transform.k,
  };
}

export function findTable(
  elements: SeatingPlanElementType[],
  id: UniqueIdentifier
) {
  let tableId = elements.find((element) => element.id === id)?.id;
  if (tableId == null) {
    // search for the table id in the students array
    elements.forEach((element) => {
      if (element.type === SeatingPlanElementTypes.TwoSeatsDesk) {
        if ("students" in element && element.students?.length > 0) {
          element.students.forEach((student: StudentSeatingPlanElementType) => {
            if (student.id === id) {
              tableId = element.id;
            }
          });
        }
      }
    });
  }
  return tableId;
}

export function changeSeatedStudentPositions(
  elements: SeatingPlanElementType[],
  active: Active,
  over: Over
) {
  const activeTableId = findTable(
    elements,
    active.data.current?.sortable.containerId
  );
  const overTableId = findTable(
    elements,
    over.data.current?.sortable.containerId
  );

  // Finde die Indexe in den jeweiligen students-Arrays
  const activeTable = elements.find((t) => t.id === activeTableId);
  const overTable = elements.find((t) => t.id === overTableId);

  if (!activeTable || !overTable) {
    return elements;
  }

  const activeIndex = activeTable.students.findIndex((s) => s.id === active.id);
  const overIndex = overTable.students.findIndex((s) => s.id === over.id);

  const activeItem = elements.find((t) => t.id === activeTableId)?.students[
    activeIndex
  ];
  const overItem = elements.find((t) => t.id === overTableId)?.students[
    overIndex
  ];

  const newElements = elements.map((element) => {
    // 2a) Wenn es dieselbe Tabelle ist („reorder“):
    if (activeTableId === overTableId && element.id === activeTableId) {
      // Entferne das activeItem und füge es an der Position overIndex wieder ein
      const newStudents = [...element.students];
      newStudents.splice(activeIndex, 1);
      // Achtung: Ist overIndex > activeIndex, verschiebt sich der Index
      // ggf. um 1, wenn du zuerst entfernst. Daher evtl. Min-/Max-Anpassung.
      newStudents.splice(overIndex, 0, activeItem);

      return {
        ...element,
        students: newStudents,
      };
    }
    // 2b) Wenn es unterschiedliche Tabellen sind („swap“):
    else if (element.id === activeTableId && activeTableId !== overTableId) {
      // TABELLE MIT DEM ACTIVEITEM: entferne activeItem, füge aber overItem an gleicher Stelle ein
      const newStudents = [...element.students];
      newStudents.splice(activeIndex, 1);
      newStudents.splice(activeIndex, 0, overItem);

      return {
        ...element,
        students: newStudents,
      };
    } else if (element.id === overTableId && activeTableId !== overTableId) {
      // TABELLE MIT DEM OVERITEM: entferne overItem, füge aber activeItem an gleicher Stelle ein
      const newStudents = [...element.students];
      newStudents.splice(overIndex, 1);
      newStudents.splice(overIndex, 0, activeItem);

      return {
        ...element,
        students: newStudents,
      };
    }

    // Andere Tabellen unverändert lassen
    return element;
  });
  return newElements;
}

export function generateEmptySeatsForTable(
  id: string,
  amountSeats: number = 2
): StudentSeatingPlanElementType[] {
  const emptySeats = [];
  for (let i = 0; i < amountSeats; i++) {
    emptySeats.push({
      id: `${id}-empty-${Math.floor(Math.random() * 100)}`,
      type: SeatingPlanElementTypes.Student,
      coordinates: { x: 0, y: 0 },
      data: {
        id: i,
        name: "",
        class_id: null,
        gender: null,
      },
    });
  }
  return emptySeats;
}

export function checkIfElementIsTable(element: SeatingPlanElementType) {
  return (
    element.type === SeatingPlanElementTypes.OneSeatDesk ||
    element.type === SeatingPlanElementTypes.TwoSeatsDesk
  );
}
