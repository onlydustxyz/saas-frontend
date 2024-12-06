"use client";

import { ProjectCategoryReactQueryAdapter } from "@/core/application/react-query-adapter/project-category";

import { Typo } from "@/design-system/atoms/typo";
import { ProjectCategoryCard } from "@/design-system/molecules/cards/project-category";

export default function ExplorePage() {
  const { data: data } = ProjectCategoryReactQueryAdapter.client.useGetProjectCategories({});

  return (
    <div className="mx-auto flex max-w-laptop flex-col gap-6xl py-4xl">
      <Typo variant="heading" size="xl" translate={{ token: "explore:title" }} />

      <div className="flex flex-wrap gap-md">
        {data?.categories?.map(category => <ProjectCategoryCard key={category.id} category={category} color="brand" />)}
      </div>
    </div>
  );
}
