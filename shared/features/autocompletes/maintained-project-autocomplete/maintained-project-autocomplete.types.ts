import { SelectExtendedProps } from "@/design-system/molecules/select";

export interface MaintainedProjectAutocompleteProps extends SelectExtendedProps {
  selectedProjects?: string[];
  onSelect?: (project: string[]) => void;
}
