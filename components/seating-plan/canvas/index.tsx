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
  generateEmptySeatsForTable,
  ONE_SEAT_DESK_SETTINGS,
  STUDENT_SETTINGS,
  TWO_SEATS_DESK_SETTINGS,
} from "../utils";
import {
  NodeType,
  OneSeatDeskNodeProps,
  SeatingPlanNode,
  SeatNodeProps,
  TwoSeatsDeskNodeProps,
} from "@/lib/types/seating-plan";
import StudentList from "../student-list";
import { Student } from "@/lib/supabase/types/additional.types";
import StudentOverlay from "../student-list/overlay";
import useMousePosition from "@/hooks/use-mouse";

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
    if (over.id === "canvas") {
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
              )[0],
            },
            dragHandle: ".drag-handle",
          } as OneSeatDeskNodeProps;
        }

        if (newNode) {
          setNodes([...nodes, newNode]);
        }
        setSelectedToolbarItem(null);
      }
    } else {
      // handle drag from student node to table
      if (active.data.current.type === "student") {
        const activeElement = active.data.current as Student & {
          type: "student";
        };

        const overElement = over.data as SeatNodeProps;
        if (!overElement.current) return;
        const overDesk = nodes.find(
          (n) => n.id === overElement.current.sortable.containerId
        ) as SeatingPlanNode;
        if (!overDesk) return;

        // check what type of desk it is
        if (overDesk.type === "oneSeatDesk") {
          // check if seat is empty
          if (!overDesk.data.student.id.toString().includes("empty")) {
            return;
          } else {
            // set student to seat
            let newNodes: SeatingPlanNode[] = nodes.map((node) => {
              if (node.id === overDesk.id) {
                return {
                  ...node,
                  type: "oneSeatDesk",
                  data: {
                    student: {
                      ...activeElement,
                      type: "student",
                    },
                  },
                };
              }
              return node;
            });
            newNodes = newNodes.filter(
              (n) => n.id !== activeElement.id.toString()
            );
            setNodes(newNodes);
          }
        } else if (overDesk.type === "twoSeatsDesk") {
          const overIndex = overDesk.data.students.findIndex(
            (student) => student.id === overElement.current.id
          );
          if (overIndex === -1) return;
          console.log("Adding student to twoSeatsDesk");
          console.log(overIndex);

          // check if seat is empty
          if (
            !overDesk.data.students[overIndex].id.toString().includes("empty")
          ) {
            return;
          } else {
            // set student to seat
            let newNodes: SeatingPlanNode[] = nodes.map((node) => {
              if (node.id === overDesk.id) {
                return {
                  ...node,
                  type: "twoSeatsDesk",
                  data: {
                    students: overDesk.data.students.map((student, index) => {
                      if (index === overIndex) {
                        return {
                          ...activeElement,
                          type: "student",
                        };
                      }
                      return student;
                    }),
                  },
                };
              }
              return node;
            });
            newNodes = newNodes.filter(
              (n) => n.id !== activeElement.id.toString()
            );
            setNodes(newNodes);
          }
          // handle drag from table to table
        } else {
          // handle drag from student list directly to table
          return;
        }
        setSelectedToolbarItem(null);
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
