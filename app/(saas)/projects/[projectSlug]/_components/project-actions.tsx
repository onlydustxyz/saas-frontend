import { Skeleton } from "@/shared/ui/skeleton";

import { ProjectActionsAlert } from "./project-actions-alert";
import { ProjectActionsBookmark } from "./project-actions-bookmark";
import { ProjectContributeNow } from "./project-contribute-now";

export function ProjectActions({
  projectId,
  projectName,
  isLoading,
  isError,
}: {
  projectId?: string;
  projectName?: string;
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading) {
    return <ProjectActionsSkeleton />;
  }

  if (isError) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <ProjectActionsAlert projectId={projectId} />
      <ProjectActionsBookmark projectId={projectId} projectName={projectName} />
      <ProjectContributeNow projectId={projectId} />
    </div>
  );
}

export function ProjectActionsSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="size-9" />
      <Skeleton className="size-9" />
      <Skeleton className="h-9 w-[132px]" />
    </div>
  );
}
