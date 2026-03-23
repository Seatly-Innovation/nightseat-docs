"use client";

import DocsLayout from '@/components/DocsLayout';
import { Section, FeatureCard } from '@/components/DocsShared';
import PageNavigation from '@/components/PageNavigation';
import { UserCircle, Smartphone, Users } from 'lucide-react';

export default function ManualUser() {
  return (
    <DocsLayout>
      <Section title="Customer (User) Guide" subtitle="คู่มือสำหรับลูกค้าที่มาเที่ยวสถานบันเทิง" icon={UserCircle}>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
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
      <PageNavigation />
    </DocsLayout>
  );
}
