"use server";

import { createClient } from "@/lib/supabase/server";
import { LoginFormValues } from "./form";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function login(values: LoginFormValues) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });
  if (error) {
    console.error(error);
    if (error.code === "invalid_credentials") {
      redirect("/login?error=true&message=invalid_credentials");
    }
    redirect(`/login?error=true&message=${error.message}`);
  }
  revalidatePath("/");
  redirect("/overview");
}
