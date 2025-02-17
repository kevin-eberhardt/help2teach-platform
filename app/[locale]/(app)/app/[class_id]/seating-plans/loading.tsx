import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-4 space-y-4">
      <Skeleton className="w-32 h-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="w-full h-80" />
        ))}
      </div>
    </div>
  );
}
