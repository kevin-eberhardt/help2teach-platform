"use server";

import { createClient } from "@/lib/supabase/server";
import { SeatingPlanProps } from "@/lib/supabase/types/additional.types";

export async function editName(seatingPlanId: SeatingPlanProps["id"], newName: string) {
    const supabase = await createClient();
    const {data, error} = await supabase.from("seating_plans").update({name: newName, edited_at: new Date().toISOString()}).match({id: seatingPlanId});
    if (error) {
        throw error;
    }
}