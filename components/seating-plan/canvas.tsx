import { select } from "d3-selection";
import { zoom, ZoomTransform } from "d3-zoom";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DndContext,
  useDroppable,
  useDraggable,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { changeSeatedStudentPositions } from "./utils";
export default function SeatingPlanCanvas({
  elements,
  setElements,
  transform,
  setTransform,
}: {
  elements: any[];
  setElements(elements: any[]): void;
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
        // Change positions of already placed students
        const newElements = changeSeatedStudentPositions(
          elements,
          active,
          over
        );
        setElements(newElements);
      } else {
      }
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
  };

  function handleDragStart(e: DragStartEvent) {
    const { active } = e;
    if (active) {
      if (active.data.current?.type === "student") {
        setDraggedElement(active.data);
      }
    }
  }

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
            if (element.type === "table") {
              return (
                <Table
                  key={element.id}
                  canvasTransform={transform}
                  element={element}
                />
              );
            }

            if (element.type === "student") {
              return (
                <Student
                  key={element.id}
                  element={element}
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

function Table({
  element,
  canvasTransform,
}: {
  element: any;
  canvasTransform: ZoomTransform;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
    data: element,
  });

  return (
    <div
      style={{
        position: "absolute",
        top: `${element.coordinates.y * canvasTransform.k}px`,
        left: `${element.coordinates.x * canvasTransform.k}px`,
        transformOrigin: "top left",
        ...(transform
          ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0px) scale(${canvasTransform.k})`,
            }
          : {
              transform: `scale(${canvasTransform.k})`,
            }),
      }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="border border-gray-200 rounded-md p-4"
      onPointerDown={(e) => {
        listeners?.onPointerDown?.(e);
        e.preventDefault();
      }}
    >
      Table
      <SortableContext
        id={element.id}
        items={element.students}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex justify-center items-center gap-4">
          {element.students.map((item) => (
            <SortableItem
              key={item.id}
              id={item.id}
              element={item}
              canvasTransform={canvasTransform}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id, data: props });
  const { element, canvasTransform } = props;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      style={{
        ...style,
        ...(transform
          ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0px) scale(${canvasTransform.k})`,
            }
          : {
              transform: `scale(${canvasTransform.k})`,
            }),
      }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onPointerDown={(e) => {
        listeners?.onPointerDown?.(e);
        e.preventDefault();
      }}
      className="bg-accent rounded-md h-12 w-24 flex items-center justify-center"
    >
      {props.id}
    </div>
  );
}

function Student({
  element,
  canvasTransform,
}: {
  element: any;
  canvasTransform: ZoomTransform;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
    data: element,
  });

  return (
    <div
      style={{
        position: "absolute",
        top: `${element.coordinates.y * canvasTransform.k}px`,
        left: `${element.coordinates.x * canvasTransform.k}px`,
        transformOrigin: "top left",
        ...(transform
          ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0px) scale(${canvasTransform.k})`,
            }
          : {
              transform: `scale(${canvasTransform.k})`,
            }),
      }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="border border-gray-200 rounded-md p-4 bg-white h-12 w-24 truncate"
      onPointerDown={(e) => {
        listeners?.onPointerDown?.(e);
        e.preventDefault();
      }}
    >
      {element.id}
    </div>
  );
}
