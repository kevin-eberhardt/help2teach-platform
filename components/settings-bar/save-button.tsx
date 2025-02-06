import { Loader2, Save } from "lucide-react";
import { Button } from "../ui/button";
import { TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { SeatingPlan } from "@/lib/supabase/types/additional.types";
import { saveSeatingPlan } from "./actions";
import { useReactFlow } from "@xyflow/react";
import { SeatingPlanNode } from "@/lib/types/seating-plan";
import { useToast } from "@/hooks/use-toast";

export default function SaveButton({
  seatingPlan,
}: {
  seatingPlan: SeatingPlan;
}) {
  const { toast } = useToast();

  const t = useTranslations("seating-plan");
  const [isPending, startTransition] = useTransition();
  const { toObject } = useReactFlow();
  function handleClick() {
    console.log(toObject());
    startTransition(async () => {
      const nodes = toObject().nodes as SeatingPlanNode[];
      await saveSeatingPlan(seatingPlan, nodes);
    });
    toast({
      title: t("messages.saved"),
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
