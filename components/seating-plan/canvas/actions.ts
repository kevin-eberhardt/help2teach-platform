"use server";

import { createClient } from "@/lib/supabase/server";
import { SeatingPlan } from "@/lib/supabase/types/additional.types";

export async function updateSeatingPlanPreview(seatingPlanId: SeatingPlan["id"], dataUrl: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.from("seating_plans").update({
        preview_img_data: dataUrl
    }).eq("id", seatingPlanId);
    return { data, error };
}