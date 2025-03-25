"use client";

import Link from "next/link";

import { ProjectInterfaceV2 } from "@/core/domain/project/models/project-model-v2";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";

import { ProjectAsideSection } from "./project-aside-section";

export function ProjectCategories({
  categories,
  isLoading,
  isError,
}: {
  categories?: ProjectInterfaceV2["categories"];
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading) {
    return (
      <ProjectAsideSection.Skeleton>
        <Skeleton className="h-8 w-1/2" />
      </ProjectAsideSection.Skeleton>
    );
  }

  if (isError || !categories || categories.length === 0) {
    return null;
  }

  return (
    <ProjectAsideSection title="Categories">
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Button key={category.name} variant={"outline"} size={"sm"} asChild>
            <Link href={NEXT_ROUTER.categories.details.root(category.slug)}>{category.name}</Link>
          </Button>
        ))}
      </div>
    </ProjectAsideSection>
  );
}
