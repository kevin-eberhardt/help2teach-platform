import { Student } from "@/lib/supabase/types/additional.types";
import StudentNode from "../nodes/student";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NodeType, SeatingPlanNode } from "@/lib/types/seating-plan";
import { checkIfDesk } from "../utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`absolute right-0 top-1/3 -translate-y-1/3 flex items-center ${
        isOpen || isHovered ? "translate-x-0" : "translate-x-[calc(100%-16px)]"
      } transition-transform duration-300 ease-in-out z-10`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        size="icon"
        className="size-4 relative z-20"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen || isHovered ? (
          <ChevronRight className="transition-transform duration-300" />
        ) : (
          <ChevronLeft className="transition-transform duration-300" />
        )}
      </Button>
      <div className="bg-sidebar border-sidebar-border p-2">
        <ScrollArea className="h-auto max-h-48 md:max-h-80 relative overflow-scroll">
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
    </div>
  );
}
