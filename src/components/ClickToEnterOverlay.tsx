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

    // Play deep gothic cinematic sub-bass BOOM impact sound via Web Audio API
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const now = ctx.currentTime;

        // 1. Visceral Transient Impact Thud (Dark low-passed punch)
        const noiseBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.12), ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseBuffer.length; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.setValueAtTime(110, now);
        noiseFilter.frequency.exponentialRampToValueAtTime(26, now + 0.12);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.65, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        noiseSource.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noiseSource.start(now);

        // 2. Heavy Sub-Bass 808 Seismic BOOM Drop (88Hz down to 22Hz true infra-bass)
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(88, now);
        subOsc.frequency.exponentialRampToValueAtTime(22, now + 0.45);

        subGain.gain.setValueAtTime(0.75, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.start(now);
        subOsc.stop(now + 1.6);

        // 3. Dark Gothic Low Sub-Rumble (Triangle wave through 55Hz filter)
        const gothicOsc = ctx.createOscillator();
        const gothicFilter = ctx.createBiquadFilter();
        const gothicGain = ctx.createGain();

        gothicOsc.type = 'triangle';
        gothicOsc.frequency.setValueAtTime(45, now);
        gothicOsc.frequency.exponentialRampToValueAtTime(20, now + 1.2);

        gothicFilter.type = 'lowpass';
        gothicFilter.frequency.setValueAtTime(130, now);
        gothicFilter.frequency.exponentialRampToValueAtTime(32, now + 1.2);

        gothicGain.gain.setValueAtTime(0.42, now);
        gothicGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

        gothicOsc.connect(gothicFilter);
        gothicFilter.connect(gothicGain);
        gothicGain.connect(ctx.destination);
        gothicOsc.start(now);
        gothicOsc.stop(now + 1.4);
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
          : 'opacity-100 scale-100 bg-[#030305]/96 backdrop-blur-3xl'
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
