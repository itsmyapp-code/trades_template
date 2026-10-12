'use client';

import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Clock } from 'lucide-react';
import { Testimonial } from '@/types';
import { getStoredTestimonials, saveStoredTestimonials } from '@/lib/storage';

export default function ReviewsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [projectType, setProjectType] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const load = () => {
      // Filter strictly approved reviews for public display
      const all = getStoredTestimonials();
      const approved = all.filter(t => t.status === 'approved' || (t as any).status === undefined);
      setTestimonials(approved);
    };
    load();
    window.addEventListener('apex_data_updated', load);
    return () => window.removeEventListener('apex_data_updated', load);
  }, []);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Testimonial = {
      id: `test-${Date.now()}`,
      clientName: name,
      location,
      projectType,
      rating,
      reviewText: text,
      status: 'pending', // Requires admin approval before appearing on site!
      publishedAt: new Date().toISOString().split('T')[0],
    };

    const all = getStoredTestimonials();
    const updated = [newEntry, ...all];
    saveStoredTestimonials(updated);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setName('');
      setLocation('');
      setProjectType('');
      setText('');
    }, 2000);
  };

  return (
    <div className="py-12 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold tracking-widest text-amber-800 uppercase bg-amber-100 px-4 py-1.5 rounded-full">
          Client Feedback
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-slate-900">
          Client Reviews
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
          Read what local homeowners across Dartmouth and the South Hams have to say about our decorating work.
        </p>
      </div>

      {/* Top Banner with Add Review Action */}
      <div className="bg-[#f5f3ee] rounded-2xl p-6 sm:p-8 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
            ))}
          </div>
          <h2 className="text-lg font-serif font-bold text-slate-900">5-Star Rated Local Decorating</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Authentic customer reviews from residential projects in Dartmouth and surrounding villages.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm shrink-0"
        >
          Leave a Review
        </button>
      </div>

      {/* Testimonials Grid (Strictly Approved Reviews) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {test.projectType}
              </p>
              <blockquote className="text-sm text-slate-700 leading-relaxed italic font-serif">
                &ldquo;{test.reviewText}&rdquo;
              </blockquote>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-sm font-bold text-slate-900 font-serif">{test.clientName}</p>
              <p className="text-xs text-slate-500">{test.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Review Submission Modal with Pending Approval Notification */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-1">Leave a Client Review</h3>
            <p className="text-xs text-slate-500 mb-4">
              Thank you for sharing your experience. Reviews are reviewed by our team prior to publishing.
            </p>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-slate-900">Thank You!</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Your review has been submitted for approval and will be published once verified by our team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. David & Laura"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-slate-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Town / Area *</label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Dartmouth"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Work Done *</label>
                    <input
                      type="text"
                      required
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      placeholder="e.g. Interior Painting"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-slate-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-slate-900"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Your Review *</label>
                  <textarea
                    required
                    rows={3}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Your thoughts on the work, finish quality, and punctuality..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:border-slate-900"
                  />
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/70 text-[11px] text-amber-900 flex items-start gap-2">
                  <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>Submitted reviews are held in pending status until approved by our management.</span>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold"
                  >
                    Submit for Approval
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
