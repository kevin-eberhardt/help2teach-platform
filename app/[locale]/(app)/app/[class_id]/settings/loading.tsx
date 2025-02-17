import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-4 space-y-4">
      <Skeleton className="w-48 h-9" />
      <Skeleton key={"change-class-skeleton"} className="w-full h-[17rem]" />
      <Skeleton key={"delete-class-skeleton"} className="w-full h-48" />
    </div>
  );
}
