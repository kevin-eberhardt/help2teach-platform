import SeatingPlan from "@/components/seating-plan";
import {
  getSeatingPlanById,
  getStudentsByClassId,
} from "@/lib/supabase/queries";
import { SeatingPlan as SeatingPlanProps } from "@/lib/supabase/types/additional.types";
import { Json } from "@/lib/supabase/types/database.types";
import {
  OneSeatDeskNodeProps,
  SeatingPlanNode,
  StudentNodeProps,
  TwoSeatsDeskNodeProps,
} from "@/lib/types/seating-plan";
import { notFound } from "next/navigation";

export default async function SeatingPlanPage({
  params,
}: {
  params: Promise<{ locale: string; class_id: string; seatingplan_id: string }>;
}) {
  const { seatingplan_id, class_id } = await params;
  const seatingPlan = (await getSeatingPlanById(
    seatingplan_id
  )) as SeatingPlanProps;
  const students = await getStudentsByClassId(class_id);
  if (!students) {
    return notFound();
  }

  if (!seatingPlan) {
    return notFound();
  }

  // update nodes of type "student" and check if the student has changed
  // if so, update the student in the nodes
  // if not, return the student
  if (seatingPlan.nodes && (seatingPlan.nodes as Json[]).length > 0) {
    const nodes = seatingPlan.nodes as unknown as SeatingPlanNode[];
    const reIdentifiedNodes = nodes.map((node: SeatingPlanNode) => {
      if (node.type === "student") {
        node = node as StudentNodeProps;
        const student = students.find((student) => student.id === node.data.id);
        if (!student) return node;

        return {
          ...node,
          data: {
            ...node.data,
            ...student,
          },
        };
      } else {
        if (node.type === "oneSeatDesk") {
          const oneSeatNode = node as OneSeatDeskNodeProps;
          if (!oneSeatNode.data.student.id.toString().includes("empty")) {
            const student = students.find(
              (student) => student.id === oneSeatNode.data.student.id
            );
            if (!student) return node;

            return {
              ...node,
              data: {
                ...node.data,
                student: student,
              },
            };
          } else {
            return node;
          }
        } else if (node.type === "twoSeatsDesk") {
          const twoSeatsNode = node as TwoSeatsDeskNodeProps;
          const updatedStudents = twoSeatsNode.data.students.map((s) => {
            if (!s.id.toString().includes("empty")) {
              const student = students.find((student) => student.id === s.id);
              return student || s;
            }
            return s;
          });
          twoSeatsNode.data.students = updatedStudents;
        }
      }
      return node;
    });
    seatingPlan.nodes = reIdentifiedNodes as unknown as Json;
  }

  return (
    <div suppressHydrationWarning>
      <SeatingPlan students={students} seatingPlan={seatingPlan} />
    </div>
  );
}
