import { getUser } from "@/lib/supabase/queries";
import LogoutButton from "./logout";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function UserAvatar() {
  const user = await getUser();
  if (user) {
    return <LogoutButton />;
  } else {
    return (
      <Button variant="ghost" asChild>
        <Link href="/login">Login</Link>
      </Button>
    );
  }
}
