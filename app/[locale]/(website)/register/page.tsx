import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SynchronousParams,
  SynchronousSearchParams,
} from "@/lib/next/types/layout";
import { useTranslations } from "next-intl";
import { use } from "react";
import RegisterForm from "./form";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("register-page");
  return {
    title: t("heading"),
  };
}

export default function RegisterPage(props: {
  params: SynchronousParams;
  searchParams: SynchronousSearchParams;
}) {
  const t = useTranslations("register-page");
  const searchParams = use(props.searchParams);
  const { error, message } = searchParams;
  const errorBoolean = Array.isArray(error) ? error.length > 0 : Boolean(error);
  return (
    <Card className="w-full max-w-sm mx-auto mt-6">
      <CardHeader>
        <CardTitle>{t("heading")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm error={errorBoolean} message={message as string} />
      </CardContent>
    </Card>
  );
}
