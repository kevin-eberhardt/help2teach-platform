import { Student } from "@/lib/supabase/types/additional.types";
import StudentNode from "../nodes/student";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NodeType, SeatingPlanNode } from "@/lib/types/seating-plan";
import { checkIfDesk } from "../utils";

function findStudentInNodes(student: Student, nodes: SeatingPlanNode[]) {
  const nodeIds = nodes.map((node) => {
    if (checkIfDesk(node.data.type as NodeType) && "students" in node.data) {
      if (node.data.type === "twoSeatsDesk") {
        return (node.data.students as Student[]).map((student) =>
          student.id.toString()
        );
      } else {
        return [(node.data.student as Student).id.toString()];
      }
    } else {
      return node.id.toString();
    }
  });
  return nodeIds.flat().includes(student.id.toString());
}
export default function StudentList({
  students,
  nodes,
}: {
  students: Student[];
  nodes: SeatingPlanNode[];
}) {
  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-auto p-2 bg-sidebar border border-sidebar z-10">
      <ScrollArea className="h-48 md:h-96">
        <div className="space-y-4">
          {students.map((student) => {
            const isInCanvas = findStudentInNodes(student, nodes);
            if (isInCanvas) return null;
            return (
              <StudentNode
                key={student.id}
                data={student}
                id={student.id}
                type={"student-list"}
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
