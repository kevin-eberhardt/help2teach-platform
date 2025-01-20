import Image from "next/image";
import LocaleSwitcher from "./locale-switcher";
import Link from "next/link";
import UserAvatar from "./user-avatar";
import { getUser } from "@/lib/supabase/queries";
import { Button } from "./ui/button";

export default async function Header() {
  const user = await getUser();
  return (
    <header className="flex gap-4 p-4 items-center justify-between shadow-md">
      <Link className="flex gap-2 items-center" href="/">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <span className="font-bold text-primary">Help2Teach</span>
      </Link>
      <Button>
        <Link href="/app">To App</Link>
      </Button>
      <div className="flex gap-2 items-center">
        <LocaleSwitcher />
        <UserAvatar user={user} />
      </div>
    </header>
  );
}
