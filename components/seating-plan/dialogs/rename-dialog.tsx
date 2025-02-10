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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SeatingPlan } from "@/lib/supabase/types/additional.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { renameSeatingPlan } from "./actions";
import { useRouter } from "@/lib/i18n/routing";
import { useToast } from "@/hooks/use-toast";

export function getFormSchema(t?: (key: string) => string) {
  return z.object({
    name: z.string().min(1, {
      message: t ? t("rename-dialog.name-error") : "Name is required.",
    }),
  });
}

export type FormValues = z.infer<Awaited<ReturnType<typeof getFormSchema>>>;

export default function RenameDialog({
  seatingPlanId,
  seatingPlanName,
  open,
  onOpenChange,
}: {
  seatingPlanId: SeatingPlan["id"];
  seatingPlanName: SeatingPlan["name"];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("seating-plan");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const toast = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(getFormSchema(t)),
    defaultValues: {
      name: seatingPlanName || "",
    },
  });
  function onSubmit(values: FormValues) {
    startTransition(async () => {
      const error = await renameSeatingPlan(seatingPlanId, values.name);
      if (error) {
        form.setError("name", { message: error.message });
      } else {
        onOpenChange(false);
        router.refresh();
        // TODO: Success toast
      }
    });
  }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <AlertDialogHeader>
              <AlertDialogTitle>{t("rename-dialog.heading")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t.rich("rename-dialog.description", {
                  quotes: (chunks) => <q>{chunks}</q>,
                })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("rename-dialog.name")}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    {t("rename-dialog.name-description")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel>
                {t("rename-dialog.cancel-button")}
              </AlertDialogCancel>
              <AlertDialogAction
                type="submit"
                disabled={isPending || form.getFieldState("name").invalid}
                onClick={form.handleSubmit(onSubmit)}
              >
                {isPending && <Loader className="animate-spin" />}
                {t("rename-dialog.rename-button")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
