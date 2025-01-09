"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  async function logout() {
    startTransition(async () => {
      const supabase = await createClient();
      await supabase.auth.signOut();
    });
    router.refresh();
  }
  return (
    <Button onClick={logout} loading={isPending} variant="outline">
      Logout
    </Button>
  );
}
