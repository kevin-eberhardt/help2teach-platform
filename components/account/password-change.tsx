"use client";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useState, useTransition } from "react";
import { sendPasswordResetMail } from "./actions";
import { Check, Loader } from "lucide-react";

export default function PasswordChange({ email }: { email: string }) {
  const t = useTranslations("password-change");
  const [isPending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  function handleClick() {
    startTransition(async () => {
      const { error } = await sendPasswordResetMail(email);
      if (error) {
        setError(true);
        return;
      }
    });
    setSent(true);
  }

  return (
    <Card className="pt-4">
      <CardContent>
        <p>{t("info")}</p>
        {error && (
          <p className="text-destructive text-sm mt-4">
            {t("submit-errors.password-not-changed")}
          </p>
        )}
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          disabled={isPending || sent}
          onClick={handleClick}
        >
          {isPending ? (
            <>
              <Loader className="animate-spin" />
              {t("button")}
            </>
          ) : error ? (
            t("button")
          ) : sent ? (
            <>
              <Check className="text-green-500" />
              <span className="text-green-500">
                {t("submit-messages.password-changed")}
              </span>
            </>
          ) : (
            t("button")
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
