import { useTranslations } from "next-intl";
import Link from "next/link";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { User, UserPlus } from "lucide-react";

export default function LoggedOutMenu() {
  const t = useTranslations("user-menu");
  return (
    <>
      <Link href="/login">
        <DropdownMenuItem>
          <User />
          <span>{t("login")}</span>
        </DropdownMenuItem>
      </Link>
      <Link href="/register">
        <DropdownMenuItem>
          <UserPlus />
          <span>{t("register")}</span>
        </DropdownMenuItem>
      </Link>
    </>
  );
}
