import React from 'react';
import { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/data/initialData';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions of trade for Sistine Decorating, Dartmouth.',
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-xs font-semibold tracking-widest text-amber-800 uppercase bg-amber-100 px-3 py-1 rounded-full">
          Terms &amp; Conditions
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500">
          Effective Date: 27 September 2026 | {BUSINESS_CONFIG.name} ({BUSINESS_CONFIG.address})
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-700">
        
        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-slate-900">1. Estimates &amp; Quotations</h2>
          <p>
            1.1. Written estimates provided by {BUSINESS_CONFIG.name} are valid for 30 calendar days from the date of issue.
          </p>
          <p>
            1.2. Quotations cover the agreed scope of interior or exterior painting and decorating. Any additional areas requested by the client will be agreed in advance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-slate-900">2. Client Preparation &amp; Access</h2>
          <p>
            2.1. The client agrees to provide clear access to the work areas during agreed working hours and access to electricity and water facilities.
          </p>
          <p>
            2.2. While clean protective dust-sheets are always used, clients are kindly asked to remove fragile ornaments, valuable items, and small personal belongings from the rooms prior to the start date.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-slate-900">3. Paint Materials &amp; Colors</h2>
          <p>
            3.1. We supply and apply high-quality trade and designer paint finishes (including Farrow &amp; Ball, Dulux Trade, Little Greene, Crown Trade, etc.) as agreed in the quotation.
          </p>
          <p>
            3.2. Color swatches and tester pots are recommended to ensure you are happy with the selected tone under your room&rsquo;s natural lighting.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-slate-900">4. Payment &amp; Completion</h2>
          <p>
            4.1. Invoices are issued upon practical completion of the decorating work. Payment is due within 7 calendar days via direct bank transfer or cheque.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-slate-900">5. Insurance &amp; Standards</h2>
          <p>
            5.1. {BUSINESS_CONFIG.name} maintains full public liability insurance coverage for all residential painting and decorating work.
          </p>
        </section>

      </div>
    </div>
  );
}
