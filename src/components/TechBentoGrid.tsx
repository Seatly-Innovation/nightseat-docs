"use client";

import { motion } from "framer-motion";
import { Database, Server, Smartphone, LayoutDashboard, CreditCard, Cpu } from "lucide-react";

const stackItems = [
  {
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    bg: "bg-gradient-to-br from-indigo-900 to-blue-900",
    text: "text-white",
    icon: Server,
    iconColor: "text-blue-400",
    title: "Go Fiber (Core API)",
    desc: "Blazing fast stateless backend strictly handling business logic, Stripe webhooks, and complex role-based routing.",
    delay: 0
  },
  {
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    bg: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    text: "text-emerald-950",
    icon: Database,
    iconColor: "text-emerald-600",
    title: "MongoDB",
    desc: "NoSQL document storage heavily utilizing primitive.ObjectID for relation mapping.",
    delay: 0.1
  },
  {
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    bg: "bg-gradient-to-br from-rose-50 to-rose-100",
    text: "text-rose-950",
    icon: Cpu,
    iconColor: "text-rose-600",
    title: "Redis",
    desc: "In-memory caching for live booking queues and transient state management.",
    delay: 0.2
  },
  {
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    bg: "bg-slate-900",
    text: "text-white",
    icon: Smartphone,
    iconColor: "text-white",
    title: "Next.js (User App)",
    desc: "App Router enabled PWA for customers to book tables and scan tickets.",
    delay: 0.3
  },
  {
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    bg: "bg-gradient-to-r from-blue-50 to-indigo-50",
    text: "text-slate-900",
    icon: CreditCard,
    iconColor: "text-indigo-600",
    title: "Stripe Platform Setup",
    desc: "Custom Connect and Checkout sessions to hold credit card auth until physical venue check-in.",
    delay: 0.4
  }
];

export default function TechBentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[160px]">
      {stackItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: item.delay, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className={`rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden relative group border ${
              item.bg.includes('slate-900') || item.bg.includes('indigo-900') 
              ? 'border-white/10' 
              : 'border-slate-200'
            } ${item.colSpan} ${item.rowSpan} ${item.bg} ${item.text} shadow-sm hover:shadow-xl transition-all`}
          >
            {/* Background decorative blob */}
            <div className="absolute -bottom-10 -right-10 opacity-[0.07] pointer-events-none transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500">
              <Icon size={180} />
            </div>

            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              item.bg.includes('slate-900') || item.bg.includes('indigo-900') 
              ? 'bg-white/10' 
              : 'bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)]'
            }`}>
              <Icon size={24} className={item.iconColor} />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold font-heading mb-2">{item.title}</h3>
              <p className={`text-[14px] leading-relaxed font-medium ${
                item.bg.includes('slate-900') || item.bg.includes('indigo-900') 
                ? 'text-white/70' 
                : 'text-slate-600'
              }`}>{item.desc}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
