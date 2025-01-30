"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Loader2 } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { editName } from "./actions";
import { SeatingPlanProps } from "@/lib/supabase/types/additional.types";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

export function getInputSchema(t?: (key: string) => string) {
  return z.object({
    name: z.string().min(1, {
      message: t ? t("settings.name-input-error") : "Please enter a name.",
    }),
  });
}

export type InputSchema = z.infer<Awaited<ReturnType<typeof getInputSchema>>>;
export default function NameEditInput({
  name,
  id,
}: {
  name: string;
  id: SeatingPlanProps["id"];
}) {
  const t = useTranslations("seating-plan");
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();

  const form = useForm<InputSchema>({
    resolver: zodResolver(getInputSchema(t)),
    defaultValues: {
      name: name,
    },
  });
  function onSubmit(values: InputSchema) {
    if (values.name === name) {
      return;
    }
    startTransition(() => {
      editName(id, values.name);
    });
    router.refresh();
  }

  useEffect(() => {
    if (isFocused) {
      ref.current?.focus();
    }
  }, [isFocused]);

  return (
    <div
      className="w-auto relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onBlur={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="hidden">Seating plan name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    ref={ref}
                    className={`${
                      isHovered
                        ? "border border-accent shadow-accent"
                        : "border-transparent shadow-transparent"
                    } transform transition-transform duration-500 md:text-xl`}
                    onBlur={() => setIsFocused(false)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {isPending ? (
        <Button
          disabled={isPending}
          className="absolute right-0 top-2"
          variant="ghost"
        >
          <Loader2 className="animate-spin fill-accent" />
        </Button>
      ) : (
        <Button
          disabled={!isHovered}
          className="absolute right-0 top-2"
          variant="ghost"
          onClick={() => setIsFocused(!isFocused)}
        >
          <Edit className="fill-accent" />
        </Button>
      )}
    </div>
  );
}
