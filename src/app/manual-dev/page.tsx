"use client";

import DocsLayout from '@/components/DocsLayout';
import { Section, CodeBlock } from '@/components/DocsShared';
import PageNavigation from '@/components/PageNavigation';
import SpotlightCard from '@/components/reactbits/SpotlightCard';
import { Terminal } from 'lucide-react';

export default function ManualDev() {
  return (
    <DocsLayout>
      <Section title="Developer Guide" subtitle="คู่มือสำหรับนักพัฒนาในการขึ้นระบบและต่อยอดโปรเจค" icon={Terminal}>
        
        <SpotlightCard className="p-8 md:p-10 rounded-3xl mb-8" spotlightColor="rgba(16, 185, 129, 0.05)">
          <h3 className="font-bold text-slate-900 text-xl mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">1</span> 
            Clone & Initialize Ecosystem
          </h3>
          <p className="text-slate-600 mb-6 font-medium text-[16px]">
            เรามี Shell Script อัตโนมัติ (<code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono">run-local.sh</code>) ที่จะตรวจสอบ Dependencies บนเครื่องของคุณ สร้างไฟล์ <code>.env</code> ของทั้ง 3 โปรเจคแยกกันให้ และสั่ง <code>docker-compose up -d</code> ทันที
          </p>
          <CodeBlock 
            title="Terminal - Execute Setup Script"
            code="git clone https://github.com/Seatly-Innovation/Nightseat-Innovation.git\ncd Nightseat-Innovation\nchmod +x run-local.sh\n./run-local.sh" 
          />
        </SpotlightCard>

        <SpotlightCard className="p-8 md:p-10 rounded-3xl" spotlightColor="rgba(37, 99, 235, 0.05)">
          <h3 className="font-bold text-slate-900 text-xl mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">2</span> 
            Access Local Portals
          </h3>
          <p className="text-slate-600 mb-8 font-medium text-[16px]">หลังสคริปต์รันสำเร็จ Dev สามารถเข้าถึง Port ต่างๆ ได้ทันที แนะนำให้อ่าน API Reference เพื่อทำความเข้าใจ Route</p>
          
          <div className="grid sm:grid-cols-3 gap-5">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">USER APP</div>
              <div className="font-mono text-blue-600 font-bold text-[15px]">localhost:3001</div>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">ADMIN APP</div>
              <div className="font-mono text-emerald-600 font-bold text-[15px]">localhost:3000</div>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">CORE API</div>
              <div className="font-mono text-indigo-600 font-bold text-[15px]">localhost:8080/api</div>
            </div>
          </div>
        </SpotlightCard>
      </Section>
      <PageNavigation />
    </DocsLayout>
  );
}
