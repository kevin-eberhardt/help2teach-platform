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
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DndContext,
  useDroppable,
  DragOverlay,
  DragStartEvent,
  TouchSensor,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  calculateCanvasPosition,
  changeSeatedStudentPositions,
  checkIfElementIsDraggableContainer,
  deleteElement,
  generateEmptySeatsForTable,
  moveStudentFromCanvasToTable,
} from "./utils";
import {
  CustomTextSeatingPlanElementType,
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
import { useSeatingPlan } from "@/hooks/use-seating-plan";
import CustomText from "./elements/custom/text";
import { STUDENT } from "./constants";

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
  const [isDragging, setIsDragging] = useState(false);
  const [touchStartPosition, setTouchStartPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [initialPinchDistance, setInitialPinchDistance] = useState<
    number | null
  >(null);
  const [initialScale, setInitialScale] = useState<number>(1);

  const updateDraggedelementPosition = ({
    delta,
    active,
    over,
  }: DragEndEvent) => {
    if (!delta.x && !delta.y) return;
    if (
      active &&
      active.data.current?.sortable &&
      !over &&
      active.data.current?.type === SeatingPlanElementTypes.Student &&
      active.data.current?.type !== SeatingPlanElementTypes.CustomText
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
        width: STUDENT.width,
        height: STUDENT.height,
        id: activeItem.id,
        type: SeatingPlanElementTypes.Student,
      };
      updateElementsAfterDragEnd([...newElements, newActiveItem]);
    } else if (
      active &&
      active.data.current?.sortable &&
      over &&
      over.data.current?.sortable &&
      active.id !== over.id &&
      active.data.current?.type === SeatingPlanElementTypes.Student
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
        ) &&
        active.id !== "student-list"
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

  const {
    selectedElement,
    setSelectedElement,
    elementToDelete,
    setElementToDelete,
  } = useSeatingPlan();

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

  useEffect(() => {
    if (!canvasRef.current) return;
    // Re-apply the parent's transform to sync whenever it updates
    select<HTMLDivElement, unknown>(canvasRef.current).call(
      zoomBehavior.transform,
      transform
    );
  }, [transform, zoomBehavior]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    setSelectedElement(undefined);

    zoomBehavior.touchable(false);

    // get transform change notifications from d3 zoom
    zoomBehavior.on("zoom", updateTransform);

    // attach d3 zoom to the canvas div element, which will handle
    // mousewheel, gesture and drag events automatically for pan / zoom
    select<HTMLDivElement, unknown>(canvasRef.current).call(zoomBehavior);
  }, [transform, zoomBehavior, canvasRef, updateTransform, isDragging]);

  const getDistance = (touch1: Touch, touch2: Touch) => {
    return Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isDragging) return;
    if (selectedElement) return;

    if (e.touches.length === 2) {
      // Pinch-to-zoom start
      const touch1 = e.touches[0] as Touch;
      const touch2 = e.touches[1] as Touch;
      const distance = getDistance(touch1, touch2);
      setInitialPinchDistance(distance);
      setInitialScale(transform.k);
    } else if (e.touches.length === 1) {
      // Pan start
      setTouchStartPosition({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) return;
    if (selectedElement) return;

    // Prevent default touch behavior
    e.preventDefault();
    e.stopPropagation();
    if (e.touches.length === 2 && initialPinchDistance !== null) {
      const touch1 = e.touches[0] as Touch;
      const touch2 = e.touches[1] as Touch;
      const currentDistance = getDistance(touch1, touch2);
      const scale = (currentDistance / initialPinchDistance) * initialScale;
      const clampedScale = Math.min(Math.max(scale, 0.1), 4);

      // Berechne den Mittelpunkt der beiden Finger
      const midX = (touch1.clientX + touch2.clientX) / 2;
      const midY = (touch1.clientY + touch2.clientY) / 2;

      // Transformiere den Mittelpunkt in die Canvas-Koordinaten
      const point = {
        x: (midX - transform.x) / transform.k,
        y: (midY - transform.y) / transform.k,
      };

      // Berechne die neue Position mit korrektem Offset
      const newX = midX - point.x * clampedScale;
      const newY = midY - point.y * clampedScale;

      // Wende die neue Transformation an
      setTransform(new ZoomTransform(clampedScale, newX, newY));
    } else if (e.touches.length === 1 && touchStartPosition) {
      // Pan
      const dx = e.touches[0].clientX - touchStartPosition.x;
      const dy = e.touches[0].clientY - touchStartPosition.y;

      setTransform(
        new ZoomTransform(transform.k, transform.x + dx, transform.y + dy)
      );
      setTouchStartPosition({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    }
  };
  useEffect(() => {
    if (elementToDelete) {
      const newElements = deleteElement(elements, elementToDelete);
      setElements(newElements);
      setElementToDelete(undefined);
      setSelectedElement(undefined);
    }
  }, [elementToDelete]);

  const handleTouchEnd = () => {
    setTouchStartPosition(null);
    setInitialPinchDistance(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor)
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

  function handleCanvasClick(e: React.MouseEvent<HTMLDivElement>) {
    const clickElement = e.target as HTMLElement;
    if (clickElement.id === "canvas") {
      setSelectedElement(undefined);
    }
  }

  function updateText(elementId: UniqueIdentifier, text: string) {
    setElements(
      elements.map((element: SeatingPlanElementType) => {
        if (element.id === elementId) {
          return {
            ...element,
            data: {
              ...element.data,
              text: text,
            },
          } as CustomTextSeatingPlanElementType;
        }
        return element;
      })
    );
  }

  function updateElement(element: SeatingPlanElementType) {
    setElements(
      elements.map((e) => {
        if (e.id === element.id) {
          return element;
        }
        return e;
      })
    );
  }

  return (
    <div
      ref={updateAndForwardRef}
      className="overflow-hidden bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
      onClick={handleCanvasClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        touchAction: isDragging || selectedElement ? "none" : "manipulation",
        width: "100%",
        height: "calc(100svh - 4rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <DndContext
        sensors={sensors}
        onDragEnd={(event) => {
          setIsDragging(false);
          updateDraggedelementPosition(event);
        }}
        onDragStart={(event) => {
          setIsDragging(true);
          handleDragStart(event);
        }}
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
          id="canvas"
          className="absolute"
          style={{
            width: `${200 * transform.k}%`,
            height: `${200 * transform.k}%`,
            minWidth: "200%",
            minHeight: "200%",
            left: "-50%",
            top: "-50%",
            touchAction: "none",
            transformOrigin: "center center",
            transform: `translate(${transform.x}px, ${transform.y}px)`,
          }}
        >
          {elements.map((element) => {
            if (element.type === SeatingPlanElementTypes.StudentList) {
              return (
                <StudentList
                  canvasTransform={transform}
                  key={element.id}
                  element={element as StudentListSeatingPlanElementType}
                />
              );
            }

            if (element.type === SeatingPlanElementTypes.TwoSeatsDesk) {
              return (
                <TwoSeatsDesk
                  canvasTransform={transform}
                  key={element.id}
                  element={element as TwoSeatsDeskSeatingPlanElementType}
                />
              );
            }

            if (element.type === SeatingPlanElementTypes.OneSeatDesk) {
              return (
                <OneSeatDesk
                  canvasTransform={transform}
                  key={element.id}
                  element={element as OneSeatDeskSeatingPlanElementType}
                />
              );
            }

            if (element.type === SeatingPlanElementTypes.Student) {
              return (
                <Student
                  canvasTransform={transform}
                  key={element.id}
                  element={element as StudentSeatingPlanElementType}
                />
              );
            }

            if (element.type === SeatingPlanElementTypes.CustomText) {
              return (
                <CustomText
                  canvasTransform={transform}
                  key={element.id}
                  element={element as CustomTextSeatingPlanElementType}
                  updateText={(text) => updateText(element.id, text)}
                  updateElement={updateElement}
                />
              );
            }
          })}
        </div>
      </DndContext>
    </div>
  );
}
