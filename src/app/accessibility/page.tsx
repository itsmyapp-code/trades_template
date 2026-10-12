import React from 'react';
import { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/data/initialData';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'WCAG 2.1 Level AA accessibility commitment for Sistine Decorating.',
};

export default function AccessibilityPage() {
  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-xs font-semibold tracking-widest text-amber-800 uppercase bg-amber-100 px-3 py-1 rounded-full">
          Inclusivity Commitment
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Accessibility Statement
        </h1>
        <p className="text-sm text-slate-500">
          Effective Date: 27 September 2026 | {BUSINESS_CONFIG.name}
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-700">
        <p>
          We are committed to making this website accessible and user-friendly for all visitors, in accordance with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
        </p>
        <p>
          If you have difficulty viewing or navigating the content on this website, please call us on <strong>{BUSINESS_CONFIG.phone}</strong> or email <strong>{BUSINESS_CONFIG.email}</strong>.
        </p>
      </div>
    </div>
  );
}
