import { cn } from '../../lib/utils';

interface NoiseOverlayProps {
  className?: string;
}

export function NoiseOverlay({ className }: NoiseOverlayProps) {
  return (
    <div className={cn("pointer-events-none fixed inset-0 z-50 mix-blend-overlay opacity-[0.03]", className)}>
      <svg className="h-full w-full opacity-[0.4]" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
