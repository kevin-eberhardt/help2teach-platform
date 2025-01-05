"use client";
import { useLocale, useTranslations } from "next-intl";
import { routing, usePathname, useRouter } from "@/lib/i18n/routing";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function LocaleSwitcher() {
  const t = useTranslations("locale-switcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [value, setValue] = useState(locale);

  function onChange(value: string) {
    setValue(value);
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: value }
    );
  }

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder={t("locale", { locale: locale })} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("label")}</SelectLabel>
          {routing.locales.map((cur) => (
            <SelectItem key={cur} value={cur}>
              {t("locale", { locale: cur })}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
