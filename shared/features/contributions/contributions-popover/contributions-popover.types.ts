import { ButtonPort } from "@/design-system/atoms/button/button.types";

export interface ContributionsPopoverProps {
  buttonProps?: ButtonPort<"button">;
  rewardId: string;
  projectId: string;
  contributionsCount: number;
}