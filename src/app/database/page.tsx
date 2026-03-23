"use client";

import DocsLayout from '@/components/DocsLayout';
import { Section } from '@/components/DocsShared';
import PageNavigation from '@/components/PageNavigation';
import SpotlightCard from '@/components/reactbits/SpotlightCard';
import { Database } from 'lucide-react';

export default function DatabaseSchema() {
  return (
    <DocsLayout>
      <Section title="Database Schema" subtitle="MongoDB relational architecture." icon={Database}>
         <SpotlightCard className="bg-[#0a0f1d] border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden text-white mt-8 shadow-2xl" spotlightColor="rgba(255, 255, 255, 0.05)">
            <div className="absolute -top-10 -right-10 p-8 opacity-[0.03] rotate-12"><Database size={400}/></div>
            <p className="text-slate-400 relative z-10 md:w-3/4 text-[16px] leading-relaxed mb-10 font-medium">
              MongoDB ถูกใช้งานร่วมกับ <code className="bg-slate-800 px-2 py-1 rounded border border-slate-700 text-sky-400">primitive.ObjectID</code> ในการเชื่อมโยงความสัมพันธ์ของ Document เสมือน Foreign Keys ใน RDBMS
            </p>
            
            <div className="grid sm:grid-cols-2 gap-5 relative z-10">
              {['User Profile (Roles & Setup)', 'Venue (Store Details)', 'Booking Transaction', 'Zone & Table Physical Layer', 'Stripe Subscriptions SaaS'].map((i, index) =>(
                <div className="flex flex-col mb-2">
                  <div key={index} className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/30">
                      <Database size={20} strokeWidth={2.5} />
                    </div>
                    <span className="text-[15px] font-bold tracking-wide">{i}</span>
                  </div>
                </div>
              ))}
            </div>
         </SpotlightCard>
      </Section>
      <PageNavigation />
    </DocsLayout>
  );
}
