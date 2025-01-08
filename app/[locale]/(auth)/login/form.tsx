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
import login from "./action";
import Link from "next/link";
import { useTransition } from "react";

export function getLoginFormSchema(t?: (key: string) => string) {
  return z.object({
    email: z
      .string()
      .email({ message: t ? t("email-error") : "Your email is invalid." }),
    password: z.string().min(1, {
      message: t ? t("password-error") : "Your password is required.",
    }),
  });
}

export type LoginFormValues = z.infer<
  Awaited<ReturnType<typeof getLoginFormSchema>>
>;

type LoginFormProps = {
  error?: boolean;
  message?: string;
};

export default function LoginForm(props: LoginFormProps) {
  const t = useTranslations("login-form");
  const { error, message } = props;

  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(getLoginFormSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: LoginFormValues) {
    startTransition(() => {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values);
      login(values);
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>{t("password")}</FormLabel>
                <Link href="/forgot-password" className="text-sm">
                  {t("forgot-password")}
                </Link>
              </div>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>{t("password-description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Link href="/register" className="text-sm">
            {t("register")}
          </Link>
        </div>
        <Button type="submit" loading={isPending}>
          {t("submit")}
        </Button>
      </form>
      {error && message === "invalid_credentials" && (
        <FormMessage className="mt-4">
          {t("submit-errors.invalid-credentials")}
        </FormMessage>
      )}
    </Form>
  );
}
