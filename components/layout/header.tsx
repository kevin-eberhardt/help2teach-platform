import Image from "next/image";
import LocaleSwitcher from "../locale-switcher";
import Link from "next/link";
import UserAvatar from "../user-avatar";

export default function Header() {
  return (
    <header className="flex gap-4 p-4 items-center shadow-md">
      <Link className="flex gap-2 items-center" href="/">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <span className="font-bold text-primary">Help2Teach</span>
      </Link>
      <div className="flex-grow">Header</div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <LocaleSwitcher />
        <UserAvatar />
      </div>
    </header>
  );
}
