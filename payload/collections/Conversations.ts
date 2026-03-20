import type { CollectionConfig } from 'payload'

export const Conversations: CollectionConfig = {
  slug: 'conversations',
  admin: {
    useAsTitle: 'id',
  },
  fields: [
    { name: 'guestName', type: 'text' },
    { name: 'guestContact', type: 'text' },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'AI Active', value: 'AI_ACTIVE' },
        { label: 'Human Active', value: 'HUMAN_ACTIVE' },
        { label: 'Closed', value: 'CLOSED' },
        { label: 'Pending Human', value: 'PENDING_HUMAN' },
      ],
      required: true,
      defaultValue: 'AI_ACTIVE',
    },
    { name: 'intent', type: 'text' },
    { name: 'summary', type: 'textarea' },
    { name: 'unreadForStaff', type: 'checkbox', defaultValue: false },
  ],
}
