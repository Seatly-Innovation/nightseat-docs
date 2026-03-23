"use client";

import DocsLayout from '@/components/DocsLayout';
import { Section } from '@/components/DocsShared';
import PageNavigation from '@/components/PageNavigation';
import { Cpu, Layers, Server, Database } from 'lucide-react';

export default function Architecture() {
  return (
    <DocsLayout>
      <Section title="System Architecture" subtitle="How components communicate within the NightSeat Platform." icon={Cpu}>
        <div className="relative w-full rounded-3xl border border-slate-200 bg-white p-6 md:p-12 shadow-sm overflow-hidden flex flex-col items-center mt-8">
          
          <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          
          <div className="relative z-10 w-full max-w-3xl flex flex-col gap-10">
            
            {/* Clients */}
            <div className="flex justify-center gap-8">
               <div className="px-8 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm text-sm font-bold text-slate-700">Client Devices</div>
            </div>

            {/* Frontends Layer */}
             <div className="grid grid-cols-2 gap-8 w-full relative">
                <div className="bg-white border-2 border-indigo-100 shadow-sm rounded-3xl p-6 md:p-8 text-center relative hover:border-indigo-200 transition-colors">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-indigo-100 text-indigo-700 text-[11px] font-bold uppercase tracking-wider rounded-full border border-indigo-200">Frontend / Edge</div>
                  <Layers className="mx-auto text-indigo-500 mb-4" size={32}/>
                  <h4 className="text-xl font-bold text-slate-800">Next.js User App</h4>
                  <p className="text-[13px] font-medium text-slate-500 mt-2">NextAuth • Tailwind 4</p>
                </div>

                <div className="bg-white border-2 border-emerald-100 shadow-sm rounded-3xl p-6 md:p-8 text-center relative hover:border-emerald-200 transition-colors">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-emerald-100 text-emerald-700 text-[11px] font-bold uppercase tracking-wider rounded-full border border-emerald-200">Frontend / Edge</div>
                  <Layers className="mx-auto text-emerald-500 mb-4" size={32}/>
                  <h4 className="text-xl font-bold text-slate-800">Next.js Admin App</h4>
                  <p className="text-[13px] font-medium text-slate-500 mt-2">SPA • React-DnD</p>
                </div>
             </div>

            {/* Core API */}
            <div className="w-full bg-[#0a0f1d] border border-slate-800 shadow-2xl rounded-3xl p-8 md:p-10 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-blue-900/50 text-blue-300 text-[11px] font-bold uppercase tracking-wider rounded-full border border-blue-800/50 z-20 backdrop-blur-md">Core Services</div>
              
              <Server className="mx-auto text-blue-400 mb-4 relative z-10" size={40}/>
              <h4 className="text-2xl font-extrabold text-white tracking-wide relative z-10 font-heading">Go Fiber Core Backend</h4>
              <p className="text-[15px] font-medium text-slate-400 mt-3 relative z-10">Stripe Webhooks • Auth Orchestration • Business Rules</p>
            </div>

            {/* DB Layer */}
            <div className="grid grid-cols-2 gap-8 w-full">
                <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5 relative group">
                  <div className="absolute top-0 left-1/2 md:left-6 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-green-200">Database</div>
                  <div className="p-4 bg-green-50 text-green-600 rounded-2xl"><Database size={28}/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-1">MongoDB 6.0</h4>
                    <p className="text-[13px] font-medium text-slate-500">Primary Database</p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5 relative group">
                  <div className="absolute top-0 left-1/2 md:left-6 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 px-3 py-1 bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-red-200">Cache</div>
                  <div className="p-4 bg-red-50 text-red-600 rounded-2xl"><Server size={28}/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-1">Redis 7</h4>
                    <p className="text-[13px] font-medium text-slate-500">Sessions & Caching</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </Section>
      <PageNavigation />
    </DocsLayout>
  );
}
