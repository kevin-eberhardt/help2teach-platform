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
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import resetPassword from "./action";

export function getResetPasswordFormSchema(t?: (key: string) => string) {
  return z
    .object({
      password: z.string().min(8, {
        message: t
          ? t("password-error")
          : "Your password is required and must be at least 8 characters.",
      }),
      passwordConfirmation: z.string().min(8, {
        message: t
          ? t("passwordConfirmation-error")
          : "Your password confirmation is required.",
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: t
        ? t("passwords-do-not-match-error")
        : "Your passwords do not match.",
      path: ["passwordConfirmation"],
    });
}

export type ResetPasswordFormValues = z.infer<
  Awaited<ReturnType<typeof getResetPasswordFormSchema>>
>;

type ResetPasswordFormProps = {
  errorCode?: string;
  errorMessage?: string;
};
export default function ResetPasswordForm(props: ResetPasswordFormProps) {
  const { errorCode, errorMessage } = props;
  const hasError = Boolean(errorCode && errorMessage);
  const t = useTranslations("reset-password-form");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(getResetPasswordFormSchema(t)),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });
  function onSubmit(values: ResetPasswordFormValues) {
    startTransition(async () => {
      resetPassword(values);
      setMessage(t("submit-messages.password-reset"));
      form.reset();
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("password")}</FormLabel>
              <FormControl>
                <PasswordInput {...field} disabled={hasError} />
              </FormControl>
              <FormMessage />
              <FormDescription>{t("password-description")}</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("passwordConfirmation")}</FormLabel>
              <FormControl>
                <PasswordInput {...field} disabled={hasError} />
              </FormControl>
              <FormDescription>
                {t("passwordConfirmation-description")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" loading={isPending} disabled={hasError}>
          {t("submit")}
        </Button>

        {hasError &&
          (errorCode === "otp_expired" ? (
            <FormMessage>{t("errors.otp-expired")}</FormMessage>
          ) : (
            <FormMessage>{errorMessage}</FormMessage>
          ))}

        {message && (
          <FormMessage className="text-green-500">{message}</FormMessage>
        )}
      </form>
    </Form>
  );
}
