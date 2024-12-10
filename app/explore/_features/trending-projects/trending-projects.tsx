"use client";

import { useCallback, useMemo } from "react";

import { Section } from "@/app/explore/_components/section/section";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import {
  CardProjectMarketplace,
  CardProjectMarketplaceLoading,
} from "@/design-system/molecules/cards/card-project-marketplace";

import { ErrorState } from "@/shared/components/error-state/error-state";

export function TrendingProjects() {
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: {
      pageSize: 4,
    },
  });

  const count = useMemo(() => {
    return data?.pages[0]?.totalItemNumber ?? 0;
  }, [data]);

  const renderProjects = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 4 }).map((_, index) => <CardProjectMarketplaceLoading key={index} />);
    }

    if (isError) {
      return (
        <div className="col-span-full">
          <ErrorState />
        </div>
      );
    }

    if (!data) {
      return null;
    }

    return data.pages.flatMap(({ projects }) =>
      projects.map(project => (
        <CardProjectMarketplace
          key={project.id}
          name={project.name}
          description={project.shortDescription}
          logoUrl={project.logoUrl}
          contributorCount={project.contributorCount}
          starCount={project.starCount}
          pullRequestCount={project.pullRequestCount}
          issueCount={project.issueCount}
          goodFirstIssueCount={project.goodFirstIssueCount}
          categories={project.categories}
          languages={project.languages}
        />
      ))
    );
  }, [data, isError, isLoading]);

  return (
    <Section
      title={{
        translate: { token: "explore:trending.title" },
      }}
      count={count}
      description={{
        translate: { token: "explore:trending.description" },
      }}
      classNames={{
        base: "gap-lg",
      }}
    >
      <div className="grid gap-xl mobile:grid-cols-2 laptop:grid-cols-4 laptop:gap-3xl">{renderProjects()}</div>
    </Section>
  );
}
