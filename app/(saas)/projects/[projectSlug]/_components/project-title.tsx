import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH2, TypographyP } from "@/shared/ui/typography";

import { ProjectActions, ProjectActionsSkeleton } from "./project-actions";

export function ProjectTitle({
  id,
  name,
  shortDescription,
  isLoading,
  isError,
  showActions,
}: {
  id?: string;
  name?: string;
  shortDescription?: string;
  isLoading: boolean;
  isError: boolean;
  showActions?: boolean;
}) {
  if (isLoading) {
    return (
      <header className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between gap-1">
          <Skeleton className="h-9 w-1/4" />

          <ProjectActionsSkeleton />
        </div>

        <Skeleton className="h-7 w-full" />
      </header>
    );
  }

  if (isError) {
    return null;
  }

  return (
    <header className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col-reverse gap-2 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-3">
        {name ? <TypographyH2>{name}</TypographyH2> : null}

        {showActions ? (
          <ProjectActions projectId={id} projectName={name} isLoading={isLoading} isError={isError} />
        ) : null}
      </div>

      {shortDescription ? <TypographyP className="text-muted-foreground">{shortDescription}</TypographyP> : null}
    </header>
  );
}
