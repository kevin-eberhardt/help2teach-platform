import { Student } from "@/lib/supabase/types/additional.types";
import {
  OneSeatDeskNodeProps,
  SeatingPlanNode,
  SeatNodeProps,
  StudentDraggable,
  StudentNodeProps,
  TwoSeatsDeskNodeProps,
} from "@/lib/types/seating-plan";
import { Over } from "@dnd-kit/core";

export function generateEmptySeatsForTable(
  tableId: string,
  numberOfSeats: number
): (Student & { type: "student" }) | (Student & { type: "student" })[] {
  if (numberOfSeats === 1) {
    return {
      class_id: null,
      gender: null,
      id: `${tableId}-empty-1`,
      name: "",
      type: "student",
    } as Student & { id: string; type: "student" };
  } else {
    return Array.from({ length: numberOfSeats }, (_, index) => ({
      class_id: null,
      gender: null,
      id: `${tableId}-empty-${index + 1}`,
      name: "",
      type: "student",
    })) as (Student & { id: string; type: "student" })[];
  }
}

export function moveStudentFromCanvasToOneSeatDesk(
  student: StudentDraggable,
  overSeat: SeatNodeProps,
  overDesk: SeatingPlanNode,
  nodes: SeatingPlanNode[]
): SeatingPlanNode[] {
  const desk = overDesk as unknown as OneSeatDeskNodeProps;
  const seatIsEmpty = desk.data.student.id.toString().includes("empty");

  if (seatIsEmpty) {
    // move student to seat
    const newDesk = { ...desk, student: student.current };
    const newNodes = nodes.map((node) => {
      if (node.id === overDesk.id) {
        return newDesk;
      }
      return node;
    });
    return newNodes;
  } else {
    const existingStudent = desk.data.student;
    const newDesk: OneSeatDeskNodeProps = {
      ...desk,
      data: {
        ...desk.data,
        student: student.current as Student,
      },
    };

    let newNodes = nodes.map((node) => {
      if (node.id === overDesk.id) {
        return newDesk;
      } else {
        return node;
      }
    });
    newNodes = newNodes.map((node: SeatingPlanNode) => {
      if (node.id === student.current?.id.toString()) {
        return {
          ...node,
          id: existingStudent.id.toString(),
          data: existingStudent,
        } as StudentNodeProps;
      }
      return node;
    });

    return newNodes;
  }
}

export function moveStudentFromCanvasToTwoSeatsDesk(
  student: StudentDraggable,
  overSeat: SeatNodeProps,
  overDesk: SeatingPlanNode,
  nodes: SeatingPlanNode[]
): SeatingPlanNode[] {
  const desk = overDesk as unknown as TwoSeatsDeskNodeProps;
  let seatIndex = overSeat.current.sortable.index;
  if (seatIndex === -1) {
    seatIndex = overSeat.current.sortable.items.findIndex(
      (item) => item.toString() === overSeat.current.id.toString()
    );
  }

  const seatIsEmpty = desk.data.students[seatIndex].id
    .toString()
    .includes("empty");

  if (seatIsEmpty) {
    const newStudents = [...desk.data.students];
    newStudents[seatIndex] = student.current as Student;

    const newDesk: TwoSeatsDeskNodeProps = {
      ...desk,
      data: {
        ...desk.data,
        students: newStudents,
      },
    };

    const newNodes = nodes
      .map((node) => {
        if (node.id === overDesk.id) {
          return newDesk;
        } else {
          return node;
        }
      })
      .filter((n) => n.id !== student.current?.id.toString());

    return newNodes as SeatingPlanNode[];
  } else {
    // replace existing student with new student
    const newStudents = [...desk.data.students];
    const existingStudent = newStudents[seatIndex];
    newStudents[seatIndex] = student.current as Student;

    const newDesk: TwoSeatsDeskNodeProps = {
      ...desk,
      data: {
        ...desk.data,
        students: newStudents,
      },
    };

    let newNodes = nodes.map((node) => {
      if (node.id === overDesk.id) {
        return newDesk;
      } else {
        return node;
      }
    });

    newNodes = newNodes.map((node: SeatingPlanNode) => {
      if (node.id === student.current?.id.toString()) {
        return {
          ...node,
          id: existingStudent.id.toString(),
          data: existingStudent,
        } as StudentNodeProps;
      }
      return node;
    });
    return newNodes as SeatingPlanNode[];
  }
}

export function moveStudentInSameDesk(
  activeStudent: StudentDraggable,
  overStudent: SeatNodeProps,
  nodes: SeatingPlanNode[]
) {
  if (!activeStudent.current) return nodes;
  if (activeStudent.current.id === overStudent.current.id) return nodes;

  const commonDesk = nodes.find(
    (n) => n.id === activeStudent.current?.sortable.containerId
  );
  if (!commonDesk) return nodes;

  const activeSeatIndex = activeStudent.current?.sortable.items.findIndex(
    (item: number | string) =>
      item.toString() === activeStudent.current?.id.toString()
  );
  const overSeatIndex = overStudent.current.sortable.items.findIndex(
    (item) => item.toString() === overStudent.current?.id.toString()
  );
  const newStudents = [...(commonDesk.data.students as Student[])];
  console.log(activeSeatIndex, " => ", overSeatIndex);
  newStudents[activeSeatIndex] = overStudent.current as Student;
  newStudents[overSeatIndex] = activeStudent.current as Student;

  const newDesk = {
    ...commonDesk,
    data: {
      ...commonDesk.data,
      students: newStudents,
    },
  };

  const newNodes = nodes.map((node) => {
    if (node.id === commonDesk.id) {
      return newDesk;
    } else {
      return node;
    }
  });

  return newNodes;
}
