"use server";

import { createClient } from "@/lib/supabase/server";
import { SeatingPlanProps } from "@/lib/supabase/types/additional.types";
import { SeatingPlanElementType } from "@/lib/types/seating-plan";

export async function saveElements(elements: SeatingPlanElementType[], seatingPlanId: SeatingPlanProps["id"]) {
    const supabase = await createClient();
    const { error } = await supabase.from("seating_plans").update({nodes: elements, edited_at: new Date().toISOString()}).eq("id", seatingPlanId);

    if (error) {
        throw error;
    }

}