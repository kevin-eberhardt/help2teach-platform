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
