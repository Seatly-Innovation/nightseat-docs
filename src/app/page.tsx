"use client";

import { motion } from 'framer-motion';
import { LayoutDashboard, Smartphone, Shield, ArrowRight, Code2 } from 'lucide-react';
import ShinyText from '@/components/reactbits/ShinyText';
import BrowserMockup from '@/components/BrowserMockup';
import DocsLayout from '@/components/DocsLayout';
import GridBackground from '@/components/GridBackground';
import { Section, FeatureCard } from '@/components/DocsShared';
import PageNavigation from '@/components/PageNavigation';

export default function Home() {
  return (
    <DocsLayout>
      <GridBackground />
      {/* Hero Header */}
      <div className="mb-24 relative z-10 w-full mt-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-white border border-slate-200 text-slate-700 rounded-full text-[13px] font-bold tracking-wide shadow-sm hover:shadow-md transition-shadow">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Official Documentation v1.0
          </div>
          
          <h1 className="text-[3rem] md:text-[5rem] font-extrabold text-slate-900 tracking-tight leading-[1.05] mb-8 font-heading">
            NightSeat <br/>
            <span className="inline-block mt-2 px-2 -ml-2 rounded-xl" style={{ 
              background: "linear-gradient(to right, #2563eb, #0ea5e9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
             }}>
              Innovation Design
            </span>
          </h1>
          
          <div className="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed font-medium mb-12">
            <ShinyText text="The ultimate ecosystem for nightlife venue management." speed={3} className="text-slate-600 block mb-2 font-bold" />
            สุดยอดคู่มือโครงสร้างแพลตฟอร์ม ครบจบทั้ง User App, Admin Portal, และ Core API.
          </div>

          {/* Quick Links Header */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
            <a href="/manual-dev" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 text-lg">
              Get Started <ArrowRight size={20}/>
            </a>
            <a href="/api-reference" className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2 text-lg">
              <Code2 size={20}/> API Reference
            </a>
          </div>
        </motion.div>
      </div>

      {/* Overview Section */}
      <Section title="Project Overview" subtitle="What is NightSeat and why is it built as a monorepo?" icon={LayoutDashboard}>
        <p className="text-lg mb-10 font-medium leading-relaxed">
          <strong>NightSeat Innovation</strong> คือระดับถัดไปของแพลตฟอร์มการจัดการร้านอาหารและสถานบันเทิง ถูกสร้างแบบ Microservices-inspired (แบ่งส่วนรับผิดชอบหน้าบ้าน-หลังบ้าน) แต่อยู่ภายใน <strong>Monorepo</strong> เดียวกันเพื่อให้ Deploy พร้อมกันจากจุดเดียว
        </p>
        
        <BrowserMockup title="Admin Portal Dashboard" url="seatly-admin.nightseat.app">
          <div className="h-64 sm:h-80 w-full relative flex items-center justify-center border-t border-slate-200" style={{
            backgroundImage: 'linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}>
             
             <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent"></div>
             
             <motion.div 
               initial={{ y: 20, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.2, duration: 0.6 }}
               className="relative z-10 bg-white p-5 rounded-2xl shadow-xl border border-slate-200 w-3/4 max-w-sm"
             >
               <div className="flex items-center justify-between mb-4">
                 <div className="h-4 w-24 bg-slate-200 rounded-md"></div>
                 <div className="h-6 w-16 bg-blue-100 text-blue-600 rounded-md text-[10px] flex items-center justify-center font-bold">LIVE</div>
               </div>
               {[1,2,3].map(i => (
                 <div key={i} className="flex gap-3 mb-3 items-center">
                   <div className="w-8 h-8 rounded-full bg-slate-100 flex-shrink-0"></div>
                   <div className="flex-1 h-3 bg-slate-100 rounded-full"></div>
                 </div>
               ))}
             </motion.div>
          </div>
        </BrowserMockup>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <FeatureCard 
            icon={Smartphone} 
            title="Customer Experience" 
            desc="แอพพลิเคชันฝั่งลูกค้า (Next.js 16) เน้นระบบ SEO-friendly สำหรับค้นหาร้าน การจองโต๊ะด้วย Interactive Floor Plan วางเงินมัดจำผ่าน Stripe และรับ QR Ticket ไว้เช็คอินหน้าประตูร้าน"
            delay={0}
          />
          <FeatureCard 
            icon={Shield} 
            title="Management Portal" 
            desc="ระบบหลังบ้าน (Next.js 16) สำหรับเจ้าของร้าน จัดการการขาย คิวโต๊ะ สร้างผังร้านใหม่แบบลากวาง (Drag & Drop) และจัดการ Staff Role ภายในสาขาของตัวเองได้อย่างอิสระ"
            delay={0.15}
          />
        </div>
      </Section>
      
      <PageNavigation />
    </DocsLayout>
  );
}
