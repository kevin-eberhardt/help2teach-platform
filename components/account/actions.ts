"use server";
import { User } from "@/lib/supabase/types/additional.types";
import { UserFormValues } from "./user-form";
import { createClient } from "@/lib/supabase/server";

export async function updateUserName(user: User, values: UserFormValues) {
  const { first_name, last_name, full_name } = values;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.updateUser({
    data: {
      first_name,
      last_name,
      full_name,
    },
  });

  return { data, error };
}

export async function sendPasswordResetMail(email: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/reset-password`,
  });

  return { error };
}

export async function changeEmail(email: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    email,
  });

  return { error };
}
