"use client";
import { ReactFlowProvider } from "@xyflow/react";
import { Suspense, useEffect, useState } from "react";
import "@xyflow/react/dist/style.css";
import { SeatingPlanNode, SeatingPlanProps } from "@/lib/types/seating-plan";
import dynamic from "next/dynamic";
import SettingsBar from "../settings-bar";
import { Json } from "@/lib/supabase/types/database.types";
import { saveSeatingPlan } from "../settings-bar/actions";

const Canvas = dynamic(() => import("@/components/seating-plan/canvas/index"), {
  ssr: false,
});

export default function SeatingPlan({
  students,
  seatingPlan: initialSeatingPlan,
}: SeatingPlanProps) {
  const [seatingPlan, setSeatingPlan] = useState(initialSeatingPlan);

  useEffect(() => {
    setSeatingPlan(initialSeatingPlan);
  }, [initialSeatingPlan]);

  function saveSeatingPlanNodes(n?: SeatingPlanNode[]) {
    saveSeatingPlan(
      seatingPlan,
      n ? n : (seatingPlan.nodes as unknown as SeatingPlanNode[])
    );
  }
  return (
    <ReactFlowProvider>
      <div className="relative h-[calc(100vh-50px)]">
        <Suspense fallback={<div>Loading...</div>}>
          <SettingsBar
            seatingPlan={seatingPlan}
            setSeatingPlan={setSeatingPlan}
          />
          <Canvas
            nodes={
              seatingPlan.nodes
                ? (seatingPlan.nodes as unknown as SeatingPlanNode[])
                : []
            }
            setNodes={(nodes) => {
              const newNodes = nodes as unknown as Json;
              setSeatingPlan({ ...seatingPlan, nodes: newNodes });
              saveSeatingPlanNodes(newNodes as unknown as SeatingPlanNode[]);
            }}
            students={students}
          />
        </Suspense>
      </div>
    </ReactFlowProvider>
  );
}
