"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import CommandPalette from "./CommandPalette";
import BackToTop from "./BackToTop";
import { navGroups } from "@/lib/navConfig";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-lg border-b border-slate-200 z-50 flex items-center justify-between px-5">
         <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-blue-200">N</div>
            <span className="font-bold text-slate-900 font-heading">NightSeat Docs</span>
         </div>
         <button 
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-600 focus:outline-none bg-slate-50 rounded-xl border border-slate-200"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <motion.aside 
        className={`fixed lg:sticky top-0 h-screen w-[280px] bg-white border-r border-slate-200 flex flex-col z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="p-6 pt-8 lg:pt-8">
          <div className="flex items-center gap-4 mb-8 hidden lg:flex">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 shadow-md shadow-blue-600/20 flex items-center justify-center text-white font-bold text-2xl font-heading">
              N
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-tight font-heading">NightSeat</h1>
              <div className="text-[11px] font-bold text-slate-500 tracking-widest uppercase mt-0.5">Ecosystem</div>
            </div>
          </div>
          
          <div className="relative mb-6">
            <CommandPalette navGroups={navGroups} />
          </div>

          <div className="flex items-center gap-2 px-3 py-2 mb-4 bg-emerald-50 rounded-lg border border-emerald-100">
             <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </div>
             <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">All Systems Operational</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 pb-8 custom-scrollbar">
          {navGroups.map((group, idx) => (
            <div key={idx} className="mb-8">
              <h4 className="px-2 mb-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                {group.title}
              </h4>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.id}>
                      <Link 
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] transition-all duration-200
                          ${isActive 
                            ? 'bg-blue-50/80 text-blue-700 font-bold shadow-sm border border-blue-100/50' 
                            : 'text-slate-600 font-semibold hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                          }`}
                      >
                        {item.label}
                        {isActive && <ChevronRight size={14} className="text-blue-600" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-5 border-t border-slate-100 bg-white">
          <Link 
            href="https://github.com/Seatly-Innovation/Nightseat-Innovation" 
            target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-slate-900/10 hover:shadow-lg hover:shadow-slate-900/20"
          >
            <FaGithub size={16} />
            View on GitHub
          </Link>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[960px] px-6 py-28 lg:px-20 lg:py-32 w-full relative">
        <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-blue-50/20 via-white to-transparent -z-10 pointer-events-none"></div>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <BackToTop />
    </div>
  );
}
