'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

type Message = {
  id: string;
  role: 'user' | 'ai' | 'system';
  content: string;
};

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content:
        "Hello. Welcome to M'kango Golfview Hotel. I can help with room types, dining, facilities, and connect you with the reservations team.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isEscalated, setIsEscalated] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isEscalated) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.content,
          conversationId,
        }),
      });

      const data = await res.json();

      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: data.reply || "Sorry, I couldn't generate a response.",
        },
      ]);

      if (data.isEscalated) {
        setIsEscalated(true);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'system',
          content: 'Sorry, I am having trouble connecting right now.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[550px] max-h-[80vh] w-[340px] flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-2xl ring-1 ring-black/5 md:w-[400px]">
      <div className="flex items-center justify-between bg-gradient-to-r from-[#0a3826] to-[#0f4d37] p-4 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 p-2 backdrop-blur-sm">
            <Image src="/logo/symbol-white.svg" alt="Logo" width={24} height={24} className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/80">Guest Desk</p>
            <p className="text-sm font-semibold tracking-wide">M&apos;kango Golfview Hotel</p>
          </div>
        </div>
        <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xl font-medium transition-colors hover:bg-white/20">&times;</button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto bg-[#f8faf9] p-5">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] px-4 py-2.5 text-[14px] leading-relaxed shadow-sm ${
                m.role === 'user'
                  ? 'bg-[#0f4d37] text-white rounded-2xl rounded-tr-sm shadow-[#0f4d37]/20'
                  : m.role === 'system'
                    ? 'w-full bg-red-50 text-center text-xs text-red-600 rounded-2xl'
                    : 'border border-gray-100 bg-white text-gray-800 rounded-2xl rounded-tl-sm'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl border border-gray-100 bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400"></span>
              <span className="delay-75 h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400"></span>
              <span className="delay-150 h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {isEscalated ? (
        <div className="bg-gray-100 p-4 text-center text-xs text-gray-500">
          A hotel team member will review your request and follow up.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center gap-3 border-t border-gray-100 bg-white p-3 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="How can we help you today?"
            className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-[14px] outline-none transition-all placeholder:text-gray-400 focus:border-[#0f4d37]/30 focus:bg-white focus:ring-2 focus:ring-[#0f4d37]/10"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f4d37] text-white shadow-md shadow-[#0f4d37]/20 transition-all hover:bg-[#0a3826] disabled:opacity-50 disabled:shadow-none"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
          </button>
        </form>
      )}
    </div>
  );
}
