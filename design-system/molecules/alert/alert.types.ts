import { ReactNode } from "react";

import { ButtonPort } from "@/design-system/atoms/button/button.types";
import { IconPort } from "@/design-system/atoms/icon";

interface Variants {
  color: "white" | "grey" | "brand" | "error" | "warning" | "success";
}

interface ClassNames {
  base: string;
  description: string;
}

export interface AlertPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  title: ReactNode;
  description: ReactNode;
  icon?: IconPort;
  hasIcon?: boolean;
  primaryButton?: ButtonPort<"button">;
  secondaryButton?: ButtonPort<"button">;
  onClose?: () => void;
  endContent?: ReactNode;
}
