export const escalationRules = {
  triggers: [
    "conference", "meeting room", "event", "wedding", "banquet", // Events & Conferences
    "group booking", "corporate rate", "quotation", // Commercial/Sales
    "airport pickup", "airport transfer", "transport", // Concierge requests requiring details
    "complaint", "manager", "unacceptable", "broken", // Sensitive
    "dietary requirement", "allergy" // Special needs
  ],
  fallbackMessage: "Thanks for your message. I’ll need a member of our team to assist you with this directly. Please hold on or provide your contact details, and someone will be right with you."
}
