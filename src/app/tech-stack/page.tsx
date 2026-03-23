"use client";

import DocsLayout from '@/components/DocsLayout';
import { Section } from '@/components/DocsShared';
import PageNavigation from '@/components/PageNavigation';
import TechBentoGrid from '@/components/TechBentoGrid';
import { Code2 } from 'lucide-react';

export default function TechStack() {
  return (
    <DocsLayout>
      <Section title="Technology Stack" subtitle="Modern, type-safe tools maximizing developer experience and application speed." icon={Code2}>
        <div className="mt-8">
          <TechBentoGrid />
        </div>
      </Section>
      <PageNavigation />
    </DocsLayout>
  );
}
