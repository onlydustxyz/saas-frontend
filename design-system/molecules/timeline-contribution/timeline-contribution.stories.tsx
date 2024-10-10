import { Meta, StoryObj } from "@storybook/react";

import { TimelineContributionLoading } from "./timeline-contribution.loading";
import { TimelineContributionPort } from "./timeline-contribution.types";
import { TimelineContribution } from "./variants/timeline-contribution-default";

type Story = StoryObj<typeof TimelineContribution>;

const defaultProps: TimelineContributionPort = {
  titleProps: {
    children: "Title",
  },
  contributions: [
    {
      githubTitle: "Github Title",
      contributionBadgeProps: {
        type: "ISSUE",
        githubStatus: "COMPLETED",
        number: 123,
      },
    },
    {
      githubTitle: "Github Title",
      contributionBadgeProps: {
        type: "PULL_REQUEST",
        githubStatus: "CLOSED",
        number: 234,
      },
    },
    {
      githubTitle: "Github Title",
      contributionBadgeProps: {
        type: "ISSUE",
        githubStatus: "COMPLETED",
        number: 123,
      },
    },
  ],
};

const meta: Meta<typeof TimelineContribution> = {
  component: TimelineContribution,
  title: "Molecules/TimelineContribution",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<TimelineContribution />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-[250px] items-center gap-2">
        <TimelineContribution {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<TimelineContributionLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-[250px] items-center gap-2">
        <TimelineContributionLoading />
      </div>
    );
  },
};

export default meta;
