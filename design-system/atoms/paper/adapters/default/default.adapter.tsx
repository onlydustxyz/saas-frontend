import { ElementType } from "react";

import { cn } from "@/shared/helpers/cn";

import { PaperPort } from "../../paper.types";
import { PaperDefaultVariants } from "./default.variants";

export function PaperDefaultAdapter<C extends ElementType = "article">({
  as,
  htmlProps,
  children,
  classNames,
  background,
  border,
  onClick,
  hasBorderHover,
  rounded = "md",
  size = "xl",
  px: _px,
  py: _py,
}: PaperPort<C>) {
  const px = _px || size;
  const py = _py || size;
  const Component = as || "article";
  const slots = PaperDefaultVariants({ px, py, background, border, hasBorderHover, rounded });

  return (
    <Component
      {...htmlProps}
      className={cn(slots.base(), classNames?.base)}
      onClick={onClick ?? htmlProps?.onClick}
      data-clickable={Boolean(onClick)}
    >
      {children}
    </Component>
  );
}
