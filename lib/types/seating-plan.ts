import { Node as ReactFlowNode, NodeProps } from "@xyflow/react";
import { SeatingPlan, Student } from "../supabase/types/additional.types";
import { Active, Over } from "@dnd-kit/core";
import { SortableData } from "@dnd-kit/sortable";

export type NodeType =
  | "text"
  | "student"
  | "twoSeatsDesk"
  | "oneSeatDesk"
  | "student-list";

export type Node<T, TType extends NodeType> = ReactFlowNode & {
  data?: T;
  type?: TType;
};

export type SeatingPlanProps = {
  students: Student[];
  seatingPlan: SeatingPlan;
};

export type OneSeatDeskNodeProps = Node<
  {
    student: Student;
  },
  "oneSeatDesk"
>;

export type TextNodeProps = Node<
  {
    text: string;
  },
  "text"
>;

export type TwoSeatsDeskNodeProps = Node<
  {
    students: Student[];
  },
  "twoSeatsDesk"
>;

export type GenericNodeProps<T> = React.HTMLProps<HTMLDivElement> & {
  data?: T & { rotation: number };
  type?: NodeType;
};
export type StudentDraggable = Active["data"] & {
  type: "student";
};

export type SeatNodeProps = Over["data"] & {
  current: Student & {
    sortable: SortableData["sortable"];
  };
};
export type StudentNodeProps = Node<Student, "student">;
export type StudentSidebarProps = Node<Student, "student-list">;
export type SeatingPlanNodeProps = NodeProps;
export type SeatingPlanNode =
  | StudentNodeProps
  | TwoSeatsDeskNodeProps
  | OneSeatDeskNodeProps
  | TextNodeProps;
