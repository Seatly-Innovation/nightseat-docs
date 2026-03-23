"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "How does the Stripe Split Payment work?",
    answer: "When a customer books a table, the system captures a hold on their credit card. Once the venue confirms the booking or the customer arrives, the charge is completed. For split payments, the customer can generate a payment link to share with friends before finalizing the booking."
  },
  {
    question: "Is the Go Fiber Backend horizontally scalable?",
    answer: "Yes, the architecture is completely stateless. Session management and WebSocket states are handled via Redis. This allows you to spin up multiple instances of the Go backend behind a load balancer without any issues."
  },
  {
    question: "Can an Owner manage multiple venues?",
    answer: "The platform is built with a multi-tenant structure. An Owner account can create and manage unlimited venues under a single umbrella, with centralized staff management and aggregated revenue analytics."
  },
  {
    question: "Do Admin Portal changes reflect instantly on the User App?",
    answer: "Changes to the Floor Plan or Table Prices take effect immediately upon saving. The User App fetches the latest venue snapshot directly from the core MongoDB database caching layer."
  }
];

export default function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => {
        const isActive = activeIndex === index;
        return (
          <motion.div
            key={index}
            initial={false}
            animate={{ backgroundColor: isActive ? "#f8fafc" : "#ffffff" }}
            className={`border border-slate-200 rounded-2xl overflow-hidden transition-colors hover:border-blue-200 ${isActive ? 'shadow-sm' : ''}`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
            >
              <span className={`font-bold text-[16px] ${isActive ? 'text-blue-700' : 'text-slate-800'}`}>
                {faq.question}
              </span>
              <div className={`flex-shrink-0 ml-4 p-1.5 rounded-full transition-colors ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                {isActive ? <Minus size={16} /> : <Plus size={16} />}
              </div>
            </button>
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto", marginBottom: 20 },
                    collapsed: { opacity: 0, height: 0, marginBottom: 0 }
                  }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div className="px-5 text-slate-600 text-[15px] leading-relaxed font-medium">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
