import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyMuted } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { ProjectAsideSection } from "./project-aside-section";
import { ProjectAsideContributorsModal } from "./project-contributors-modal";

export function ProjectContributors({ projectIdOrSlug }: { projectIdOrSlug: string }) {
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectContributorsV2({
    queryParams: {
      pageSize: 5,
    },
    pathParams: {
      projectIdOrSlug,
    },
  });

  const contributors = useMemo(() => data?.pages?.flatMap(page => page.contributors) ?? [], [data]);
  const totalItemNumber = useMemo(() => data?.pages?.[0]?.totalItemNumber ?? 0, [data]);

  if (isLoading) {
    return (
      <ProjectAsideSection.Skeleton>
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-8 w-1/2" />
      </ProjectAsideSection.Skeleton>
    );
  }

  if (isError || !contributors || contributors.length === 0) {
    return null;
  }

  return (
    <ProjectAsideSection title="Contributors">
      <ProjectAsideContributorsModal projectIdOrSlug={projectIdOrSlug}>
        <div className="flex items-center">
          {contributors.map((contributor, i) => (
            <Avatar
              key={contributor.login}
              className={cn("size-8", {
                "-ml-2": i !== 0,
              })}
            >
              <AvatarImage src={contributor.avatarUrl} alt={contributor.login} />
              <AvatarFallback>{contributor.login.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}

          {totalItemNumber > 5 && (
            <div className="relative -ml-2 flex size-8 items-center justify-center rounded-full bg-muted text-xs">
              +{totalItemNumber - 5}
            </div>
          )}
        </div>
      </ProjectAsideContributorsModal>

      {contributors.length > 2 ? (
        <TypographyMuted>
          {contributors[0].login}, {contributors[1].login} and {totalItemNumber - 2} others
        </TypographyMuted>
      ) : (
        <TypographyMuted>{contributors.map(contributor => contributor.login).join(", ")}</TypographyMuted>
      )}
    </ProjectAsideSection>
  );
}
