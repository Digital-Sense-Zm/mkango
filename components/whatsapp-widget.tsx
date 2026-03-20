'use client';

import { useState } from "react";
import { ChatPanel } from "./ai/chat-panel";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="mb-3 origin-bottom-right transition-transform">
          <ChatPanel onClose={() => setIsOpen(false)} />
        </div>
      )}
      {!isOpen && (
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
          className="relative flex h-[62px] w-[62px] items-center justify-center rounded-full border-[3px] border-white bg-[#25D366] text-white shadow-[0_16px_34px_rgba(37,211,102,0.42)] transition hover:scale-[1.03] hover:bg-[#22c75a] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/30"
        >
          <span className="sr-only">Open WhatsApp guest desk</span>
          <WhatsAppIcon />
          <span className="absolute right-0 top-0 flex h-[19px] w-[19px] items-center justify-center rounded-full border-2 border-white bg-[#ff3b30] text-[10px] font-bold leading-none text-white shadow-[0_8px_18px_rgba(255,59,48,0.35)]">
            1
          </span>
        </button>
      )}
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3a9 9 0 0 0-7.67 13.62L3.5 21l4.54-.75A9 9 0 1 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
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
