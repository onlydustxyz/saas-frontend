import { ChevronsLeftRight, Globe, LucideIcon, Tag as TagIcon } from "lucide-react";

import { Badge } from "@/design-system/atoms/badge";
import { Tag } from "@/design-system/atoms/tag";

import { useGlobalSearch } from "@/shared/features/global-search/global-search.context";
import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

import { FilterRow } from "../filter-row/filter-row";

type FilterSection = {
  items: Array<{ name: string; count: number }>;
  icon: LucideIcon;
  label: TranslateProps;
  selectedItems?: string[];
  onItemChange: (item: string) => void;
};

function FilterSection({ items, icon, label, selectedItems, onItemChange }: FilterSection) {
  return (
    <FilterRow icon={{ component: icon }} label={label}>
      {items.map(item => (
        <Tag
          key={item.name}
          onSelect={() => onItemChange(item.name)}
          isSelected={selectedItems?.includes(item.name)}
          endContent={
            <Badge fixedSize={item.count <= 9} size="xxs">
              {item.count}
            </Badge>
          }
        >
          {item.name}
        </Tag>
      ))}
    </FilterRow>
  );
}

export function ProjectFilters() {
  const { filters, facets, onFiltersChange } = useGlobalSearch();
  const languages = facets.getLanguagesfacets();
  const ecosystems = facets.getEcosystemsfacets();
  const categories = facets.getCategoriesfacets();

  function onLanguageChange(language: string) {
    if (filters.languages?.includes(language)) {
      onFiltersChange({
        ...filters,
        languages: filters.languages?.filter(l => l !== language),
      });
    } else {
      onFiltersChange({ ...filters, languages: [...(filters.languages ?? []), language] });
    }
  }

  function onEcosystemChange(ecosystem: string) {
    if (filters.ecosystems?.includes(ecosystem)) {
      onFiltersChange({ ...filters, ecosystems: filters.ecosystems?.filter(e => e !== ecosystem) });
    } else {
      onFiltersChange({ ...filters, ecosystems: [...(filters.ecosystems ?? []), ecosystem] });
    }
  }

  function onCategoryChange(category: string) {
    if (filters.categories?.includes(category)) {
      onFiltersChange({ ...filters, categories: filters.categories?.filter(c => c !== category) });
    } else {
      onFiltersChange({ ...filters, categories: [...(filters.categories ?? []), category] });
    }
  }

  if (!languages?.length && !ecosystems?.length && !categories?.length) {
    return null;
  }

  return (
    <div className="relative flex w-full flex-col items-start justify-start gap-1 border-b border-b-border-primary px-6 py-4">
      {languages?.length ? (
        <FilterSection
          items={languages}
          icon={ChevronsLeftRight}
          label={{ token: "features:globalSearch.filters.language.name" }}
          selectedItems={filters.languages}
          onItemChange={onLanguageChange}
        />
      ) : null}
      {ecosystems?.length ? (
        <FilterSection
          items={ecosystems}
          icon={Globe}
          label={{ token: "features:globalSearch.filters.ecosystem.name" }}
          selectedItems={filters.ecosystems}
          onItemChange={onEcosystemChange}
        />
      ) : null}
      {categories?.length ? (
        <FilterSection
          items={categories}
          icon={TagIcon}
          label={{ token: "features:globalSearch.filters.category.name" }}
          selectedItems={filters.categories}
          onItemChange={onCategoryChange}
        />
      ) : null}
    </div>
  );
}
