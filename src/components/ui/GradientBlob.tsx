import { cn } from '../../lib/utils';

interface GradientBlobProps {
  className?: string;
}

export function GradientBlob({ className }: GradientBlobProps) {
  return (
    <div 
      className={cn(
        "absolute rounded-full blur-[100px] animate-float opacity-[0.05] pointer-events-none bg-white",
        className
      )}
    />
  );
}
