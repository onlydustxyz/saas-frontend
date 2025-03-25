import { LanguagesProps } from "@/shared/features/projects/languages/languages.types";

export interface EcosystemCardProps {
  name: string;
  logoUrl: string;
  usersCount?: number;
  projectsCount?: number;
  description: string;
  languages?: LanguagesProps["languages"];
  href: string;
}
