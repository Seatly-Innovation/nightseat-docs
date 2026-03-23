"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { flattenedNav } from "@/lib/navConfig";

export default function PageNavigation() {
  const pathname = usePathname();
  const currentIndex = flattenedNav.findIndex(item => item.href === pathname);

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? flattenedNav[currentIndex - 1] : null;
  const next = currentIndex < flattenedNav.length - 1 ? flattenedNav[currentIndex + 1] : null;

  return (
    <div className="grid sm:grid-cols-2 gap-4 mt-20 pt-8 border-t border-slate-200">
      {prev ? (
        <Link 
          href={prev.href}
          className="group flex flex-col items-start p-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/50 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 transition-all relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 transition-all"></div>
          <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 group-hover:text-blue-500 transition-colors relative z-10">
            <ChevronLeft size={16} className="mr-1 -ml-1 group-hover:-translate-x-1 transition-transform" />
            Previous
          </div>
          <div className="text-slate-900 font-bold text-xl group-hover:text-blue-700 relative z-10 transition-colors">{prev.label}</div>
          <div className="text-slate-500 text-sm font-medium mt-1.5 relative z-10">{prev.groupTitle}</div>
        </Link>
      ) : <div />}

      {next ? (
        <Link 
          href={next.href}
          className="group flex flex-col items-end text-right p-6 rounded-3xl border border-slate-200 bg-gradient-to-bl from-white to-slate-50/50 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 transition-all relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 transition-all"></div>
          <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 group-hover:text-blue-500 transition-colors relative z-10">
            Next
            <ChevronRight size={16} className="ml-1 -mr-1 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="text-slate-900 font-bold text-xl group-hover:text-blue-700 relative z-10 transition-colors">{next.label}</div>
          <div className="text-slate-500 text-sm font-medium mt-1.5 relative z-10">{next.groupTitle}</div>
        </Link>
      ) : <div />}
    </div>
  );
}
