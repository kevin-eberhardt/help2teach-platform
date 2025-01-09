"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    router.refresh();
  }
  return <div onClick={logout}>{children ? children : "Logout"}</div>;
}
