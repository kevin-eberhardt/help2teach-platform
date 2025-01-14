export default async function ClassPage({
  params,
}: {
  params: Promise<{ locale: string; class_id: string }>;
}) {
  const { class_id } = await params;
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Class {class_id}</h1>
    </div>
  );
}
