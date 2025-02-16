"use client";

import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { User } from "@/lib/supabase/types/additional.types";
import { changeEmail } from "./actions";

export function getEmailChangeFormSchema(t?: (key: string) => string) {
  return z
    .object({
      email: z
        .string()
        .email()
        .min(1, { message: t?.("email-error") }),
      emailConfirmation: z
        .string()
        .email()
        .min(1, { message: t?.("emailConfirmation-error") }),
    })
    .refine((data) => data.email === data.emailConfirmation, {
      path: ["emailConfirmation"],
      message: t?.("email-not-match-error"),
    });
}

export type EmailChangeFormValues = z.infer<
  Awaited<ReturnType<typeof getEmailChangeFormSchema>>
>;

type EmailChangeFormProps = {
  email: User["email"];
};

export default function EmailChangeForm(props: EmailChangeFormProps) {
  const t = useTranslations("email-form");
  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const form = useForm<EmailChangeFormValues>({
    resolver: zodResolver(getEmailChangeFormSchema(t)),
    defaultValues: {
      email: props.email || "",
      emailConfirmation: "",
    },
  });

  const [formHasChanged, setFormHasChanged] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const subscription = form.watch(() => setFormHasChanged(true));
    return () => subscription.unsubscribe();
  }, [form]);

  async function onSubmit(values: EmailChangeFormValues) {
    startTransition(async () => {
      const { error } = await changeEmail(values.email);
      if (error) {
        setError(error.message);
      } else {
        setFormHasChanged(false);
      }
      setSent(true);
    });
  }

  return (
    <Form {...form}>
      <Card>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>{t("heading")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 justify-evenly">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormDescription>{t("email-description")}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailConfirmation"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("emailConfirmation")}</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormDescription>
                      {t("emailConfirmation-description")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error ? (
              <FormMessage className="mt-4">
                {t("submit-errors.email-not-changed")}
              </FormMessage>
            ) : sent ? (
              <FormMessage className="mt-4 text-green-500">
                {t("submit-messages.email-updated")}
              </FormMessage>
            ) : null}
          </CardContent>
          <CardFooter className="gap-4 justify-between">
            <Button type="reset" variant="outline" onClick={() => form.reset()}>
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              loading={isPending}
              disabled={!formHasChanged}
            >
              {t("submit")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Form>
  );
}
