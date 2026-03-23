"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, FiX, FiSearch, FiGithub, FiCopy, FiCheck,
  FiSmartphone, FiShield, FiCpu, FiDatabase, FiServer,
  FiUsers, FiLayers 
} from 'react-icons/fi';

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'features', label: 'Features' },
  { id: 'api-reference', label: 'API Reference' },
  { id: 'database', label: 'Database Schema' },
  { id: 'roles', label: 'Roles & Permissions' },
  { id: 'installation', label: 'Installation' },
];

function CodeBlock({ code, language = 'bash' }: { code: string, language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow-md group">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <span className="text-xs font-mono text-slate-400">{language}</span>
        <button 
          onClick={handleCopy}
          className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition"
          aria-label="Copy code"
        >
          {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed">
        <pre><code>{code}</code></pre>
      </div>
    </div>
  );
}

function Section({ id, title, children }: { id: string, title: string, children: React.ReactNode }) {
  return (
    <motion.section 
      id={id} 
      className="mb-16 scroll-mt-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-slate-800 border-b border-slate-200 pb-3 mb-6 relative">
        {title}
        <div className="absolute bottom-0 left-0 w-16 h-1 bg-sky-500 rounded-full"></div>
      </h2>
      <div className="text-slate-600 leading-relaxed">
        {children}
      </div>
    </motion.section>
  );
}

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(el.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen">
      
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 right-4 z-[60] p-2 bg-white rounded-md shadow-md border border-slate-200 text-slate-600 focus:outline-none"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <motion.aside 
        className={`fixed lg:sticky top-0 h-screen w-72 bg-white border-r border-slate-200 flex flex-col z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-md flex items-center justify-center text-white font-bold text-xl">
              N
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">NightSeat</h1>
              <span className="px-2 py-0.5 mt-1 bg-sky-100 text-sky-700 rounded-full text-xs font-semibold inline-block">Docs 1.0</span>
            </div>
          </div>
          
          <div className="relative mb-6">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Quick search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-sans"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-6 scrollbar-thin">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`}
                  onClick={() => setSidebarOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id 
                      ? 'bg-sky-50 text-sky-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <a 
            href="https://github.com/Seatly-Innovation" 
            target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <FiGithub size={18} />
            GitHub Repository
          </a>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 lg:px-16 lg:py-20 w-full overflow-x-hidden">
        
        {/* Hero */}
        <div className="mb-20 pt-8 lg:pt-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 mb-6 bg-blue-50 border border-blue-100 text-blue-600 rounded-full text-sm font-semibold tracking-wide">
              Official Documentation
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              NightSeat <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text' }}>
                Innovation Platform
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
              ระบบนิเวศน์ที่สมบูรณ์แบบสำหรับการจัดการร้านอาหาร สถานบันเทิง และการจองโต๊ะของยุคต่อไป ครบจบในโซลูชันเดียว.
            </p>
          </motion.div>
        </div>

        {/* 1. Overview */}
        <Section id="overview" title="1. Project Overview">
          <p className="mb-8 text-lg">
            <strong>NightSeat Innovation</strong> คือ Monorepo ที่ประกอบด้วยระบบนิเวศการทำงานอย่างครบวงจรของการจัดการสถานบันเทิงยามค่ำคืน แบ่งการทำงานออกเป็น 3 ส่วนหลักเพื่อให้การสเกลและประสิทธิภาพเป็นไปอย่างสมบูรณ์:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <FiSmartphone />, title: 'User App', desc: 'ระบบสำหรับลูกค้าทั่วไป ค้นหาร้าน จองโต๊ะ จ่ายเงิน เลือกระบุโซนโต๊ะ และระบบ QR Check-in หน้าประตู', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
              { icon: <FiShield />, title: 'Admin Portal', desc: 'ระบบหลังบ้านที่ทรงพลัง สำหรับเจ้าของร้าน, ผู้จัดการ, พนักงานสแกน QR และ Super Admin', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
              { icon: <FiCpu />, title: 'Core API', desc: 'ระบบหลังบ้านพัฒนาด้วย Go จัดการข้อมูล ความปลอดภัย ระบบรับชำระเงิน และ Orchestration ประสิทธิภาพสูง', color: 'bg-sky-50 text-sky-600 border-sky-100' }
            ].map((card, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-start gap-4"
              >
                <div className={`p-3 rounded-xl border ${card.color}`}>
                  {React.cloneElement(card.icon as React.ReactElement<any>, { size: 24, strokeWidth: 2 })}
                </div>
                <h3 className="text-xl font-bold text-slate-800">{card.title}</h3>
                <p className="text-slate-600 text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* 2. Architecture */}
        <Section id="architecture" title="2. System Architecture">
          <p className="mb-6">
            สถาปัตยกรรมของโปรเจคถูกออกแบบบนหลักการ Microservices-oriented (รันแบบแยก container) รองรับ Concurrent Users จำนวนมากในเวลาที่จองโต๊ะพร้อมๆ กัน
          </p>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/90"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex-1 w-full space-y-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center font-semibold text-slate-700 shadow-sm">Client Browsers / Mobile Views</div>
                  <div className="flex justify-center text-slate-400 py-1">↓</div>
                  <div className="flex gap-4">
                    <div className="flex-1 p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-center font-semibold text-indigo-700 shadow-sm">Next.js User App (3001)</div>
                    <div className="flex-1 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center font-semibold text-emerald-700 shadow-sm">Next.js Admin (3000)</div>
                  </div>
                  <div className="flex justify-center text-slate-400 py-1">↓ NextAuth & Internal APIs ↓</div>
                  <div className="p-4 bg-sky-50 border border-sky-200 rounded-lg text-center font-bold text-sky-700 shadow-sm shadow-sky-100">
                    Go Fiber Core API Backend (8080)
                  </div>
                  <div className="flex justify-center text-slate-400 py-1">↓</div>
                  <div className="flex gap-4">
                    <div className="flex-1 p-4 bg-green-50 border border-green-200 rounded-lg text-center font-semibold text-green-700 shadow-sm flex items-center justify-center gap-2"><FiDatabase/> MongoDB</div>
                    <div className="flex-1 p-4 bg-red-50 border border-red-200 rounded-lg text-center font-semibold text-red-700 shadow-sm flex items-center justify-center gap-2"><FiServer/> Redis Cache</div>
                  </div>
               </div>
            </div>
          </div>
        </Section>

        {/* 3. Tech Stack */}
        <Section id="tech-stack" title="3. Technology Stack">
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-800 flex items-center gap-2"><FiServer className="text-sky-500"/> Backend API & Infra</h3>
              </div>
              <ul className="divide-y divide-slate-100">
                {['Go 1.24 (Fiber v2 web framework)', 'MongoDB 6.0 & Official Go Driver 1.17', 'Redis 7.0 (Caching)', 'Docker & Docker Compose', 'JWT (golang-jwt/v5) & Stripe SDK'].map((item, i) => (
                  <li key={i} className="px-6 py-3 flex items-center gap-3 text-slate-600 text-sm">
                    <FiCheck className="text-emerald-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-800 flex items-center gap-2"><FiLayers className="text-indigo-500"/> Frontends</h3>
              </div>
              <ul className="divide-y divide-slate-100">
                {['Next.js 16 (Canary App Router)', 'React 19 & Tailwind CSS 4', 'NextAuth.js (Custom Credential & API sync)', 'i18next (TH / EN / ZH localization)', 'react-dnd (Floor Plan), HTML5-QRCode'].map((item, i) => (
                  <li key={i} className="px-6 py-3 flex items-center gap-3 text-slate-600 text-sm">
                    <FiCheck className="text-emerald-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* 4. Features */}
        <Section id="features" title="4. Core Features">
           <div className="grid md:grid-cols-2 gap-8">
             <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><FiUsers className="text-indigo-500"/> User Experience</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-200 transition">
                    <h4 className="font-bold text-slate-800 text-sm mb-1">Interactive Booking & Floor Plan</h4>
                    <p className="text-sm text-slate-500">จำลองผังร้านและเลือกโต๊ะที่ต้องการจองได้โดยตรง รองรับระบบโซนราคาขั้นต่ำ (Min-spend)</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-200 transition">
                    <h4 className="font-bold text-slate-800 text-sm mb-1">Stripe Payments & Deposits</h4>
                    <p className="text-sm text-slate-500">วางเงินมัดจำค่าโต๊ะผ่านบัตรเครดิตที่ปลอดภัย พร้อม Webhook รับการยืนยันสถานะเรียลไทม์</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-200 transition">
                    <h4 className="font-bold text-slate-800 text-sm mb-1">Digital Ticket (QR Code)</h4>
                    <p className="text-sm text-slate-500">หลังการจองสำเร็จ ลูกค้าจะได้ QR Code เพื่อนำไปสแกนที่หน้าประตูร้านในคืนนั้น</p>
                  </div>
                </div>
             </div>
             
             <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><FiShield className="text-emerald-500"/> Management Portal</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-200 transition">
                    <h4 className="font-bold text-slate-800 text-sm mb-1">Drag-and-Drop Floor Editor</h4>
                    <p className="text-sm text-slate-500">เจ้าของร้านสามารถลากวางโต๊ะจัดผังร้านตัวเองได้อย่างอิสระผ่านระบบ React DnD</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-200 transition">
                    <h4 className="font-bold text-slate-800 text-sm mb-1">Role-based Staff Access</h4>
                    <p className="text-sm text-slate-500">ระบบเชิญพนักงาน จัดการสิทธิ์แยกตามสาขา ไม่ก้าวก่ายข้อมูลสาขาอื่น</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-200 transition">
                    <h4 className="font-bold text-slate-800 text-sm mb-1">SaaS Subscription Plans</h4>
                    <p className="text-sm text-slate-500">เจ้าของร้านจ่ายรายเดือนซื้อแพ็คเกจ Software บนแพลตฟอร์มเพิ่มโควต้าของสาขาและการโปรโมท</p>
                  </div>
                </div>
             </div>
           </div>
        </Section>

        {/* 5. API Reference */}
        <Section id="api-reference" title="5. API Reference">
          <p className="mb-6">Endpoint พื้นฐานทั้งหมดถูกประมวลผลผ่าน Route <code>/api/v1</code> และมีการตรวจสอบ Authorization Header (JWT Bearer Token) ตามสิทธิ์ของ Role</p>
          
          <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Method</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Endpoint <code>/api/v1</code></th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Access Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded font-mono text-xs font-bold border border-emerald-200">GET</span></td>
                  <td className="px-6 py-4 font-mono text-slate-600">/venues, /events, /promotions</td>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium border border-slate-200">Public</span></td>
                </tr>
                <tr>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 bg-sky-100 text-sky-800 rounded font-mono text-xs font-bold border border-sky-200">POST</span></td>
                  <td className="px-6 py-4 font-mono text-slate-600">/bookings</td>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium border border-blue-200">User</span></td>
                </tr>
                <tr>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded font-mono text-xs font-bold border border-emerald-200">GET</span></td>
                  <td className="px-6 py-4 font-mono text-slate-600">/admin/bookings</td>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium border border-indigo-200">Staff / Manager</span></td>
                </tr>
                <tr>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 bg-sky-100 text-sky-800 rounded font-mono text-xs font-bold border border-sky-200">POST</span></td>
                  <td className="px-6 py-4 font-mono text-slate-600">/owner/venues</td>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium border border-amber-200">Owner / Admin</span></td>
                </tr>
                <tr>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 bg-sky-100 text-sky-800 rounded font-mono text-xs font-bold border border-sky-200">POST</span></td>
                  <td className="px-6 py-4 font-mono text-slate-600">/webhooks/stripe</td>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium border border-slate-200">Public (Webhook)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* 6. Database  */}
        <Section id="database" title="6. Database Architecture">
           <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 p-8 opacity-10"><FiDatabase size={200}/></div>
              <p className="text-slate-300 relative z-10 sm:w-3/4 leading-relaxed mb-6">
                สถาปัตยกรรม MongoDB ของแพลตฟอร์มนี้แบ่ง Collection ไว้ 11 ตัว โดยอ้างอิงความสัมพันธ์ (References) ผ่าน <code>primitive.ObjectID</code>
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                {['User Collection (Profiles, Role, Prefs)', 'Venue Collection (Full business metadata)', 'Booking Collection (Tickets, Tables, Time, Stripe ID)', 'Zone & Table Collection (Physical layout nodes)', 'Subscription Collection (Owner SaaS limits)'].map((i, index) =>(
                  <div key={index} className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-lg border border-slate-700/50">
                    <FiCheck className="text-sky-400" />
                    <span className="text-sm font-medium">{i}</span>
                  </div>
                ))}
              </div>
           </div>
        </Section>
        
        {/* 7. Installation */}
        <Section id="installation" title="7. Getting Started (Installation)">
          <p className="mb-4">ใช้ Deployment Scripts ที่มีให้เพื่อรันทั้งโปรเจคเพียงไม่กี่คำสั่ง (จำเป็นต้องมี Docker และ Docker Compose บนเครื่อง)</p>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2"><span className="bg-sky-100 text-sky-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> Clone the Ecosystem</h4>
              <CodeBlock code="git clone https://github.com/Seatly-Innovation/Nightseat-Innovation.git&#10;cd Nightseat-Innovation" />
            </div>
            
            <div>
              <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2"><span className="bg-sky-100 text-sky-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span> Execute the Runner Script</h4>
              <p className="text-sm text-slate-500 mb-2">คำสั่งนี้จะช่วยตรวจสอบ Requirement เบื้องต้น ก๊อปปี้ <code>.env.example</code> ไปเป็น <code>.env</code> ของทั้ง 3 โปรเจคย่อยให้เลย และสั่ง docker-compose up อัตโนมัติ</p>
              <CodeBlock code="chmod +x run-local.sh&#10;./run-local.sh" />
            </div>
            
             <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mt-6 shadow-sm">
                <h4 className="text-blue-800 font-bold mb-1">Local Portal URLs:</h4>
                <ul className="text-sm text-blue-700 space-y-1 ml-4 list-disc">
                  <li><strong>User App:</strong> <code>http://localhost:3001</code></li>
                  <li><strong>Admin App:</strong> <code>http://localhost:3000</code></li>
                  <li><strong>Go Core API:</strong> <code>http://localhost:8080/api/v1</code></li>
                </ul>
             </div>
          </div>
        </Section>

      </main>
    </div>
  );
}
