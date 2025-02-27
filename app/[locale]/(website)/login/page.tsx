import { useTranslations } from "next-intl";
import LoginForm from "./form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { use } from "react";
import {
  SynchronousParams,
  SynchronousSearchParams,
} from "@/lib/next/types/layout";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("login-page");
  return {
    title: t("heading"),
  };
}

export default function LoginPage(props: {
  params: SynchronousParams;
  searchParams: SynchronousSearchParams;
}) {
  const t = useTranslations("login-page");
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
        <LoginForm error={errorBoolean} message={message as string} />
      </CardContent>
    </Card>
  );
}
