import {
  OneSeatDeskSeatingPlanElementType,
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
  let activeTable = elements.find((t) => t.id === activeTableId);
  let overTable = elements.find((t) => t.id === overTableId);

  if (!activeTable || !overTable) {
    return elements;
  }
  let activeIndex = -1;
  let overIndex = -1;

  let activeItem = null;
  let overItem = null;

  if (activeTable.type === SeatingPlanElementTypes.OneSeatDesk) {
    activeTable = activeTable as OneSeatDeskSeatingPlanElementType;
    activeIndex = 0;
    activeItem = activeTable.student;
  }
  if (activeTable.type === SeatingPlanElementTypes.TwoSeatsDesk) {
    activeTable = activeTable as TwoSeatsDeskSeatingPlanElementType;
    activeIndex = activeTable.students.findIndex((s) => s.id === active.id);
    activeItem = activeTable.students[activeIndex];
  }

  if (overTable.type === SeatingPlanElementTypes.OneSeatDesk) {
    overTable = overTable as OneSeatDeskSeatingPlanElementType;
    overIndex = 0;
    overItem = overTable.student;
  }

  if (overTable.type === SeatingPlanElementTypes.TwoSeatsDesk) {
    overTable = overTable as TwoSeatsDeskSeatingPlanElementType;
    overIndex = overTable.students.findIndex((s) => s.id === over.id);
    overItem = overTable.students[overIndex];
  }

  const newElements = elements.map((element) => {
    // 2a) Wenn es dieselbe Tabelle ist („reorder“):
    if (
      activeTableId === overTableId &&
      element.id === activeTableId &&
      activeTable.type === SeatingPlanElementTypes.TwoSeatsDesk &&
      activeItem
    ) {
      element = element as TwoSeatsDeskSeatingPlanElementType;
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
    else if (
      element.id === activeTableId &&
      activeTableId !== overTableId &&
      overItem
    ) {
      // TABELLE MIT DEM ACTIVEITEM: entferne activeItem, füge aber overItem an gleicher Stelle ein
      if (activeTable.type === SeatingPlanElementTypes.OneSeatDesk) {
        element = element as OneSeatDeskSeatingPlanElementType;
        return {
          ...element,
          student: overItem,
        };
      }
      if (activeTable.type === SeatingPlanElementTypes.TwoSeatsDesk) {
        element = element as TwoSeatsDeskSeatingPlanElementType;
        const newStudents = [...element.students];
        newStudents.splice(activeIndex, 1);
        newStudents.splice(activeIndex, 0, overItem);

        return {
          ...element,
          students: newStudents,
        };
      }
    } else if (
      element.id === overTableId &&
      activeTableId !== overTableId &&
      activeItem
    ) {
      // TABELLE MIT DEM OVERITEM: entferne overItem, füge aber activeItem an gleicher Stelle ein
      if (overTable.type === SeatingPlanElementTypes.OneSeatDesk) {
        element = element as OneSeatDeskSeatingPlanElementType;
        return {
          ...element,
          student: activeItem,
        };
      }

      if (overTable.type === SeatingPlanElementTypes.TwoSeatsDesk) {
        element = element as TwoSeatsDeskSeatingPlanElementType;
        const newStudents = [...element.students];
        newStudents.splice(overIndex, 1);
        newStudents.splice(overIndex, 0, activeItem);

        return {
          ...element,
          students: newStudents,
        };
      }
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

export function moveStudentFromCanvasToTable(
  elements: SeatingPlanElementType[],
  student: StudentSeatingPlanElementType,
  overTable: SeatingPlanElementType,
  overTableIndex: number | null
): SeatingPlanElementType[] {
  let newElements = elements;
  let table = overTable;

  if (table.type === SeatingPlanElementTypes.OneSeatDesk) {
    table = table as OneSeatDeskSeatingPlanElementType;
    const overTableStudent = table.student;

    if (overTableStudent.id.toString().includes("empty")) {
      newElements = elements
        .map((element) => {
          if (element.id === table.id) {
            const deskElement = element as OneSeatDeskSeatingPlanElementType;
            return {
              ...deskElement,
              student: student,
            };
          }
          return element;
        })
        .filter((element) => element.id !== student.id);
    } else {
      newElements = elements.map((element) => {
        if (element.id === table.id) {
          const deskElement = element as OneSeatDeskSeatingPlanElementType;
          return {
            ...deskElement,
            student: student,
          };
        }
        if (element.id === student.id) {
          return {
            ...overTableStudent,
            coordinates: element.coordinates,
          };
        }
        return element;
      });
    }
  }

  if (
    table.type === SeatingPlanElementTypes.TwoSeatsDesk &&
    overTableIndex != null
  ) {
    table = table as TwoSeatsDeskSeatingPlanElementType;
    const overTableStudent = table.students[overTableIndex];

    if (overTableStudent.id.toString().includes("empty")) {
      newElements = elements
        .map((element) => {
          if (element.id === table.id) {
            const deskElement = element as TwoSeatsDeskSeatingPlanElementType;
            return {
              ...deskElement,
              students: deskElement.students.map((s, i) =>
                i === overTableIndex ? student : s
              ),
            };
          }
          return element;
        })
        .filter((element) => element.id !== student.id);
    } else {
      newElements = elements.map((element) => {
        if (element.id === table.id) {
          const deskElement = element as TwoSeatsDeskSeatingPlanElementType;
          return {
            ...deskElement,
            students: deskElement.students.map((s, i) =>
              i === overTableIndex ? student : s
            ),
          };
        }
        if (element.id === student.id) {
          return {
            ...overTableStudent,
            coordinates: element.coordinates,
          };
        }
        return element;
      });
    }
  }

  return newElements;
}
