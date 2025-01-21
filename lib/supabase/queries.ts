"use server";
import { createClient } from "./server";
import {
  SchoolClass,
  SchoolClassWithSchool,
  SeatingPlan,
  Student,
  User,
} from "./types/additional.types";

export async function getUser(): Promise<User> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user as unknown as User;
}

export async function getSchoolClasses(): Promise<SchoolClass[] | null> {
  const supabase = await createClient();
  const { data: schoolClasses } = await supabase.from("classes").select("*");
  return schoolClasses;
}

export async function getSchoolClassesWithSchool(): Promise<
  SchoolClassWithSchool[] | null
> {
  const supabase = await createClient();
  const { data: schoolClasses } = await supabase.from("classes").select(
    `
      *,
      school: schools(*)
    `
  );
  return schoolClasses;
}

export async function getSchoolClassById(
  id: string
): Promise<SchoolClass | null> {
  const supabase = await createClient();
  const { data: schoolClass } = await supabase
    .from("classes")
    .select("*")
    .eq("id", id)
    .single();
  return schoolClass;
}
export async function getSeatingPlansByClassId(
  classId: string
): Promise<SeatingPlan[] | null> {
  const supabase = await createClient();
  const { data: seatingPlans } = await supabase
    .from("seating_plans")
    .select("*")
    .eq("class_id", classId);
  return seatingPlans;
}
export async function getSeatingPlanById(
  id: string
): Promise<SeatingPlan | null> {
  const supabase = await createClient();
  const { data: seatingPlan } = await supabase
    .from("seating_plans")
    .select("*")
    .eq("id", id)
    .single();
  return seatingPlan;
}

export async function getStudentsByClassId(
  classId: string
): Promise<Student[] | null> {
  const supabase = await createClient();
  const { data: students } = await supabase
    .from("students")
    .select("*")
    .eq("class_id", classId);
  return students;
}
