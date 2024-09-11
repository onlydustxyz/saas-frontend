import { ElementType } from "react";

import { Breadcrumbs } from "@/design-system/atoms/breadcrumbs";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { PageHeaderPort } from "../../page-header.types";
import { PageHeaderDefaultVariants } from "./default.variants";

export function PageHeaderDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  breadcrumbs,
  title,
  endContent,
  startContent,
}: PageHeaderPort<C>) {
  const Component = as || "div";
  const slots = PageHeaderDefaultVariants();

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      <div className={"flex flex-row items-start justify-start gap-2"}>
        {startContent}
        {!!title && (
          <Typo size={"sm"} weight={"medium"} classNames={{ base: cn(slots.title(), classNames?.title) }}>
            {title}
          </Typo>
        )}
        {!!breadcrumbs && <Breadcrumbs items={breadcrumbs} classNames={classNames?.breadcrumbs} />}
      </div>
      {endContent ? <div>{endContent}</div> : null}
    </Component>
  );
}
