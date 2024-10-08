import { ProgramEcosystemAutocompleteProps } from "@/shared/features/autocompletes/program-ecosystem-autocomplete/program-ecosystem-autocomplete.types";

export interface ProgramEcosystemFilterProps
  extends Pick<ProgramEcosystemAutocompleteProps, "selectedProgramsEcosystems" | "onSelect"> {}
