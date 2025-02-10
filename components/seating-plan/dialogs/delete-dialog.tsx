"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SeatingPlan } from "@/lib/supabase/types/additional.types";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { deleteSeatingPlan } from "./actions";
import { useRouter } from "@/lib/i18n/routing";

export default function DeleteDialog({
  seatingPlanId,
  open,
  onOpenChange,
}: {
  seatingPlanId: SeatingPlan["id"];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("seating-plan");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  function handleDelelete() {
    startTransition(async () => {
      const error = await deleteSeatingPlan(seatingPlanId);
      if (error) {
        // TODO: Show error in toast
        return;
      }
      onOpenChange(false);
      router.refresh();
      // TODO: Show success in toast
    });
  }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("delete-dialog.heading")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("delete-dialog.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t("delete-dialog.cancel-button")}
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90"
            onClick={handleDelelete}
            disabled={isPending}
          >
            {t("delete-dialog.delete-button")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
