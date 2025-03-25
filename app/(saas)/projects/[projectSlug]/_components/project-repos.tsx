import { Github } from "lucide-react";

import { ProjectInterfaceV2 } from "@/core/domain/project/models/project-model-v2";

import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyMuted, TypographySmall } from "@/shared/ui/typography";

import { ProjectAsideSection } from "./project-aside-section";

export function ProjectRepos({
  repos,
  isLoading,
  isError,
}: {
  repos?: ProjectInterfaceV2["repos"];
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading) {
    return (
      <ProjectAsideSection.Skeleton>
        <Skeleton className="h-[60px] w-full" />
      </ProjectAsideSection.Skeleton>
    );
  }

  if (isError || !repos || repos.length === 0) {
    return null;
  }

  return (
    <ProjectAsideSection title="Repositories">
      <div className="space-y-3">
        {repos.map(repo => (
          <a
            key={repo.id}
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-2 rounded-lg p-2.5 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center gap-1">
              <Github className="size-4 text-muted-foreground" />

              <TypographySmall className="line-clamp-1">
                {repo.owner}/{repo.name}
              </TypographySmall>
            </div>

            {repo.description ? (
              <TypographyMuted className="line-clamp-2 text-xs">{repo.description}</TypographyMuted>
            ) : null}
          </a>
        ))}
      </div>
    </ProjectAsideSection>
  );
}
