import { select } from "d3-selection";
import { zoom, ZoomTransform } from "d3-zoom";
import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DndContext,
  useDroppable,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { changeSeatedStudentPositions, checkIfElementIsTable } from "./utils";
import {
  OneSeatDeskSeatingPlanElementType,
  SeatingPlanElementType,
  SeatingPlanElementTypes,
  StudentSeatingPlanElementType,
  TwoSeatsDeskSeatingPlanElementType,
} from "@/lib/types/seating-plan";
import Student from "@/components/seating-plan/elements/student";
import TwoSeatsDesk from "./elements/two-seats-desk";
export default function SeatingPlanCanvas({
  elements,
  setElements,
  transform,
  setTransform,
}: {
  elements: SeatingPlanElementType[];
  setElements(elements: SeatingPlanElementType[]): void;
  transform: ZoomTransform;
  setTransform(transform: ZoomTransform): void;
}) {
  const updateDraggedelementPosition = ({
    delta,
    active,
    over,
  }: DragEndEvent) => {
    if (!delta.x && !delta.y) return;
    console.log(active, over);
    if (
      active &&
      active.data.current?.sortable &&
      over &&
      over.data.current?.sortable &&
      active.id !== over.id
    ) {
      // container Id 'Sortable' is the default value if a student is not placed anywhere
      if (active.data.current.sortable.containerId !== "Sortable") {
        console.log(active, over);
        // Change positions of already placed students
        const newElements = changeSeatedStudentPositions(
          elements,
          active,
          over
        );
        setElements(newElements);
      }
    } else {
      if (
        active &&
        over &&
        !over.id.toString().includes(active.id.toString()) &&
        over.data.current &&
        over.data.current.sortable &&
        !checkIfElementIsTable(active.data.current)
      ) {
        const activeStudent = active.data
          .current as unknown as StudentSeatingPlanElementType;
        const overTableId = over.data.current.sortable.containerId;
        const overTableIndex = over.data.current.sortable.index;
        let overTableElement = elements.find((e) => e.id === overTableId);
        if (!overTableElement) return;

        const overTableType = overTableElement?.type;
        let newElements = elements;

        if (overTableType === SeatingPlanElementTypes.TwoSeatsDesk) {
          const overTableElementAsDesk =
            overTableElement as TwoSeatsDeskSeatingPlanElementType;
          // check if overTableIndex is empty or not
          const overTableStudent =
            overTableElementAsDesk.students[overTableIndex];
          if (overTableStudent.id.toString().includes("empty")) {
            newElements = elements
              .map((element) => {
                if (element.id === overTableId) {
                  const deskElement =
                    element as TwoSeatsDeskSeatingPlanElementType;
                  return {
                    ...deskElement,
                    students: deskElement.students.map((s, i) =>
                      i === overTableIndex ? activeStudent : s
                    ),
                  };
                }
                return element;
              })
              .filter((element) => element.id !== active.id);
          } else {
            // swap students
            newElements = elements.map((element) => {
              if (element.id === overTableId) {
                const deskElement =
                  element as TwoSeatsDeskSeatingPlanElementType;
                return {
                  ...deskElement,
                  students: deskElement.students.map((s, i) =>
                    i === overTableIndex ? activeStudent : s
                  ),
                };
              }
              if (element.id === active.id) {
                return {
                  ...overTableStudent,
                  coordinates: element.coordinates,
                };
              }
              return element;
            });
          }
        }
        setElements(newElements);
      } else {
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
      }
    }
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div ref={updateAndForwardRef} className="overflow-hidden">
      <DndContext sensors={sensors} onDragEnd={updateDraggedelementPosition}>
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
            if (element.type === SeatingPlanElementTypes.TwoSeatsDesk) {
              return (
                <TwoSeatsDesk
                  key={element.id}
                  canvasTransform={transform}
                  element={element}
                />
              );
            }

            if (element.type === SeatingPlanElementTypes.Student) {
              return (
                <Student
                  key={element.id}
                  element={element as StudentSeatingPlanElementType}
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
