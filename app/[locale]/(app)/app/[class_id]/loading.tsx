import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-4 space-y-8">
      <Skeleton className="w-full h-24" />
      <div>
        <Skeleton className="w-48 h-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {Array.from(
            Array(4)
              .keys()
              .map((i) => <Skeleton key={i} className="w-full h-64" />)
          )}
        </div>
      </div>
    </div>
  );
}
