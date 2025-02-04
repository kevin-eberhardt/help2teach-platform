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
