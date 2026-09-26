import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ShimmerBorderProps {
  children: ReactNode;
  className?: string;
}

export function ShimmerBorder({ children, className }: ShimmerBorderProps) {
  return (
    <div className={cn("relative p-[1px] overflow-hidden rounded-xl group", className)}>
      <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
        <div className="animate-border-rotate absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_340deg,#333_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="relative z-10 h-full bg-surface rounded-xl h-full w-full">
        {children}
      </div>
    </div>
  );
}
