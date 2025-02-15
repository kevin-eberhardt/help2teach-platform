import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-4 space-y-8">
      <div className="space-y-4">
        <Skeleton className="w-48 h-8" />
        <Skeleton className="w-full h-8" />
      </div>
      <div className="space-y-4">
        <Skeleton className="w-96 h-8" />
        <div className="space-y-1">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
        </div>
      </div>
    </div>
  );
}
