"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Search, Copy, Check, ChevronRight,
  Smartphone, Shield, Cpu, Database, Server,
  Users, Layers, ArrowRight, Code2, FileText,
  Key, LayoutDashboard, Calendar, Terminal, Briefcase, UserCircle, CreditCard, Rocket
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import SpotlightCard from '@/components/reactbits/SpotlightCard';
import ShinyText from '@/components/reactbits/ShinyText';
import FaqAccordion from '@/components/FaqAccordion';
import BrowserMockup from '@/components/BrowserMockup';
import InteractiveRoadmap from '@/components/InteractiveRoadmap';
import ScrollProgress from '@/components/ScrollProgress';
import TechBentoGrid from '@/components/TechBentoGrid';
import TerminalCodeBlock from '@/components/TerminalCodeBlock';

// --- MAIN CONFIGURATION ---
const navGroups = [
  {
    title: "Getting Started",
    items: [
      { id: 'overview', label: 'Project Overview' },
    ]
  },
  {
    title: "Role-Based Manuals",
    items: [
      { id: 'manual-dev', label: 'Developer Guide' },
      { id: 'manual-user', label: 'Customer (User) Guide' },
      { id: 'manual-admin', label: 'Staff (Admin) Guide' },
      { id: 'manual-owner', label: 'Venue Owner Guide' },
    ]
  },
  {
    title: "Core Architecture",
    items: [
      { id: 'architecture', label: 'System Design' },
      { id: 'tech-stack', label: 'Technology Stack' },
      { id: 'database', label: 'Database Schema' },
    ]
  },
  {
    title: "Capabilities",
    items: [
      { id: 'features', label: 'Platform Features' },
    ]
  },
  {
    title: "Developers",
    items: [
      { id: 'api-reference', label: 'API Reference' },
    ]
  },
  {
    title: "Roadmap & FAQ",
    items: [
      { id: 'roadmap', label: 'Ecosystem Roadmap' },
      { id: 'faq', label: 'Frequently Asked Questions' },
    ]
  }
];

const allNavItems = navGroups.flatMap(g => g.items);

// --- REUSABLE COMPONENTS ---

const CodeBlock = ({ code, language = 'bash', title = '' }: { code: string, language?: string, title?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden bg-[#0A0C10] border border-slate-800 shadow-xl shadow-slate-900/10 group relative">
      {title && (
        <div className="flex items-center px-5 py-3 bg-[#111319] border-b border-slate-800">
          <FileText size={14} className="text-slate-400 mr-2" />
          <span className="text-xs font-semibold text-slate-300 font-mono tracking-wide">{title}</span>
        </div>
      )}
      {!title && (
        <div className="absolute top-0 right-0 p-3 z-10 flex items-center justify-end">
          <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest mr-2">{language}</span>
        </div>
      )}
      <button 
        onClick={handleCopy}
        className={`absolute top-3 right-3 p-2 rounded-lg transition-all z-20 backdrop-blur-sm ${copied ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800/40 text-slate-400 hover:text-white hover:bg-slate-700/80 border border-transparent hover:border-slate-600'}`}
        aria-label="Copy code"
        title="Copy to clipboard"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <div className="p-5 sm:p-6 overflow-x-auto text-[14px] font-mono text-slate-300 leading-relaxed custom-scrollbar">
        <pre><code>{code}</code></pre>
      </div>
    </div>
  );
};

const Section = ({ id, title, subtitle, children, icon: Icon }: { id: string, title: string, subtitle?: string, children: React.ReactNode, icon?: any }) => {
  return (
    <motion.section 
      id={id} 
      className="mb-28 scroll-mt-32 relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="flex items-center gap-4 mb-3">
        {Icon && (
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 shadow-sm">
            <Icon size={26} strokeWidth={2.5} />
          </div>
        )}
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h2>
      </div>
      {subtitle && <p className="text-lg text-slate-500 mt-3 mb-10 font-medium">{subtitle}</p>}
      {!subtitle && <div className="h-px bg-slate-200 w-full my-8"></div>}
      
      <div className="text-slate-600 leading-relaxed prose prose-slate max-w-none prose-headings:font-outfit prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-code:text-indigo-600">
        {children}
      </div>
    </motion.section>
  );
};

const FeatureCard = ({ title, desc, icon: Icon, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <SpotlightCard className="h-full bg-white p-8 rounded-3xl" spotlightColor="rgba(37, 99, 235, 0.06)">
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 shadow-sm w-max mb-6">
        <Icon size={28} strokeWidth={2} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 text-[15px] leading-relaxed font-medium">{desc}</p>
    </SpotlightCard>
  </motion.div>
);

// --- MAIN PAGE ---

export default function EnhancedManual() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('backend');

  // Intelligent Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = allNavItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          if (activeSection !== el.id) setActiveSection(el.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const filteredNavGroups = navGroups.map(group => ({
    ...group,
    items: group.items.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
  })).filter(group => group.items.length > 0);

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      <ScrollProgress />
      
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-lg border-b border-slate-200 z-50 flex items-center justify-between px-5">
         <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-blue-200">N</div>
            <span className="font-bold text-slate-900 font-heading">NightSeat Docs</span>
         </div>
         <button 
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-600 focus:outline-none bg-slate-50 rounded-xl border border-slate-200"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <motion.aside 
        className={`fixed lg:sticky top-0 h-screen w-[280px] bg-white border-r border-slate-200 flex flex-col z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="p-6 pt-8 lg:pt-8">
          <div className="flex items-center gap-4 mb-8 hidden lg:flex">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 shadow-md shadow-blue-600/20 flex items-center justify-center text-white font-bold text-2xl font-heading">
              N
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-tight font-heading">NightSeat</h1>
              <div className="text-[11px] font-bold text-slate-500 tracking-widest uppercase mt-0.5">Ecosystem</div>
            </div>
          </div>
          
          <div className="relative mb-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search guides..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all shadow-sm placeholder:text-slate-400"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 pb-8 custom-scrollbar">
          {filteredNavGroups.map((group, idx) => (
            <div key={idx} className="mb-8">
              <h4 className="px-2 mb-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                {group.title}
              </h4>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <a 
                        href={`#${item.id}`}
                        onClick={() => setSidebarOpen(false)}
                        className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] transition-all duration-200
                          ${isActive 
                            ? 'bg-blue-50/80 text-blue-700 font-bold shadow-sm border border-blue-100/50' 
                            : 'text-slate-600 font-semibold hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                          }`}
                      >
                        {item.label}
                        {isActive && <ChevronRight size={14} className="text-blue-600" />}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-5 border-t border-slate-100 bg-white">
          <a 
            href="https://github.com/Seatly-Innovation/Nightseat-Innovation" 
            target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-slate-900/10 hover:shadow-lg hover:shadow-slate-900/20"
          >
            <FaGithub size={16} />
            View on GitHub
          </a>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[960px] px-6 py-28 lg:px-20 lg:py-32 w-full relative">
        
        {/* Background Decorative Gradient */}
        <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-blue-50/50 via-white to-transparent -z-10 pointer-events-none"></div>

        {/* Hero Header */}
        <div className="mb-32 relative z-10 w-full">
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
            
            <div className="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed font-medium">
              <ShinyText text="The ultimate ecosystem for nightlife venue management." speed={3} className="text-slate-600 block mb-2 font-bold" />
              สุดยอดคู่มือโครงสร้างแพลตฟอร์ม ครบจบทั้ง User App, Admin Portal, และ Core API.
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-12 w-full max-w-lg">
              <a href="#installation" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 text-lg">
                Get Started <ArrowRight size={20}/>
              </a>
              <a href="#api-reference" className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2 text-lg">
                <Code2 size={20}/> API Reference
              </a>
            </div>
          </motion.div>
        </div>

        {/* 1. Project Overview */}
        <Section id="overview" title="Project Overview" subtitle="What is NightSeat and why is it built as a monorepo?" icon={LayoutDashboard}>
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
               
               {/* Floating UI Elements inside Browser Mockup */}
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

        {/* ROLE BASED MANUALS */}
        <Section id="manual-dev" title="Developer Guide" subtitle="คู่มือสำหรับนักพัฒนาในการขึ้นระบบและต่อยอดโปรเจค" icon={Terminal}>
          
          <SpotlightCard className="p-8 md:p-10 rounded-3xl mb-8" spotlightColor="rgba(16, 185, 129, 0.05)">
            <h3 className="font-bold text-slate-900 text-xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">1</span> 
              Clone & Initialize Ecosystem
            </h3>
            <p className="text-slate-600 mb-6 font-medium text-[16px]">
              เรามี Shell Script อัตโนมัติ (<code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono">run-local.sh</code>) ที่จะตรวจสอบ Dependencies บนเครื่องของคุณ สร้างไฟล์ `.env` ของทั้ง 3 โปรเจคแยกกันให้ และสั่ง `docker-compose up -d` ทันที
            </p>
            <CodeBlock 
              title="Terminal - Execute Setup Script"
              code="git clone https://github.com/Seatly-Innovation/Nightseat-Innovation.git&#10;cd Nightseat-Innovation&#10;chmod +x run-local.sh&#10;./run-local.sh" 
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

        <Section id="manual-user" title="Customer (User) Guide" subtitle="คู่มือสำหรับลูกค้าที่มาเที่ยวสถานบันเทิง" icon={UserCircle}>
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard 
              icon={Smartphone} 
              title="วิธีจองโต๊ะและจ่ายมัดจำ" 
              desc="ลูกค้าสามารถเลือกร้าน เลื่อนดูแผนผังร้านแบบ 2D (Floor Plan) และจิ้มเลือกโซนโต๊ะที่ต้องการ จากนั้นกดยืนยันเพื่อเข้าสู่หน้าชำระเงินมัดจำผ่านระบบ Stripe เมื่อจ่ายสำเร็จจะได้ Ticket ไว้สแกนหน้าประตูทันที"
              delay={0}
            />
            <FeatureCard 
              icon={Users} 
              title="การโชว์ตั๋วหน้างาน" 
              desc="ไปที่เมนู 'My Bookings' ในแอพ จะมี Digital QR Code ปรากฏขึ้น ลูกค้านำ QR Code นี้ไปให้พนักงานหน้าร้านสแกนเพื่อยืนยันว่าจ่ายเงินมัดจำแล้ว และสามารถเดินเข้าโต๊ะได้เลย"
              delay={0.1}
            />
          </div>
        </Section>

        <Section id="manual-admin" title="Staff (Admin) Guide" subtitle="คู่มือสำหรับพนักงานและผู้จัดการร้านสาขา" icon={Shield}>
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard 
              icon={Calendar} 
              title="Live Booking Queue" 
              desc="ผู้จัดการร้านสามารถดูคิวการจองโต๊ะทั้งหมดในค่ำคืนนี้ได้แบบ Real-time สถานะจะถูกแบ่งชัดเจน (Pending/Confirmed/Seated/Cancelled) ทำให้หน้ากล่องจองไม่มีความสับสน"
              delay={0}
            />
            <FeatureCard 
              icon={Smartphone} 
              title="สแกนตั๋ว QR Code ลูกค้า" 
              desc="พนักงานหน้าประตูสามารถใช้มือถือล็อกอินเข้า Admin Portal และหมวด 'Scanner' แอพจะขอเปิดกล้องเพื่อสแกนตั๋วลูกค้าและกดยืนยันการเข้างาน สถานะโต๊ะจะเปลี่ยนเป็น Seated ทันที"
              delay={0.1}
            />
          </div>
        </Section>

        <Section id="manual-owner" title="Venue Owner Guide" subtitle="คู่มือสำหรับเจ้าของกิจการ (Owner)" icon={Briefcase}>
          <SpotlightCard className="p-8 rounded-3xl lg:col-span-2 bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-100 mb-8" spotlightColor="rgba(255, 255, 255, 0.4)">
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

        {/* 3. System Architecture */}
        <Section id="architecture" title="System Architecture" subtitle="How components communicate within the NightSeat Platform." icon={Cpu}>
          
          <div className="relative w-full rounded-3xl border border-slate-200 bg-white p-6 md:p-12 shadow-sm overflow-hidden flex flex-col items-center">
            
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

        {/* 4. Tech Stack Layers */}
        <Section id="tech-stack" title="Technology Stack" subtitle="Modern, type-safe tools maximizing developer experience and application speed." icon={Code2}>
          <div className="mt-8">
            <TechBentoGrid />
          </div>
        </Section>


        {/* 5. Features Depth */}
        <Section id="features" title="Enterprise Features" subtitle="Deep dive into the core features powering the NightSeat platform." icon={LayoutDashboard}>
           <div className="grid lg:grid-cols-3 gap-6">
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

        {/* 6. API Reference */}
        <Section id="api-reference" title="Unified API Interfaces" subtitle="RESTful endpoints mapped via JWT role claims." icon={Server}>
           <p className="text-[16px] text-slate-600 mb-8 font-medium leading-relaxed">
             NightSeat handles authentication identically across all platforms via standard `Bearer` tokens. Let's create a booking payload:
           </p>
           
           <div className="mt-8">
             <TerminalCodeBlock />
           </div>
        </Section>
        
        {/* 7. Database  */}
        <Section id="database" title="Database Schema" subtitle="MongoDB relational architecture." icon={Database}>
           <SpotlightCard className="bg-[#0a0f1d] border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden text-white mt-8 shadow-2xl" spotlightColor="rgba(255, 255, 255, 0.05)">
              <div className="absolute -top-10 -right-10 p-8 opacity-[0.03] rotate-12"><Database size={400}/></div>
              <p className="text-slate-400 relative z-10 md:w-3/4 text-[16px] leading-relaxed mb-10 font-medium">
                MongoDB ถูกใช้งานร่วมกับ <code className="bg-slate-800 px-2 py-1 rounded border border-slate-700 text-sky-400">primitive.ObjectID</code> ในการเชื่อมโยงความสัมพันธ์ของ Document เสมือน Foreign Keys ใน RDBMS
              </p>
              
              <div className="grid sm:grid-cols-2 gap-5 relative z-10">
                {['User Profile (Roles & Setup)', 'Venue (Store Details)', 'Booking Transaction', 'Zone & Table Physical Layer', 'Stripe Subscriptions SaaS'].map((i, index) =>(
                  <div key={index} className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/30">
                      <Database size={20} strokeWidth={2.5} />
                    </div>
                    <span className="text-[15px] font-bold tracking-wide">{i}</span>
                  </div>
                ))}
              </div>
           </SpotlightCard>
        </Section>

        {/* 8. Roadmap */}
        <Section id="roadmap" title="Ecosystem Roadmap" subtitle="The future of NightSeat Innovation capabilities and releases." icon={Rocket}>
          <div className="max-w-3xl pr-4">
            <InteractiveRoadmap />
          </div>
        </Section>

        {/* 9. FAQ */}
        <Section id="faq" title="Frequently Asked Questions" subtitle="Common architectural and feature questions." icon={FileText}>
          <div className="mt-8">
            <FaqAccordion />
          </div>
        </Section>

      </main>
    </div>
  );
}
