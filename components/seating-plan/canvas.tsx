import {
  SeatingPlanElement,
  SeatingPlanElementType,
  TwoSeatsDeskElement,
} from "@/lib/types/seating-plan";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core/dist";
import { select } from "d3-selection";
import { zoom, ZoomTransform } from "d3-zoom";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import TwoSeatsDesk from "./elements/two-seats-desk";
import { Student } from "@/lib/supabase/types/additional.types";
import StudentList from "./student-list";
import StudentListItem from "./student-list/item";

export default function SeatingPlanCanvas({
  elements,
  setElements,
  transform,
  setTransform,
  students,
}: {
  elements: SeatingPlanElement[];
  setElements(elements: SeatingPlanElement[]): void;
  transform: ZoomTransform;
  setTransform(transform: ZoomTransform): void;
  students: Student[];
}) {
  const updateDraggedelementPosition = ({
    delta,
    active,
    over,
  }: DragEndEvent) => {
    console.log(active, over);
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
  const [draggingStudent, setDraggingStudent] = useState<Student | null>(null);

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
      <DndContext
        onDragStart={({ active }) => {
          const student = students.find((student) => student.id === active.id);
          if (student) {
            setDraggingStudent(student);
          }
        }}
        onDragEnd={updateDraggedelementPosition}
      >
        <StudentList students={students} />
        <DragOverlay>
          {draggingStudent && (
            <StudentListItem student={draggingStudent} transform={transform} />
          )}
        </DragOverlay>
        <div
          className="canvas z-0 no-scrollbar"
          style={{
            // apply the transform from d3
            transformOrigin: "top left",
            transform: `translate3d(${transform.x}px, ${transform.y}px, ${transform.k}px)`,
            height: window.innerHeight - 170,
            width: window.innerWidth - 100,
          }}
        >
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
        </div>
      </DndContext>
    </div>
  );
}
