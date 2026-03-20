'use client';

import { useState } from "react";
import { ChatPanel } from "./ai/chat-panel";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="mb-2 origin-bottom-right transition-transform">
          <ChatPanel onClose={() => setIsOpen(false)} />
        </div>
      )}
      {!isOpen && (
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
          className="whatsapp-shadow flex h-14 w-14 items-center justify-center rounded-none bg-[var(--color-emerald-dark)] text-white transition hover:bg-[var(--color-emerald-deep)] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
        >
          <span className="sr-only">Open hotel guest desk</span>
          <WhatsAppIcon />
        </button>
      )}
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3a9 9 0 0 0-7.67 13.62L3.5 21l4.54-.75A9 9 0 1 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.3 8.4c-.2.6-.3 1.3.6 2.6s2.2 2.6 3.7 3.1c1.1.4 1.7.2 2.3-.2l.5-.3c.2-.1.4-.2.5 0l1 .6c.3.2.6.3.5.7-.1.4-.5 1.6-1.3 2.1-.6.4-1.3.5-2.2.3-2-.5-4.5-2-5.8-3.5s-2.2-3.4-2.3-4.7c0-.5.2-1 .4-1.4.4-.6.9-.8 1.2-.7l1 .4c.2.1.3.3.2.5l-.3.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
