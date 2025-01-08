"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { RegisterFormValues } from "./form";

export default async function register(values: RegisterFormValues) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: {
        first_name: values.firstName,
        last_name: values.lastName,
      },
    },
  });
  if (error) {
    if (error.code === "user_already_exists") {
      redirect(`/register?error=true&message=${error.code}`);
    }
    redirect(`/register?error=true&message=${error.message}`);
  }
  redirect("/register?error=false&message=confirmation_sent");
}
