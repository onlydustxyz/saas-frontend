import { Accordion, AccordionItem } from "@nextui-org/react";
import { ChevronLeft, CircleDot } from "lucide-react";

import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";
import { ContributionInline } from "@/design-system/molecules/contribution-inline";

import { cn } from "@/shared/helpers/cn";

import { TimelineContributionPort } from "../../timeline-contribution.types";
import { TimelineContributionDefaultVariants } from "./default.variants";

export function TimelineContributionDefaultAdapter({
  classNames,
  titleProps,
  badgeProps,
  contributions,
}: TimelineContributionPort) {
  const slots = TimelineContributionDefaultVariants();

  return (
    <Accordion showDivider={false} className={cn(slots.base(), classNames?.base)}>
      <AccordionItem
        startContent={
          <Badge
            icon={{ component: CircleDot, size: "xs" }}
            {...badgeProps}
            color="brand"
            size="xxs"
            shape="squared"
            iconOnly
          />
        }
        title={<Typo {...titleProps} size="xs" color="secondary" />}
        indicator={<Icon component={ChevronLeft} classNames={{ base: "text-components-badge-brand-fg" }} size="md" />}
        classNames={{
          base: "px-0",
          trigger: "p-0 gap-xs",
          title: "flex flex-col leading-none",
          content: "py-0",
        }}
      >
        <div className="relative pl-3xl pt-lg">
          <div className="absolute -top-1 bottom-0 left-2.5 w-px bg-components-badge-brand-border" />

          <ul className="grid gap-sm">
            {contributions.map(contribution => {
              return (
                <ContributionInline
                  key={contribution.githubTitle}
                  contributionBadgeProps={{
                    type: contribution.contributionBadgeProps.type,
                    githubStatus: contribution.contributionBadgeProps.githubStatus,
                    number: contribution.contributionBadgeProps.number,
                  }}
                  githubTitle={contribution.githubTitle}
                  truncate
                />
              );
            })}
          </ul>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
