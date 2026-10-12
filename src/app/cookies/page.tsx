import React from 'react';
import { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/data/initialData';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie policy for Sistine Decorating, Dartmouth.',
};

export default function CookiesPage() {
  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-xs font-semibold tracking-widest text-amber-800 uppercase bg-amber-100 px-3 py-1 rounded-full">
          Cookie Notice
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Cookie Policy
        </h1>
        <p className="text-sm text-slate-500">
          Effective Date: 27 September 2026 | {BUSINESS_CONFIG.name}
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-700">
        <p>
          This website only uses strictly necessary local storage items to remember your cookie preferences and maintain administrative session security. We do not deploy third-party advertising or cross-site tracking cookies.
        </p>
      </div>
    </div>
  );
}
