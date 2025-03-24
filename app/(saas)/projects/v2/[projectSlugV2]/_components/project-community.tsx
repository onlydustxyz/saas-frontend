import { bootstrap } from "@/core/bootstrap";
import { ProjectInterfaceV2 } from "@/core/domain/project/models/project-model-v2";

import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";

import { ProjectAsideSection } from "./project-aside-section";

export function ProjectCommunity({
  moreInfos,
  isLoading,
  isError,
}: {
  moreInfos?: ProjectInterfaceV2["moreInfos"];
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

  if (isError || !moreInfos || moreInfos.length === 0) {
    return null;
  }

  const socialKernelPort = bootstrap.getSocialKernelPort();
  const urlKernelPort = bootstrap.getUrlKernelPort();

  return (
    <ProjectAsideSection title="Community">
      <div className={"flex flex-wrap gap-2"}>
        {moreInfos?.map(moreInfoItem => {
          const { icon: Icon, label } = socialKernelPort.getSocialPlatformByUrl(moreInfoItem.url);

          return (
            <Button key={moreInfoItem.url} variant={"outline"} size={"sm"} asChild>
              <a href={urlKernelPort.validateUrl(moreInfoItem.url)} target="_blank" rel="noreferrer noopener">
                <Icon />
                {moreInfoItem.value || label}
              </a>
            </Button>
          );
        })}
      </div>
    </ProjectAsideSection>
  );
}
