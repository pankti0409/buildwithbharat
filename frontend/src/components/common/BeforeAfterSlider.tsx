import React, { useState, useRef, useCallback } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before (Reported)',
  afterLabel = 'After (Resolved)',
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
      className={`relative w-full aspect-4/3 sm:aspect-16/10 rounded-3xl overflow-hidden select-none cursor-ew-resize border border-ink-border shadow-soft ${className}`}
    >
      {/* After Image (Full background) */}
      <img
        src={afterImage}
        alt="After resolution"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute top-4 right-4 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-500/30">
        {afterLabel}
      </div>

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before resolution"
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
        />
        <div className="absolute top-4 left-4 bg-ink/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
          {beforeLabel}
        </div>
      </div>

      {/* Divider Bar & Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-soft-lg border-2 border-lavender flex items-center justify-center text-lavender-dark">
          <MoveHorizontal className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
