
import { Node as ReactFlowNode, NodeProps } from "@xyflow/react";
import { SeatingPlan, Student } from "../supabase/types/additional.types";

export type NodeType = "student" | "twoSeatsDesk" | "oneSeatDesk" | "student-list"

export type Node<T = any, TType extends NodeType = any> = ReactFlowNode & {
    data?: T;
    type?: TType;
}

export type SeatingPlanProps = {
    students: Student[];
    seatingPlan: SeatingPlan;
}

export type OneSeatDeskNodeProps = Node<{
    student: Student;
}, "twoSeatsDesk">;

export type TwoSeatsDeskNodeProps = Node<{
    students: Student[];
}, "twoSeatsDesk">;

export type GenericNodeProps<T = any> = React.HTMLProps<HTMLDivElement> & { data?: T, type?: NodeType };

export type StudentNodeProps = Node<Student, "student">;
export type StudentSidebarProps = Node<Student, "student-list">;
export type SeatingPlanNodeProps = NodeProps;
export type SeatingPlanNode = StudentNodeProps | TwoSeatsDeskNodeProps | OneSeatDeskNodeProps;