"use client";

import { ProjectCategoryReactQueryAdapter } from "@/core/application/react-query-adapter/project-category";

import { RemixIconsName } from "@/design-system/atoms/icon/adapters/remix-icon/remix-icon-names.types";

import { Button } from "@/shared/ui/button";
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area";
import { TypographyH3 } from "@/shared/ui/typography";

import { CategoryCard } from "../category-card/category-card";

export function CategoriesSection() {
  const { data, isLoading, isError } = ProjectCategoryReactQueryAdapter.client.useGetProjectCategories({});

  if (isError) {
    return <div className="text-center text-red-500">Failed to load categories. Please try again later.</div>;
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <TypographyH3>Section categories</TypographyH3>
        <Button variant="secondary">Show more</Button>
      </div>
      <ScrollArea className="w-full">
        <div className="flex pb-4" style={{ width: "calc(100% + 25%)" }}>
          {data?.categories.map(category => (
            <div key={category.id} className="w-[calc(100%/3.5)] flex-none pr-6 first:pl-0">
              <CategoryCard
                color={"red"}
                title={category.name}
                description={category.description}
                icon={category.iconSlug as RemixIconsName}
                projectCount={category.projectCount}
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
