import type { CollectionConfig } from 'payload'

export const Messages: CollectionConfig = {
  slug: 'messages',
  fields: [
    {
      name: 'conversation',
      type: 'relationship',
      relationTo: 'conversations',
      required: true,
      index: true,
    },
    {
      name: 'senderType',
      type: 'select',
      options: ['guest', 'ai', 'staff', 'system'],
      required: true,
    },
    { name: 'body', type: 'textarea', required: true },
  ],
}
