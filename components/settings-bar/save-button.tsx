import { Loader2, Save } from "lucide-react";
import { Button } from "../ui/button";
import { TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { SeatingPlan } from "@/lib/supabase/types/additional.types";
import { saveSeatingPlan } from "./actions";

export default function SaveButton({
  seatingPlan,
}: {
  seatingPlan: SeatingPlan;
}) {
  const t = useTranslations("seating-plan");
  const [isPending, startTransition] = useTransition();
  function handleClick() {
    startTransition(async () => {
      await saveSeatingPlan(seatingPlan);
    });
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleClick}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Save />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t("settings.save-button-tooltip")}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
