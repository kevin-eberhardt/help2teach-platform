import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import GenericNode from "./generic";
import Seat from "./seat";
import { OneSeatDeskNodeProps } from "@/lib/types/seating-plan";

export default function OneSeatDesk({
  id,
  data,
  className,
  style,
  selected,
}: OneSeatDeskNodeProps) {
  return (
    <GenericNode
      className={className}
      style={style}
      selected={selected}
      data={data}
      id={id}
      key={id}
    >
      <SortableContext
        id={id}
        items={[data.student]}
        strategy={horizontalListSortingStrategy}
      >
        <div className="absolute top-0 left-0 w-full h-4 drag-handle" />
        <div className="absolute top-0 left-0 w-4 h-full drag-handle" />
        <div className="absolute top-0 right-0 w-4 h-full drag-handle" />
        <div className="absolute bottom-0 left-0 w-full h-4 drag-handle" />
        <div className="flex justify-center items-center gap-4">
          <Seat
            key={data.student.id}
            id={data.student.id.toString()}
            element={data.student}
            isEmpty={data.student.id.toString().includes("empty")}
          />
        </div>
      </SortableContext>
    </GenericNode>
  );
}
