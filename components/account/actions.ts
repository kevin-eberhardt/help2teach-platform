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
