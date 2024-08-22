import { Meta, StoryObj } from "@storybook/react";

import { Icon } from "@/design-system/atoms/icon";

import { BadgeAvatarPort, BadgeIconPort, BadgePort } from "./badge.types";
import { Badge } from "./variants/badge-default";

type Story = StoryObj<typeof Badge>;

const defaultProps: BadgePort<"div"> = {
  children: "Badge",
  classNames: {},
  htmlProps: {},
  isDeletable: true,
  startContent: (
    <Icon
      name="ri-square-line"
      size={16}
      classNames={{
        base: "text-inherit",
      }}
    />
  ),
};

const defaultBadgeIconProps: BadgeIconPort<"div"> = {
  ...defaultProps,
  startContent: undefined,
  icon: { name: "ri-fire-line" },
};

const defaultBadgeAvatarProps: BadgeAvatarPort<"div"> = {
  ...defaultProps,
  startContent: undefined,
  avatar: { src: undefined },
};

const sizes = ["xxs", "xs", "sm", "md"] as const;
const shape = ["rounded", "squared"] as const;
const colors = ["grey", "brand", "error", "warning", "success"] as const;

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: "Atoms/Badge",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#1E1E1E" }],
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Badge />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Badge {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Rounded: Story = {
  parameters: {
    docs: {
      source: { code: "<Tag shape'rounded' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full items-start gap-8">
          {sizes.map(s => {
            return (
              <div key={s} className="flex flex-col items-start gap-2">
                <Badge {...defaultProps} {...args} size={"xxs"} shape="rounded" />
                <Badge {...defaultProps} {...args} size={"xs"} shape="rounded" />
                <Badge {...defaultProps} {...args} size={"sm"} shape="rounded" isDeletable={false} />
                <Badge {...defaultProps} {...args} size={"md"} shape="rounded" isDeletable={false} />
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

export const Squared: Story = {
  parameters: {
    docs: {
      source: { code: "<Tag shape'squared' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full items-start gap-8">
          {sizes.map(s => {
            return (
              <div key={s} className="flex flex-col items-start gap-2">
                <Badge {...defaultProps} {...args} size={"xxs"} shape="squared" />
                <Badge {...defaultProps} {...args} size={"xs"} shape="squared" />
                <Badge {...defaultProps} {...args} size={"sm"} shape="squared" isDeletable={false} />
                <Badge {...defaultProps} {...args} size={"md"} shape="squared" isDeletable={false} />
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};
//
// export const Size: Story = {
//   parameters: {
//     docs: {
//       source: { code: "<Badge size='s' />" },
//     },
//   },
//   render: () => {
//     return (
//       <div className="flex w-full items-center gap-2">
//         <Badge {...defaultProps} size={"s"} />
//         <Badge {...defaultProps} size={"m"} />
//       </div>
//     );
//   },
// };
//
// export const FitContent: Story = {
//   parameters: {
//     docs: {
//       source: { code: "<Badge fitContent />" },
//     },
//   },
//   render: () => {
//     return (
//       <div className="flex w-full items-center gap-2">
//         <Badge {...defaultProps} size={"s"} fitContent={true}>
//           99999
//         </Badge>
//         <Badge {...defaultProps} fitContent={true}>
//           99999
//         </Badge>
//       </div>
//     );
//   },
// };
// export const Colors: Story = {
//   parameters: {
//     docs: {
//       source: { code: "<Badge colors='outline' />" },
//     },
//   },
//   render: () => {
//     return (
//       <div className="flex w-full items-center gap-2">
//         <Badge {...defaultProps} colors={"default"} />
//         <Badge {...defaultProps} colors={"brand-1"} />
//         <Badge {...defaultProps} colors={"brand-2"} />
//         <Badge {...defaultProps} colors={"brand-3"} />
//         <Badge {...defaultProps} colors={"brand-4"} />
//       </div>
//     );
//   },
// };
//
// export const Outline: Story = {
//   parameters: {
//     docs: {
//       source: { code: "<Badge style='outline' />" },
//     },
//   },
//   render: () => {
//     return (
//       <div className="flex w-full items-center gap-2">
//         <Badge {...defaultProps} colors={"default"} style={"outline"} />
//         <Badge {...defaultProps} colors={"brand-1"} style={"outline"} />
//         <Badge {...defaultProps} colors={"brand-2"} style={"outline"} />
//         <Badge {...defaultProps} colors={"brand-3"} style={"outline"} />
//         <Badge {...defaultProps} colors={"brand-4"} style={"outline"} />
//       </div>
//     );
//   },
// };
//
// export const Dot: Story = {
//   parameters: {
//     docs: {
//       source: { code: "<BadgeDot />" },
//     },
//   },
//   render: () => {
//     return (
//       <div className="flex w-full items-center gap-2">
//         <div className="flex flex-col items-center gap-2">
//           <BadgeDot {...defaultProps} colors={"default"} />
//           <BadgeDot {...defaultProps} colors={"default"} style={"outline"} />
//         </div>
//         <div className="flex flex-col items-center gap-2">
//           <BadgeDot {...defaultProps} colors={"brand-1"} />
//           <BadgeDot {...defaultProps} colors={"brand-1"} style={"outline"} />
//         </div>
//         <div className="flex flex-col items-center gap-2">
//           <BadgeDot {...defaultProps} colors={"brand-2"} />
//           <BadgeDot {...defaultProps} colors={"brand-2"} style={"outline"} />
//         </div>
//         <div className="flex flex-col items-center gap-2">
//           <BadgeDot {...defaultProps} colors={"brand-3"} />
//           <BadgeDot {...defaultProps} colors={"brand-3"} style={"outline"} />
//         </div>
//         <div className="flex flex-col items-center gap-2">
//           <BadgeDot {...defaultProps} colors={"brand-4"} />
//           <BadgeDot {...defaultProps} colors={"brand-4"} style={"outline"} />
//         </div>
//       </div>
//     );
//   },
// };
//
// export const Skeleton: Story = {
//   parameters: {
//     docs: {
//       source: { code: "<BadgeLoading />" },
//     },
//   },
//   render: () => {
//     return (
//       <div className="flex w-full items-center gap-2">
//         <BadgeLoading size={"s"} />
//         <BadgeLoading size={"m"} />
//       </div>
//     );
//   },
// };

export default meta;
