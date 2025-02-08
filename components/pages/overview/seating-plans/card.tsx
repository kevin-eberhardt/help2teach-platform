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
import { Link } from "@/lib/i18n/routing";

export default function SeatingPlanCard({
  name,
  class_id,
  id,
  edited_at,
  created_at,
  preview_img_data,
}: SeatingPlan) {
  const t = useTranslations("general");
  const tSeatingPlan = useTranslations("seating-plan");
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
    <Link className="h-full" href={`/app/${class_id}/seating-plans/${id}`}>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            {tSeatingPlan("last-worked")} {changeDate}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <SeatingPlanPreview previewData={preview_img_data} />
        </CardContent>
      </Card>
    </Link>
  );
}
