import { Student } from "@/lib/supabase/types/additional.types";
import {
  OneSeatDeskNodeProps,
  SeatingPlanNode,
  SeatNodeProps,
  StudentDraggable,
  StudentNodeProps,
  TwoSeatsDeskNodeProps,
} from "@/lib/types/seating-plan";
import { XYPosition } from "@xyflow/react";

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
  overDesk: SeatingPlanNode,
  nodes: SeatingPlanNode[]
): SeatingPlanNode[] {
  const desk = overDesk as unknown as OneSeatDeskNodeProps;
  const seatIsEmpty = desk.data.student.id.toString().includes("empty");

  if (seatIsEmpty) {
    // move student to seat
    const newNodes = nodes
      .map((node) => {
        if (node.id === overDesk.id) {
          return {
            ...node,
            data: {
              ...node.data,
              student: student.current as Student,
            },
          } as OneSeatDeskNodeProps;
        }
        return node;
      })
      .filter((n) => n.id !== student.current?.id.toString());
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
  const seatIndex = desk.data.students.findIndex(
    (item) => item.id === overSeat.current.id
  );

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
  ) as TwoSeatsDeskNodeProps;
  if (!commonDesk) return nodes;

  const activeSeatIndex = commonDesk.data.students.findIndex(
    (s: Student) => s.id === activeStudent.current?.id
  );
  const overSeatIndex = commonDesk.data.students.findIndex(
    (s: Student) => s.id === overStudent.current.id
  );

  const newStudents = [...(commonDesk.data.students as Student[])];
  newStudents[activeSeatIndex] = overStudent.current as Student;
  newStudents[overSeatIndex] = activeStudent.current as Student;

  const newDesk = {
    ...commonDesk,
    data: {
      ...commonDesk.data,
      students: newStudents,
    },
  };

  console.log("newDesk", newDesk);

  const newNodes = nodes.map((node) => {
    if (node.id === commonDesk.id) {
      return newDesk;
    } else {
      return node;
    }
  });

  return newNodes;
}

export function moveStudentFromDeskToDesk(
  activeStudent: StudentDraggable,
  overStudent: SeatNodeProps,
  nodes: SeatingPlanNode[]
) {
  const activeDesk = nodes.find(
    (n) => n.id === activeStudent.current?.sortable.containerId
  ) as TwoSeatsDeskNodeProps | OneSeatDeskNodeProps;
  const overDesk = nodes.find(
    (n) => n.id === overStudent.current?.sortable.containerId
  ) as TwoSeatsDeskNodeProps | OneSeatDeskNodeProps;
  if (!activeDesk || !overDesk) return nodes;

  let activeSeatIndex = -1;
  let overSeatIndex = -1;

  if (activeDesk.type === "twoSeatsDesk") {
    activeSeatIndex = activeDesk.data.students.findIndex(
      (s) => s.id === activeStudent.current?.id
    );
  }

  if (overDesk.type === "twoSeatsDesk") {
    overSeatIndex = overDesk.data.students.findIndex(
      (s) => s.id === overStudent.current.id
    );
  }

  const activeStudentItem: Student = {
    id: activeStudent.current?.id,
    name: activeStudent.current?.name,
    gender: activeStudent.current?.gender,
    class_id: activeStudent.current?.class_id,
  };

  const overStudentItem: Student = {
    id: overStudent.current.id,
    name: overStudent.current.name,
    gender: overStudent.current.gender,
    class_id: overStudent.current.class_id,
  };

  let newActiveDesk = activeDesk;
  if (activeSeatIndex === -1) {
    newActiveDesk = {
      ...activeDesk,
      data: {
        ...activeDesk.data,
        student: overStudentItem,
      },
    } as OneSeatDeskNodeProps;
  } else {
    const newStudents = [...(activeDesk.data.students as Student[])];
    newStudents[activeSeatIndex] = overStudentItem;
    newActiveDesk = {
      ...activeDesk,
      data: {
        ...activeDesk.data,
        students: newStudents,
      },
    } as TwoSeatsDeskNodeProps;
  }

  let newOverDesk = overDesk;
  if (overSeatIndex === -1) {
    newOverDesk = {
      ...overDesk,
      data: {
        ...overDesk.data,
        student: activeStudentItem,
      },
    } as OneSeatDeskNodeProps;
  } else {
    const newStudents = [...(overDesk.data.students as Student[])];
    newStudents[overSeatIndex] = activeStudentItem;
    newOverDesk = {
      ...overDesk,
      data: {
        ...overDesk.data,
        students: newStudents,
      },
    } as TwoSeatsDeskNodeProps;
  }

  const newNodes = nodes.map((node) => {
    if (node.id === activeDesk.id) {
      return newActiveDesk;
    } else if (node.id === overDesk.id) {
      return newOverDesk;
    } else {
      return node;
    }
  });
  return newNodes;
}

export function moveStudentFromDeskToCanvas(
  activeStudent: StudentDraggable,
  nodes: SeatingPlanNode[],
  position: XYPosition
) {
  const activeDesk = nodes.find(
    (n) => n.id === activeStudent.current?.sortable.containerId
  ) as TwoSeatsDeskNodeProps | OneSeatDeskNodeProps;
  if (!activeDesk) return nodes;

  let activeSeatIndex = -1;

  if (activeDesk.type === "twoSeatsDesk") {
    activeSeatIndex = activeDesk.data.students.findIndex(
      (s) => s.id === activeStudent.current?.id
    );
  }

  const newStudentItem: StudentNodeProps = {
    id: activeStudent.current?.id.toString(),
    data: {
      id: activeStudent.current?.id,
      name: activeStudent.current?.name,
      gender: activeStudent.current?.gender,
      class_id: activeStudent.current?.class_id,
    },
    position: position,
    type: "student",
  };

  if (activeSeatIndex === -1) {
    const newActiveDesk = {
      ...activeDesk,
      data: {
        ...activeDesk.data,
        student: generateEmptySeatsForTable(activeDesk.id, 1),
      },
    } as OneSeatDeskNodeProps;

    const newNodes = nodes.map((node) => {
      if (node.id === activeDesk.id) {
        return newActiveDesk;
      } else {
        return node;
      }
    });
    console.log("newNodes", [...newNodes, newStudentItem]);
    return [...newNodes, newStudentItem];
  } else {
    const newStudents = [...(activeDesk.data.students as Student[])];
    newStudents[activeSeatIndex] = generateEmptySeatsForTable(
      activeDesk.id,
      1
    ) as Student & { type: "student" };

    const newActiveDesk = {
      ...activeDesk,
      data: {
        ...activeDesk.data,
        students: newStudents,
      },
    } as TwoSeatsDeskNodeProps;

    const newNodes = nodes.map((node) => {
      if (node.id === activeDesk.id) {
        return newActiveDesk;
      } else {
        return node;
      }
    });
    console.log("newNodes", [...newNodes, newStudentItem]);
    return [...newNodes, newStudentItem];
  }
}
