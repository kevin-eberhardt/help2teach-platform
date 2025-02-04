import SeatingPlan from "@/components/seating-plan";
import {
  STUDENT_SETTINGS,
  TWO_SEATS_DESK_SETTINGS,
} from "@/components/seating-plan/utils";
import {
  getSeatingPlanById,
  getStudentsByClassId,
} from "@/lib/supabase/queries";
import { SeatingPlanNode, StudentNodeProps } from "@/lib/types/seating-plan";
import { notFound } from "next/navigation";

export default async function SeatingPlanPage({
  params,
}: {
  params: { locale: string; class_id: string; seatingplan_id: string };
}) {
  const { seatingplan_id, class_id } = await params;
  const seatingPlan = await getSeatingPlanById(seatingplan_id);
  const students = await getStudentsByClassId(class_id);
  const student = students && students[0];
  const studentNode: StudentNodeProps = {
    id: student.id.toString(),
    data: student,
    type: "student",
    position: { x: 0, y: 0 },
    width: STUDENT_SETTINGS.width,
    height: STUDENT_SETTINGS.height,
  };
  const nodes: SeatingPlanNode[] = [
    studentNode,
    {
      id: "test",
      data: {
        label: "Test",
        students: [
          { id: "123123", name: "John" },
          { id: "empty2", name: "Empty" },
        ],
        rotation: 45,
      },
      type: "twoSeatsDesk",
      position: { x: 0, y: 200 },
      width: TWO_SEATS_DESK_SETTINGS.width,
      height: TWO_SEATS_DESK_SETTINGS.height,
    },
  ];
  if (!students) {
    return notFound();
  }

  if (!seatingPlan) {
    return notFound();
  }
  return (
    <div suppressHydrationWarning>
      <SeatingPlan
        students={students}
        seatingPlan={seatingPlan}
        nodes={nodes}
      />
    </div>
  );
}
