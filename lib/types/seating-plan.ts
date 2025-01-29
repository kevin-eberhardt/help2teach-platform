import { UniqueIdentifier } from "@dnd-kit/core";
import { Coordinates } from "@dnd-kit/utilities";
import { Student } from "../supabase/types/additional.types";

export enum SeatingPlanElementTypes {
  Student,
  TwoSeatsDesk,
  OneSeatDesk,
}
export type SeatingPlanCoreElementType = {
  id: UniqueIdentifier;
  coordinates: Coordinates;
  data?: any;
  type: SeatingPlanElementTypes;
};

export type StudentSeatingPlanElementType = SeatingPlanCoreElementType & {
  data: Student;
};
export type TwoSeatsDeskSeatingPlanElementType = SeatingPlanCoreElementType & {
  students: StudentSeatingPlanElementType[];
};
export type OneSeatDeskSeatingPlanElementType = SeatingPlanCoreElementType & {
  student: StudentSeatingPlanElementType;
};

export type SeatingPlanElementType =
  | StudentSeatingPlanElementType
  | TwoSeatsDeskSeatingPlanElementType
  | OneSeatDeskSeatingPlanElementType;
