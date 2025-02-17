"use client";

import { useCallback } from "react";

import { ProjectCard, ProjectCardSkeleton } from "@/app/(saas)/discover/_components/project-card/project-card";
import { Section } from "@/app/(saas)/discover/_components/section/section";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { NEXT_ROUTER } from "@/shared/constants/router";

export function RecentActivity() {
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: { pageSize: 5, sortBy: "RECENT_ACTIVITY" },
  });

  const renderProjects = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, index) => <ProjectCardSkeleton key={index} />);
    }

    const projects = data?.pages.flatMap(({ projects }) => projects) ?? [];

    return projects.map(project => (
      <ProjectCard
        key={project.id}
        name={project.name}
        description={project.shortDescription}
        slug={project.slug}
        logoUrl={project.logoUrl}
        categories={project.categories.map(category => category.name)}
        languages={project.languages}
      />
    ));
  }, [data, isLoading]);

  if (isError) return null;

  return (
    <Section title="Recent activity" seeMore={`${NEXT_ROUTER.projects.root}?sortBy=RECENT_ACTIVITY`}>
      <div className="flex flex-col gap-6">{renderProjects()}</div>
    </Section>
  );
}
