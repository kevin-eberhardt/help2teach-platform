"use client";

import { Node as ReactFlowNode, useReactFlow, Viewport } from "@xyflow/react";
import { useEffect, useRef, useState } from "react";
import { ViewportLogger } from "../viewport-logger";
import {
  Active,
  DndContext,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import Flow from "../flow";
import Toolbar from "../toolbar";
import ToolbarOverlay from "../toolbar/overlay";
import {
  calculateCanvasPosition,
  checkIfToolbarItem,
  generateEmptySeatsForTable,
  STUDENT_SETTINGS,
} from "../utils";
import {
  OneSeatDeskNodeProps,
  SeatingPlanNode,
  TwoSeatsDeskNodeProps,
} from "@/lib/types/seating-plan";
import StudentList from "../student-list";
import { Student } from "@/lib/supabase/types/additional.types";
import StudentOverlay from "../student-list/overlay";

export default function Canvas({
  nodes: initialNodes,
  students,
}: {
  nodes: SeatingPlanNode[];
  students: Student[];
}) {
  const [nodes, setNodes] = useState<SeatingPlanNode[]>(initialNodes);
  const reactFlowWrapper = useRef(null);
  const [viewPort, setViewPort] = useState<Viewport | null>(null);
  const [selectedToolbarItem, setSelectedToolbarItem] = useState<Active | null>(
    null
  );
  const [selectedStudent, setSelectedStudent] = useState<Active | null>(null);
  const { screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes]);

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    console.log(active);
    if (!active.data || !active.data.current) return;

    if (checkIfToolbarItem(active.data.current.type)) {
      console.log(active);
      setSelectedToolbarItem(active);
    }

    if (active.data.current.type === "student-list") {
      setSelectedStudent(active);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over, delta } = event;
    if (!over) return;
    if (!active.rect.current?.initial) return;

    if (selectedStudent && over.id === "canvas") {
      if (!selectedStudent.data?.current) return;

      const newNode = {
        id: selectedStudent.id.toString(),
        type: "student",
        position: calculateCanvasPosition(
          active.rect.current.initial,
          over,
          delta
        ),
        data: {
          ...selectedStudent.data.current,
          type: "student",
        },
        width: STUDENT_SETTINGS.width,
        height: STUDENT_SETTINGS.height,
      } as ReactFlowNode;

      setNodes([...nodes, newNode as SeatingPlanNode]);
    }
    if (selectedToolbarItem && over.id === "canvas") {
      if (!selectedToolbarItem.data?.current) return;

      let newNode = null;

      if (selectedToolbarItem.data.current.type === "twoSeatsDesk") {
        newNode = {
          id: selectedToolbarItem.id.toString(),
          type: selectedToolbarItem.data.current.type,
          position: calculateCanvasPosition(
            active.rect.current.initial,
            over,
            delta
          ),
          data: {
            students: generateEmptySeatsForTable(
              selectedToolbarItem.id.toString(),
              2
            ),
          },
        } as TwoSeatsDeskNodeProps;
      } else if (selectedToolbarItem.data.current.type === "oneSeatDesk") {
        newNode = {
          id: selectedToolbarItem.id.toString(),
          type: selectedToolbarItem.data.current.type,
          position: calculateCanvasPosition(
            active.rect.current.initial,
            over,
            delta
          ),
          data: {
            student: generateEmptySeatsForTable(
              selectedToolbarItem.id.toString(),
              1
            )[0],
          },
        } as OneSeatDeskNodeProps;
      }

      if (newNode) {
        console.log(newNode);
        setNodes([...nodes, newNode]);
      }
    }
    setSelectedToolbarItem(null);
    setSelectedStudent(null);
  }

  // adjust height and width based on viewport
  return (
    <div
      className="relative"
      ref={reactFlowWrapper}
      style={{
        height: window.innerHeight * 0.9,
        width: window.innerWidth * 0.97,
      }}
    >
      <ViewportLogger setViewPort={setViewPort} viewPort={viewPort} />
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <StudentList students={students} nodes={nodes} />
        <StudentOverlay viewPort={viewPort} active={selectedStudent} />
        <Flow nodes={nodes} setNodes={setNodes} />
        <Toolbar />
        <ToolbarOverlay viewPort={viewPort} active={selectedToolbarItem} />
      </DndContext>
    </div>
  );
}
