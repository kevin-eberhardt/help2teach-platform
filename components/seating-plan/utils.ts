import {
  OneSeatDeskSeatingPlanElementType,
  SeatingPlanElementType,
  SeatingPlanElementTypes,
  StudentListSeatingPlanElementType,
  StudentSeatingPlanElementType,
  TwoSeatsDeskSeatingPlanElementType,
} from "@/lib/types/seating-plan";
import { generateUUID } from "@/lib/utils";
import {
  Active,
  ClientRect,
  Over,
  Translate,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { Coordinates } from "@dnd-kit/utilities";
import { ZoomTransform } from "d3-zoom";
import SeatingPlan, { makeStudentSeatingPlanElements } from ".";

export function calculateCanvasPosition(
  initialRect: ClientRect,
  over: Over | null,
  delta: Translate,
  transform: ZoomTransform
): Coordinates {
  if (!over?.rect) return { x: 0, y: 0 };

  // Berechne die Position im Viewport
  const viewportX = initialRect.left + delta.x;
  const viewportY = initialRect.top + delta.y;

  // Berechne die relative Position zum Canvas-Container
  const relativeX = viewportX - over.rect.left;
  const relativeY = viewportY - over.rect.top;

  // Konvertiere zu Canvas-Koordinaten unter Berücksichtigung von:
  // 1. Zoom-Faktor (transform.k)
  // 2. Canvas-Verschiebung (transform.x, transform.y)
  // 3. Canvas-Größe (200%) und -50% Offset
  const canvasX =
    (relativeX - transform.x) / transform.k +
    over.rect.width / (2 * transform.k);
  const canvasY =
    (relativeY - transform.y) / transform.k +
    over.rect.height / (2 * transform.k);

  return {
    x: canvasX,
    y: canvasY,
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
  const activeElementId = findTable(
    elements,
    active.data.current?.sortable.containerId
  );
  const overElementId = findTable(
    elements,
    over.data.current?.sortable.containerId
  );

  // Finde die Indexe in den jeweiligen students-Arrays
  let activeElement = elements.find((t) => t.id === activeElementId);
  let overElement = elements.find((t) => t.id === overElementId);

  if (!activeElement || !overElement) {
    return elements;
  }
  let activeIndex = -1;
  let overIndex = -1;

  let activeItem = null;
  let overItem = null;

  if (activeElement.type === SeatingPlanElementTypes.OneSeatDesk) {
    activeElement = activeElement as OneSeatDeskSeatingPlanElementType;
    activeIndex = 0;
    activeItem = activeElement.student;
  }

  if (activeElement.type === SeatingPlanElementTypes.StudentList) {
    activeElement = activeElement as StudentListSeatingPlanElementType;
    activeIndex = activeElement.students.findIndex((s) => s.id === active.id);
    activeItem = activeElement.students[activeIndex];
  }

  if (activeElement.type === SeatingPlanElementTypes.TwoSeatsDesk) {
    activeElement = activeElement as TwoSeatsDeskSeatingPlanElementType;
    activeIndex = activeElement.students.findIndex((s) => s.id === active.id);
    activeItem = activeElement.students[activeIndex];
  }

  if (overElement.type === SeatingPlanElementTypes.OneSeatDesk) {
    overElement = overElement as OneSeatDeskSeatingPlanElementType;
    overIndex = 0;
    overItem = overElement.student;
  }

  if (overElement.type === SeatingPlanElementTypes.StudentList) {
    overElement = overElement as StudentListSeatingPlanElementType;
    overIndex = overElement.students.findIndex((s) => s.id === over.id);
    overItem = overElement.students[overIndex];
  }

  if (overElement.type === SeatingPlanElementTypes.TwoSeatsDesk) {
    overElement = overElement as TwoSeatsDeskSeatingPlanElementType;
    overIndex = overElement.students.findIndex((s) => s.id === over.id);
    overItem = overElement.students[overIndex];
  }

  const newElements = elements.map((element) => {
    // 2a) Wenn es dieselbe Tabelle ist („reorder“):
    if (
      activeElementId === overElementId &&
      element.id === activeElementId &&
      activeElement.type === SeatingPlanElementTypes.TwoSeatsDesk &&
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
      element.id === activeElementId &&
      activeElementId !== overElementId &&
      overItem
    ) {
      // TABELLE MIT DEM ACTIVEITEM: entferne activeItem, füge aber overItem an gleicher Stelle ein
      if (activeElement.type === SeatingPlanElementTypes.OneSeatDesk) {
        element = element as OneSeatDeskSeatingPlanElementType;
        return {
          ...element,
          student: overItem,
        };
      }
      if (activeElement.type === SeatingPlanElementTypes.TwoSeatsDesk) {
        element = element as TwoSeatsDeskSeatingPlanElementType;
        const newStudents = [...element.students];
        newStudents.splice(activeIndex, 1);
        newStudents.splice(activeIndex, 0, overItem);

        return {
          ...element,
          students: newStudents,
        };
      }

      if (activeElement.type === SeatingPlanElementTypes.StudentList) {
        element = element as StudentListSeatingPlanElementType;
        const newStudents = [...element.students];
        newStudents.splice(activeIndex, 1);

        return {
          ...element,
          students: newStudents,
        };
      }
    } else if (
      element.id === overElementId &&
      activeElementId !== overElementId &&
      activeItem
    ) {
      // TABELLE MIT DEM OVERITEM: entferne overItem, füge aber activeItem an gleicher Stelle ein
      if (overElement.type === SeatingPlanElementTypes.OneSeatDesk) {
        element = element as OneSeatDeskSeatingPlanElementType;
        return {
          ...element,
          student: activeItem,
        };
      }

      if (
        overElement.type === SeatingPlanElementTypes.TwoSeatsDesk ||
        overElement.type === SeatingPlanElementTypes.StudentList
      ) {
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
      id: `${id}-empty-${generateUUID()}`,
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

export function checkIfElementIsDraggableContainer(
  element: SeatingPlanElementType
) {
  return (
    element.type === SeatingPlanElementTypes.OneSeatDesk ||
    element.type === SeatingPlanElementTypes.TwoSeatsDesk
  );
}

export function moveStudentFromCanvasToTable(
  elements: SeatingPlanElementType[],
  student: StudentSeatingPlanElementType,
  overElement: SeatingPlanElementType,
  overElementIndex: number | null
): SeatingPlanElementType[] {
  let newElements = elements;
  let table = overElement;

  if (table.type === SeatingPlanElementTypes.OneSeatDesk) {
    table = table as OneSeatDeskSeatingPlanElementType;
    const overElementStudent = table.student;

    if (overElementStudent.id.toString().includes("empty")) {
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
            ...overElementStudent,
            coordinates: element.coordinates,
          };
        }
        return element;
      });
    }
  }

  if (
    table.type === SeatingPlanElementTypes.TwoSeatsDesk &&
    overElementIndex != null
  ) {
    table = table as TwoSeatsDeskSeatingPlanElementType;
    const overElementStudent = table.students[overElementIndex];

    if (overElementStudent.id.toString().includes("empty")) {
      newElements = elements
        .map((element) => {
          if (element.id === table.id) {
            const deskElement = element as TwoSeatsDeskSeatingPlanElementType;
            return {
              ...deskElement,
              students: deskElement.students.map((s, i) =>
                i === overElementIndex ? student : s
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
              i === overElementIndex ? student : s
            ),
          };
        }
        if (element.id === student.id) {
          return {
            ...overElementStudent,
            coordinates: element.coordinates,
          };
        }
        return element;
      });
    }
  }

  return newElements;
}

export function deleteElement(
  elements: SeatingPlanElementType[],
  element: SeatingPlanElementType
) {
  let studentList = elements.find(
    (e) => e.type === SeatingPlanElementTypes.StudentList
  );
  let students: StudentSeatingPlanElementType[] = [];

  if (element.type === SeatingPlanElementTypes.TwoSeatsDesk) {
    const deskElement = element as TwoSeatsDeskSeatingPlanElementType;
    if (
      deskElement.students.filter((s) => !s.id.toString().includes("empty"))
        .length !== 0
    ) {
      students = deskElement.students;
    }
  }

  if (element.type === SeatingPlanElementTypes.OneSeatDesk) {
    const deskElement = element as OneSeatDeskSeatingPlanElementType;
    if (!deskElement.student.id.toString().includes("empty")) {
      students = [deskElement.student];
    }
  }

  if (students.length > 0) {
    if (studentList) {
      studentList = studentList as StudentListSeatingPlanElementType;
      studentList.students = studentList.students.concat(students);
    } else {
      studentList = makeStudentSeatingPlanElements(students);
    }
  }
  let newElements = elements.filter((e) => e.id !== element.id);
  if (studentList && students.length > 0) {
    newElements = newElements.map((e) => {
      if (e.id === studentList.id) {
        return studentList;
      }
      return e;
    });
  }

  return newElements;
}
