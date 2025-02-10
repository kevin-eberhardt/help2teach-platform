import { Link } from "@/lib/i18n/routing";
import { SeatingPlan } from "@/lib/supabase/types/additional.types";
import { useFormatter, useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import OptionsMenu from "./options-menu";

function SeatingPlanPreviewImage({
  previewData,
}: {
  previewData: SeatingPlan["preview_img_data"];
}) {
  return (
    <div>
      {previewData && (
        <Image
          src={previewData}
          alt="Seating plan preview"
          height={768}
          width={1024}
          className="object-contain"
        />
      )}
    </div>
  );
}
export default function SeatingPlanPreviewCard({
  name,
  class_id,
  id,
  edited_at,
  created_at,
  preview_img_data,
}: SeatingPlan) {
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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-center">
          <Link
            className="h-full"
            href={`/app/${class_id}/seating-plans/${id}`}
          >
            <CardTitle>{name}</CardTitle>
          </Link>
          <OptionsMenu seatingPlanId={id} seatingPlanName={name} />
        </div>
        <CardDescription>
          {tSeatingPlan("last-worked")} {changeDate}
        </CardDescription>
      </CardHeader>

      <Link className="h-full" href={`/app/${class_id}/seating-plans/${id}`}>
        <CardContent className="flex-grow">
          <SeatingPlanPreviewImage previewData={preview_img_data} />
        </CardContent>
      </Link>
    </Card>
  );
}
