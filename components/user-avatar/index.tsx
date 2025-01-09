import { getUser } from "@/lib/supabase/queries";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatarMenu from "./menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";

export default async function UserAvatar() {
  const user = await getUser();
  if (user) {
    console.log(user);
    const userInitials = user.user_metadata.full_name
      .split(" ")
      .map((n: string) => n[0])
      .join("");
    const avatarUrl = user.user_metadata.avatar_url;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <UserAvatarMenu />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <Avatar>
              <AvatarFallback>
                <AvatarImage src={undefined} />
                <User className="size-8" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <LoginItem />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}

function LoginItem() {
  const t = useTranslations("user-menu");
  return (
    <Link href="/login">
      <DropdownMenuItem>
        <User />
        <span>{t("login")}</span>
      </DropdownMenuItem>
    </Link>
  );
}
