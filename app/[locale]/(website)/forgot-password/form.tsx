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
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function getForgotPasswordFormSchema(t?: (key: string) => string) {
  return z.object({
    email: z
      .string()
      .email({ message: t ? t("email-error") : "Your email is invalid." }),
  });
}

export type ForgotPasswordFormValues = z.infer<
  Awaited<ReturnType<typeof getForgotPasswordFormSchema>>
>;
export default function ForgotPasswordForm() {
  const t = useTranslations("forgot-password-form");

  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{
    error: boolean;
    code: string;
    message: string;
  } | null>(null);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(getForgotPasswordFormSchema(t)),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(values: ForgotPasswordFormValues) {
    startTransition(async () => {
      const supabase = await createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(
        values.email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );
      if (error) {
        setMessage({
          error: true,
          code: error.code as string,
          message: error.message,
        });
      }
      form.reset();
      setMessage({
        error: false,
        code: "",
        message: t("submit-messages.reset-mail-sent"),
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormDescription>{t("email-description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" loading={isPending} className="w-full">
          {t("submit")}
        </Button>

        {message && (
          <FormMessage className={`mt-4 ${!message.error && "text-green-500"}`}>
            {message.message}
          </FormMessage>
        )}
      </form>
    </Form>
  );
}
