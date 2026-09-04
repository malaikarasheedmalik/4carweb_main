'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Wrench } from 'lucide-react';
import { business, services } from '@/lib/data';

type Msg = { from: 'bot' | 'user'; text: string };

const quickPrompts = [
  'What are your opening hours?',
  'How do I book a service?',
  'Do you do engine repairs?',
  'Where are you located?',
];

function answer(input: string): string {
  const q = input.toLowerCase();
  if (/(hour|open|close|time)/.test(q)) {
    return `We're open Mon–Fri 7:30 AM – 6:00 PM and Saturday 8:00 AM – 4:00 PM. Sunday we're closed.`;
  }
  if (/(book|appointment|schedule)/.test(q)) {
    return `You can book online anytime at the "Book a Service" page, or call us on ${business.phone}. We'll confirm by text.`;
  }
  if (/(price|cost|quote|how much)/.test(q)) {
    return `Pricing depends on your vehicle and the work needed. Check the Pricing page for our standard rates, or call ${business.phone} for a free quote.`;
  }
  if (/(where|location|address|find|direction)/.test(q)) {
    return `We're at ${business.address}. Tap "Get Directions" on the Home or Contact page to open Google Maps.`;
  }
  if (/(phone|call|contact|number)/.test(q)) {
    return `Call us on ${business.phone} or email ${business.email}. We're happy to help.`;
  }
  if (/(ac|air con|aircon|cool)/.test(q)) {
    return `Yes — we service car AC systems including refrigerant recharge, leak detection and compressor repair. AC service starts at $95.`;
  }
  if (/(brake)/.test(q)) {
    return `Absolutely. Brake pad replacement starts at $120, and a full disc & pad set per axle from $240. Same-day on most cars.`;
  }
  if (/(oil)/.test(q)) {
    return `Oil & filter service starts at $39 and takes about 30 minutes. Includes a free multi-point inspection.`;
  }
  if (/(engine)/.test(q)) {
    return `Yes, we handle everything from diagnostics to full engine rebuilds. Engine work starts at $180 — bring it in and we'll take a look.`;
  }
  const match = services.find((s) =>
    q.includes(s.slug) || q.includes(s.title.toLowerCase().split(' ')[0])
  );
  if (match) {
    return `${match.title}: ${match.short} From $${match.priceFrom}. Want to book? Head to the "Book a Service" page.`;
  }
  return `Thanks for your message! For anything specific, the fastest way is to call ${business.phone} or use the "Book a Service" page. Is there anything else I can help with?`;
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: 'bot',
      text: `Hi there! I'm FixPoint's virtual assistant. Ask me about our services, opening hours, or how to book. How can I help?`,
    },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { from: 'user', text: trimmed }]);
    setInput('');
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', text: answer(trimmed) }]);
    }, 450);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-offwhite shadow-warm-lg"
        aria-label="Open chat assistant"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-5 z-50 flex h-[460px] max-h-[70vh] w-[min(360px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-beige bg-offwhite shadow-warm-lg"
          >
            <div className="flex items-center gap-3 bg-burgundy px-4 py-3.5 text-offwhite">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta">
                <Wrench className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-sm font-semibold">FixPoint Assistant</p>
                <p className="flex items-center gap-1.5 text-xs text-offwhite/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Online now
                </p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-cream px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={m.from === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className={
                      m.from === 'user'
                        ? 'max-w-[80%] rounded-2xl rounded-br-sm bg-terracotta px-3.5 py-2.5 text-sm text-offwhite'
                        : 'max-w-[85%] rounded-2xl rounded-bl-sm bg-offwhite px-3.5 py-2.5 text-sm text-burgundy shadow-sm'
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {messages.length <= 2 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {quickPrompts.map((p) => (
                    <button
                      key={p}
                      onClick={() => send(p)}
                      className="rounded-full border border-beige bg-offwhite px-3 py-1.5 text-xs text-warmgray transition-colors hover:border-terracotta hover:text-terracotta"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-beige bg-offwhite px-3 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 rounded-lg border border-beige bg-cream px-3 py-2 text-sm text-burgundy placeholder:text-warmgray/60 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
              />
              <button
                type="submit"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-terracotta text-offwhite transition-colors hover:bg-terracotta-dark"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
