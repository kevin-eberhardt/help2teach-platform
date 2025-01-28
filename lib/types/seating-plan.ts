import { Coordinates, UniqueIdentifier } from "@dnd-kit/core/dist/types";
import { Student } from "../supabase/types/additional.types";

export enum SeatingPlanElementType {
  Student,
  Custom,
  OneSeatDesk,
  TwoSeatsDesk,
}
export type Seat = {
  id: string;
  student?: Student|null;
}
export type SeatingPlanGenericElement = {
  id: UniqueIdentifier;
  coordinates: Coordinates;
  type: SeatingPlanElementType;
};
export type CustomElement = SeatingPlanGenericElement & {
  text: string;
};

export type StudentElement = SeatingPlanGenericElement & {
  student: Student;
}

export type TwoSeatsDeskElement = SeatingPlanGenericElement & {
  students: Array<Student>;
};

export type OneSeatDeskElement = SeatingPlanGenericElement & {
  student: Student | null;
};

export type SeatingPlanElement = CustomElement | TwoSeatsDeskElement | StudentElement;
