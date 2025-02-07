import { SeatingPlan } from "@/lib/supabase/types/additional.types";
import { imageData } from "./test";
import Image from "next/image";

export default function SeatingPlanPreview({
  nodes,
}: {
  nodes: SeatingPlan["nodes"];
}) {
  return (
    <div style={{ height: "400px", width: "auto" }}>
      <Image
        src={imageData}
        alt="Seating plan preview"
        height={400}
        width={700}
      />
    </div>
  );
}
