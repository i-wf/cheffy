import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  speed?: 'normal' | 'slow';
  className?: string;
}

export function Marquee({ children, reverse, className }: MarqueeProps) {
  return (
    <div className={cn("relative flex overflow-hidden group w-full", className)}>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className={cn(
        "flex w-max min-w-full shrink-0 items-center justify-around gap-4 group-hover:[animation-play-state:paused]",
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      )}>
        {children}
        {children}
      </div>
    </div>
  );
}
