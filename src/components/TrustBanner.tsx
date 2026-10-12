'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Building2, 
  CheckCircle2, 
  Flame, 
  Hammer,
  Shield
} from 'lucide-react';
import { siteConfig } from '@/config/site.config';

const ICON_MAP = {
  Award,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Flame,
  Hammer,
};

export default function TrustBanner() {
  if (!siteConfig.trust.showTrustBanner || !siteConfig.trust.badges?.length) {
    return null;
  }

  return (
    <div className="bg-slate-900 border-y border-slate-800/90 text-white py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Headline / Guarantee notice */}
        <div className="flex items-center gap-2.5 text-center md:text-left">
          <Shield className="w-5 h-5 text-amber-400 shrink-0 hidden sm:block" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              {siteConfig.trust.bannerHeadline || 'Accredited Craftsmanship & Standards'}
            </p>
            <p className="text-[11px] text-slate-400">
              {siteConfig.trust.insuranceNotice}
            </p>
          </div>
        </div>

        {/* Badges Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
          {siteConfig.trust.badges.map((badge, idx) => {
            const IconComponent = badge.iconName && ICON_MAP[badge.iconName] 
              ? ICON_MAP[badge.iconName] 
              : Award;

            return (
              <div 
                key={idx}
                className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 px-3 py-1.5 rounded-xl transition-colors"
                title={badge.tagline}
              >
                <IconComponent className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-100 leading-tight">
                    {badge.name}
                  </p>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    {badge.tagline}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
