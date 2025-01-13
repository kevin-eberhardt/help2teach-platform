import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import LoggedOutMenu from "./loggedout-menu";
import LoggedInMenu from "./loggedin-menu";
import { User as UserProps } from "@/lib/supabase/types/additional.types";

export default function UserAvatar({ user }: { user: UserProps | null }) {
  const userInitials = user?.user_metadata.full_name
    .split(" ")
    .map((n: string) => n[0])
    .join("");
  const avatarUrl = user?.user_metadata.avatar_url;

  return (
    <DropdownMenu>
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
      <DropdownMenuContent className="w-56">
        {user ? <LoggedInMenu /> : <LoggedOutMenu />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
