import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  number: string;
  label: string;
  className?: string;
}

export function SectionHeading({ number, label, className }: SectionHeadingProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn("flex items-center gap-4 mb-12", className)}
    >
      <span className="font-mono text-text-muted text-sm">{number}</span>
      <h2 className="font-mono text-2xl font-bold uppercase tracking-widest text-text-primary">{label}</h2>
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="h-px bg-border flex-grow origin-left"
      />
    </motion.div>
  );
}
