'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Layers, ZoomIn, ZoomOut, RotateCcw, Sliders, Image as ImageIcon, Paintbrush } from 'lucide-react';
import { Project } from '@/types';
import BeforeAfterSlider from './BeforeAfterSlider';

interface ProjectGalleryModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectGalleryModal({ project, onClose }: ProjectGalleryModalProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [viewMode, setViewMode] = useState<'gallery' | 'comparison'>('gallery');
  const [showHint, setShowHint] = useState<boolean>(true);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const hasComparison = Boolean(project?.beforeImage && project?.afterImage);

  // Touch gesture refs
  const touchStartRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const lastPanRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastTapRef = useRef<{ time: number; x: number; y: number }>({ time: 0, x: 0, y: 0 });
  const pinchStartRef = useRef<{ dist: number; zoom: number } | null>(null);

  // Dismiss gesture hint on first pointer/touch interaction
  const dismissHint = useCallback(() => {
    setShowHint(false);
  }, []);

  // Reset index and zoom when project changes, and start hint timer
  useEffect(() => {
    if (project) {
      setCurrentIdx(0);
      setZoomLevel(1);
      setPanPosition({ x: 50, y: 50 });
      setViewMode('gallery');
      setShowHint(true);

      const timer = setTimeout(() => {
        setShowHint(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [project]);

  // Reset zoom when navigating between slides
  const resetZoom = useCallback(() => {
    setZoomLevel(1);
    setPanPosition({ x: 50, y: 50 });
  }, []);

  const allImages = project
    ? project.images && project.images.length > 0
      ? project.images
      : [
          ...(project.afterImage ? [project.afterImage] : []),
          ...(project.beforeImage ? [project.beforeImage] : []),
        ]
    : [];

  const handlePrev = useCallback(() => {
    resetZoom();
    dismissHint();
    setCurrentIdx((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  }, [allImages.length, resetZoom, dismissHint]);

  const handleNext = useCallback(() => {
    resetZoom();
    dismissHint();
    setCurrentIdx((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [allImages.length, resetZoom, dismissHint]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailRefs.current[currentIdx]) {
      thumbnailRefs.current[currentIdx]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [currentIdx]);

  const handleZoomIn = () => {
    dismissHint();
    setZoomLevel((prev) => Math.min(prev + 0.75, 3));
  };

  const handleZoomOut = () => {
    dismissHint();
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.75, 1);
      if (next === 1) setPanPosition({ x: 50, y: 50 });
      return next;
    });
  };

  // Desktop click to zoom
  const handleClickZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    dismissHint();
    if (zoomLevel > 1) {
      resetZoom();
    } else {
      if (imageContainerRef.current) {
        const rect = imageContainerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setPanPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
      }
      setZoomLevel(2.5);
    }
  };

  // Desktop mouse move pan
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel <= 1 || !imageContainerRef.current) return;
    dismissHint();
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPanPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    dismissHint();
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      pinchStartRef.current = {
        dist,
        zoom: zoomLevel,
      };
    } else if (e.touches.length === 1) {
      const t = e.touches[0];
      touchStartRef.current = {
        x: t.clientX,
        y: t.clientY,
        time: Date.now(),
      };
      lastPanRef.current = {
        x: t.clientX,
        y: t.clientY,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    dismissHint();
    if (e.touches.length === 2 && pinchStartRef.current) {
      // Pinch to zoom
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const scale = (dist / pinchStartRef.current.dist) * pinchStartRef.current.zoom;
      const newZoom = Math.min(Math.max(scale, 1), 3);
      setZoomLevel(newZoom);
      if (newZoom <= 1.05) {
        setPanPosition({ x: 50, y: 50 });
      }
    } else if (e.touches.length === 1) {
      const t = e.touches[0];
      if (zoomLevel > 1.05) {
        // Locked slide changes when zoomed: Pan across image
        const deltaX = t.clientX - lastPanRef.current.x;
        const deltaY = t.clientY - lastPanRef.current.y;

        if (imageContainerRef.current) {
          const rect = imageContainerRef.current.getBoundingClientRect();
          const pctX = (deltaX / rect.width) * 100 * (1.2 / zoomLevel);
          const pctY = (deltaY / rect.height) * 100 * (1.2 / zoomLevel);

          setPanPosition((prev) => ({
            x: Math.max(0, Math.min(100, prev.x - pctX)),
            y: Math.max(0, Math.min(100, prev.y - pctY)),
          }));
        }
        lastPanRef.current = { x: t.clientX, y: t.clientY };
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    pinchStartRef.current = null;

    if (e.changedTouches.length === 1) {
      const touch = e.changedTouches[0];
      const now = Date.now();
      const timeSinceLastTap = now - lastTapRef.current.time;
      const distFromLastTap = Math.hypot(
        touch.clientX - lastTapRef.current.x,
        touch.clientY - lastTapRef.current.y
      );

      // Double tap detection (< 300ms, close proximity)
      if (timeSinceLastTap < 300 && distFromLastTap < 40) {
        if (zoomLevel > 1.05) {
          resetZoom();
        } else {
          if (imageContainerRef.current) {
            const rect = imageContainerRef.current.getBoundingClientRect();
            const x = ((touch.clientX - rect.left) / rect.width) * 100;
            const y = ((touch.clientY - rect.top) / rect.height) * 100;
            setPanPosition({
              x: Math.max(0, Math.min(100, x)),
              y: Math.max(0, Math.min(100, y)),
            });
          }
          setZoomLevel(2.5);
        }
        lastTapRef.current = { time: 0, x: 0, y: 0 };
        return;
      }

      lastTapRef.current = {
        time: now,
        x: touch.clientX,
        y: touch.clientY,
      };

      // Unzoomed: Horizontal swipe to switch slides
      if (zoomLevel <= 1.05) {
        const deltaX = touch.clientX - touchStartRef.current.x;
        const deltaY = touch.clientY - touchStartRef.current.y;
        const deltaTime = now - touchStartRef.current.time;

        if (
          Math.abs(deltaX) > 40 &&
          Math.abs(deltaX) > Math.abs(deltaY) * 1.2 &&
          deltaTime < 600
        ) {
          if (deltaX < 0) {
            handleNext();
          } else {
            handlePrev();
          }
        }
      }
    }
  };

  // Keyboard navigation & controls
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomLevel > 1) {
          resetZoom();
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft') {
        if (viewMode === 'gallery') handlePrev();
      } else if (e.key === 'ArrowRight') {
        if (viewMode === 'gallery') handleNext();
      } else if (e.key === '+' || e.key === '=') {
        dismissHint();
        setZoomLevel((prev) => Math.min(prev + 0.5, 3));
      } else if (e.key === '-' || e.key === '_') {
        dismissHint();
        setZoomLevel((prev) => {
          const next = Math.max(prev - 0.5, 1);
          if (next === 1) setPanPosition({ x: 50, y: 50 });
          return next;
        });
      } else if (e.key === '0') {
        resetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, zoomLevel, viewMode, handlePrev, handleNext, onClose, resetZoom, dismissHint]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-auto flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="min-w-0 pr-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest">
                {project.category} • {project.location}
              </span>
              {viewMode === 'gallery' && allImages.length > 1 && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-800 text-amber-300/90 px-2.5 py-0.5 rounded-full border border-slate-700">
                  <Layers className="w-3 h-3 text-amber-400" />
                  Photo {currentIdx + 1} of {allImages.length}
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-2xl font-serif font-bold text-white mt-0.5 truncate">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* View Mode Switcher (if both before & after images exist) */}
            {hasComparison && (
              <div className="flex items-center bg-slate-800 p-1 rounded-full border border-slate-700 text-xs font-medium mr-1">
                <button
                  type="button"
                  onClick={() => setViewMode('gallery')}
                  className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                    viewMode === 'gallery'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Gallery</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('comparison')}
                  className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                    viewMode === 'comparison'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Before/After</span>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Content: Comparison Slider OR Gallery Viewer */}
        {viewMode === 'comparison' && hasComparison && project.beforeImage && project.afterImage ? (
          <div className="p-3 sm:p-5 bg-slate-950 flex items-center justify-center">
            <BeforeAfterSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
              alt={project.title}
              aspectRatio="max-h-[50vh] md:max-h-[60vh] h-[45vh] sm:h-[50vh] md:h-[58vh] w-full"
            />
          </div>
        ) : (
          <>
            {/* Main Image Slider Viewport with Touch Gestures & Zoom capability */}
            <div 
              ref={imageContainerRef}
              onClick={handleClickZoom}
              onMouseMove={handleMouseMove}
              onPointerDown={dismissHint}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`relative max-h-[50vh] md:max-h-[60vh] h-[45vh] sm:h-[50vh] md:h-[58vh] w-full flex items-center justify-center bg-black/40 md:bg-slate-950 overflow-hidden select-none touch-none ${
                zoomLevel > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              title={zoomLevel > 1 ? 'Click to zoom out' : 'Click or double tap to zoom in'}
            >
              <div
                className="w-full h-full relative transition-transform duration-150 ease-out flex items-center justify-center"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: `${panPosition.x}% ${panPosition.y}%`,
                }}
              >
                {allImages.length > 0 && (
                  <Image
                    src={allImages[currentIdx]}
                    alt={`${project.title} photo ${currentIdx + 1}`}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-contain"
                    priority
                    draggable={false}
                  />
                )}
              </div>

              {/* Floating Zoom Controls Bar - Hidden on mobile/touch, visible on md+ */}
              <div 
                className="hidden md:flex absolute top-4 right-4 z-20 items-center gap-1.5 bg-slate-950/85 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/20 text-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className={`p-1.5 rounded-full transition-colors ${
                    zoomLevel <= 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/20 text-white'
                  }`}
                  aria-label="Zoom out"
                  title="Zoom out (-)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <span className="text-xs font-semibold px-1 min-w-[3rem] text-center font-mono text-amber-300">
                  {Math.round(zoomLevel * 100)}%
                </span>

                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                  className={`p-1.5 rounded-full transition-colors ${
                    zoomLevel >= 3 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/20 text-white'
                  }`}
                  aria-label="Zoom in"
                  title="Zoom in (+)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                {zoomLevel > 1 && (
                  <button
                    type="button"
                    onClick={resetZoom}
                    className="p-1.5 rounded-full hover:bg-white/20 text-amber-300 transition-colors ml-0.5 border-l border-white/20 pl-2"
                    aria-label="Reset zoom"
                    title="Reset zoom (0)"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Desktop Previous / Next Arrows (Hidden on mobile to avoid touch gesture conflicts) */}
              {allImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 text-white items-center justify-center transition-all shadow-lg z-20"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 text-white items-center justify-center transition-all shadow-lg z-20"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Auto-fading Gesture & Navigation Hint Badge */}
              <div 
                className={`inline-flex absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-20 bg-slate-950/80 backdrop-blur-sm text-slate-300 px-3 py-1 rounded-full text-[11px] font-medium border border-white/10 transition-opacity duration-500 pointer-events-none ${
                  showHint ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {zoomLevel > 1 ? 'Move mouse to pan • Click to reset zoom' : 'Click to zoom in • Double tap or pinch on mobile'}
              </div>
            </div>

            {/* Gallery Info Bar & Mobile Dots Indicator */}
            {allImages.length > 1 && (
              <div className="px-4 py-2 bg-slate-100/95 border-b border-slate-200/80 flex items-center justify-between text-xs text-slate-600 font-medium shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800">Gallery</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 hidden sm:inline">Swipe or tap thumbnails to view</span>
                  <span className="text-slate-500 sm:hidden">Swipe to browse</span>
                </div>
                {/* Mobile / Quick pagination dots */}
                <div className="flex items-center gap-1">
                  {allImages.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        currentIdx === i ? 'w-4 bg-amber-600' : 'w-1.5 bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Scrollable Thumbnails Strip with Snap & Crisp Active Highlight */}
            {allImages.length > 1 && (
              <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2.5 sm:gap-3 overflow-x-auto snap-x scrollbar-none shrink-0">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    ref={(el) => {
                      thumbnailRefs.current[idx] = el;
                    }}
                    type="button"
                    onClick={() => {
                      resetZoom();
                      dismissHint();
                      setCurrentIdx(idx);
                    }}
                    className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden shrink-0 snap-center transition-all duration-150 ${
                      currentIdx === idx
                        ? 'ring-2 ring-amber-500 ring-offset-2 ring-offset-slate-50 scale-105 shadow-md border-amber-500'
                        : 'opacity-60 hover:opacity-100 border border-slate-200'
                    }`}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Project Description & Details */}
        <div className="p-4 sm:p-5 bg-white space-y-3 overflow-y-auto">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
            {project.description}
          </p>

          {project.scopeDetails && project.scopeDetails.length > 0 && (
            <div className="pt-2.5 sm:pt-3 border-t border-slate-100">
              <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                Work Carried Out:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                {project.scopeDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.manufacturers && project.manufacturers.length > 0 && (
            <div className="pt-3.5 border-t border-slate-100 bg-amber-50/50 -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 p-4 sm:p-5 rounded-b-2xl">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Paintbrush className="w-3.5 h-3.5 text-amber-700" />
                <span>This project used the following decorating suppliers:</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.manufacturers.map((man, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white text-slate-900 border border-amber-300/80 shadow-xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    {man}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
