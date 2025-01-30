import { select } from "d3-selection";
import { zoom, ZoomTransform } from "d3-zoom";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DndContext,
  useDroppable,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {
  calculateCanvasPosition,
  changeSeatedStudentPositions,
  checkIfElementIsDraggableContainer,
  generateEmptySeatsForTable,
  moveStudentFromCanvasToTable,
} from "./utils";
import {
  OneSeatDeskSeatingPlanElementType,
  SeatingPlanElementType,
  SeatingPlanElementTypes,
  StudentListSeatingPlanElementType,
  StudentSeatingPlanElementType,
  TwoSeatsDeskSeatingPlanElementType,
} from "@/lib/types/seating-plan";
import Student from "@/components/seating-plan/elements/student";
import TwoSeatsDesk from "./elements/two-seats-desk";
import Seat from "./elements/seat";
import useMousePosition from "@/hooks/use-mouse";
import OneSeatDesk from "./elements/one-seat-desk";
import StudentList from "./elements/student-list";
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
  function updateElementsAfterDragEnd(newElements: SeatingPlanElementType[]) {
    setDraggingStudent(null);
    setElements(newElements);
  }
  const updateDraggedelementPosition = ({
    delta,
    active,
    over,
  }: DragEndEvent) => {
    if (!delta.x && !delta.y) return;
    console.log(active);
    if (
      active &&
      active.data.current?.sortable &&
      !over &&
      active.data.current?.type === SeatingPlanElementTypes.Student
    ) {
      // Moving student from element to canvas
      const activeItem = active.data.current as StudentSeatingPlanElementType;
      if (activeItem.id.toString().includes("empty")) return;

      const activeTable = elements.find(
        (e) => e.id === active.data.current?.sortable.containerId
      );
      if (!activeTable) return;
      const newElements = elements.map((element) => {
        if (element.id === activeTable?.id) {
          if (element.type === SeatingPlanElementTypes.StudentList) {
            const studentListElement =
              element as StudentListSeatingPlanElementType;
            return {
              ...studentListElement,
              students: studentListElement.students.filter(
                (s) => s.id !== activeItem.id
              ),
            };
          }

          if (element.type === SeatingPlanElementTypes.TwoSeatsDesk) {
            const deskElement = element as TwoSeatsDeskSeatingPlanElementType;
            return {
              ...deskElement,
              students: deskElement.students.map((s) =>
                s.id === activeItem.id
                  ? generateEmptySeatsForTable(element.id.toString(), 1)[0]
                  : s
              ),
            };
          }
          if (element.type === SeatingPlanElementTypes.OneSeatDesk) {
            const deskElement = element as OneSeatDeskSeatingPlanElementType;
            return {
              ...deskElement,
              student: generateEmptySeatsForTable(element.id.toString(), 1)[0],
            };
          }
        }
        return element;
      });
      const newActiveItem: StudentSeatingPlanElementType = {
        coordinates: active.rect.current.initial
          ? calculateCanvasPosition(
              active.rect.current.initial,
              null,
              delta,
              transform
            )
          : { x: 0, y: 0 },
        data: activeItem.data,
        id: activeItem.id,
        type: SeatingPlanElementTypes.Student,
      };
      updateElementsAfterDragEnd([...newElements, newActiveItem]);
    } else if (
      active &&
      active.data.current?.sortable &&
      over &&
      over.data.current?.sortable &&
      active.id !== over.id
    ) {
      // Moving student from table to table
      // container Id 'Sortable' is the default value if a student is not placed anywhere
      if (active.data.current.sortable.containerId !== "Sortable") {
        // Change positions of already placed students
        const newElements = changeSeatedStudentPositions(
          elements,
          active,
          over
        );
        updateElementsAfterDragEnd(newElements);
      }
    } else {
      if (
        active &&
        over &&
        over.data.current &&
        over.data.current.sortable &&
        !checkIfElementIsDraggableContainer(
          active.data.current as SeatingPlanElementType
        )
      ) {
        // Moving student from canvas to table
        const activeStudent = active.data
          .current as unknown as StudentSeatingPlanElementType;
        const overTableId = over.data.current.sortable.containerId;
        const overTableIndex = over.data.current.sortable.index;
        const overTableElement = elements.find((e) => e.id === overTableId);
        if (!overTableElement) return;

        const overTableType = overTableElement?.type;
        let newElements = elements;

        if (
          overTableType === SeatingPlanElementTypes.TwoSeatsDesk ||
          overTableType === SeatingPlanElementTypes.OneSeatDesk
        ) {
          newElements = moveStudentFromCanvasToTable(
            elements,
            activeStudent,
            overTableElement,
            overTableIndex
          );
        }
        updateElementsAfterDragEnd(newElements);
      } else {
        // Moving the element inside the canvas
        updateElementsAfterDragEnd(
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
  }, [transform, zoomBehavior, canvasRef, updateTransform]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [draggingStudent, setDraggingStudent] =
    useState<StudentSeatingPlanElementType | null>(null);

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    if (
      active.data.current?.type === SeatingPlanElementTypes.Student &&
      active.data.current.sortable
    ) {
      setDraggingStudent(active.data.current as StudentSeatingPlanElementType);
    }
  }

  const mousePosition = useMousePosition();

  return (
    <div
      ref={updateAndForwardRef}
      className="overflow-hidden bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
    >
      <DndContext
        sensors={sensors}
        onDragEnd={updateDraggedelementPosition}
        onDragStart={handleDragStart}
      >
        {draggingStudent && (
          <DragOverlay>
            <div
              style={{
                transformOrigin: "top center",
                top: mousePosition.top,
                left: mousePosition.left,
                ...(transform && {
                  transform: `scale(${transform.k})`,
                }),
              }}
            >
              <Seat
                canvasTransform={transform}
                element={draggingStudent}
                id={draggingStudent.id}
                key={draggingStudent.id}
              />
            </div>
          </DragOverlay>
        )}
        <div
          className="canvas -z-10 no-scrollbar overflow-hidden h-[calc(100svh-4rem)]"
          style={{
            // apply the transform from d3
            transformOrigin: "top left",
            transform: `translate3d(${transform.x}px, ${transform.y}px, ${transform.k}px)`,
          }}
        >
          {elements.map((element) => {
            if (
              element.type === SeatingPlanElementTypes.StudentList &&
              (element as StudentListSeatingPlanElementType).students.length > 0
            ) {
              return (
                <StudentList
                  key={element.id}
                  element={element as StudentListSeatingPlanElementType}
                  canvasTransform={transform}
                />
              );
            }

            if (element.type === SeatingPlanElementTypes.TwoSeatsDesk) {
              return (
                <TwoSeatsDesk
                  key={element.id}
                  canvasTransform={transform}
                  element={element as TwoSeatsDeskSeatingPlanElementType}
                />
              );
            }

            if (element.type === SeatingPlanElementTypes.OneSeatDesk) {
              return (
                <OneSeatDesk
                  key={element.id}
                  element={element as OneSeatDeskSeatingPlanElementType}
                  canvasTransform={transform}
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
