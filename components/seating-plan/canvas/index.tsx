"use client";

import { Node as ReactFlowNode, useReactFlow, Viewport } from "@xyflow/react";
import { useEffect, useRef, useState } from "react";
import { ViewportLogger } from "../viewport-logger";
import {
  Active,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Flow from "../flow";
import Toolbar from "../toolbar";
import ToolbarOverlay from "../toolbar/overlay";
import {
  checkIfToolbarItem,
  ONE_SEAT_DESK_SETTINGS,
  STUDENT_SETTINGS,
  TWO_SEATS_DESK_SETTINGS,
} from "../utils";
import {
  OneSeatDeskNodeProps,
  SeatingPlanNode,
  SeatNodeProps,
  StudentDraggable,
  TwoSeatsDeskNodeProps,
} from "@/lib/types/seating-plan";
import StudentList from "../student-list";
import { Student } from "@/lib/supabase/types/additional.types";
import StudentOverlay from "../student-list/overlay";
import useMousePosition from "@/hooks/use-mouse";
import {
  generateEmptySeatsForTable,
  moveStudentFromCanvasToOneSeatDesk,
  moveStudentFromCanvasToTwoSeatsDesk,
  moveStudentFromDeskToCanvas,
  moveStudentFromDeskToDesk,
  moveStudentInSameDesk,
} from "./utils";

export default function Canvas({
  nodes: initialNodes,
  setNodes: setInitialNodes,
  students,
}: {
  nodes: SeatingPlanNode[];
  setNodes: (nodes: SeatingPlanNode[]) => void;
  students: Student[];
}) {
  const [nodes, setNodes] = useState<SeatingPlanNode[]>(initialNodes);
  const reactFlowWrapper = useRef(null);
  const [viewPort, setViewPort] = useState<Viewport | null>(null);
  const [selectedToolbarItem, setSelectedToolbarItem] = useState<Active | null>(
    null
  );
  const { screenToFlowPosition } = useReactFlow();
  const { top, left } = useMousePosition();

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    setInitialNodes(nodes);
  }, [nodes]);

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes]);

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    if (!active.data || !active.data.current) return;

    if (checkIfToolbarItem(active.data.current.type)) {
      setSelectedToolbarItem(active);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log(active, over);
    if (!over) return;
    if (!active.data?.current || !active.rect.current?.initial) return;

    // handle drag on canvas
    if (over.id === "canvas" && !active.data.current.sortable) {
      if (
        active.data.current.type === "student" ||
        active.data.current.type === "student-list"
      ) {
        if (!active.data?.current) return;

        if (active.data.current.type === "student-list") {
          const newNode = {
            id: active.id.toString(),
            type: "student",
            position: screenToFlowPosition({
              x: top - STUDENT_SETTINGS.width / 2,
              y: left - STUDENT_SETTINGS.height / 2,
            }),
            data: {
              ...active.data.current,
              type: "student",
            },
            width: STUDENT_SETTINGS.width,
            height: STUDENT_SETTINGS.height,
          } as ReactFlowNode;
          setNodes((prevNodes) => [...prevNodes, newNode as SeatingPlanNode]);
        } else {
          const activeNode = active.data as SeatNodeProps;
          if (activeNode.current && activeNode.current.sortable) {
            console.log("Student from table to canvas");
          } else {
            setNodes((prevNodes) =>
              prevNodes.map((n) => {
                if (n.id === active.data.current?.id.toString()) {
                  return {
                    ...n,
                    position: screenToFlowPosition({
                      x: top - STUDENT_SETTINGS.width / 2,
                      y: left - STUDENT_SETTINGS.height / 2,
                    }),
                  } as SeatingPlanNode;
                }
                return n;
              })
            );
          }
        }
      }

      // handle drag from toolbar to canvas
      if (selectedToolbarItem) {
        if (!selectedToolbarItem.data?.current) return;

        let newNode = null;

        if (selectedToolbarItem.data.current.type === "twoSeatsDesk") {
          newNode = {
            id: selectedToolbarItem.id.toString(),
            type: selectedToolbarItem.data.current.type,
            position: screenToFlowPosition({
              x: top - TWO_SEATS_DESK_SETTINGS.width / 2,
              y: left - TWO_SEATS_DESK_SETTINGS.height / 2,
            }),
            data: {
              students: generateEmptySeatsForTable(
                selectedToolbarItem.id.toString(),
                2
              ),
            },
            dragHandle: ".drag-handle",
          } as TwoSeatsDeskNodeProps;
        } else if (selectedToolbarItem.data.current.type === "oneSeatDesk") {
          newNode = {
            id: selectedToolbarItem.id.toString(),
            type: selectedToolbarItem.data.current.type,
            position: screenToFlowPosition({
              x: top - ONE_SEAT_DESK_SETTINGS.width / 2,
              y: left - ONE_SEAT_DESK_SETTINGS.height / 2,
            }),
            data: {
              student: generateEmptySeatsForTable(
                selectedToolbarItem.id.toString(),
                1
              ),
            },
            dragHandle: ".drag-handle",
          } as OneSeatDeskNodeProps;
        }

        if (newNode) {
          setNodes([...nodes, newNode]);
        }
        setSelectedToolbarItem(null);
      }
    } else if (over.id === "canvas" && active.data.current.sortable) {
      // handle drag from desk to canvas
      if (active.data.current.type !== "student") return;
      console.log("Dragging student from desk to canvas");

      const position = screenToFlowPosition({
        x: top - STUDENT_SETTINGS.width / 2,
        y: left - STUDENT_SETTINGS.height / 2,
      });
      const activeStudent = active.data as StudentDraggable;

      setNodes(moveStudentFromDeskToCanvas(activeStudent, nodes, position));
    }

    if (
      active.data.current.type === "student" &&
      over.data.current?.sortable &&
      over.id !== "canvas"
    ) {
      if (active.data.current.sortable) {
        // handle drag from desk to desk
        if (
          active.data.current.sortable.containerId ===
          over.data.current.sortable.containerId
        ) {
          console.log("Dragging student within the same desk");
          console.log(active, over);
          const activeStudent = active.data as StudentDraggable;
          const overSeat = over.data as SeatNodeProps;

          setNodes(moveStudentInSameDesk(activeStudent, overSeat, nodes));
        } else {
          console.log("Dragging student from one desk to another");
          const activeStudent = active.data as StudentDraggable;
          const overSeat = over.data as SeatNodeProps;

          setNodes(moveStudentFromDeskToDesk(activeStudent, overSeat, nodes));
        }
      } else if (!active.data.current.sortable) {
        // handle drag from canvas to desk
        const activeStudent = active.data as StudentDraggable;
        const overSeat = over.data as SeatNodeProps;
        const overDesk = nodes.find(
          (n) => n.id === overSeat.current.sortable.containerId
        ) as SeatingPlanNode;

        if (overDesk.type === "oneSeatDesk") {
          console.log("Moving student from canvas to one seat desk");
          setNodes(
            moveStudentFromCanvasToOneSeatDesk(activeStudent, overDesk, nodes)
          );
        } else if (overDesk.type === "twoSeatsDesk") {
          console.log("Moving student from two seats desk to canvas");
          setNodes(
            moveStudentFromCanvasToTwoSeatsDesk(
              activeStudent,
              overSeat,
              overDesk,
              nodes
            )
          );
        }
      }
    }
  }

  // adjust height and width based on viewport
  return (
    <div
      className="relative"
      ref={reactFlowWrapper}
      style={{
        height: window.innerHeight * 0.94,
        width: window.innerWidth * 0.95,
      }}
    >
      <ViewportLogger setViewPort={setViewPort} viewPort={viewPort} />
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <Flow nodes={nodes} setNodes={setNodes} />
        <StudentList students={students} nodes={nodes} />
        <StudentOverlay viewPort={viewPort} />
        <Toolbar />
        <ToolbarOverlay viewPort={viewPort} active={selectedToolbarItem} />
      </DndContext>
    </div>
  );
}
