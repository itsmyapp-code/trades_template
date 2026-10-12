import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Hammer, 
  Layers, 
  Home, 
  Paintbrush, 
  Wrench, 
  ShieldCheck, 
  Phone, 
  Mail, 
  ArrowRight 
} from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';
import TrustBanner from '@/components/TrustBanner';
import { siteConfig } from '@/config/site.config';

const ICON_MAP = {
  Building2,
  Hammer,
  Layers,
  Home,
  Paintbrush,
  Wrench,
  ShieldCheck,
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': siteConfig.seo.schemaType || 'GeneralContractor',
    'name': siteConfig.brand.name,
    'description': siteConfig.seo.description,
    'telephone': siteConfig.contact.phone,
    'email': siteConfig.contact.email,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': siteConfig.contact.address.split(',')[0],
      'addressLocality': 'Dartmouth',
      'addressRegion': 'Devon',
      'postalCode': siteConfig.contact.postcode,
      'addressCountry': 'GB',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '50.3524',
      'longitude': '-3.5786',
    },
    'areaServed': siteConfig.brand.coverageAreas.map(area => ({
      '@type': 'Place',
      'name': area,
    })),
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': `${siteConfig.trade.sector} Services`,
      'itemListElement': siteConfig.trade.services.map(s => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': s.title,
        },
      })),
    },
  };

  return (
    <div className="space-y-0 pb-0">
      {/* JSON-LD Local SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. HERO CAROUSEL WITH KEN BURNS EFFECT */}
      <HeroCarousel />

      {/* 2. ACCREDITATIONS & TRUST BANNER */}
      <TrustBanner />

      {/* 3. INTRODUCTION & STORY */}
      <section className="py-16 sm:py-24 bg-brand-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
            <span className="text-xs font-semibold tracking-widest text-amber-800 uppercase bg-amber-100/70 px-4 py-1.5 rounded-full">
              {siteConfig.brand.locationBadge}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
              {siteConfig.brand.strapline}
            </h1>
            <div className="text-base sm:text-lg text-slate-600 space-y-4 leading-relaxed font-normal">
              <p>
                Based in {siteConfig.brand.locationBadge}, {siteConfig.brand.name} delivers trusted, master craftsmanship across {siteConfig.brand.serviceArea}.
              </p>
              <p>
                From bespoke architectural extensions and complete structural renovations through to luxury coastal restorations, we combine meticulous preparation, first-class structural engineering, and clean, respectful site management.
              </p>
            </div>
          </div>

          {/* Core Services Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {siteConfig.trade.services.map((item) => {
              const IconComp = (item.iconName && ICON_MAP[item.iconName]) 
                ? ICON_MAP[item.iconName] 
                : Building2;

              return (
                <div
                  key={item.id}
                  className="flex flex-col justify-between items-center text-center p-8 rounded-3xl bg-white border border-slate-200/70 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-full flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md bg-gradient-to-br ${item.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                      <IconComp className="w-8 h-8 text-amber-200" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-serif font-semibold text-slate-900 mb-3 group-hover:text-amber-800 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base mb-8 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <Link
                    href={`/projects?category=${encodeURIComponent(item.category)}`}
                    className="inline-flex items-center gap-2 bg-slate-100 group-hover:bg-slate-900 text-slate-800 group-hover:text-white font-sans font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-300"
                  >
                    <span>{item.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. CALL TO ACTION SECTION */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center px-6 space-y-6">
          <span className="inline-block bg-amber-400/20 text-amber-300 font-sans font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-amber-400/30">
            {siteConfig.brand.locationBadge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
            Planning Your Next Building Project?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Contact {siteConfig.brand.name} today for professional advice, initial feasibility discussions, and a comprehensive, transparent quotation for your property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-sans font-bold px-8 py-4 rounded-full text-base sm:text-lg shadow-xl hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 text-slate-950" />
              <span>Call: {siteConfig.contact.phone}</span>
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-white/15 hover:bg-white/25 text-white border border-white/40 hover:border-white font-sans font-semibold px-8 py-4 rounded-full text-base sm:text-lg shadow-lg hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5 text-white" />
              <span>Request Quote / Estimate</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
