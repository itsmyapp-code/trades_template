'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { siteConfig } from '@/config/site.config';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Our Work', href: '/projects' },
    { name: 'Client Reviews', href: '/reviews' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group py-2">
            <Logo variant="dark" className="h-14 sm:h-16" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base sm:text-lg font-serif transition-colors duration-200 relative py-1 ${
                    isActive
                      ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Direct Phone / Contact CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition-all shadow-sm"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>{siteConfig.contact.phone}</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="p-2 rounded-full bg-slate-100 text-slate-800"
              aria-label={`Call ${siteConfig.brand.name}`}
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-6 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-xl font-serif ${
                pathname === link.href ? 'text-slate-900 font-bold' : 'text-slate-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="w-full py-3 rounded-xl bg-slate-900 text-white font-medium text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>Call {siteConfig.contact.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
