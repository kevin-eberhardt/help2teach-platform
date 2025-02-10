"use server";
import { createClient } from "@/lib/supabase/server";
import { SeatingPlan } from "@/lib/supabase/types/additional.types";

export async function createSeatingPlan(
  classId: SeatingPlan["class_id"],
  name: string
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("seating_plans")
    .insert({ name, class_id: classId })
    .select("*")
    .single();
  if (error) {
    throw error;
  }
  return data;
}

export async function renameSeatingPlan(
  seatingPlanId: SeatingPlan["id"],
  name: string
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("seating_plans")
    .update({ name })
    .eq("id", seatingPlanId)
    .select("*")
    .single();
  return error;
}

export async function deleteSeatingPlan(id: SeatingPlan["id"]) {
  const supabase = await createClient();
  const { error } = await supabase.from("seating_plans").delete().eq("id", id);
  return error;
}

export async function duplicateSeatingPlan(
  id: SeatingPlan["id"],
  newName: string = "Copy"
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("seating_plans")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  const newSeatingPlan = {
    ...data,
    id: undefined,
    name: `${data.name} ${newName}`,
  };

  const { error: insertError } = await supabase
    .from("seating_plans")
    .insert(newSeatingPlan)
    .select("*")
    .single();
  return insertError;
}
