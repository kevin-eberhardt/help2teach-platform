import { Coordinates } from "@dnd-kit/core/dist/types";
import { Student } from "../supabase/types/additional.types";

export enum SeatingPlanElementType {
  Custom,
  OneSeatDesk,
  TwoSeatsDesk,
}
export type SeatingPlanGenericElement = {
  id: string;
  coordinates: Coordinates;
  type: SeatingPlanElementType;
};
export type CustomElement = SeatingPlanGenericElement & {
  text: string;
};

export type TwoSeatsDeskElement = SeatingPlanGenericElement & {
  students: Student[];
};

export type OneSeatDeskElement = SeatingPlanGenericElement & {
  student: Student | null;
};

export type SeatingPlanElement = CustomElement | TwoSeatsDeskElement;
