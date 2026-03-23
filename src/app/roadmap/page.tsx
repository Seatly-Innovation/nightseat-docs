"use client";

import DocsLayout from '@/components/DocsLayout';
import { Section } from '@/components/DocsShared';
import PageNavigation from '@/components/PageNavigation';
import InteractiveRoadmap from '@/components/InteractiveRoadmap';
import { Rocket } from 'lucide-react';

export default function Roadmap() {
  return (
    <DocsLayout>
      <Section title="Ecosystem Roadmap" subtitle="The future of NightSeat Innovation capabilities and releases." icon={Rocket}>
        <div className="max-w-3xl pr-4 mt-8">
          <InteractiveRoadmap />
        </div>
      </Section>
      <PageNavigation />
    </DocsLayout>
  );
}
