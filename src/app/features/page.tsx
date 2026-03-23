"use client";

import DocsLayout from '@/components/DocsLayout';
import { Section } from '@/components/DocsShared';
import PageNavigation from '@/components/PageNavigation';
import SpotlightCard from '@/components/reactbits/SpotlightCard';
import { LayoutDashboard, CreditCard, Layers } from 'lucide-react';

export default function Features() {
  return (
    <DocsLayout>
      <Section title="Enterprise Features" subtitle="Deep dive into the core features powering the NightSeat platform." icon={LayoutDashboard}>
         <div className="grid lg:grid-cols-3 gap-6 mt-8">
           <SpotlightCard className="p-8 rounded-3xl bg-slate-900 border-slate-800 text-white" spotlightColor="rgba(255, 255, 255, 0.05)">
             <div className="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-slate-700 text-sky-400">
               <CreditCard size={24} />
             </div>
             <h3 className="text-xl font-bold font-heading mb-3">Stripe Split Payments</h3>
             <p className="text-slate-400 text-[15px] font-medium leading-relaxed">ระบบจองโต๊ะสามารถรับเงินมัดจำล่วงหน้า และเชื่อม Webhook อัตโนมัติจาก Stripe กลับมาอัปเดตสถานะที่ Backend</p>
           </SpotlightCard>
           <SpotlightCard className="p-8 rounded-3xl lg:col-span-2 bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-100" spotlightColor="rgba(255, 255, 255, 0.4)">
             <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-indigo-100 text-indigo-600 shadow-sm">
               <Layers size={24} />
             </div>
             <h3 className="text-xl font-bold font-heading text-slate-900 mb-3">Interactive Drag-and-Drop Floor Plan</h3>
             <p className="text-slate-600 text-[15px] font-medium leading-relaxed max-w-lg mb-4">ระบบ Admin Portal อนุญาตให้เจ้าของร้านสร้างแปลนร้าน (Floor Plan) ของตัวเองโดยการลากวัตถุโต๊ะ วางบน Grid 2D และเชื่อม Mapping Table ID เข้ากับ Zone ราคาขั้นต่ำ (Min-spend) ได้อย่างอิสระผ่าน React-DnD</p>
             <div className="inline-flex px-3 py-1 bg-white border border-indigo-200 rounded-lg text-xs font-bold text-indigo-600 uppercase tracking-widest">Powered by React DnD Engine</div>
           </SpotlightCard>
         </div>
      </Section>
      <PageNavigation />
    </DocsLayout>
  );
}
