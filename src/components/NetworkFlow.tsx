"use client";

import { motion } from "framer-motion";
import { Database, Server, Smartphone, Monitor } from "lucide-react";
import { useState, useEffect } from "react";

export default function NetworkFlow() {
  const [activeNode, setActiveNode] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] bg-[#0a0f1d] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl p-8 flex items-center justify-center isolate">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.1)_0%,transparent_70%)]"></div>
      
      {/* Network Lines (SVG Paths) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
        {/* User to Core */}
        <path d="M 25% 25% L 50% 50%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
        <motion.circle 
          cx="0" cy="0" r="4" fill="#3b82f6"
          className="shadow-[0_0_10px_#3b82f6]"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{ offsetPath: 'path("M 250 125 L 480 250")' }}
        />

        {/* Admin to Core */}
        <path d="M 75% 25% L 50% 50%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
        <motion.circle 
          cx="0" cy="0" r="4" fill="#10b981"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.5 }}
          style={{ offsetPath: 'path("M 710 125 L 480 250")' }}
        />

        {/* Core to MongoDB */}
        <path d="M 50% 50% L 25% 75%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
        <motion.circle 
          cx="0" cy="0" r="4" fill="#8b5cf6"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
          style={{ offsetPath: 'path("M 480 250 L 250 375")' }}
        />

        {/* Core to Redis */}
        <path d="M 50% 50% L 75% 75%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
        <motion.circle 
          cx="0" cy="0" r="4" fill="#ef4444"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.2 }}
          style={{ offsetPath: 'path("M 480 250 L 710 375")' }}
        />
      </svg>

      {/* Nodes */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className={`p-4 rounded-2xl bg-slate-900 border transition-colors duration-500 ${activeNode === 0 ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 'border-slate-800'}`}>
          <Smartphone size={32} className={`${activeNode === 0 ? 'text-blue-400' : 'text-slate-500'}`} />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-slate-400">User App</div>
        </div>
      </div>

      <div className="absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2 z-20">
        <div className={`p-4 rounded-2xl bg-slate-900 border transition-colors duration-500 ${activeNode === 1 ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border-slate-800'}`}>
          <Monitor size={32} className={`${activeNode === 1 ? 'text-emerald-400' : 'text-slate-500'}`} />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-slate-400">Admin Portal</div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <div className={`p-6 rounded-3xl bg-black border-2 transition-colors duration-500 ${activeNode === 2 ? 'border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.4)]' : 'border-slate-700'}`}>
          <Server size={48} className={`${activeNode === 2 ? 'text-indigo-400' : 'text-slate-400'}`} />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-bold text-white tracking-widest bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30">CORE API</div>
        </div>
      </div>

      <div className="absolute bottom-1/4 left-1/4 -translate-x-1/2 translate-y-1/2 z-20">
        <div className={`p-4 rounded-2xl bg-slate-900 border transition-colors duration-500 ${activeNode === 3 ? 'border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)]' : 'border-slate-800'}`}>
          <Database size={32} className={`${activeNode === 3 ? 'text-purple-400' : 'text-slate-500'}`} />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-slate-400">MongoDB</div>
        </div>
      </div>

      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 z-20">
        <div className={`p-4 rounded-2xl bg-slate-900 border transition-colors duration-500 border-slate-800 hover:border-red-500`}>
          <Server size={32} className="text-slate-500" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-slate-400">Redis Cache</div>
        </div>
      </div>
      
    </div>
  );
}
