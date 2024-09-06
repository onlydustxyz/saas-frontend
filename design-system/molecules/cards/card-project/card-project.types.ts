import { ComponentPropsWithoutRef, ElementType } from "react";

import { ButtonPort } from "@/design-system/atoms/button/button.types";
import { PaperPort } from "@/design-system/atoms/paper";
import { TagPort } from "@/design-system/atoms/tag";

interface Variants {
  clickable: boolean;
}

interface ClassNames {
  base: string;
}

export interface CardProjectPort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  title: string;
  description?: string;
  logoUrl?: string;
  languages?: Array<TagPort<"div">>;
  categories?: Array<TagPort<"div">>;
  projectCount?: number;
  userCount?: number;
  buttonProps?: ButtonPort<"a" | "div">;
  onClick?: () => void;
  size?: PaperPort<C>["size"];
  background?: PaperPort<C>["background"];
  border?: PaperPort<C>["border"];
}
