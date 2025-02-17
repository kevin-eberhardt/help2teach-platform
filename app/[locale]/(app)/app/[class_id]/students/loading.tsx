import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    // <div className="p-4 space-y-8">
    // <div className="p-4 flex flex-col gap-4">
    <div className="p-4 flex flex-col gap-4">
      <div className="space-y-2">
        <Skeleton className="w-48 h-10" />
        <Skeleton className="w-full h-10" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-96 h-10" />
        <div className="p-4">
          <Skeleton className="w-full h-72" />
        </div>
      </div>
    </div>
  );
}
