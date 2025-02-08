import { SeatingPlan } from "@/lib/supabase/types/additional.types";
import Image from "next/image";

export default function SeatingPlanPreview({
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
          height={384}
          width={534}
        />
      )}
    </div>
  );
}
