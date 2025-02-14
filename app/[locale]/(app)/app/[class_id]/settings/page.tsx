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

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Klasse löschen</CardTitle>
          <CardDescription>
            Wenn du deine Klasse löschen möchtest, kannst du dies hier tun.
            Beachte, dass diese Aktion nicht rückgängig gemacht werden kann.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="destructive">Löschen</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
