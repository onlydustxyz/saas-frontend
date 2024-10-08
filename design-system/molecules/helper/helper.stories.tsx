import { Meta, StoryObj } from "@storybook/react";
import { Square } from "lucide-react";

import { Icon } from "@/design-system/atoms/icon";

import { HelperPort } from "./helper.types";
import { Helper } from "./variants/helper-default";

type Story = StoryObj<typeof Helper>;

const defaultPort: HelperPort<"div"> = {
  avatar: {
    name: "OD",
  },
  title: {
    children: "Title",
  },
  text: {
    children: "Text",
  },
  endButton: {
    children: "End Button",
  },
  startButton: {
    children: "Start Button",
  },
};

const meta: Meta<typeof Helper> = {
  component: Helper,
  title: "Deprecated/Molecules/Helper",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#05051E" }],
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Helper />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full gap-2">
        <Helper {...defaultPort} {...args} />
      </div>
    );
  },
};

export const Horizontal: Story = {
  parameters: {
    docs: {
      source: { code: "<Helper />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full flex-col gap-2">
        <Helper {...defaultPort} />
      </div>
    );
  },
};

export const Vertical: Story = {
  parameters: {
    docs: {
      source: { code: "<Helper layout='vertical' />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full flex-col gap-2">
        <Helper {...defaultPort} layout={"vertical"} />
      </div>
    );
  },
};

export const StartEndContent: Story = {
  parameters: {
    docs: {
      source: { code: "<Helper layout='vertical' />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full flex-col gap-2">
        <Helper {...defaultPort} startContent={<Square size={16} />} endContent={<Square size={16} />} />
        <Helper
          {...defaultPort}
          layout={"vertical"}
          startContent={<Icon component={Square} />}
          endContent={<Icon component={Square} />}
        />
      </div>
    );
  },
};

export const Colors: Story = {
  parameters: {
    docs: {
      source: { code: "<Helper container='brand-1' />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full flex-col gap-2">
        <Helper {...defaultPort} container="brand-1" />
        <Helper {...defaultPort} container="brand-2" />
        <Helper {...defaultPort} container="brand-3" />
        <Helper {...defaultPort} container="brand-4" />
        <Helper {...defaultPort} container="container-1" />
        <Helper {...defaultPort} container="container-2" />
        <Helper {...defaultPort} container="container-3" />
        <Helper {...defaultPort} container="container-4" />
        <Helper {...defaultPort} container="danger" />
      </div>
    );
  },
};

export default meta;
