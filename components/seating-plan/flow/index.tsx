import { useDroppable } from "@dnd-kit/core";
import {
  Background,
  BackgroundVariant,
  Controls as ReactFlowControls,
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
import Controls from "../controls";
import { useHistory } from "@/hooks/use-history";
import TextNode from "../nodes/text";

const nodeTypes = {
  student: StudentNode,
  twoSeatsDesk: TwoSeatsDesk,
  oneSeatDesk: OneSeatDesk,
  text: TextNode,
};
export default function Flow({
  nodes: initialNodes,
  setNodes: setInitialNodes,
}: {
  nodes: SeatingPlanNode[];
  setNodes: (nodes: SeatingPlanNode[]) => void;
}) {
  const { history, setHistory, redo, undo, redoStack, undoStack, store } =
    useHistory<SeatingPlanNode[]>(initialNodes);
  const [nodes, setNodes, onNodesChange] = useNodesState(history);

  function updateNodes(n?: SeatingPlanNode[]) {
    setHistory(n ? n : nodes);
    store(n ? n : nodes);
    setInitialNodes(n ? n : nodes);
  }

  useEffect(() => {
    setNodes(history);
  }, [history]);

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes]);
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={(changes) => setTimeout(() => onNodesChange(changes))} // Timeout is needed to fix this error: "ResizeObserver loop completed with undelivered notifications."
      nodeTypes={nodeTypes as unknown as NodeTypes}
      onNodeDragStop={() => updateNodes()}
      onNodesDelete={(deletedNodes) => {
        const deletedIds = deletedNodes.map((node) => node.id);
        const newNodes = nodes.filter((node) => !deletedIds.includes(node.id));
        updateNodes(newNodes);
      }}
      autoFocus={false}
      selectNodesOnDrag={false}
      id="canvas"
      ref={setNodeRef}
      noDragClassName="no-drag"
    >
      <ReactFlowControls />
      <Controls
        redo={redo}
        undo={undo}
        isUndoDisabled={undoStack.length === 1}
        isRedoDisabled={redoStack.length === 0}
      />
      <MiniMap pannable zoomable nodeColor={"hsl(var(--accent))"} />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  );
}
