import { Student } from "@/lib/supabase/types/additional.types";
import StudentListItem from "./item";

export default function StudentList({ students }: { students: Student[] }) {
  return (
    <div className="bg-sidebar absolute top-1/4 left-4 z-10">
      {students.map((student) => (
        <StudentListItem key={student.id} student={student} />
      ))}
    </div>
  );
}
