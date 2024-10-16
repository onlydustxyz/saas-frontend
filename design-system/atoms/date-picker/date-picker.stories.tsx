import { Meta, StoryObj } from "@storybook/react";

import { DatePickerPort } from "./date-picker.types";
import { DatePicker } from "./variants/date-picker-default";

type Story = StoryObj<typeof DatePicker>;

const defaultProps: DatePickerPort<"div"> = {};

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: "Atoms/DatePicker",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<DatePicker />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <DatePicker {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
