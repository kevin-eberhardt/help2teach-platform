"use client";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { LogOut, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AccountDialog } from "../account/dialog";

export default function LoggedInMenu() {
  const router = useRouter();
  const t = useTranslations("user-menu");
  async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    router.refresh();
  }

  const [accountSettingsDialogOpen, setAccountSettingsDialogOpen] =
    useState(false);

  return (
    <>
      <DropdownMenuLabel>{t("account")}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => setAccountSettingsDialogOpen(true)}>
          <User />
          <span>{t("profile")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          <LogOut />
          <span>{t("logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <AccountDialog
        open={accountSettingsDialogOpen}
        setOpen={setAccountSettingsDialogOpen}
      />
    </>
  );
}
