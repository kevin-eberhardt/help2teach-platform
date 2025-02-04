import { useDroppable } from "@dnd-kit/core";
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  NodeTypes,
  ReactFlow,
  useNodesState,
} from "@xyflow/react";
import { useEffect, useMemo } from "react";
import StudentNode from "../nodes/student";
import TwoSeatsDesk from "../nodes/two-seats-desk";
import { SeatingPlanNode } from "@/lib/types/seating-plan";
import OneSeatDesk from "../nodes/one-seat-desk";

export default function Flow({
  nodes: initialNodes,
  setNodes: setInitialNodes,
}: {
  nodes: SeatingPlanNode[];
  setNodes: (nodes: SeatingPlanNode[]) => void;
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  function updateNodes() {
    setInitialNodes(nodes);
  }

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes]);

  const nodeTypes = useMemo(
    () => ({
      student: StudentNode,
      twoSeatsDesk: TwoSeatsDesk,
      oneSeatDesk: OneSeatDesk,
    }),
    []
  );
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });
  return (
    <ReactFlow
      nodes={nodes}
      // onNodeClick={(event, node) => setSelectedNode(node as SeatingPlanNode)}
      // onPaneClick={() => setSelectedNode(null)}
      onNodesChange={onNodesChange}
      nodeTypes={nodeTypes as unknown as NodeTypes}
      onNodeDragStop={updateNodes}
      id="canvas"
      ref={setNodeRef}
    >
      <Controls />
      <MiniMap />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  );
}
