"use client";
import { SeatingPlan } from "@/lib/supabase/types/additional.types";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { saveName } from "./actions";
import { useRouter } from "next/navigation";

export default function NameInput({
  seatingPlanName,
  seatingPlanId,
}: {
  seatingPlanName: SeatingPlan["name"];
  seatingPlanId: SeatingPlan["id"];
}) {
  const t = useTranslations("seating-plan");
  const [value, setValue] = useState(
    seatingPlanName ? seatingPlanName : t("settings.undefined-name")
  );
  const [isChanged, setIsChanged] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSave();
      event.currentTarget.blur();
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.value && event.target.value === "") return;
    setValue(event.target.value);
    setIsChanged(true);
  }

  function handleSave() {
    startTransition(async () => {
      if (!isChanged) return;
      await saveName(value, seatingPlanId);
      setIsChanged(false);
      router.refresh();
    });
  }

  return (
    <div className="rounded-md relative">
      <Input
        defaultValue={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="text-lg md:text-lg border-none shadow-none"
        onBlur={handleSave}
        disabled={isPending}
      />
      {isPending && (
        <div className="absolute top-1/2 -translate-y-1/2 right-3">
          <Loader2 className="w-6 h-6 animate-spin text-accent" />
        </div>
      )}
    </div>
  );
}
