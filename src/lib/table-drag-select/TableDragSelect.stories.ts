import type { Meta, StoryObj } from '@storybook/react';

import { TableDragSelect } from './index';

const meta = {
  title: 'Example/TableDragSelect',
  component: TableDragSelect,
  parameters: {
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof TableDragSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    rows: 9,
    cols:8
  },
};
