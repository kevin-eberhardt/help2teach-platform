"use server";
import { createClient } from "@/lib/supabase/server";
import { SeatingPlan } from "@/lib/supabase/types/additional.types";
import { Json } from "@/lib/supabase/types/database.types";
import { SeatingPlanNode } from "@/lib/types/seating-plan";

export async function saveName(name: string, id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("seating_plans")
    .update({ name })
    .eq("id", id);
  return { data, error };
}

export async function saveSeatingPlan(
  seatingPlan: SeatingPlan,
  nodes: SeatingPlanNode[]
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("seating_plans")
    .update({
      edited_at: new Date().toISOString(),
      name: seatingPlan.name,
      nodes: nodes as unknown as Json,
    })
    .eq("id", seatingPlan.id);
  return { data, error };
}
