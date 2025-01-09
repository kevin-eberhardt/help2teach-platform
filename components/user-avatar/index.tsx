import { getUser } from "@/lib/supabase/queries";
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

export default async function UserAvatar() {
  const user = await getUser();
  if (user) {
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
          <LoggedInMenu />
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
          <LoggedOutMenu />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
