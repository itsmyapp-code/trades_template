'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, CheckCircle2, ArrowRight, Sliders, Image as ImageIcon } from 'lucide-react';
import { Project } from '@/types';
import BeforeAfterSlider from './BeforeAfterSlider';
import { siteConfig } from '@/config/site.config';

interface ProjectCardProps {
  project: Project;
  onOpenSlider?: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenSlider }: ProjectCardProps) {
  const [showSlider, setShowSlider] = useState(false);
  const hasComparison = Boolean(project.beforeImage && project.afterImage);
  const coverImage = project.afterImage || (project.images && project.images[0]) || '';

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-trade hover:shadow-trade-lg transition-all duration-300 flex flex-col">
      {/* Image / Comparison Showcase Container */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-900">
        {hasComparison && showSlider && project.beforeImage && project.afterImage ? (
          <div className="w-full h-full">
            <BeforeAfterSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
              alt={project.title}
              aspectRatio="aspect-[16/11]"
            />
          </div>
        ) : (
          coverImage && (
            <Image
              src={coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/85 text-white backdrop-blur-sm border border-slate-700 shadow-sm">
            {project.category}
          </span>
        </div>

        {/* Before / After Slider Toggle Button (Only if both before & after images exist) */}
        {hasComparison && (
          <div className="absolute bottom-3 right-3 z-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowSlider(!showSlider);
              }}
              className="px-3 py-1 rounded-full bg-slate-950/85 hover:bg-slate-900 backdrop-blur-md text-amber-300 text-xs font-semibold flex items-center gap-1.5 border border-amber-400/40 shadow-md transition-all active:scale-95"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{showSlider ? 'Show Photo' : 'Compare Before/After'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{project.location}</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
            {project.title}
          </h3>

          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {project.scopeDetails && project.scopeDetails.length > 0 && (
            <ul className="pt-2 space-y-1.5 border-t border-slate-100">
              {project.scopeDetails.slice(0, 2).map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          )}

          {project.manufacturers && project.manufacturers.length > 0 && (
            <div className="pt-2.5 border-t border-slate-100 space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block">
                {siteConfig.trade.specificationsLabel}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.manufacturers.map((m, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200/80"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {onOpenSlider && hasComparison && (
          <button
            type="button"
            onClick={() => onOpenSlider(project)}
            className="pt-3 w-full flex items-center justify-between text-xs font-bold text-slate-900 hover:text-amber-600 transition-colors border-t border-slate-100"
          >
            <span>Interactive Comparison</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
