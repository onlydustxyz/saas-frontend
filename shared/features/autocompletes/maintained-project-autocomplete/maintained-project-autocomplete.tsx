import { useMemo, useState } from "react";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

import { MaintainedProjectAutocompleteProps } from "./maintained-project-autocomplete.types";

export function MaintainedProjectAutocomplete({
  onSelect,
  selectedProjects,
  ...selectProps
}: MaintainedProjectAutocompleteProps) {
  const [search, setSearch] = useState("");
  const { data, hasNextPage, fetchNextPage } = MeReactQueryAdapter.client.useGetMyProjectsAsMaintainer({
    queryParams: {
      search: search || undefined,
    },
  });

  const projects = useMemo(() => data?.pages.flatMap(({ projects }) => projects) ?? [], [data]);

  const projectsItem: MenuItemPort[] = useMemo(() => {
    return projects.map(project => ({
      id: project.id,
      label: project.name,
      searchValue: project.name,
      avatar: { src: project.logoUrl },
    }));
  }, [projects]);

  function handleSelect(ids: MenuItemId[]) {
    onSelect?.(ids as string[]);
  }

  return (
    <Select
      items={projectsItem}
      isAutoComplete={true}
      onSelect={handleSelect}
      hasNextPage={hasNextPage}
      onNextPage={fetchNextPage}
      selectedIds={selectedProjects}
      controlledAutoComplete={{
        value: search,
        onChange: setSearch,
      }}
      {...selectProps}
    />
  );
}
