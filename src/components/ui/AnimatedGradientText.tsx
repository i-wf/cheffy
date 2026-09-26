import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedGradientText({ children, className }: AnimatedGradientTextProps) {
  return (
    <span 
      className={cn(
        "bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer bg-gradient-to-r from-white via-text-muted to-white",
        className
      )}
    >
      {children}
    </span>
  );
}
