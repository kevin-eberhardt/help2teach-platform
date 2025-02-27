"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createSeatingPlan } from "./actions";
import { useRouter } from "next/navigation";
import { sendGTMEvent } from "@next/third-parties/google";

export function FormSchema(t?: (key: string) => string) {
  return z.object({
    name: z.string().min(1, {
      message: t
        ? t("create-seating-plan-dialog.name-error")
        : "Name is required.",
    }),
  });
}

export type FormValues = z.infer<Awaited<ReturnType<typeof FormSchema>>>;

export default function CreateSeatingPlanDialog({
  classId,
}: {
  classId: SeatingPlan["class_id"];
}) {
  const t = useTranslations("seating-plan");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema(t)),
    defaultValues: {
      name: "",
    },
  });
  function onSubmit(values: FormValues) {
    startTransition(async () => {
      const seatingPlan = await createSeatingPlan(classId, values.name);
      if (seatingPlan) {
        router.push(`/app/${classId}/seating-plans/${seatingPlan.id}`);
      }
    });
    sendGTMEvent({ event: "create_seating_plan" });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {t("create-seating-plan-dialog.heading")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>
                {t("create-seating-plan-dialog.heading")}
              </DialogTitle>
              <DialogDescription>
                {t.rich("create-seating-plan-dialog.description", {
                  quotes: (chunks) => <q>{chunks}</q>,
                })}
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("create-seating-plan-dialog.name")}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    {t("create-seating-plan-dialog.name-description")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="animate-spin" />}
                {t("create-seating-plan-dialog.create-button")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
