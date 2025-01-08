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
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import register from "./action";

export function getRegisterFormSchema(t?: (key: string) => string) {
  return z
    .object({
      firstName: z.string().min(1, {
        message: t ? t("firstName-error") : "Your first name is required.",
      }),
      lastName: z.string().min(1, {
        message: t ? t("lastName-error") : "Your last name is required.",
      }),
      email: z
        .string()
        .email({ message: t ? t("email-error") : "Your email is invalid." }),
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

export type RegisterFormValues = z.infer<
  Awaited<ReturnType<typeof getRegisterFormSchema>>
>;

type RegisterFormProps = {
  error?: boolean;
  message?: string;
};
export default function RegisterForm(props: RegisterFormProps) {
  const t = useTranslations("register-form");
  const { error, message } = props;

  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(getRegisterFormSchema(t)),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });
  function onSubmit(values: RegisterFormValues) {
    startTransition(() => {
      register(values);
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("firstName")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("lastName")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
              <FormLabel>{t("password")}</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormDescription>{t("password-description")}</FormDescription>
              <FormMessage />
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
                <PasswordInput {...field} />
              </FormControl>
              <FormDescription>
                {t("passwordConfirmation-description")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Link href="/login" className="text-sm">
            {t("login")}
          </Link>
        </div>
        <Button type="submit" loading={isPending}>
          {t("submit")}
        </Button>
      </form>
      {error && message === "user_already_exists" ? (
        <FormMessage className="mt-4">
          {t("submit-errors.user-already-exists")}
        </FormMessage>
      ) : message ? (
        message === "confirmation_sent" ? (
          <FormMessage className="mt-4 text-green-500">
            {t("submit-messages.confirmation-sent")}
          </FormMessage>
        ) : (
          <FormMessage className="mt-4 text-green-500">{message}</FormMessage>
        )
      ) : null}
    </Form>
  );
}
