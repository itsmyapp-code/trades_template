import React from 'react';
import { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/data/initialData';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'UK GDPR and DUAA privacy notice for Sistine Decorating, Dartmouth.',
};

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-xs font-semibold tracking-widest text-amber-800 uppercase bg-amber-100 px-3 py-1 rounded-full">
          UK GDPR &amp; Privacy Notice
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500">
          Last Updated: 27 September 2026 | Controller: {BUSINESS_CONFIG.name} ({BUSINESS_CONFIG.address})
        </p>
      </div>

      {/* Mandatory Public Transparency Callout Block */}
      <div className="p-6 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-slate-800 space-y-2">
        <p className="font-bold text-amber-900 text-base">
          Data Privacy &amp; Compliance Queries:
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          For any questions regarding your data rights, or to submit an inquiry, please contact our Data Privacy Lead directly at{' '}
          <a 
            href={`mailto:${BUSINESS_CONFIG.dataPrivacyLeadEmail}`} 
            className="text-amber-800 font-bold underline hover:text-amber-900"
          >
            {BUSINESS_CONFIG.dataPrivacyLeadEmail}
          </a>. We formally acknowledge all compliance submissions within 30 days.
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-700">
        
        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-slate-900">1. Data Controller</h2>
          <p>
            {BUSINESS_CONFIG.name}, based at {BUSINESS_CONFIG.address}, operates as the Data Controller under UK data protection legislation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-slate-900">2. Information We Collect</h2>
          <p>
            We strictly collect only the information needed to communicate with you and fulfill decorating work:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your name, telephone number, email address, and property address.</li>
            <li>Details of the rooms, walls, or woodwork you would like painted.</li>
            <li>Invoicing records for completed work (retained for statutory HMRC accounting requirements).</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-slate-900">3. Zero Third-Party Advertising Trackers</h2>
          <p>
            We operate a clean website without advertising trackers, third-party analytics pixels, or commercial surveillance cookies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-slate-900">4. Your Data Rights</h2>
          <p>
            Under UK GDPR, you have the right to access, rectify, or request the deletion of your contact information. To submit a request, contact our Data Privacy Lead at <strong>{BUSINESS_CONFIG.dataPrivacyLeadEmail}</strong>.
          </p>
        </section>

      </div>
    </div>
  );
}
