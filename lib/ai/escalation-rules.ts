
export const escalationRules = {
  triggers: [
    // High-value commercial
    "conference", "meeting", "event", "wedding", "banquet",
    "group booking", "corporate rate", "quotation",

    // Logistics
    "airport transfer", "pickup", "transport",

    // Billing / disputes
    "invoice", "bill", "charge", "refund", "overcharged",

    // Sensitive / complaints
    "complaint", "manager", "unacceptable", "issue", "problem",

    // Special requirements
    "dietary", "allergy", "medical",

    // Booking intent
    "book", "reservation", "availability"
  ],

  categories: {
    EVENTS: "conference, wedding, or group-related enquiries",
    SALES: "corporate rates, quotations, or bookings",
    OPERATIONS: "transfers, special arrangements",
    BILLING: "charges, invoices, disputes",
    COMPLAINT: "negative experiences or escalation requests",
  },

  policy: `
  Escalate when:
  - The request involves pricing, availability, or confirmation
  - The request involves events or group bookings
  - The user expresses dissatisfaction or urgency
  - The assistant lacks confirmed information
  `,

  leadCaptureFields: ["name", "contact method", "dates", "request details"],

  fallbackMessage:
    "Thanks for your message. This is best handled by our team so we can give you accurate details. May I take your name and contact number so we can assist you directly?",
};
