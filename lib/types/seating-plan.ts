import { UniqueIdentifier } from "@dnd-kit/core"
import { Coordinates } from "@dnd-kit/utilities";

export type SeatingPlanElement = {
    id: UniqueIdentifier;
    coordinates: Coordinates;
    data?: any;
    type: string;
}