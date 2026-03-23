"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, ChevronRight, CornerDownLeft } from "lucide-react";

export default function CommandPalette({ navGroups }: { navGroups: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const allItems = navGroups.flatMap(g => g.items.map((i: any) => ({ ...i, group: g.title })));
  const filtered = query.length > 0 
    ? allItems.filter(item => item.label.toLowerCase().includes(query.toLowerCase()) || item.group.toLowerCase().includes(query.toLowerCase()))
    : allItems.slice(0, 5); // Show first 5 as recent/suggested

  const handleSelect = (id: string) => {
    setIsOpen(false);
    setQuery("");
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="hidden lg:flex items-center justify-between w-64 px-4 py-2 text-sm text-slate-500 bg-slate-100/50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all font-medium group"
      >
        <div className="flex items-center gap-2">
          <Search size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
          <span>Quick search...</span>
        </div>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 rounded-md shadow-sm">
          ⌘K
        </kbd>
      </button>

      {/* Mobile Search Trigger */}
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 text-slate-600 bg-slate-100 rounded-xl border border-slate-200"
      >
        <Search size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-[101] border border-slate-200"
            >
              <div className="flex items-center px-4 py-4 border-b border-slate-100">
                <Search size={20} className="text-slate-400 mr-3" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search documentation, features, guides..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 text-lg bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
                <kbd className="hidden sm:inline-block px-2 py-1 text-[11px] font-bold text-slate-400 bg-slate-50 border border-slate-200 rounded-md">
                  ESC
                </kbd>
              </div>

              <div className="max-h-[60vh] overflow-y-auto px-2 py-3">
                {query.length === 0 && (
                  <div className="px-3 py-2 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                    Suggested
                  </div>
                )}
                
                {filtered.length > 0 ? (
                  <ul className="space-y-1">
                    {filtered.map((item, index) => (
                      <li key={index}>
                        <button
                          onClick={() => handleSelect(item.id)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors group text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-100 text-slate-500 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                              <FileText size={16} />
                            </div>
                            <div>
                              <div className="text-[15px] font-bold text-slate-800 group-hover:text-blue-700">{item.label}</div>
                              <div className="text-[12px] font-medium text-slate-500 group-hover:text-blue-500">{item.group}</div>
                            </div>
                          </div>
                          <CornerDownLeft size={16} className="text-slate-300 group-hover:text-blue-400 hidden sm:block" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-12 text-center text-slate-500">
                    <p className="text-lg font-semibold text-slate-700 mb-1">No results found</p>
                    <p className="text-sm">We couldn't find anything matching "{query}"</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
