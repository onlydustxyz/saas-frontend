"use client";

import { useKeenSlider } from "keen-slider/react";
import { useCallback } from "react";

import { Section } from "@/app/explore/_components/section/section";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import {
  CardProjectMarketplace,
  CardProjectMarketplaceLoading,
} from "@/design-system/molecules/cards/card-project-marketplace";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { BREAKPOINTS } from "@/shared/constants/breakpoints";

export function TrendingProjects() {
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({});

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    disabled: !data,
    initial: 0,
    mode: "snap",
    slides: {
      perView: 1.2,
      spacing: 16,
    },
    breakpoints: {
      [`(max-width: ${BREAKPOINTS.wide}px)`]: {
        slides: {
          perView: 7.1,
          spacing: 24,
        },
      },
      [`(max-width: ${BREAKPOINTS.desktop}px)`]: {
        slides: {
          perView: 4.1,
          spacing: 24,
        },
      },
      [`(max-width: ${BREAKPOINTS.laptop}px)`]: {
        slides: {
          perView: 3.1,
          spacing: 20,
        },
      },
      [`(max-width: ${BREAKPOINTS.tablet}px)`]: {
        slides: {
          perView: 2.1,
          spacing: 16,
        },
      },
      [`(max-width: ${BREAKPOINTS.mobile}px)`]: {
        slides: {
          perView: 1.1,
          spacing: 16,
        },
      },
    },
  });

  const renderProjects = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="keen-slider__slide">
          <CardProjectMarketplaceLoading />
        </div>
      ));
    }

    if (isError) return <ErrorState />;

    if (!data) return null;

    return data.pages.flatMap(({ projects }) =>
      projects.map(project => (
        <div key={project.id} className="keen-slider__slide">
          <CardProjectMarketplace
            name={project.name}
            slug={project.slug}
            description={project.shortDescription}
            logoUrl={project.logoUrl}
            contributorCount={project.contributorCount}
            starCount={project.starCount}
            forkCount={project.forkCount}
            availableIssueCount={project.availableIssueCount}
            goodFirstIssueCount={project.goodFirstIssueCount}
            categories={project.categories}
            languages={project.languages}
            ecosystems={project.ecosystems}
          />
        </div>
      ))
    );
  }, [data, isError, isLoading]);

  return (
    <Section
      title={{
        translate: { token: "explore:trending.title" },
      }}
      description={{
        translate: { token: "explore:trending.description" },
      }}
      classNames={{
        base: "gap-3xl",
      }}
    >
      <div ref={sliderRef} className="keen-slider">
        {renderProjects()}
      </div>
    </Section>
  );
}
