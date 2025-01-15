import { ComponentPropsWithoutRef, ElementType } from "react";

import { LanguagesProps } from "@/shared/features/projects/languages/languages.types";

export interface EcosystemCardProps<C extends ElementType> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  name: string;
  logoUrl: string;
  usersCount?: number;
  projectsCount?: number;
  description: string;
  languages?: LanguagesProps["languages"];
}
