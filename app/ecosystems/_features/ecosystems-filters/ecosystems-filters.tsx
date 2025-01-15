import { Filter } from "lucide-react";
import { useMemo } from "react";

import { ProjectCategoryReactQueryAdapter } from "@/core/application/react-query-adapter/project-category";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Popover } from "@/design-system/atoms/popover";
import { Typo } from "@/design-system/atoms/typo";
import { CheckboxButton } from "@/design-system/molecules/checkbox-button";

import { EcosystemFilter } from "@/shared/features/filters/ecosystem-filter/ecosystem-filter";
import { LanguageFilter } from "@/shared/features/filters/language-filter/language-filter";

import { useEcosystemsContext } from "./ecosystems-filters.context";

export function EcosystemsFilters() {
  const {
    filters: { values: filters, set, count, clear, isCleared },
  } = useEcosystemsContext();

  const { data } = ProjectCategoryReactQueryAdapter.client.useGetProjectCategories({});
  const categories = useMemo(() => data?.categories ?? [], [data?.categories]);

  return (
    <Popover placement="bottom-end">
      <Popover.Trigger>
        {() => (
          <div>
            <Button
              variant={count ? "primary" : "secondary"}
              size="sm"
              startIcon={{ component: Filter, classNames: { base: "text-components-buttons-button-secondary-fg" } }}
              iconOnly={!count}
              endContent={
                count ? (
                  <Badge size="xxs" shape="rounded" color={count ? "brand" : "grey"} variant={count ? "solid" : "flat"}>
                    {count}
                  </Badge>
                ) : null
              }
            />
          </div>
        )}
      </Popover.Trigger>

      <Popover.Content>
        {() => (
          <div className="flex min-w-[250px] max-w-[360px] flex-col gap-lg">
            <div className="flex items-center justify-between gap-md">
              <Typo translate={{ token: "explore:browse.filters.title" }} />

              {!isCleared ? (
                <Button
                  onClick={clear}
                  size="sm"
                  variant="secondary"
                  translate={{ token: "explore:browse.filters.clear" }}
                />
              ) : null}
            </div>

            <LanguageFilter selectedLanguages={filters.languageIds} onSelect={languageIds => set({ languageIds })} />

            <EcosystemFilter
              selectedEcosystems={filters.ecosystemIds}
              onSelect={ecosystemIds => set({ ecosystemIds })}
            />

            {categories.length ? (
              <div className="flex flex-col gap-lg">
                <Typo size="xs" color="secondary" translate={{ token: "explore:browse.filters.categories" }} />

                <div className="flex flex-wrap gap-xs">
                  {categories.map(category => (
                    <CheckboxButton
                      key={`project-category-${category.id}`}
                      value={filters.categoryIds.includes(category.id)}
                      onChange={checked => {
                        set({
                          categoryIds: checked
                            ? [...filters.categoryIds, category.id]
                            : filters.categoryIds.filter(id => id !== category.id),
                        });
                      }}
                    >
                      {category.name}
                    </CheckboxButton>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
