import React from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-center gap-1 text-amber-500">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 text-amber-500 fill-amber-500"
            />
          ))}
        </div>

        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {testimonial.projectType}
        </p>

        <blockquote className="text-sm text-slate-700 leading-relaxed italic font-serif">
          &ldquo;{testimonial.reviewText}&rdquo;
        </blockquote>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <p className="text-sm font-bold text-slate-900 font-serif">
          {testimonial.clientName}
        </p>
        <p className="text-xs text-slate-500">
          {testimonial.location}
        </p>
      </div>
    </div>
  );
}
