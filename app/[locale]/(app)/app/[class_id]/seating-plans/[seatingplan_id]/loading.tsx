import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Skeleton className="relative h-[calc(100vh-120px)] xl:h-[calc(100vh-70px)]" />
  );
}
