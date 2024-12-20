"use client";

import { useKeenSlider } from "keen-slider/react";
import { useCallback } from "react";

import { ProjectCategoryReactQueryAdapter } from "@/core/application/react-query-adapter/project-category";

import { CardProjectCategory, CardProjectCategoryLoading } from "@/design-system/molecules/cards/card-project-category";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { BREAKPOINTS } from "@/shared/constants/breakpoints";
import { cn } from "@/shared/helpers/cn";

import { Section } from "../../_components/section/section";
import { ProjectCategoryListProps } from "./project-category-list.types";

export function ProjectCategoryList({ className }: ProjectCategoryListProps) {
  const { data, isLoading, isError } = ProjectCategoryReactQueryAdapter.client.useGetProjectCategories({});

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    disabled: !data?.categories.length,
    initial: 0,
    mode: "snap",
    slides: {
      perView: 1.2,
      spacing: 16,
    },
    breakpoints: {
      [`(max-width: ${BREAKPOINTS.wide}px)`]: {
        slides: {
          perView: 6.2,
          spacing: 16,
        },
      },
      [`(max-width: ${BREAKPOINTS.desktop}px)`]: {
        slides: {
          perView: 4.2,
          spacing: 16,
        },
      },
      [`(max-width: ${BREAKPOINTS.laptop}px)`]: {
        slides: {
          perView: 3.2,
          spacing: 16,
        },
      },
      [`(max-width: ${BREAKPOINTS.tablet}px)`]: {
        slides: {
          perView: 2.2,
          spacing: 16,
        },
      },
      [`(max-width: ${BREAKPOINTS.mobile}px)`]: {
        slides: {
          perView: 2.2,
          spacing: 16,
        },
      },
    },
  });

  const renderCategories = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="keen-slider__slide">
          <CardProjectCategoryLoading />
        </div>
      ));
    }

    if (isError) return <ErrorState />;

    if (!data?.categories.length) return null;

    return data?.categories.map((category, index) => (
      <div key={category.id} className="keen-slider__slide">
        <CardProjectCategory category={category} color={gradients[index % gradients.length]} />
      </div>
    ));
  }, [data, isLoading, isError]);

  const gradients = [
    "cosmic_night",
    "deep_ocean",
    "velvet_dusk",
    "arctic_abyss",
    "ember_shadow",
    "mystic_twilight",
  ] as const;

  return (
    <Section
      title={{
        translate: { token: "explore:expertise.title" },
      }}
      description={{
        translate: { token: "explore:expertise.description" },
      }}
      classNames={{
        base: "gap-3xl",
      }}
    >
      <div ref={sliderRef} className={cn("keen-slider", className)}>
        {renderCategories()}
      </div>
    </Section>
  );
}
