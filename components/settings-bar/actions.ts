"use server";
import { createClient } from "@/lib/supabase/server";
import { SeatingPlan } from "@/lib/supabase/types/additional.types";

export async function saveName(name: string, id: string) {
    const supabase = await createClient();
  const { data, error } = await supabase.from("seating_plans").update({ name }).eq("id", id);
  return { data, error };
}

export async function saveSeatingPlan(seatingPlan: SeatingPlan) {
    const supabase = await createClient();
  
  const { data, error } = await supabase.from("seating_plans").update(seatingPlan).eq("id", seatingPlan.id);
  return { data, error };
}