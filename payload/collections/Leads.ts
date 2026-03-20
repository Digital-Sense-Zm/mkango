import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  fields: [
    {
      name: 'conversation',
      type: 'relationship',
      relationTo: 'conversations',
      required: true,
    },
    { name: 'requestType', type: 'text', required: true },
    { name: 'guestName', type: 'text' },
    { name: 'guestContact', type: 'text' },
    { name: 'checkInDate', type: 'date' },
    { name: 'checkOutDate', type: 'date' },
    { name: 'guestCount', type: 'number' },
    { name: 'notes', type: 'textarea' },
  ],
}
