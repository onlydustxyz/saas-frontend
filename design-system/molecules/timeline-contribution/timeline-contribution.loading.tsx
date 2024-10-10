import { Skeleton } from "@/design-system/atoms/skeleton";

export function TimelineContributionLoading() {
  return (
    <Skeleton
      classNames={{
        base: "w-full h-5",
      }}
    />
  );
}
