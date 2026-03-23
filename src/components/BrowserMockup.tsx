"use client";

import { motion } from "framer-motion";

interface BrowserMockupProps {
  children: React.ReactNode;
  url?: string;
  title?: string;
}

export default function BrowserMockup({ children, url = "nightseat.app", title = "Admin Portal" }: BrowserMockupProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 w-full max-w-4xl mx-auto"
    >
      {/* Browser Chrome */}
      <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-400 border border-rose-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/50"></div>
        </div>
        
        <div className="flex-1 flex justify-center">
          <div className="bg-white border border-slate-200 rounded-lg px-4 py-1.5 flex items-center gap-2 max-w-sm w-full shadow-sm text-center justify-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{title}</span>
            <span className="text-slate-300">|</span>
            <span className="text-[12px] text-slate-600 font-medium font-mono">https://{url}</span>
          </div>
        </div>
        
        <div className="w-16"></div> {/* Spacer for symmetry */}
      </div>

      {/* Browser Content */}
      <div className="bg-[#fafafa] relative overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
}
