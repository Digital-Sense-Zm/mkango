'use client';

import { useState, useRef, useEffect } from 'react';

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
    <div className="flex h-[500px] max-h-[80vh] w-80 flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_45px_90px_rgba(15,61,46,0.18)] md:w-96">
      <div className="flex items-center justify-between bg-[#0f4d37] p-4 text-white">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-80">Guest Desk</p>
          <p className="text-sm font-semibold">M&apos;kango Golfview Hotel</p>
        </div>
        <button onClick={onClose} className="text-xl font-bold opacity-80 hover:opacity-100">&times;</button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                m.role === 'user'
                  ? 'bg-[#0f4d37] text-white'
                  : m.role === 'system'
                    ? 'w-full bg-red-100 text-center text-xs text-red-800'
                    : 'border border-gray-100 bg-white text-gray-800 shadow-sm'
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
        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t bg-white p-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about rooms, dining, or facilities"
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f4d37] text-white disabled:opacity-50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
          </button>
        </form>
      )}
    </div>
  );
}
