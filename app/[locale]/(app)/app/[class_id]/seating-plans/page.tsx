import { Link } from "@/lib/i18n/routing";
import { getSeatingPlansByClassId } from "@/lib/supabase/queries";

export default async function SeatingPlansPage({
  params,
}: {
  params: Promise<{ locale: string; class_id: string }>;
}) {
  const { class_id } = await params;
  const seatingPlans = await getSeatingPlansByClassId(class_id);
  return (
    <div>
      <h1>Seating Plans</h1>
      <ul>
        {seatingPlans &&
          seatingPlans.map((plan) => (
            <li key={plan.id}>
              <Link href={`/app/${class_id}/seating-plans/${plan.id}`}>
                {plan.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
