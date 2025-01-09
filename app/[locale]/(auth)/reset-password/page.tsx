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
import ResetPasswordForm from "./form";

export default function ResetPasswordPage(props: {
  params: SynchronousParams;
  searchParams: SynchronousSearchParams;
}) {
  const searchParams = use(props.searchParams);
  const { error_code, error_description } = searchParams;

  const t = useTranslations("reset-password-page");
  return (
    <Card className="w-full md:max-w-md mx-auto mt-6">
      <CardHeader>
        <CardTitle>{t("heading")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm
          errorCode={error_code as string}
          errorMessage={error_description as string}
        />
      </CardContent>
    </Card>
  );
}
