"use client";

import { ProjectCard } from "@/app/(saas)/discover/_components/project-card/project-card";
import { Section } from "@/app/(saas)/discover/_components/section/section";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

export function RecentActivity() {
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: { pageSize: 5 },
  });

  const projects = data?.pages.flatMap(({ projects }) => projects) ?? [];

  return (
    <Section title="Recent activity">
      <div className="flex flex-col gap-6">
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            name={project.name}
            description={project.shortDescription}
            slug={project.slug}
            logoUrl={project.logoUrl}
            categories={project.categories.map(category => category.name)}
            languages={project.languages}
          />
        ))}
      </div>
    </Section>
  );
}
