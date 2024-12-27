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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Gib deine E-Mail-Adresse und dein Passwort ein, um fortzufahren.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-Mail</FormLabel>
                      <FormControl>
                        <Input placeholder="email@domain.de" {...field} />
                      </FormControl>
                      <FormDescription>Deine E-Mail-Adresse</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passwort</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email@domain.de"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormDescription>Dein Passwort</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link href="#" className="ml-auto text-sm">
                  Passwort vergessen?
                </Link>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Mit Google anmelden
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Noch keinen Account?{" "}
              <a href="#" className="underline underline-offset-4">
                Registrieren
              </a>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
