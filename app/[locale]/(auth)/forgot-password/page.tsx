import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import ForgotPasswordForm from "./form";

export default function ForgotPasswordPage() {
  const t = useTranslations("forgot-password-page");
  return (
    <Card className="w-full md:max-w-md mx-auto mt-6">
      <CardHeader>
        <CardTitle>{t("heading")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
    </Card>
  );
}
