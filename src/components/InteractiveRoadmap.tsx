"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed, Rocket } from "lucide-react";

const milestones = [
  {
    version: "v1.0 (Current)",
    title: "Core Ecosystem Launch",
    desc: "Complete release of Admin Portal, User App, and Core API with Stripe split payments and Drag-and-Drop Floor Plan editor.",
    status: "completed",
    date: "March 2026"
  },
  {
    version: "v1.1",
    title: "Analytics Dashboard Expansion",
    desc: "Adding comprehensive data visualization for venue owners to track revenue, customer retention, and zone heatmaps over time.",
    status: "progress",
    date: "Q2 2026"
  },
  {
    version: "v2.0",
    title: "Global Franchising & AI Recommendations",
    desc: "Multi-region deployment architecture support. AI-driven table recommendations for users based on previous booking history.",
    status: "planned",
    date: "Late 2026"
  }
];

export default function InteractiveRoadmap() {
  return (
    <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 pb-4">
      {milestones.map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          className="mb-12 relative pl-8 md:pl-10"
        >
          {/* Timeline Dot */}
          <div className="absolute -left-[11px] top-1">
            {item.status === 'completed' && <div className="bg-white rounded-full"><CheckCircle2 className="text-emerald-500 bg-white" size={20} /></div>}
            {item.status === 'progress' && <div className="bg-white rounded-full"><Rocket className="text-blue-500 bg-white p-0.5" size={20} /></div>}
            {item.status === 'planned' && <div className="bg-white rounded-full"><CircleDashed className="text-slate-300 bg-white" size={20} /></div>}
          </div>
          
          <div className={`p-6 rounded-2xl border ${item.status === 'completed' ? 'border-emerald-100 bg-emerald-50/30' : item.status === 'progress' ? 'border-blue-200 bg-blue-50 shadow-sm shadow-blue-100' : 'border-slate-100 bg-white'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <span className={`px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded-full w-max ${item.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : item.status === 'progress' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500'}`}>
                {item.version}
              </span>
              <span className="text-sm font-bold text-slate-400 font-mono">{item.date}</span>
            </div>
            
            <h3 className={`text-lg font-bold mb-2 font-heading ${item.status === 'progress' ? 'text-blue-900' : 'text-slate-800'}`}>
              {item.title}
            </h3>
            
            <p className="text-slate-600 font-medium text-[15px] leading-relaxed">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
