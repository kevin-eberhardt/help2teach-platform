"use server";
import { createClient } from "@/lib/supabase/server";

export async function changeSchoolClassName(name: string, classId: number) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("classes")
    .update({ name })
    .eq("id", classId);

  return { error };
}

export async function deleteSchoolClass(classId: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("classes").delete().eq("id", classId);
  return { error };
}
