"use client";
import { ReactFlowProvider } from "@xyflow/react";
import { Suspense, useEffect, useState } from "react";
import "@xyflow/react/dist/style.css";
import { SeatingPlanProps } from "@/lib/types/seating-plan";
import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("@/components/seating-plan/canvas/index"), {
  ssr: false,
});

export default function SeatingPlan({
  students,
  nodes: initialNodes,
  seatingPlan,
}: SeatingPlanProps) {
  const [nodes, setNodes] = useState(initialNodes);

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes]);

  return (
    <ReactFlowProvider>
      <div className="relative">
        <Suspense fallback={<div>Loading...</div>}>
          <Canvas nodes={nodes} students={students} />
        </Suspense>
      </div>
    </ReactFlowProvider>
  );
}
