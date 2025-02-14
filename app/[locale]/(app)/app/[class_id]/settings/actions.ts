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
