import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH3, TypographyMuted } from "@/shared/ui/typography";

import { ProjectCard } from "../project-card/project-card";
import { LeaderBoardProps } from "./leader-board.types";

export function LeaderBoard({ projectId }: LeaderBoardProps) {
  const { capture } = usePosthog();
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetRankedSimilarProjectsLeaderboard({
    pathParams: { projectIdOrSlug: projectId },
    options: {
      enabled: Boolean(projectId),
    },
  });

  const projects = useMemo(() => data?.projects ?? [], [data]);

  const renderProjects = useMemo(() => {
    if (isLoading) {
      return <Skeleton className="h-[200px] w-full" />;
    }

    if (isError) {
      return (
        <div className={"flex items-center justify-center py-10"}>
          <TypographyMuted>Error loading leaderboard</TypographyMuted>
        </div>
      );
    }

    if (projects?.length < 2) {
      return (
        <div className={"flex items-center justify-center py-10"}>
          <TypographyMuted>No similar projects found</TypographyMuted>
        </div>
      );
    }

    return (
      <>
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            name={project.name}
            description={project.shortDescription}
            slug={project.slug}
            logoUrl={project.logoUrl ?? ""}
            onClick={() => {
              capture("manage_project_dashboard_click_leaderboard", { projectId, targetId: project.id });
            }}
            categories={project?.categories?.map(category => category.name) ?? []}
            languages={project?.languages ?? []}
            rank={project.rank}
            className={project.id === projectId ? "bg-gradient-to-br from-purple-950 to-transparent to-50%" : ""}
          />
        ))}
      </>
    );
  }, [isLoading, isError, projects]);

  return (
    <Card className={"flex flex-col gap-4 p-4"}>
      <TypographyH3>Similar Projects Leaderboard</TypographyH3>
      <div className="flex flex-col gap-xl">{renderProjects}</div>
    </Card>
  );
}
