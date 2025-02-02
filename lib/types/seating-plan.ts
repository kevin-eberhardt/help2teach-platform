import { UniqueIdentifier } from "@dnd-kit/core";
import { Coordinates } from "@dnd-kit/utilities";

export enum SeatingPlanElementTypes {
  Student,
  TwoSeatsDesk,
  OneSeatDesk,
  StudentList,
  CustomText,
}
export type SeatingPlanCoreElementType = {
  id: UniqueIdentifier;
  coordinates: Coordinates;
  data?: object;
  type: SeatingPlanElementTypes;
  rotation?: number;
  width: number;
  height: number;
};

export type CustomTextSeatingPlanElementType = SeatingPlanCoreElementType & {
  data: {
    text: string;
  };
};

export type StudentListSeatingPlanElementType = SeatingPlanCoreElementType & {
  students: StudentSeatingPlanElementType[];
};

export type StudentSeatingPlanElementType = SeatingPlanCoreElementType & {
  data: StudentSeatingPlanElementType;
};
export type TwoSeatsDeskSeatingPlanElementType = SeatingPlanCoreElementType & {
  students: StudentSeatingPlanElementType[];
};
export type OneSeatDeskSeatingPlanElementType = SeatingPlanCoreElementType & {
  student: StudentSeatingPlanElementType;
};

export type SeatingPlanElementType =
  | CustomTextSeatingPlanElementType
  | StudentSeatingPlanElementType
  | TwoSeatsDeskSeatingPlanElementType
  | OneSeatDeskSeatingPlanElementType;
