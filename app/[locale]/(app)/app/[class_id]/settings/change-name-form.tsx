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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { changeSchoolClassName } from "./actions";
import { useRouter } from "@/lib/i18n/routing";

export function getChangeScoolClassNameFormSchema(t?: (key: string) => string) {
  return z.object({
    name: z.string().min(1, {
      message: t ? t("name-error") : "The school class name is required.",
    }),
  });
}

export type ChangeScoolClassNameFormValues = z.infer<
  Awaited<ReturnType<typeof getChangeScoolClassNameFormSchema>>
>;

type ChangeScoolClassNameFormProps = {
  currentName: string | null;
  classId: number;
};

export default function ChangeSchoolClassNameForm(
  props: ChangeScoolClassNameFormProps
) {
  const t = useTranslations("settings-page.change-school-class-name-form");
  const { currentName, classId } = props;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(false);
  const [formHasChanged, setFormHasChanged] = useState(false);
  const router = useRouter();

  const form = useForm<ChangeScoolClassNameFormValues>({
    resolver: zodResolver(getChangeScoolClassNameFormSchema(t)),
    defaultValues: {
      name: currentName || "",
    },
  });
  async function onSubmit(values: ChangeScoolClassNameFormValues) {
    startTransition(async () => {
      const { error } = await changeSchoolClassName(values.name, classId);
      if (error) {
        setError(true);
      } else {
        router.refresh();
      }
      setFormHasChanged(false);
    });
  }
  useEffect(() => {
    const subscription = form.watch((value) => {
      setFormHasChanged(value.name !== currentName);
    });
    return () => subscription.unsubscribe();
  }, [form, currentName]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>{t("heading")}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription>{t("name-description")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <FormMessage className="mt-4">
                {t("submit-errors.invalid-name")}
              </FormMessage>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              loading={isPending}
              disabled={!formHasChanged}
            >
              {t("submit")}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
