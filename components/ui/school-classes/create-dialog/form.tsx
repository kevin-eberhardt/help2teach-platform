"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../input";
import { useTranslations } from "next-intl";
import { Button } from "../../button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function getCreateSchoolClassFormSchema(t?: (key: string) => string) {
  return z.object({
    name: z.string().min(1, {
      message: t ? t("create-dialog.name-error") : "The name is required",
    }),
  });
}

export type CreateSchoolClassFormValues = z.infer<
  Awaited<ReturnType<typeof getCreateSchoolClassFormSchema>>
>;

export default function CreateSchoolClassForm({
  callback,
}: {
  callback?: (open: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const t = useTranslations("school-class");
  const form = useForm<CreateSchoolClassFormValues>({
    resolver: zodResolver(getCreateSchoolClassFormSchema(t)),
    defaultValues: {
      name: "",
    },
  });
  async function onSubmit(values: CreateSchoolClassFormValues) {
    const supabase = await createClient();

    startTransition(async () => {
      const { error } = await supabase.from("classes").insert({
        name: values.name,
      });

      if (error) {
        console.error(error);
        form.setError("name", {
          message: t("create-dialog.submit-error-message"),
        });
      } else {
        form.reset();
        setMessage(t("create-dialog.submit-messages.class-created"));
      }
    });
    setTimeout(async () => {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .eq("name", values.name);
      if (error) {
        console.error(error);
      }
      if (data) {
        router.push(`/app/${data[0].id}/students`);
      }
      if (callback) {
        callback(false);
      }
    }, 2000);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("create-dialog.name")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                {t("create-dialog.name-description")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" loading={isPending} className="w-full">
          {t("create-dialog.submit")}
        </Button>

        {message && (
          <FormMessage className="text-green-500">{message}</FormMessage>
        )}
      </form>
    </Form>
  );
}
