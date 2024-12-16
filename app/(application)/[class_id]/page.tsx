export default async function ClassPage({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const { class_id: classId } = await params;
  return (
    <div>
      <h1>Class Page {classId}</h1>
    </div>
  );
}
