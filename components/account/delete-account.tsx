"use client";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { useTranslations } from "next-intl";
import { Loader } from "lucide-react";
import { deleteAccount } from "./actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useRouter } from "@/lib/i18n/routing";

export default function DeleteAccount({ userId }: { userId: string }) {
  const t = useTranslations("delete-account");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  function handleClick() {
    startTransition(async () => {
      const { error } = await deleteAccount(userId);
      if (error) {
        setError(true);
        setMessage(t("error-message"));
      } else {
        router.refresh();
      }
    });
  }

  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="text-destructive">{t("heading")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
        {error && <p className="text-destructive">{message}</p>}
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              {isPending && <Loader className="animate-spin" />}
              {t("button")}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("alert-heading")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("alert-description")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleClick}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isPending && <Loader className="animate-spin" />}
                {t("delete")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
