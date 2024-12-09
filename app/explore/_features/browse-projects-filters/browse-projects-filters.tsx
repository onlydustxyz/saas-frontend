import { Filter } from "lucide-react";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Popover } from "@/design-system/atoms/popover";
import { Typo } from "@/design-system/atoms/typo";
import { CheckboxButton } from "@/design-system/molecules/checkbox-button";

import { EcosystemFilter } from "@/shared/features/filters/ecosystem-filter/ecosystem-filter";
import { LanguageFilter } from "@/shared/features/filters/language-filter/language-filter";

import { useBrowseProjectsContext } from "./browse-projects-filters.context";

export function BrowseProjectsFilters() {
  const {
    filters: { values: filters, set, count, clear, isCleared },
  } = useBrowseProjectsContext();

  // TODO @hayden translate

  return (
    <Popover>
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
              <Typo translate={{ token: "features:transactions.filters.title" }} />

              {!isCleared ? (
                <Button
                  onClick={clear}
                  size="sm"
                  variant="secondary"
                  translate={{ token: "features:transactions.filters.clear" }}
                />
              ) : null}
            </div>

            <LanguageFilter
              selectedLanguages={filters.languageIds}
              onSelect={languages => set({ languageIds: languages })}
            />

            <EcosystemFilter
              selectedEcosystems={filters.ecosystemIds}
              onSelect={ecosystems => set({ ecosystemIds: ecosystems })}
            />

            <div className="flex flex-col gap-lg">
              <Typo size="xs" color="secondary" translate={{ token: "features:transactions.filters.types.title" }} />

              <div className="flex flex-wrap gap-xs">
                {filters.categories.map(category => (
                  <CheckboxButton key={`project-category-${category.value}`} value={category.value} onChange={() => {}}>
                    {category.label}
                  </CheckboxButton>
                ))}
              </div>
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
