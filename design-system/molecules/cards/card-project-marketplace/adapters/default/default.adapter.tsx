"use client";

import { CircleDot, GitFork, Star, UserRound } from "lucide-react";
import Image from "next/image";
import { ElementType, useEffect, useRef, useState } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { CardProjectMarketplacePort, LanguageProps, MetricProps } from "../../card-project-marketplace.types";
import { CardProjectMarketplaceDefaultVariants } from "./default.variants";
import Header from "./header.png";

function getLanguageColor(id: string) {
  return `hsl(${(parseInt(id, 36) * 137.5) % 360}deg, 65%, 50%)`;
}

function Metric({ icon, count }: MetricProps) {
  return (
    <div className="flex items-center gap-sm">
      <Icon component={icon} size="xxs" classNames={{ base: "text-foreground-quinary" }} />

      <Typo size="xs" weight="medium">
        {count}
      </Typo>
    </div>
  );
}

function Language({ id, name, percentage, nameClassNames = "" }: LanguageProps) {
  return (
    <div className="flex items-center gap-xs">
      <div
        className="size-1.5 rounded-full"
        style={{
          backgroundColor: getLanguageColor(id),
        }}
      />

      <Typo size="xs" classNames={{ base: nameClassNames }}>
        {name}
      </Typo>

      <Typo size="xs" color="quaternary">
        {percentage}%
      </Typo>
    </div>
  );
}

export function CardProjectMarketplaceDefaultAdapter<C extends ElementType = "div">({
  as,
  htmlProps,
  classNames,
  logoUrl,
  name,
  contributorCount,
  starCount,
  pullRequestCount,
  issueCount,
  goodFirstIssueCount,
  description,
  categories,
  languages,
}: CardProjectMarketplacePort<C>) {
  const slots = CardProjectMarketplaceDefaultVariants();
  const avatarRef = useRef<HTMLDivElement>(null);
  const [avatarOffset, setAvatarOffset] = useState(0);

  useEffect(() => {
    if (avatarRef.current) {
      setAvatarOffset(-avatarRef.current.offsetHeight / 2);
    }
  }, [avatarRef.current]);

  return (
    <Paper
      as={as}
      htmlProps={htmlProps}
      size="none"
      background="primary-alt"
      classNames={{ base: cn(slots.base(), classNames?.base) }}
    >
      <header className="relative h-[100px] w-full overflow-hidden">
        <img src={logoUrl} alt={name} className="h-full w-full object-cover" />

        <Image
          src={Header}
          alt={name}
          className="absolute inset-0 object-cover mix-blend-luminosity backdrop-blur-xl backdrop-saturate-150"
        />

        <Badge
          color="success"
          shape="rounded"
          size="xs"
          startContent={
            <div className="relative size-1.5">
              <div className="absolute size-full animate-ping rounded-full bg-components-badge-success-solid-bg opacity-75" />
              <div className="size-full rounded-full bg-components-badge-success-solid-bg" />
            </div>
          }
          translate={{
            token: "common:count.goodFirstIssues",
            values: { count: goodFirstIssueCount },
          }}
          classNames={{
            base: "absolute top-lg right-lg",
          }}
        />
      </header>

      <div className="relative z-10 flex flex-col gap-md p-lg pt-0">
        <div ref={avatarRef} style={{ marginTop: avatarOffset }}>
          <Avatar src={logoUrl} alt={name} size="xl" shape="squared" />
        </div>

        <div>
          <Typo variant="heading" size="xs" weight="medium" color="primary">
            {name}
          </Typo>
        </div>

        <div className="flex items-center gap-md">
          <Metric icon={UserRound} count={contributorCount} />
          <Metric icon={Star} count={starCount} />
          <Metric icon={GitFork} count={pullRequestCount} />
          <Badge
            color="grey"
            shape="rounded"
            size="xxs"
            icon={{
              component: CircleDot,
              classNames: {
                base: "text-border-brand-primary",
              },
            }}
            translate={{
              token: "common:count.issues",
              values: { count: issueCount },
            }}
          />
        </div>

        <div>
          <Typo size="sm" color="tertiary">
            {description}
          </Typo>
        </div>

        {categories?.length ? (
          <ul className="flex flex-wrap gap-xs">
            {categories.map(category => (
              <li key={category.name}>
                <Badge color="grey" shape="squared" size="xs">
                  {category.name}
                </Badge>
              </li>
            ))}
          </ul>
        ) : null}

        {/* TODO: handle overflowing languages */}
        {languages?.length ? (
          <div className="flex flex-col gap-2md pt-md">
            <div className="flex h-1.5 w-full overflow-hidden rounded-full">
              {languages.map(language => (
                <div
                  key={language.id}
                  className="h-full"
                  style={{
                    width: `${language.percentage}%`,
                    backgroundColor: getLanguageColor(language.id),
                  }}
                >
                  <Tooltip
                    content={<Language {...language} nameClassNames="text-inherit" />}
                    classNames={{ wrapper: "size-full" }}
                  />
                </div>
              ))}
            </div>

            <div className="flex max-w-full gap-lg">
              {languages
                .sort((a, b) => b.percentage - a.percentage)
                .slice(0, 3)
                .map(language => (
                  <Language key={language.id} {...language} nameClassNames="truncate" />
                ))}
            </div>
          </div>
        ) : null}
      </div>
    </Paper>
  );
}
