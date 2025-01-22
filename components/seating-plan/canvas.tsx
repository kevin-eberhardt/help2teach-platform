import {
  SeatingPlanElement,
  SeatingPlanElementType,
  TwoSeatsDeskElement,
} from "@/lib/types/seating-plan";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core/dist";
import { select } from "d3-selection";
import { zoom, ZoomTransform } from "d3-zoom";
import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import TwoSeatsDesk from "./elements/two-seats-desk";

export default function SeatingPlanCanvas({
  elements,
  setElements,
  transform,
  setTransform,
}: {
  elements: SeatingPlanElement[];
  setElements(elements: SeatingPlanElement[]): void;
  transform: ZoomTransform;
  setTransform(transform: ZoomTransform): void;
}) {
  const updateDraggedelementPosition = ({ delta, active }: DragEndEvent) => {
    if (!delta.x && !delta.y) return;

    setElements(
      elements.map((element) => {
        if (element.id === active.id) {
          return {
            ...element,
            coordinates: {
              x: element.coordinates.x + delta.x / transform.k,
              y: element.coordinates.y + delta.y / transform.k,
            },
          };
        }
        return element;
      })
    );
  };

  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  const canvasRef = useRef<HTMLDivElement | null>(null);

  const updateAndForwardRef = (div: HTMLDivElement) => {
    canvasRef.current = div;
    setNodeRef(div);
  };

  // create the d3 zoom object, and useMemo to retain it for rerenders
  const zoomBehavior = useMemo(() => zoom<HTMLDivElement, unknown>(), []);

  // update the transform when d3 zoom notifies of a change
  const updateTransform = useCallback(
    ({ transform }: { transform: ZoomTransform }) => {
      setTransform(transform);
    },
    [setTransform]
  );

  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    // get transform change notifications from d3 zoom
    zoomBehavior.on("zoom", updateTransform);

    // attach d3 zoom to the canvas div element, which will handle
    // mousewheel, gesture and drag events automatically for pan / zoom
    select<HTMLDivElement, unknown>(canvasRef.current).call(zoomBehavior);
  }, [zoomBehavior, canvasRef, updateTransform]);
  return (
    <div ref={updateAndForwardRef} className="overflow-hidden">
      <div
        className="canvas z-0 no-scrollbar"
        style={{
          // apply the transform from d3
          transformOrigin: "top left",
          transform: `translate3d(${transform.x}px, ${transform.y}px, ${transform.k}px)`,
          position: "relative",
          height: window.innerHeight - 170,
          width: window.innerWidth - 100,
        }}
      >
        <DndContext onDragEnd={updateDraggedelementPosition}>
          {elements.map((element) => {
            if (element.type === SeatingPlanElementType.TwoSeatsDesk) {
              return (
                <TwoSeatsDesk
                  element={element as TwoSeatsDeskElement}
                  key={element.id}
                  canvasTransform={transform}
                />
              );
            }
          })}
        </DndContext>
      </div>
    </div>
  );
}
