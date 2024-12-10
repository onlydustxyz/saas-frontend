"use client";

import { useCallback } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Badge } from "@/design-system/atoms/badge/variants/badge-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelSingle, AvatarLabelSingleLoading } from "@/design-system/molecules/avatar-label-single";

import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { ErrorState } from "@/shared/components/error-state/error-state";

export function ProjectLeaderboard() {
  // TODO @Mehdi check for the appropriate endpoints once ready
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: {
      pageSize: 6,
    },
  });

  const renderProjects = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 6 }).map((_, index) => <AvatarLabelSingleLoading key={index} size="md" />);
    }

    if (isError) {
      return <ErrorState />;
    }

    if (!data) {
      return (
        <EmptyState
          titleTranslate={{ token: "explore:projectLeaderboard.emptyState.title" }}
          descriptionTranslate={{ token: "explore:projectLeaderboard.emptyState.description" }}
        />
      );
    }

    return data.pages.flatMap(({ projects }) =>
      projects.map((project, index) => (
        <div key={project.id} className="flex items-center gap-md">
          <Typo size="sm" weight="medium" color="tertiary" classNames={{ base: "tabular-nums" }}>
            {index + 1}
          </Typo>
          <div className="flex flex-1 items-center justify-between gap-md">
            <AvatarLabelSingle
              size="md"
              avatar={{ src: project.logoUrl, alt: project.name }}
              title={{ children: project.name }}
              description={{ children: project.shortDescription }}
            />
            <Badge
              classNames={{ base: "w-fit shrink-0" }}
              translate={{
                token: "common:count.prCount",
                count: project.pullRequestCount,
              }}
            />
          </div>
        </div>
      ))
    );
  }, [data, isError, isLoading]);

  return (
    <Paper background="primary-alt" px="xl" py="xl">
      <div className="flex flex-col gap-md">
        <Typo variant="heading" size="xs" weight="medium" translate={{ token: "explore:projectLeaderboard.title" }} />
        <Typo color="secondary" size="xs" translate={{ token: "explore:projectLeaderboard.description" }} />
      </div>
      <div className="mt-xl flex flex-col gap-lg">{renderProjects()}</div>
    </Paper>
  );
}
