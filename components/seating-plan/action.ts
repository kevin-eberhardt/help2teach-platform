"use server";

import { createClient } from "@/lib/supabase/server";
import { SeatingPlan } from "@/lib/supabase/types/additional.types";

export async function saveSeatingPlan(seatingPlan: SeatingPlan) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("seating_plans")
    .update({ ...seatingPlan, edited_at: new Date().toISOString() })
    .eq("id", seatingPlan.id)
    .select("*")
    .single();
  return { data, error };
}
