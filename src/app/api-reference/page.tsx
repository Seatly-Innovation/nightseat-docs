"use client";

import DocsLayout from '@/components/DocsLayout';
import { Section } from '@/components/DocsShared';
import PageNavigation from '@/components/PageNavigation';
import TerminalCodeBlock from '@/components/TerminalCodeBlock';
import { Server, Key } from 'lucide-react';

export default function ApiReference() {
  return (
    <DocsLayout>
      <Section title="Unified API Interfaces" subtitle="RESTful endpoints mapped via JWT role claims." icon={Server}>
         <p className="text-[16px] text-slate-600 mb-8 font-medium leading-relaxed">
           NightSeat handles authentication identically across all platforms via standard `Bearer` tokens. Let's create a booking payload:
         </p>
         
         <div className="mt-8">
           <TerminalCodeBlock />
         </div>

         <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 mt-12">
           <div className="flex items-center gap-3 px-6 py-4 bg-slate-50 border-b border-slate-200">
             <Key size={18} className="text-slate-500" />
             <div className="text-[13px] font-mono font-bold text-slate-600">Authorization Format: <span className="bg-white px-2 py-1 border border-slate-200 rounded text-sky-600">Bearer {"<token>"}</span></div>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm whitespace-nowrap">
               <thead className="bg-white border-b border-slate-200">
                 <tr>
                   <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[11px]">Method</th>
                   <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[11px]">Route Path (/api/v1)</th>
                   <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[11px]">Role Scope</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 <tr className="hover:bg-slate-50 transition-colors">
                   <td className="px-6 py-4"><span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg font-mono text-[11px] font-bold border border-emerald-200">GET</span></td>
                   <td className="px-6 py-4 font-mono font-semibold text-slate-700">/venues, /events</td>
                   <td className="px-6 py-4"><span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-[12px] font-bold border border-slate-200">Public</span></td>
                 </tr>
                 <tr className="hover:bg-slate-50 transition-colors">
                   <td className="px-6 py-4"><span className="px-2.5 py-1 bg-sky-100 text-sky-800 rounded-lg font-mono text-[11px] font-bold border border-sky-200">POST</span></td>
                   <td className="px-6 py-4 font-mono font-semibold text-slate-700">/bookings</td>
                   <td className="px-6 py-4"><span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-[12px] font-bold border border-blue-200">User / Customer</span></td>
                 </tr>
                 <tr className="hover:bg-slate-50 transition-colors">
                   <td className="px-6 py-4"><span className="px-2.5 py-1 bg-purple-100 text-purple-800 rounded-lg font-mono text-[11px] font-bold border border-purple-200">PATCH</span></td>
                   <td className="px-6 py-4 font-mono font-semibold text-slate-700">/admin/bookings/:id/status</td>
                   <td className="px-6 py-4"><span className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-[12px] font-bold border border-indigo-200">Staff / Manager</span></td>
                 </tr>
                 <tr className="hover:bg-slate-50 transition-colors">
                   <td className="px-6 py-4"><span className="px-2.5 py-1 bg-rose-100 text-rose-800 rounded-lg font-mono text-[11px] font-bold border border-rose-200">DELETE</span></td>
                   <td className="px-6 py-4 font-mono font-semibold text-slate-700">/owner/staff/:id</td>
                   <td className="px-6 py-4"><span className="px-3 py-1.5 bg-rose-100 text-rose-700 rounded-full text-[12px] font-bold border border-rose-200">Owner / SuperAdmin</span></td>
                 </tr>
               </tbody>
             </table>
           </div>
         </div>
      </Section>
      <PageNavigation />
    </DocsLayout>
  );
}
