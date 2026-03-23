"use client";

import DocsLayout from '@/components/DocsLayout';
import { Section } from '@/components/DocsShared';
import PageNavigation from '@/components/PageNavigation';
import FaqAccordion from '@/components/FaqAccordion';
import { FileText } from 'lucide-react';

export default function FAQ() {
  return (
    <DocsLayout>
      <Section title="Frequently Asked Questions" subtitle="Common architectural and feature questions." icon={FileText}>
        <div className="mt-8">
          <FaqAccordion />
        </div>
      </Section>
      <PageNavigation />
    </DocsLayout>
  );
}
