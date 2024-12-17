"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { CircleDot, GitFork, Star, UserRound } from "lucide-react";
import Image from "next/image";
import { ElementType, useEffect, useRef, useState } from "react";
import { useDebounce } from "react-use";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { ButtonGroup } from "@/design-system/atoms/button/variants/button-group";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelSingle } from "@/design-system/molecules/avatar-label-single";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { MARKETPLACE_ROUTER } from "@/shared/constants/router";
import { cn } from "@/shared/helpers/cn";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";

import {
  AvatarProps,
  CardProjectMarketplacePort,
  LanguageProps,
  MetricProps,
} from "../../card-project-marketplace.types";
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

function AvatarWithEcosystems({ name, logoUrl, ecosystems }: AvatarProps) {
  const avatarRef = useRef<HTMLDivElement>(null);
  const [avatarOffset, setAvatarOffset] = useState(0);

  useEffect(() => {
    if (avatarRef.current) {
      setAvatarOffset(-avatarRef.current.offsetHeight / 2);
    }
  }, [avatarRef.current]);

  function renderBadge() {
    if (!ecosystems) return null;

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
      <div ref={avatarRef} style={{ marginTop: avatarOffset }} className="relative">
        <Avatar src={logoUrl} alt={name} size="xl" shape="squared" />
        {renderBadge()}
      </div>
    </div>
  );
}

function HoverEffect({ cardRef }: { cardRef: React.RefObject<HTMLDivElement> }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredDebounced, setIsHoveredDebounced] = useState(false);

  useDebounce(
    () => {
      setIsHoveredDebounced(isHovered);
    },
    250,
    [isHovered]
  );

  const maskSize = useTransform<number, number>([mouseX, mouseY], ([x, y]) => Math.min(150, Math.sqrt(x * x + y * y)));

  useEffect(() => {
    if (cardRef.current) {
      const handleMouseMove = (event: MouseEvent) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
      };

      const handleMouseLeave = () => {
        setIsHovered(false);
      };

      const handleMouseEnter = () => {
        setIsHovered(true);
      };

      cardRef.current.addEventListener("mousemove", handleMouseMove);
      cardRef.current.addEventListener("mouseleave", handleMouseLeave);
      cardRef.current.addEventListener("mouseenter", handleMouseEnter);

      return () => {
        cardRef.current?.removeEventListener("mousemove", handleMouseMove);
        cardRef.current?.removeEventListener("mouseleave", handleMouseLeave);
        cardRef.current?.removeEventListener("mouseenter", handleMouseEnter);
      };
    }
  }, [cardRef.current]);

  return (
    <motion.div
      className={cn(
        "absolute inset-[-2px] z-10 overflow-hidden rounded-[12px] opacity-0 transition-opacity duration-500 ease-in",
        {
          "opacity-100": isHovered,
        }
      )}
    >
      <div className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[10px]">
        {isHoveredDebounced && (
          <motion.div
            className="card-hover-gradient-solid absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          />
        )}
      </div>
      <div className="app-gradient absolute inset-[2px] overflow-hidden rounded-[10px]" />
      <motion.div
        className="card-hover-gradient absolute inset-0 z-20"
        style={{
          mask: useTransform(
            [mouseX, mouseY, maskSize],
            ([x, y, size]) => `radial-gradient(circle ${size}px at ${x}px ${y}px, black, transparent)`
          ),
          opacity: isHovered ? 1 : 0,
          transition: "opacity 500ms ease-in",
        }}
      />
    </motion.div>
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

  return (
    <Paper
      as={as}
      htmlProps={htmlProps}
      size="none"
      background="glass"
      border="none"
      classNames={{ base: cn(slots.base(), classNames?.base) }}
    >
      <div ref={cardRef}>
        <HoverEffect cardRef={cardRef} />
        <header className="relative z-10 h-[100px] w-full overflow-hidden rounded-t-md">
          <img src={logoUrl} alt={name} className="h-full w-full object-cover" />

          <Image
            src={Header}
            alt={name}
            className="absolute inset-0 object-cover mix-blend-luminosity backdrop-blur-xl backdrop-saturate-150"
          />
        </header>

        <div className="relative z-20 flex flex-col gap-2lg rounded-b-md p-lg pt-0">
          <div className="flex flex-col gap-sm">
            <AvatarWithEcosystems name={name} logoUrl={logoUrl} ecosystems={ecosystems} />

            <div className="flex flex-col gap-xs">
              <Typo variant="heading" size="xs" weight="medium" color="primary">
                {name}
              </Typo>

              <div className="flex items-center gap-md">
                <Metric icon={UserRound} count={contributorCount} />
                <Metric icon={Star} count={starCount} />
                <Metric icon={GitFork} count={forkCount} />
              </div>
            </div>
          </div>

          <div className="flex">
            <ButtonGroup
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
                    <div className="relative mr-0.5 size-1.5">
                      <div className="absolute -inset-px animate-ping rounded-full bg-utility-secondary-green-500 opacity-75" />
                      <div className="size-full rounded-full bg-utility-secondary-green-500" />
                    </div>
                  ),
                },
              ]}
              size="xs"
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

              <ScrollView>
                <div className="flex max-w-full gap-lg">
                  {languages
                    .sort((a, b) => b.percentage - a.percentage)
                    .slice(0, 3)
                    .map(language => (
                      <Language key={language.id} {...language} nameClassNames="truncate" />
                    ))}
                </div>
              </ScrollView>
            </div>
          ) : null}
        </div>
      </div>
    </Paper>
  );
}
