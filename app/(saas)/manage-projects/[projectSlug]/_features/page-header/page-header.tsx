import onlydustLogoSpace from "@/public/images/logos/onlydust-logo-space.webp";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { CircleDotDashed, ExternalLink, GitMerge, Settings, Star, User } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { ProjectInterfaceV2 } from "@/core/domain/project/models/project-model-v2";

import { Icon } from "@/design-system/atoms/icon";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useProjectUpdateSidePanel } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.hooks";
import { Avatar } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { TypographyH3, TypographyP, TypographySmall } from "@/shared/ui/typography";

import { PageHeaderProps } from "./page-header.types";

function Stats({ project }: { project: ProjectInterfaceV2 | undefined }) {
  if (!project) return null;

  function renderItem({ label, value, Icon }: { label: string; value: ReactNode; Icon: ReactNode }) {
    return (
      <div className="flex flex-row items-center justify-start gap-1">
        {Icon}
        <TypographySmall>{value}</TypographySmall>
        <TypographySmall className="text-muted-foreground">{label}</TypographySmall>
      </div>
    );
  }
  return (
    <div className="flex flex-row flex-wrap items-center justify-start gap-3">
      {renderItem({
        label: "Active contributors",
        value: project.contributorCount,
        Icon: <Icon component={User} color="red" />,
      })}
      {renderItem({
        label: "Availables issues",
        value: project.availableIssueCount,
        Icon: <Icon component={CircleDotDashed} color="green" />,
      })}
      {renderItem({
        label: "PRs Merged",
        value: project.mergedPrCount,
        Icon: <Icon component={GitMerge} color="purple" />,
      })}
      {renderItem({
        label: "Stars",
        value: project.starCount,
        Icon: <Icon component={Star} color="yellow" />,
      })}
    </div>
  );
}

export function PageHeader({ projectSlug }: PageHeaderProps) {
  const { open: openProject } = useProjectUpdateSidePanel();
  const { data: project } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: { projectIdOrSlug: projectSlug },
    options: {
      enabled: Boolean(projectSlug),
    },
  });
  return (
    <div className="flex flex-wrap items-start gap-4">
      <div className="flex flex-1 items-center gap-2">
        <Avatar className="h-24 w-24 rounded-xl border-4 border-background bg-background">
          <AvatarImage src={project?.logoUrl} alt={project?.name} className="h-full w-full object-cover" />
          <AvatarFallback>
            <img className="h-full w-full object-cover" src={onlydustLogoSpace?.src} alt={project?.name} />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <TypographyH3>{project?.name}</TypographyH3>
          <TypographyP className="text-muted-foreground">{project?.shortDescription}</TypographyP>
          <Stats project={project} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {project?.id ? (
          <Button variant="outline" onClick={() => openProject({ projectId: project.id })}>
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        ) : null}
        <Button variant="outline" asChild>
          <Link href={NEXT_ROUTER.projects.details.root(projectSlug)} target="_blank">
            <ExternalLink className="h-4 w-4" />
            Public Page
          </Link>
        </Button>
      </div>
    </div>
  );
}
