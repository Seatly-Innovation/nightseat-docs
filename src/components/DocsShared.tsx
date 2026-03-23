"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Copy, Check } from "lucide-react";
import SpotlightCard from "./reactbits/SpotlightCard";

export const CodeBlock = ({ code, language = 'bash', title = '' }: { code: string, language?: string, title?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden bg-[#0A0C10] border border-slate-800 shadow-xl shadow-slate-900/10 group relative">
      {title && (
        <div className="flex items-center px-5 py-3 bg-[#111319] border-b border-slate-800">
          <FileText size={14} className="text-slate-400 mr-2" />
          <span className="text-xs font-semibold text-slate-300 font-mono tracking-wide">{title}</span>
        </div>
      )}
      {!title && (
        <div className="absolute top-0 right-0 p-3 z-10 flex items-center justify-end">
          <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest mr-2">{language}</span>
        </div>
      )}
      <button 
        onClick={handleCopy}
        className={`absolute top-3 right-3 p-2 rounded-lg transition-all z-20 backdrop-blur-sm ${copied ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800/40 text-slate-400 hover:text-white hover:bg-slate-700/80 border border-transparent hover:border-slate-600'}`}
        aria-label="Copy code"
        title="Copy to clipboard"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <div className="p-5 sm:p-6 overflow-x-auto text-[14px] font-mono text-slate-300 leading-relaxed custom-scrollbar">
        <pre><code>{code}</code></pre>
      </div>
    </div>
  );
};

export const Section = ({ title, subtitle, children, icon: Icon }: { title: string, subtitle?: string, children: React.ReactNode, icon?: any }) => {
  return (
    <motion.section 
      className="mb-16 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100/80 text-slate-500 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-slate-200/50">
          <span>Updated: Today</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50/80 text-blue-600 border border-blue-100/80 rounded-lg text-[10px] font-bold uppercase tracking-widest">
          <span>~ 3 Min Read</span>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-3">
        {Icon && (
          <div className="p-3.5 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg shadow-blue-500/20">
            <Icon size={28} strokeWidth={2.5} />
          </div>
        )}
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
          {title}
        </h1>
      </div>
      {subtitle && <p className="text-xl text-slate-500 mt-5 mb-12 font-medium leading-relaxed max-w-2xl">{subtitle}</p>}
      {!subtitle && <div className="h-px bg-slate-200 w-full my-8"></div>}
      
      <div className="text-slate-600 leading-relaxed prose prose-slate max-w-none prose-headings:font-outfit prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-code:text-indigo-600">
        {children}
      </div>
    </motion.section>
  );
};

export const FeatureCard = ({ title, desc, icon: Icon, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <SpotlightCard className="h-full bg-white p-8 rounded-3xl" spotlightColor="rgba(37, 99, 235, 0.06)">
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 shadow-sm w-max mb-6">
        <Icon size={28} strokeWidth={2} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 text-[15px] leading-relaxed font-medium">{desc}</p>
    </SpotlightCard>
  </motion.div>
);
