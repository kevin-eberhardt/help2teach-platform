"use server";

import { createClient } from "@/lib/supabase/server";
import { Student } from "@/lib/supabase/types/additional.types";

export async function updateStudent({
  studentId,
  columnName,
  columnValue,
}: {
  studentId: number;
  columnName: "name";
  columnValue: string;
}) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("students")
    .update({ [columnName]: columnValue })
    .eq("id", studentId)
    .select("*")
    .single();
  return data;
}

export async function deleteStudent({
  studentId,
}: {
  studentId: number;
  schoolClassId: number;
}) {
  const supabase = await createClient();
  await supabase.from("students").delete().eq("id", studentId);
}

export async function addStudent(schoolClassId: number): Promise<Student> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("students")
    .insert({ name: "", gender: null, class_id: schoolClassId })
    .select("*")
    .single();

  if (!data) {
    throw new Error("Failed to add student");
  }

  return data;
}
