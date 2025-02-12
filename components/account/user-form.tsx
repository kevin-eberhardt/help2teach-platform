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
import { useTransition } from "react";
import { User } from "@/lib/supabase/types/additional.types";
import { Card, CardContent, CardFooter } from "../ui/card";

export function getUserFormSchema(t?: (key: string) => string) {
  return z.object({
    first_name: z.string().min(1, { message: t?.("firstName-error") }),
    last_name: z.string().min(1, { message: t?.("lastName-error") }),
    full_name: z.string().min(1, { message: t?.("fullName-error") }),
  });
}

export type UserFormValues = z.infer<
  Awaited<ReturnType<typeof getUserFormSchema>>
>;

type UserFormProps = {
  error?: boolean;
  message?: string;
  user: User;
};

export default function UserForm(props: UserFormProps) {
  const t = useTranslations("user-form");
  const { user, error, message } = props;

  const [isPending, startTransition] = useTransition();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(getUserFormSchema(t)),
    defaultValues: {
      first_name: user.user_metadata.first_name,
      last_name: user.user_metadata.last_name,
      full_name: user.user_metadata.full_name,
    },
  });
  function onSubmit(values: UserFormValues) {
    startTransition(() => {
      console.log("Update user", values);
    });
  }

  return (
    <Form {...form}>
      <Card className="pt-4">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex gap-2 justify-evenly">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("firstName")}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      {t("firstName-description")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("lastName")}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      {t("lastName-description")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("fullName")}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription>{t("fullName-description")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="gap-4 justify-between">
            <Button type="reset" variant="outline" onClick={() => form.reset()}>
              {t("cancel")}
            </Button>
            <Button type="submit" loading={isPending}>
              {t("submit")}
            </Button>
          </CardFooter>
        </form>
        {error && message === "invalid_credentials" && (
          <FormMessage className="mt-4">
            {t("submit-errors.invalid-credentials")}
          </FormMessage>
        )}
      </Card>
    </Form>
  );
}
