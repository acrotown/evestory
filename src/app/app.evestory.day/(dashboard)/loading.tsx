import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <MaxWidthWrapper>
      <div className="flex items-center justify-between pt-10">
        <Skeleton className="h-14w-[25%] rounded-xl" />

        <Skeleton className="h-9 w-[10%] rounded-xl" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[60%]" />
            <Skeleton className="h-4 w-[90%]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[60%]" />
            <Skeleton className="h-4 w-[85%]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[60%]" />
            <Skeleton className="h-4 w-[90%]" />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
