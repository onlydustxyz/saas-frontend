import { Token } from "@/shared/translation/components/translate/translate.types";

export enum PROJECT_TAG {
  BIG_WHALE = "BIG_WHALE",
  FAST_AND_FURIOUS = "FAST_AND_FURIOUS",
  HOT_COMMUNITY = "HOT_COMMUNITY",
  LIKELY_TO_REWARD = "LIKELY_TO_REWARD",
  NEWBIES_WELCOME = "NEWBIES_WELCOME",
  UPDATED_ROADMAP = "UPDATED_ROADMAP",
  WORK_IN_PROGRESS = "WORK_IN_PROGRESS",
  HAS_GOOD_FIRST_ISSUES = "HAS_GOOD_FIRST_ISSUES",
}

export type ProjectTagUnion = `${PROJECT_TAG}`;

export const PROJECT_TAG_METADATA: Record<
  PROJECT_TAG,
  { icon: { name?: string; custom?: string }; tooltip: Token; label: Token }
> = {
  [PROJECT_TAG.BIG_WHALE]: {
    // TODO @hayden add icon
    icon: { custom: "whale" },
    tooltip: "projects:projectTags.BIG_WHALE.tooltip",
    label: "projects:projectTags.BIG_WHALE.label",
  },
  [PROJECT_TAG.FAST_AND_FURIOUS]: {
    icon: { name: "ri-flashlight-fill" },
    tooltip: "projects:projectTags.FAST_AND_FURIOUS.tooltip",
    label: "projects:projectTags.FAST_AND_FURIOUS.label",
  },
  [PROJECT_TAG.HOT_COMMUNITY]: {
    icon: { name: "ri-fire-line" },
    tooltip: "projects:projectTags.HOT_COMMUNITY.tooltip",
    label: "projects:projectTags.HOT_COMMUNITY.label",
  },
  [PROJECT_TAG.LIKELY_TO_REWARD]: {
    icon: { name: "ri-hand-coin-line" },
    tooltip: "projects:projectTags.LIKELY_TO_REWARD.tooltip",
    label: "projects:projectTags.LIKELY_TO_REWARD.label",
  },
  [PROJECT_TAG.NEWBIES_WELCOME]: {
    icon: { name: "ri-seedling-line" },
    tooltip: "projects:projectTags.NEWBIES_WELCOME.tooltip",
    label: "projects:projectTags.NEWBIES_WELCOME.label",
  },
  [PROJECT_TAG.UPDATED_ROADMAP]: {
    icon: { name: "ri-git-fork-line" },
    tooltip: "projects:projectTags.UPDATED_ROADMAP.tooltip",
    label: "projects:projectTags.UPDATED_ROADMAP.label",
  },
  [PROJECT_TAG.WORK_IN_PROGRESS]: {
    icon: { name: "ri-hammer-line" },
    tooltip: "projects:projectTags.WORK_IN_PROGRESS.tooltip",
    label: "projects:projectTags.WORK_IN_PROGRESS.label",
  },
  [PROJECT_TAG.HAS_GOOD_FIRST_ISSUES]: {
    icon: { name: "ri-thumb-up-line" },
    tooltip: "projects:projectTags.HAS_GOOD_FIRST_ISSUES.tooltip",
    label: "projects:projectTags.HAS_GOOD_FIRST_ISSUES.label",
  },
} as const;
