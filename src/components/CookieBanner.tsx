'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('apex_cookie_consent_v1');
      if (!consent) {
        setIsVisible(true);
      }
    } catch {
      // Ignore in SSR
    }
  }, []);

  const handleConsent = (decision: 'accepted' | 'rejected') => {
    try {
      localStorage.setItem('apex_cookie_consent_v1', JSON.stringify({
        status: decision,
        timestamp: new Date().toISOString(),
        version: '1.0'
      }));
    } catch {
      // LocalStorage access
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Privacy & Cookie Consent"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-slate-900/95 backdrop-blur-md border-t border-slate-700 shadow-2xl text-slate-200 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-1.5 flex-1 pr-0 lg:pr-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <h2 className="text-base font-semibold text-white tracking-wide">
              Privacy, Security & Cookie Compliance
            </h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            We use strictly necessary session cookies to maintain basic site functionality and quote inquiries. Under the Data (Use and Access) Act (DUAA) and UK GDPR, zero commercial tracking cookies are deployed without affirmative consent.{' '}
            <Link
              href="/cookies"
              className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              Read our Cookie Policy
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              Privacy Notice
            </Link>.
          </p>
        </div>

        {/* Equal Prominence Buttons (identical visual weight, padding, font size, border & contrast) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
          <button
            id="cookie-reject-all"
            type="button"
            onClick={() => handleConsent('rejected')}
            className="px-5 py-2.5 rounded-md border-2 border-slate-500 bg-slate-800 text-slate-100 font-semibold text-sm hover:bg-slate-700 hover:border-slate-400 active:bg-slate-900 transition-all text-center focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            Reject All Non-Essential
          </button>
          <button
            id="cookie-accept-all"
            type="button"
            onClick={() => handleConsent('accepted')}
            className="px-5 py-2.5 rounded-md border-2 border-slate-500 bg-slate-800 text-slate-100 font-semibold text-sm hover:bg-slate-700 hover:border-slate-400 active:bg-slate-900 transition-all text-center focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            Accept All Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
