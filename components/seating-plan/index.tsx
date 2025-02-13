"use client";
import { ReactFlowProvider } from "@xyflow/react";
import { Suspense, useEffect, useRef, useState } from "react";
import "@xyflow/react/dist/style.css";
import { SeatingPlanNode, SeatingPlanProps } from "@/lib/types/seating-plan";
import dynamic from "next/dynamic";
import SettingsBar from "./settings-bar";
import { Json } from "@/lib/supabase/types/database.types";
import { SeatingPlan as SeatingPlanType } from "@/lib/supabase/types/additional.types";
import { saveSeatingPlan } from "./action";

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

  const saveToDatabase = async (latestSeatingPlan: SeatingPlanType) => {
    const { data, error } = await saveSeatingPlan(latestSeatingPlan);
    if (error) {
      console.error("Fehler beim Speichern des Sitzplans:", error);
    } else {
      if (data) {
        setSeatingPlan(data);
      }
    }
  };

  const lastSavedSeatingPlanRef = useRef(seatingPlan);
  const latestSeatingPlanRef = useRef(seatingPlan);

  useEffect(() => {
    latestSeatingPlanRef.current = seatingPlan;
  }, [seatingPlan]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (
        JSON.stringify(lastSavedSeatingPlanRef.current) !==
        JSON.stringify(latestSeatingPlanRef.current)
      ) {
        console.log("Änderungen im Sitzplan festgestellt. Speichern...");
        await saveToDatabase(latestSeatingPlanRef.current);
        lastSavedSeatingPlanRef.current = latestSeatingPlanRef.current;
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ReactFlowProvider>
      <div className="relative h-[calc(100vh-120px)] md:h-[calc(100vh-120px)] lg:h-[calc(100vh-60px)]">
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
              console.log("Update nodes on index");
              setSeatingPlan({ ...seatingPlan, nodes: newNodes });
            }}
            students={students}
          />
        </Suspense>
      </div>
    </ReactFlowProvider>
  );
}
