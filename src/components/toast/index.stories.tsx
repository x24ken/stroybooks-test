import { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./index";

const meta: Meta<typeof Toast> = {
  component: Toast,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    message: "Hello, world!",
  },
  render: () => <Toast />,
};
