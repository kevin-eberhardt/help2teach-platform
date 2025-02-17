import { StudentsEditTable } from "@/components/students/edit-table";
import { columns } from "@/components/students/edit-table/columns";
import { getStudentsByClassId } from "@/lib/supabase/queries";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("sidebar");
  return {
    title: `${t("students")}`,
  };
}

export default async function StudentsPage({
  params,
}: {
  params: Promise<{ locale: string; class_id: string }>;
}) {
  const { class_id } = await params;
  const students = await getStudentsByClassId(class_id);
  const t = await getTranslations("students");

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{t("page.heading")}</h1>
        <p>{t("page.description")}</p>
      </div>
      <StudentsEditTable
        data={students ? students : []}
        columns={columns(t)}
        schoolClassId={parseInt(class_id)}
      />
    </div>
  );
}
