import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Popover } from "@/design-system/atoms/popover";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { CardContributionKanban } from "@/shared/features/card-contribution-kanban/card-contribution-kanban";
import { ContributionsPopoverProps } from "@/shared/features/contributions/contributions-popover/contributions-popover.types";

export function ContributionsPopover({
  rewardId,
  projectId,
  contributionsCount,
  buttonProps,
}: ContributionsPopoverProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ContributionReactQueryAdapter.client.useGetContributions({
      queryParams: {
        projectIds: [projectId],
        rewardId: [rewardId],
        hasBeenRewarded: true,
      },
      options: {
        enabled: Boolean(isPopoverOpen && rewardId && projectId),
      },
    });

  const contributions = data?.pages.flatMap(page => page.contributions) || [];
  return (
    <Popover>
      <Popover.Trigger>
        {({ isOpen }) => (
          <div>
            <Button
              as={"div"}
              variant={"secondary"}
              size={"md"}
              endIcon={{ component: ChevronDown }}
              classNames={{
                base: "max-w-xs overflow-hidden",
                label: "whitespace-nowrap text-ellipsis overflow-hidden",
              }}
              {...buttonProps}
              translate={{
                token: "common:contributionsCount",
                count: contributionsCount,
              }}
              onClick={() => setIsPopoverOpen(isOpen)}
            />
          </div>
        )}
      </Popover.Trigger>
      <Popover.Content>
        {() => (
          <div>
            <ScrollView>
              <div className={"flex max-h-lg w-lg flex-col gap-3"}>
                {contributions?.map(contribution => (
                  <CardContributionKanban contribution={contribution} key={contribution.id} showActions={false} />
                ))}
              </div>
              {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
            </ScrollView>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
