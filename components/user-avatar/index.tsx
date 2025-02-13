"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import LoggedOutMenu from "./loggedout-menu";
import LoggedInMenu from "./loggedin-menu";
import { User as UserProps } from "@/lib/supabase/types/additional.types";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "@/lib/i18n/routing";
import { AccountDialog } from "../account/dialog";

export default function UserAvatar({ user }: { user: UserProps | null }) {
  const userInitials = user?.user_metadata.full_name
    .split(" ")
    .map((n: string) => n[0])
    .join("");
  const avatarUrl = user?.user_metadata.avatar_url;
  const [isOpen, setIsOpen] = useState(false);
  const [accountSettingsDialogOpen, setAccountSettingsDialogOpen] =
    useState(true);
  const router = useRouter();
  const t = useTranslations("user-menu");
  async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    router.refresh();
  }
  return (
    <>
      <DropdownMenu onOpenChange={(open) => setIsOpen(open)} open={isOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            {user ? (
              <Avatar>
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            ) : (
              <User className="size-8" />
            )}
          </Button>
        </DropdownMenuTrigger>

        {user ? (
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{t("account")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => setAccountSettingsDialogOpen(true)}
              >
                <User />
                <span>{t("profile")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut />
                <span>{t("logout")}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent className="w-56">
            <LoggedOutMenu />
          </DropdownMenuContent>
        )}
      </DropdownMenu>
      {user && (
        <AccountDialog
          open={accountSettingsDialogOpen}
          setOpen={setAccountSettingsDialogOpen}
          user={user}
        />
      )}
    </>
  );
}
