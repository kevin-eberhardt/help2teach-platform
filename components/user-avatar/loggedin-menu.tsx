"use client";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { LogOut, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function LoggedInMenu() {
  const router = useRouter();
  const t = useTranslations("user-menu");
  async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    router.refresh();
  }
  return (
    <>
      <DropdownMenuLabel>{t("account")}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Settings />
          <span>{t("settings")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          <LogOut />
          <span>{t("logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
}
