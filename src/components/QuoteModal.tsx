'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site.config';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function QuoteModal({ isOpen, onClose, preselectedService }: QuoteModalProps) {
  const defaultService = preselectedService || (siteConfig.trade.services[0]?.title || 'General Building');
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: defaultService,
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, postcode: siteConfig.contact.postcode }),
      });
    } catch {}
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-serif font-bold text-slate-900">Request a Project Estimate</h3>
            <p className="text-xs text-slate-500">{siteConfig.brand.name}, {siteConfig.brand.locationBadge}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-xl font-serif font-bold text-slate-900">Inquiry Received!</h4>
            <p className="text-xs text-slate-600">
              Thank you, {formData.fullName}. Our estimating team will be in touch shortly.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-full text-xs font-semibold"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Your Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Full name"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="07800 000000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.co.uk"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Project Category / Service</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-slate-900"
              >
                {siteConfig.trade.services.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Full Project / Other">Other / General Contracting</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Project Details</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Property type, approximate dimensions, drawings/planning status, or target start date..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:border-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isSubmitting ? 'Sending Request...' : 'Submit Estimate Request'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
