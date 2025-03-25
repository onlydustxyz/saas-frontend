import { ProjectInterfaceV2 } from "@/core/domain/project/models/project-model-v2";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";

import { ProjectAsideSection } from "./project-aside-section";

export function ProjectEcosystems({
  ecosystems,
  isLoading,
  isError,
}: {
  ecosystems?: ProjectInterfaceV2["ecosystems"];
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading) {
    return (
      <ProjectAsideSection.Skeleton>
        <Skeleton className="h-8 w-1/2" />
      </ProjectAsideSection.Skeleton>
    );
  }

  if (isError || !ecosystems || ecosystems.length === 0) {
    return null;
  }

  return (
    <ProjectAsideSection title="Ecosystems">
      <div className="flex flex-wrap gap-2">
        {ecosystems.map(ecosystem => (
          <Button key={ecosystem.name} variant={"outline"} size={"sm"} asChild>
            <a href={ecosystem.url} target="_blank" rel="noreferrer noopener">
              <Avatar className="size-4">
                <AvatarImage src={ecosystem.logoUrl} alt={ecosystem.name} />
                <AvatarFallback>{ecosystem.name.charAt(0)}</AvatarFallback>
              </Avatar>

              {ecosystem.name}
            </a>
          </Button>
        ))}
      </div>
    </ProjectAsideSection>
  );
}
