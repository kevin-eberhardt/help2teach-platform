import { Student } from "@/lib/supabase/types/additional.types";
import StudentNode from "../nodes/student";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NodeType, SeatingPlanNode } from "@/lib/types/seating-plan";
import { checkIfDesk } from "../utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import StudentListNode from "./item";

function findStudentInNodes(
  studentId: Student["id"],
  nodes: SeatingPlanNode[]
): boolean {
  if (!nodes) return false;

  const nodeIds: Array<string> = [];

  nodes.forEach((node) => {
    if (node.type == "student") nodeIds.push(node.data.id.toString());
    if (checkIfDesk(node.type as NodeType)) {
      if (node.type === "oneSeatDesk") {
        nodeIds.push(node.data.student.id.toString());
      } else {
        nodeIds.concat(
          (node.data.students as Student[]).map((student) =>
            student.id.toString()
          )
        );
      }
      nodeIds.push(node.id);
    }
  });
  return nodeIds.includes(studentId.toString());
}

export default function StudentList({
  students: initialStudents,
  nodes: initialNodes,
}: {
  students: Student[];
  nodes: SeatingPlanNode[];
}) {
  const [nodes, setNodes] = useState<SeatingPlanNode[]>(initialNodes);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes]);

  return (
    <div
      className={`absolute right-0 top-1/3 -translate-y-1/3 flex items-center ${
        isOpen || isHovered ? "translate-x-0" : "translate-x-[calc(100%-16px)]"
      } transition-transform duration-300 ease-in-out z-10`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerLeave={() => setIsHovered(false)}
      onPointerEnter={() => setIsHovered(true)}
    >
      <Button
        size="icon"
        className="size-4 relative z-20 bg-sidebar"
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
        <ScrollArea className="h-auto max-h-48 md:max-h-80 relative overflow-scroll no-scrollbar">
          <div className="space-y-4">
            {students.map((student) => {
              const isInCanvas = findStudentInNodes(student.id, nodes);
              if (isInCanvas) return null;
              return (
                <StudentNode
                  key={student.id}
                  data={student}
                  type="student"
                  id={student.id.toString()}
                  position={{ x: 0, y: 0 }}
                />
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
