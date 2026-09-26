import { useState, useEffect } from 'react';

interface ClickToEnterOverlayProps {
  text?: string;
  onEnter?: () => void;
}

export function ClickToEnterOverlay({ text = 'click to enter...', onEnter }: ClickToEnterOverlayProps) {
  const [hasEntered, setHasEntered] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleEnter = () => {
    if (hasEntered) return;
    setIsFading(true);

    // Play subtle crystal unlock sound via Web Audio API
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.18); // A5
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      }
    } catch {
      // Audio not supported or blocked
    }

    // Trigger music start custom event (overcoming autoplay restrictions)
    window.dispatchEvent(new CustomEvent('chef_start_music'));

    if (onEnter) {
      onEnter();
    }

    // Smooth exit transition
    setTimeout(() => {
      setHasEntered(true);
    }, 700);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasEntered && (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape')) {
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasEntered]);

  if (hasEntered) {
    return null;
  }

  return (
    <div
      onClick={handleEnter}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-700 ease-out ${
        isFading
          ? 'opacity-0 scale-105 pointer-events-none backdrop-blur-none bg-transparent'
          : 'opacity-100 scale-100 bg-[#070709]/85 backdrop-blur-2xl'
      }`}
      style={{
        transitionProperty: 'opacity, transform, backdrop-filter',
      }}
    >
      {/* Centered Minimal Prompt matching media_1790438807113.png */}
      <div className="flex flex-col items-center gap-3">
        <span
          className="text-base sm:text-lg font-bold font-mono tracking-wider text-white lowercase animate-pulse"
          style={{
            textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)',
          }}
        >
          {text || 'click to enter...'}
        </span>
        <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">
          [ tap anywhere to unlock ]
        </span>
      </div>
    </div>
  );
}
