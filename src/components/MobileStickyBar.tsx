'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, CalendarCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/data/initialData';

export default function MobileStickyBar() {
  const telHref = `tel:${BUSINESS_CONFIG.phoneRaw || '07803258507'}`;

  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-4 py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] pb-[max(0.625rem,env(safe-area-inset-bottom))]"
      role="region"
      aria-label="Quick Actions"
    >
      <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
        {/* Direct Call Action */}
        <a
          href={telHref}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-slate-900 active:bg-slate-800 text-white text-sm font-semibold shadow-sm transition-all"
          aria-label={`Call ${BUSINESS_CONFIG.phone}`}
        >
          <Phone className="w-4 h-4 text-amber-300 fill-amber-300" />
          <span>Call Us</span>
        </a>

        {/* Request Quote Action */}
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 active:from-amber-600 active:to-amber-700 text-slate-950 text-sm font-bold shadow-sm transition-all"
          aria-label="Request Quote"
        >
          <CalendarCheck className="w-4 h-4 text-slate-950" />
          <span>Request Quote</span>
        </Link>
      </div>
    </div>
  );
}
