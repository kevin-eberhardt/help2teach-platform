export default async function SeatingPlanPage({
  params,
}: {
  params: { locale: string; class_id: string; seatingplan_id: string };
}) {
  const { seatingplan_id } = await params;
  return (
    <div>
      <h1>SeatingPlanPage #{seatingplan_id}</h1>
    </div>
  );
}
