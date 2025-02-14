"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteSchoolClass } from "./actions";
import { useState, useTransition } from "react";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";
import { Loader } from "lucide-react";
import { useRouter } from "@/lib/i18n/routing";
import { useToast } from "@/hooks/use-toast";
export default function DeleteClassForm({ classId }: { classId: number }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations("delete-class-form");
  function handleDelete() {
    startTransition(async () => {
      const { error } = await deleteSchoolClass(classId);
      if (error) {
        setError(t("error-message"));
      } else {
        router.push("/app");
        toast({
          title: t("success-message"),
        });
      }
    });
  }
  return (
    <>
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">{t("heading")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        {error && (
          <CardContent>
            <p className="text-destructive text-sm">{error}</p>
          </CardContent>
        )}
        <CardFooter>
          <Button
            variant="destructive"
            loading={isPending}
            onClick={() => setOpen(true)}
          >
            {t("delete-button")}
          </Button>
        </CardFooter>
      </Card>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("dialog.heading")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("dialog.description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("dialog.cancel-button")}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending && <Loader className="animate-spin" />}
              {t("dialog.delete-button")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
