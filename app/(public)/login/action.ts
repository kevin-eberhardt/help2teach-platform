"use server";
import { z } from "zod";
import { loginFormSchema } from "./form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function login(values: z.infer<typeof loginFormSchema>) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });
  if (error) {
    if (error.code === "invalid_credentials") {
      redirect(encodeURI("/login?error=Ungültige Anmeldedaten."));
    }
  }
}
