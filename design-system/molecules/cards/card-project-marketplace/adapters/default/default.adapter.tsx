"use client";

import { CircleDot, GitFork, Star, UserRound } from "lucide-react";
import { ElementType, useMemo, useRef } from "react";
import { useMeasure } from "react-use";

import { Avatar } from "@/design-system/atoms/avatar";
import { ButtonGroup } from "@/design-system/atoms/button/variants/button-group";
import { Paper } from "@/design-system/atoms/paper";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelSingle } from "@/design-system/molecules/avatar-label-single";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { MARKETPLACE_ROUTER } from "@/shared/constants/router";
import { Categories } from "@/shared/features/projects/categories/categories";
import { Languages } from "@/shared/features/projects/languages/languages";
import { Metric } from "@/shared/features/projects/metric/metric";
import { cn } from "@/shared/helpers/cn";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";

import { HoverEffect } from "../../_components/hover-effect/hover-effect";
import { AvatarWithEcosystemsProps, CardProjectMarketplacePort } from "../../card-project-marketplace.types";
import { CardProjectMarketplaceDefaultVariants } from "./default.variants";

function AvatarWithEcosystems({ name, logoUrl, ecosystems = [] }: AvatarWithEcosystemsProps) {
  function renderBadge() {
    if (!ecosystems.length) return null;

    const ecosystemCount = ecosystems.length;

    return (
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4">
        <Tooltip
          content={
            <ul className="flex flex-col gap-md">
              {ecosystems.map(ecosystem => (
                <li key={ecosystem.id}>
                  <AvatarLabelSingle
                    avatar={{
                      src: ecosystem.logoUrl,
                      alt: ecosystem.name,
                    }}
                    size="xxs"
                    shape="squared"
                    title={{
                      children: ecosystem.name,
                    }}
                  />
                </li>
              ))}
            </ul>
          }
          placement="right-start"
          background="primary"
        >
          <Avatar
            src={ecosystemCount === 1 ? ecosystems[0].logoUrl : undefined}
            name={ecosystemCount > 1 ? String(ecosystemCount) : undefined}
            size="xxs"
            shape="squared"
            classNames={{
              base: "bg-background-primary outline-[#4945FF]/30 cursor-default",
              name: "text-foreground-primary",
            }}
          />
        </Tooltip>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="relative">
        <Avatar src={logoUrl} alt={name} size="xl" shape="squared" />
        {renderBadge()}
      </div>
    </div>
  );
}

export function CardProjectMarketplaceDefaultAdapter<C extends ElementType = "div">({
  as,
  htmlProps,
  classNames,
  logoUrl,
  name,
  slug,
  contributorCount,
  starCount,
  forkCount,
  availableIssueCount,
  goodFirstIssueCount,
  description,
  categories,
  languages,
  ecosystems,
}: CardProjectMarketplacePort<C>) {
  const slots = CardProjectMarketplaceDefaultVariants();
  const cardRef = useRef<HTMLDivElement>(null);
  const [buttonsRef, { width }] = useMeasure<HTMLDivElement>();
  const buttonsLayout = useMemo(() => {
    return width > 245 ? "horizontal" : "vertical";
  }, [width]);

  return (
    <Paper
      as={as}
      htmlProps={htmlProps}
      size="none"
      background="transparent"
      border="primary"
      classNames={{ base: cn(slots.base(), classNames?.base) }}
    >
      <div ref={cardRef} className="flex h-full w-full flex-col">
        <HoverEffect cardRef={cardRef} />

        <div className="relative z-20 flex h-full flex-col justify-between gap-2lg rounded-md border-border-primary p-xl">
          <div className="flex flex-col gap-2lg">
            <div className="flex flex-row gap-2lg">
              <AvatarWithEcosystems name={name} logoUrl={logoUrl} ecosystems={ecosystems} />

              <div className="flex h-full flex-col justify-between overflow-hidden">
                <Typo variant="heading" size="xs" weight="medium" color="primary" classNames={{ base: "truncate" }}>
                  {name}
                </Typo>

                <div className="flex items-center gap-md">
                  <Metric icon={Star} count={starCount} />
                  <Metric icon={GitFork} count={forkCount} />
                  <Metric icon={UserRound} count={contributorCount} />
                </div>
              </div>
            </div>

            <div className="flex w-full">
              <ButtonGroup
                ref={buttonsRef}
                fullWidth
                variant="tertiary"
                buttons={[
                  {
                    as: BaseLink,
                    htmlProps: {
                      href: marketplaceRouting(MARKETPLACE_ROUTER.projects.details.root(slug)),
                    },
                    translate: {
                      token: "common:count.openIssues",
                      values: { count: availableIssueCount },
                    },
                    classNames: {
                      startIcon: "text-utility-secondary-green-500",
                    },
                    startIcon: {
                      component: CircleDot,
                      size: "xs",
                    },
                  },
                  {
                    as: BaseLink,
                    htmlProps: {
                      href: marketplaceRouting(MARKETPLACE_ROUTER.projects.details.root(slug)),
                    },
                    translate: {
                      token: "common:count.goodFirstIssues",
                      values: { count: goodFirstIssueCount },
                    },
                    startContent: (
                      <div className={cn("relative mr-0.5 size-1.5", { "ml-1": buttonsLayout === "vertical" })}>
                        <div className="absolute -inset-px animate-ping rounded-full bg-utility-secondary-green-500 opacity-75" />
                        <div className="size-full rounded-full bg-utility-secondary-green-500" />
                      </div>
                    ),
                  },
                ]}
                size="xs"
                layout={buttonsLayout}
              />
            </div>

            {description ? (
              <div>
                <Typo size="sm" color="tertiary" classNames={{ base: "line-clamp-3" }}>
                  {description}
                </Typo>
              </div>
            ) : null}

            <Categories categories={categories} />
          </div>

          <Languages languages={languages} />
        </div>
      </div>
    </Paper>
  );
}
