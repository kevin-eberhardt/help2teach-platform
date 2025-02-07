import { Student } from "@/lib/supabase/types/additional.types";
import StudentNode from "../nodes/student";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NodeType, SeatingPlanNode } from "@/lib/types/seating-plan";
import { checkIfDesk, STUDENT_SETTINGS } from "../utils";
import { ChevronLeft, ChevronRight, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StudentListProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  triggerType?: "click" | "hover";
  width?: string;
  children?: React.ReactNode;
  students: Student[];
  nodes: SeatingPlanNode[];
}

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
        const students = node.data.students as Student[];
        nodeIds.push(students[0].id.toString());
        nodeIds.push(students[1].id.toString());
      }
      nodeIds.push(node.id);
    }
  });
  return nodeIds.includes(studentId.toString());
}

export default function StudentList({
  defaultOpen = false,
  width = "auto",
  className,
  students: initialStudents,
  nodes: initialNodes,
  ...props
}: StudentListProps) {
  const [nodes, setNodes] = useState<SeatingPlanNode[]>(initialNodes);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes]);

  // if all students are in nodes return null
  if (students.every((student) => findStudentInNodes(student.id, nodes))) {
    return null;
  }

  const handleInteraction = () => {
    setIsOpen(!isOpen);
    setIsLocked(false);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isLocked) {
      setIsOpen(false);
    }
  };

  const toggleLock = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from affecting the container
    setIsLocked(!isLocked);
  };

  return (
    <div
      className={cn(
        "fixed right-0 top-1/2 -translate-y-1/2 flex items-center",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <button
        onClick={handleInteraction}
        className={cn(
          "flex h-12 w-8 items-center justify-center rounded-l-md border bg-background shadow-sm transition-transform",
          isOpen && "rotate-180"
        )}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close panel" : "Open panel"}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <div
        className={cn(
          "transition-all duration-300 ease-in-out border border-sidebar-border",
          isOpen ? `w-[${width}]` : "w-0"
        )}
      >
        <div
          className={cn(
            "relative h-full min-w-[200px] bg-sidebar p-4 shadow-lg"
          )}
        >
          {isOpen && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-2"
                    onClick={toggleLock}
                  >
                    {isLocked ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      <Unlock className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {isLocked ? "Unlock panel" : "Lock panel"}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isLocked ? "Unlock panel" : "Lock panel"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <ScrollArea
            className={`h-96 relative overflow-scroll no-scrollbar w-[120px]`}
          >
            <div className="space-y-4">
              {students.map((student) => {
                const isInCanvas = findStudentInNodes(student.id, nodes);
                if (isInCanvas) return null;
                return (
                  <StudentNode
                    key={student.id}
                    data={student}
                    type="student-list"
                    id={student.id.toString()}
                    position={{ x: 0, y: 0 }}
                  />
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
