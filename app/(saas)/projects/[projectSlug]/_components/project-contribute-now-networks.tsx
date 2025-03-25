import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";

import { Icon } from "@/design-system/atoms/icon";

import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH4, TypographyP } from "@/shared/ui/typography";

export function ProjectContributeNowNetworks({ projectId = "" }: { projectId?: string }) {
  const socialKernelPort = bootstrap.getSocialKernelPort();
  const urlKernelPort = bootstrap.getUrlKernelPort();

  const { capture } = usePosthog();

  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: projectId,
    },
    options: {
      enabled: Boolean(projectId),
    },
  });

  const moreInfos = useMemo(() => data?.moreInfos ?? [], [data]);

  if (isLoading) {
    return <Skeleton className="h-[154px]" />;
  }

  if (moreInfos.length === 0 || isError) {
    return null;
  }

  return (
    <Card className="flex flex-col gap-3 p-3">
      <TypographyH4>Join social networks</TypographyH4>

      <TypographyP className="text-sm">
        Join our community on social networks to stay updated and interact with other contributors.
      </TypographyP>

      <div className="flex flex-wrap gap-2">
        {moreInfos.map(({ url, value }) => {
          const { icon, label } = socialKernelPort.getSocialPlatformByUrl(url);

          return (
            <Button
              key={url}
              variant={"outline"}
              asChild
              className="w-fit"
              onClick={() => {
                capture("project_overview_contribute_now_click_social_network", {
                  project_id: projectId,
                  social_network: value,
                });
              }}
            >
              <a href={urlKernelPort.validateUrl(url)} target="_blank" rel="noopener noreferrer">
                <Icon component={icon} />
                {value || label}
              </a>
            </Button>
          );
        })}
      </div>
    </Card>
  );
}
