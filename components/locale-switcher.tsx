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
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LocaleSwitcher() {
  const t = useTranslations("locale-switcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const allParams = searchParams.toString();

  const [value, setValue] = useState(locale);

  function onChange(value: string) {
    setValue(value);
    const newPathname = allParams ? `${pathname}?${allParams}` : pathname;

    router.replace(newPathname, { locale: value });
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
