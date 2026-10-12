'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { MapPin, ArrowRight, Layers, Camera, ZoomIn } from 'lucide-react';
import { Project } from '@/types';
import { getStoredProjects } from '@/lib/storage';
import ProjectGalleryModal from '@/components/ProjectGalleryModal';
import { siteConfig } from '@/config/site.config';

function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProjectForGallery, setSelectedProjectForGallery] = useState<Project | null>(null);

  const categories = siteConfig.trade.categories || ['All'];

  useEffect(() => {
    const load = () => {
      setProjects(getStoredProjects());
    };
    load();
    window.addEventListener('apex_data_updated', load);
    return () => window.removeEventListener('apex_data_updated', load);
  }, []);

  // Sync selected category with URL query parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category') || searchParams.get('cat');
    if (categoryParam) {
      const match = categories.find(
        (c) => c.toLowerCase() === categoryParam.toLowerCase()
      );
      if (match) {
        setSelectedCategory(match);
      }
    } else {
      setSelectedCategory('All');
    }
  }, [searchParams, categories]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      router.push('/projects', { scroll: false });
    } else {
      router.push(`/projects?category=${encodeURIComponent(cat)}`, { scroll: false });
    }
  };

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold tracking-widest text-amber-800 uppercase bg-amber-100 px-4 py-1.5 rounded-full">
          Portfolio &amp; Work Completed
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-slate-900">
          Our Recent Work
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
          Browse through completed {siteConfig.trade.sector.toLowerCase()} projects across {siteConfig.brand.serviceArea}. Click any job to inspect specifications, materials, and high-resolution photo galleries.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleCategoryChange(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-serif transition-all ${
              selectedCategory.toLowerCase() === cat.toLowerCase()
                ? 'bg-slate-900 text-white shadow-sm font-semibold'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-slate-600 font-serif text-lg">No projects currently found in this category.</p>
            <button
              onClick={() => handleCategoryChange('All')}
              className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-medium"
            >
              View All Projects
            </button>
          </div>
        ) : (
          filteredProjects.map((project) => {
            const photoCount = project.images && project.images.length > 0 ? project.images.length : (project.beforeImage ? 2 : 1);
            const coverImg = project.afterImage || project.images?.[0] || '';
            const hasComparison = Boolean(project.beforeImage && project.afterImage);

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProjectForGallery(project)}
                className="group cursor-pointer bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
                  {coverImg && (
                    <Image
                      src={coverImg}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900/80 text-white backdrop-blur-sm">
                      {project.category}
                    </span>
                    {hasComparison && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500 text-slate-950 shadow-sm">
                        B/A Comparison
                      </span>
                    )}
                  </div>

                  {/* Zoom in hover badge */}
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-slate-900/80 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg border border-white/20 transform scale-95 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                      <span>Click to view {hasComparison ? '& compare' : '& zoom'}</span>
                    </div>
                  </div>

                  {/* Multiple Images Counter Pill */}
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium text-white shadow">
                    <Camera className="w-3.5 h-3.5 text-amber-400" />
                    <span>{photoCount} Photos</span>
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-amber-800 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{project.location}</span>
                    </div>

                    <h2 className="text-xl font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                      {project.title}
                    </h2>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {project.manufacturers && project.manufacturers.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block mb-1">
                          {siteConfig.trade.specificationsLabel}:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {project.manufacturers.map((man, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                              <span>{man}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                    <span>{project.location}</span>
                    <span className="text-slate-900 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      <span>Full Gallery</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Gallery Modal */}
      <ProjectGalleryModal
        project={selectedProjectForGallery}
        onClose={() => setSelectedProjectForGallery(null)}
      />

    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-serif text-slate-500">Loading portfolio...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
