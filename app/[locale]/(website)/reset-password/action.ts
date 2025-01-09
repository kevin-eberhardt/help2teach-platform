"use server";
import { createClient } from "@/lib/supabase/server";
import { ResetPasswordFormValues } from "./form";

export default async function resetPassword(values: ResetPasswordFormValues) {
  const supabase = await createClient();
  await supabase.auth.updateUser({ password: values.password });
}
