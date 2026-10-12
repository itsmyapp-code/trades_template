import React from 'react';
import { Building2, Compass, Layers } from 'lucide-react';
import { siteConfig } from '@/config/site.config';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'circle';
}

export default function Logo({ className = "h-14 w-auto", variant = 'dark' }: LogoProps) {
  const hasLogoImage = Boolean(siteConfig.brand.logoImage);

  if (hasLogoImage) {
    if (variant === 'circle') {
      return (
        <div className="bg-white rounded-full w-28 h-28 sm:w-36 sm:h-36 mx-auto flex items-center justify-center shadow-2xl border-2 border-white/90 p-2 select-none overflow-hidden hover:scale-105 transition-transform duration-300">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={siteConfig.brand.logoImage!} 
            alt={`${siteConfig.brand.name} - ${siteConfig.brand.strapline}`} 
            className="w-full h-full object-contain rounded-full"
          />
        </div>
      );
    }

    if (variant === 'light') {
      return (
        <div className={`flex items-center gap-3 ${className}`}>
          <div className="bg-white p-1.5 rounded-xl shadow-sm inline-flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={siteConfig.brand.logoImage!} 
              alt={siteConfig.brand.name} 
              className="h-10 sm:h-12 w-auto object-contain rounded-lg"
            />
          </div>
        </div>
      );
    }

    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={siteConfig.brand.logoImage!} 
          alt={siteConfig.brand.name} 
          className="h-12 sm:h-14 w-auto object-contain rounded-xl shadow-xs"
        />
      </div>
    );
  }

  // Fallback: Architectural White-Label Typographic Logo
  const isLight = variant === 'light';

  if (variant === 'circle') {
    return (
      <div className="bg-slate-900 text-white rounded-full w-28 h-28 sm:w-36 sm:h-36 mx-auto flex flex-col items-center justify-center shadow-2xl border-2 border-amber-400 p-2 select-none hover:scale-105 transition-transform duration-300">
        <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 mb-1" />
        <span className="text-xs sm:text-sm font-serif font-bold text-center tracking-wider uppercase leading-none">
          {siteConfig.brand.name.split(' ')[0]}
        </span>
        <span className="text-[8px] sm:text-[9px] text-amber-300 uppercase tracking-widest mt-0.5">
          Builders
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className={`p-2 rounded-xl flex items-center justify-center shrink-0 shadow-xs border ${
        isLight 
          ? 'bg-slate-900 border-slate-700 text-amber-400' 
          : 'bg-slate-950 border-slate-800 text-amber-400'
      }`}>
        <Building2 className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>

      <div className="flex flex-col">
        <span className={`text-base sm:text-xl font-serif font-bold tracking-tight leading-tight ${
          isLight ? 'text-white' : 'text-slate-900'
        }`}>
          {siteConfig.brand.name}
        </span>
        <span className={`text-[10px] sm:text-xs tracking-widest uppercase font-medium mt-0.5 ${
          isLight ? 'text-amber-400' : 'text-slate-500'
        }`}>
          {siteConfig.brand.strapline}
        </span>
      </div>
    </div>
  );
}
