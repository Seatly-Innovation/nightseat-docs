"use client";

import DocsLayout from '@/components/DocsLayout';
import { Section } from '@/components/DocsShared';
import PageNavigation from '@/components/PageNavigation';
import NetworkFlow from '@/components/NetworkFlow';
import { Cpu } from 'lucide-react';

export default function Architecture() {
  return (
    <DocsLayout>
      <Section title="System Architecture" subtitle="Live network data flow between Edge apps and Core APIs." icon={Cpu}>
        <div className="mt-12 w-full max-w-4xl mx-auto">
          <NetworkFlow />
        </div>
      </Section>
      <PageNavigation />
    </DocsLayout>
  );
}
