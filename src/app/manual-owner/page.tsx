"use client";

import DocsLayout from '@/components/DocsLayout';
import { Section, FeatureCard } from '@/components/DocsShared';
import PageNavigation from '@/components/PageNavigation';
import SpotlightCard from '@/components/reactbits/SpotlightCard';
import { Briefcase, Layers, Users, LayoutDashboard } from 'lucide-react';

export default function ManualOwner() {
  return (
    <DocsLayout>
      <Section title="Venue Owner Guide" subtitle="คู่มือสำหรับเจ้าของกิจการ (Owner)" icon={Briefcase}>
        <SpotlightCard className="p-8 rounded-3xl lg:col-span-2 bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-100 mb-8 mt-8" spotlightColor="rgba(255, 255, 255, 0.4)">
           <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-indigo-100 text-indigo-600 shadow-sm">
             <Layers size={24} />
           </div>
           <h3 className="text-xl font-bold font-heading text-slate-900 mb-3">การสร้างและแก้ไขผังร้าน (Drag-and-Drop Floor Plan)</h3>
           <p className="text-slate-600 text-[15px] font-medium leading-relaxed max-w-xl mb-5">เจ้าของสามารถใช้คอมพิวเตอร์ลากวัตถุ (โต๊ะกลม, โต๊ะเหลี่ยม, โซฟา, บาร์, เวที) มาจัดวางบน Grid ให้ภาพเหมือนร้านจริง และกำหนดราคาขั้นต่ำให้โซนต่างๆ ได้ด้วยตัวเอง หากมีการปรับเปลี่ยนผังร้าน สามารถกดเซฟและให้ผลลัพธ์ปรากฏในสมาร์ทโฟนของลูกค้าได้ทันที</p>
           <div className="inline-flex px-3 py-1 bg-white border border-indigo-200 rounded-lg text-xs font-bold text-indigo-600 uppercase tracking-widest">Floor Plan Editor Mode</div>
        </SpotlightCard>

        <div className="grid md:grid-cols-2 gap-8">
          <FeatureCard 
            icon={Users} 
            title="Staff Management" 
            desc="เจ้าของร้านมีสิทธิ์ในการเพิ่มบัญชีพนักงาน (Staff) หรือลดระดับบัญชี เพื่อกำหนดว่าใครสามารถสแกนตั๋วได้ ใครสามารถดูยอดขายได้ ทำให้การควบคุมสิทธิ์ภายในร้านเป็นไปอย่างปลอดภัย"
            delay={0}
          />
          <FeatureCard 
            icon={LayoutDashboard} 
            title="Stripe Subscription Setup" 
            desc="การสมัครแพ็คเกจใช้งาน SaaS เพื่อปลดล็อกลิมิตร้านตัวเอง เจ้าของต้องเข้าไปจ่ายค่า Subscription ของแพลตฟอร์มรายเดือนหรือรายปี ซึ่งทั้งหมดนี้ควบคุมผ่านบัญชี Owner คนเดียว"
            delay={0.1}
          />
        </div>
      </Section>
      <PageNavigation />
    </DocsLayout>
  );
}
