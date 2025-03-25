import { PropsWithChildren } from "react";

import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH4 } from "@/shared/ui/typography";

export function ProjectAsideSection({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <Card className="p-4 md:rounded-none md:border-x-0 md:border-b-0 md:p-0 md:pt-4">
      <section className="space-y-3">
        <TypographyH4>{title}</TypographyH4>

        {children}
      </section>
    </Card>
  );
}

ProjectAsideSection.Skeleton = function ProjectAsideSectionSkeleton({ children }: PropsWithChildren) {
  return (
    <section className="space-y-3">
      <Skeleton className="h-7 w-full" />

      {children}
    </section>
  );
};
