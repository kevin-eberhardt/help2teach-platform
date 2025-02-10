import { Student } from "@/lib/supabase/types/additional.types";
import { NodeType } from "@/lib/types/seating-plan";

export const ONE_SEAT_DESK_SETTINGS = {
  width: 140,
  height: 82,
};

export const TWO_SEATS_DESK_SETTINGS = {
  width: 280,
  height: 82,
};
export const STUDENT_SETTINGS = {
  width: 120,
  height: 55,
};

export function checkIfToolbarItem(type: NodeType) {
  return type === "twoSeatsDesk" || type === "oneSeatDesk" || type === "text";
}

export function checkIfDesk(type: NodeType) {
  return type === "twoSeatsDesk" || type === "oneSeatDesk";
}

export function generateEmptySeatsForTable(
  id: string,
  amountSeats: number = 2
): Student[] {
  const emptySeats = [];
  for (let i = 0; i < amountSeats; i++) {
    emptySeats.push({
      id: `${id}-empty-${i}`,
      name: "",
      class_id: null,
      gender: null,
    });
  }
  return emptySeats as unknown as Student[];
}