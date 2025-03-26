import { useTranslation } from "react-i18next";

import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";

import { MaintainedProjectAutocomplete } from "../../autocompletes/maintained-project-autocomplete/maintained-project-autocomplete";
import { MaintainedProjectFilterProps } from "./maintained-project-filter.types";

export function MaintainedProjectFilter({ selectedProjects, onSelect }: MaintainedProjectFilterProps) {
  const { t } = useTranslation("features");
  return (
    <AccordionFilter
      name={"projects"}
      title={{ translate: { token: "features:filters.project.title" } }}
      selected={selectedProjects?.length}
    >
      <MaintainedProjectAutocomplete
        name={"projects"}
        selectedProjects={selectedProjects}
        isPopover={false}
        onSelect={onSelect}
        isMultiple={true}
        placeholder={t("filters.project.placeholder")}
      />
    </AccordionFilter>
  );
}
