import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import GenericNode from "./generic";
import Seat from "./seat";
import { TwoSeatsDeskNodeProps } from "@/lib/types/seating-plan";

export default function TwoSeatsDesk({
  id,
  data,
  className,
  style,
  selected,
}: TwoSeatsDeskNodeProps) {
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
        items={data.students}
        strategy={horizontalListSortingStrategy}
      >
        <div className="absolute top-0 left-0 w-full h-4 drag-handle" />
        <div className="absolute top-0 left-0 w-4 h-full drag-handle" />
        <div className="absolute top-0 right-0 w-4 h-full drag-handle" />
        <div className="absolute bottom-0 left-0 w-full h-4 drag-handle" />

        <div className="flex justify-center items-center gap-4">
          {data.students.map((item) => {
            const isEmpty = item.id.toString().includes("empty");
            return (
              <Seat
                key={item.id}
                id={item.id.toString()}
                element={item}
                isEmpty={isEmpty}
              />
            );
          })}
        </div>
      </SortableContext>
    </GenericNode>
  );
}
