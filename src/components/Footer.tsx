import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { siteConfig } from '@/config/site.config';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-semibold text-white">Contact Us</h3>
            <div className="space-y-2 text-slate-300 text-sm">
              <p className="font-semibold text-white">{siteConfig.brand.name}</p>
              <p>{siteConfig.contact.address}</p>
              <p>
                Tel:{' '}
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="font-bold text-white hover:text-amber-300 transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p>
                Email:{' '}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors underline"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>
            
            <div className="pt-2 text-xs text-slate-400">
              <p className="font-semibold text-slate-200">Coverage:</p>
              <p>{siteConfig.brand.serviceArea}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-semibold text-white">Quick Links</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <Link href="/" className="block hover:text-white transition-colors">Home</Link>
              <Link href="/projects" className="block hover:text-white transition-colors">Our Work</Link>
              <Link href="/reviews" className="block hover:text-white transition-colors">Client Reviews</Link>
              <Link href="/contact" className="block hover:text-white transition-colors">Contact Us</Link>
            </div>
          </div>

          {/* Brand Column */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <Logo variant="light" className="h-12" />
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-lg">
              {siteConfig.brand.name} — specialist {siteConfig.trade.sector.toLowerCase()} based in {siteConfig.brand.locationBadge}. Delivering exacting standards of craftsmanship, dedicated project management, and trusted trade service.
            </p>
            <p className="text-xs text-amber-400 font-semibold">
              {siteConfig.trust.insuranceNotice}
            </p>
          </div>

        </div>

        {/* Developer Credit & Feature Box */}
        <div className="mt-10 pt-8 border-t border-slate-800/80">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <a 
                href="https://itsmyapp.co.uk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="shrink-0 transition-transform hover:scale-105"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/itsmyapp_logo.jpg" 
                  alt="itsmyapp.co.uk Logo" 
                  className="w-14 h-14 rounded-xl shadow-md object-cover border border-slate-700/60"
                />
              </a>
              <div>
                <p className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-0.5">
                  Web Development &amp; Digital Solutions
                </p>
                <h4 className="text-base font-semibold text-white">
                  Designed &amp; Developed by{' '}
                  <a 
                    href="https://itsmyapp.co.uk" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-amber-300 hover:text-amber-200 underline decoration-amber-400/50 hover:decoration-amber-300 transition-colors"
                  >
                    itsmyapp.co.uk
                  </a>
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  Bespoke, high-performance websites and digital applications crafted for UK builders and premium trades.
                </p>
              </div>
            </div>
            <div className="shrink-0 self-stretch sm:self-auto flex sm:flex-col justify-end">
              <a
                href="https://itsmyapp.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-all shadow-sm w-full sm:w-auto"
              >
                Visit itsmyapp.co.uk
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Mandatory Public Transparency Callout */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <p className="text-slate-400 text-xs sm:text-sm max-w-4xl leading-relaxed">
            <strong className="text-slate-200">Data Privacy &amp; Compliance:</strong> For any questions regarding your data rights, or to submit an inquiry, please contact our Data Privacy Lead directly at{' '}
            <a href={`mailto:${siteConfig.compliance.dplEmail}`} className="text-slate-300 hover:text-white transition-colors underline font-medium">
              {siteConfig.compliance.dplEmail}
            </a>. We formally acknowledge all compliance submissions within 30 days.
          </p>
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
