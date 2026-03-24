"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, ChevronRight, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { flattenedNav } from "@/lib/navConfig";

export default function DynamicIsland({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  const currentNav = flattenedNav.find(n => n.href === pathname);
  const title = currentNav ? currentNav.label : 'Documentation';

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 200);
    });
  }, [scrollY]);

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.div
          initial={{ y: -50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -50, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[90] hidden md:flex items-center gap-2 p-1.5 bg-black/90 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
        >
          <button 
            onClick={onOpenSidebar}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <Menu size={16} />
          </button>
          
          <div className="px-3 flex items-center text-white text-sm font-semibold tracking-wide">
            <span className="text-white/50 mr-2">Nightseat</span>
            <ChevronRight size={14} className="text-white/30 mr-2" />
            <span className="truncate max-w-[150px]">{title}</span>
          </div>

          <button 
            onClick={() => {
              const e = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
              window.dispatchEvent(e);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors text-xs font-bold"
          >
            <Search size={14} />
            <span className="opacity-50">⌘K</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
