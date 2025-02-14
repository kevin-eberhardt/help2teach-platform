import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChangeSchoolClassNameForm from "./change-name-form";
import { notFound } from "next/navigation";
import { getSchoolClassById } from "@/lib/supabase/queries";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DeleteClassForm from "./delete-class-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("sidebar");
  return {
    title: `${t("settings")}`,
  };
}

export default async function ClassSettingsPage({
  params,
}: {
  params: Promise<{ locale: string; class_id: string }>;
}) {
  const { class_id } = await params;
  const currentSchoolClass = await getSchoolClassById(class_id);
  if (!currentSchoolClass) {
    return notFound();
  }
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold">Settings</h1>
      <ChangeSchoolClassNameForm
        classId={currentSchoolClass.id}
        currentName={currentSchoolClass.name}
      />

      <DeleteClassForm classId={currentSchoolClass.id} />
    </div>
  );
}
