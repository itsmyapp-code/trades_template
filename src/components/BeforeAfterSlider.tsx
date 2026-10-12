'use client';

import React, { useState, useRef, useCallback } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  alt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  aspectRatio?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  alt = 'Before and After comparison',
  beforeLabel = 'Before',
  afterLabel = 'After',
  className = '',
  aspectRatio = 'aspect-[4/3] sm:aspect-[16/10]',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  if (!beforeImage || !afterImage) return null;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-label={alt}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
      className={`relative w-full ${aspectRatio} overflow-hidden select-none touch-none rounded-2xl bg-slate-900 cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-amber-400 ${className}`}
    >
      {/* 1. Base Layer: AFTER Image */}
      <div className="absolute inset-0 w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={afterImage}
          alt={`${alt} - ${afterLabel}`}
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
        {/* Floating After Badge */}
        <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold tracking-wider uppercase border border-white/20 shadow-md">
          {afterLabel}
        </div>
      </div>

      {/* 2. Clipped Overlay: BEFORE Image */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden z-10"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeImage}
          alt={`${alt} - ${beforeLabel}`}
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
        {/* Floating Before Badge */}
        <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-amber-300 text-xs font-semibold tracking-wider uppercase border border-amber-400/30 shadow-md">
          {beforeLabel}
        </div>
      </div>

      {/* 3. Divider Line & Centered Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white z-20 pointer-events-none shadow-[0_0_8px_rgba(0,0,0,0.6)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-slate-900 shadow-2xl flex items-center justify-center border-2 border-amber-500 transition-transform active:scale-95">
          <ChevronsLeftRight className="w-5 h-5 text-slate-900" />
        </div>
      </div>
    </div>
  );
}
