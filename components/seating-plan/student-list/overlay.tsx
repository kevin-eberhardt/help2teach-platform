import { DragOverlay, useDndContext } from "@dnd-kit/core";
import { Viewport } from "@xyflow/react";
import { STUDENT_SETTINGS } from "../utils";
import { Student } from "@/lib/supabase/types/additional.types";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import StudentNode from "../nodes/student";

export default function StudentOverlay({
  viewPort,
}: {
  viewPort: Viewport | null;
}) {
  const { active } = useDndContext();
  const zoom = viewPort?.zoom || 1;
  const current = active?.data.current as Student & { type: string };
  if (current) {
    if (current.type === "student" || current.type === "student-list") {
      return (
        <DragOverlay modifiers={[snapCenterToCursor]}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              scale: zoom,
              width: STUDENT_SETTINGS.width,
              height: STUDENT_SETTINGS.height,
            }}
          >
            <StudentNode
              id={current.id.toString()}
              data={current}
              type="student"
              position={{ x: 0, y: 0 }}
            />
          </div>
        </DragOverlay>
      );
    }
  }
}
