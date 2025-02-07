import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SeatingPlan } from "@/lib/supabase/types/additional.types";
import { useFormatter, useTranslations } from "next-intl";
import SeatingPlanPreview from "./plan-preview";

export default function SeatingPlanCard({
  name,
  edited_at,
  created_at,
  nodes,
}: SeatingPlan) {
  const t = useTranslations("seating-plan");
  const format = useFormatter();

  const changeDate = format.dateTime(
    new Date(edited_at ? edited_at : created_at),
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );
  return (
    <Card className="w-[700px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{changeDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <SeatingPlanPreview nodes={nodes} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
