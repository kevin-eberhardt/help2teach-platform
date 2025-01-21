import { StudentsEditTable } from "@/components/students/edit-table";
import { columns } from "@/components/students/edit-table/columns";
import { getStudentsByClassId } from "@/lib/supabase/queries";
import { getTranslations } from "next-intl/server";

export default async function StudentsPage({
  params,
}: {
  params: { locale: string; class_id: string };
}) {
  const { class_id } = await params;
  const students = await getStudentsByClassId(class_id);
  const t = await getTranslations("students");
  return (
    <div className="p-4">
      <div className="max-w-lg">
        <h1 className="text-4xl">{t("page.heading")}</h1>
        <p>{t("page.description")}</p>
      </div>
      <div className="container mx-auto py-10">
        <StudentsEditTable
          data={students ? students : []}
          columns={columns(t)}
          schoolClassId={parseInt(class_id)}
        />
      </div>
    </div>
  );
}
