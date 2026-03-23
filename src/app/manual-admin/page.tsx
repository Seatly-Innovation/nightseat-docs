"use client";

import DocsLayout from '@/components/DocsLayout';
import { Section, FeatureCard } from '@/components/DocsShared';
import PageNavigation from '@/components/PageNavigation';
import { Shield, Calendar, Smartphone } from 'lucide-react';

export default function ManualAdmin() {
  return (
    <DocsLayout>
      <Section title="Staff (Admin) Guide" subtitle="คู่มือสำหรับพนักงานและผู้จัดการร้านสาขา" icon={Shield}>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
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
      <PageNavigation />
    </DocsLayout>
  );
}
