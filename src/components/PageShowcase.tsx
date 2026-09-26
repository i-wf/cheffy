import { useState, useEffect, useRef } from 'react';
import {
  ExternalLink,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Cpu,
  Clock,
  Radio,
  Star,
  Activity,
  Zap,
} from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';
import { PlatformIcon } from './icons/PlatformIcons';

export function PageShowcase() {
  const { config } = useCustomization();

  // Audio Player State using Web Audio Synthesizer (100% reliable, zero external network dependency)
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const synthIntervalRef = useRef<any>(null);

  // Live Clock (Maskat UTC+4 / Local Time)
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Maskat is UTC+4
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Muscat',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      try {
        setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
      } catch {
        setCurrentTime(now.toLocaleTimeString());
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Web Audio Synthesized Lo-Fi Beat Engine
  const startSynthMusic = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const gain = ctx.createGain();
      gain.gain.value = isMuted ? 0 : volume * 0.15;
      gain.connect(ctx.destination);
      gainNodeRef.current = gain;

      // Lo-fi chord sequence in pentatonic minor (Eb, G, Bb, C)
      const chordFrequencies = [
        [155.56, 196.0, 233.08, 311.13], // Eb minor
        [174.61, 220.0, 261.63, 349.23], // F minor
        [130.81, 164.81, 196.0, 261.63], // C minor
        [146.83, 174.61, 220.0, 293.66], // D minor
      ];

      let chordIndex = 0;
      const playChord = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const currentChord = chordFrequencies[chordIndex % chordFrequencies.length];
        chordIndex++;

        currentChord.forEach((freq) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          noteGain.gain.setValueAtTime(0, ctx.currentTime);
          noteGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.4);
          noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.8);

          osc.connect(noteGain);
          noteGain.connect(gain);

          osc.start();
          osc.stop(ctx.currentTime + 3.0);
        });
      };

      playChord();
      synthIntervalRef.current = setInterval(playChord, 3200);
      setIsPlaying(true);
    } catch {
      // Audio autoplay blocked or unsupported
      setIsPlaying(false);
    }
  };

  const stopSynthMusic = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const togglePlayMusic = () => {
    if (isPlaying) {
      stopSynthMusic();
    } else {
      startSynthMusic();
    }
  };

  // Soundboard Trigger: Synthesize immediate sound FX
  const playSoundEffect = (type: 'beep' | 'laser' | 'crystal' | 'level') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      gain.connect(ctx.destination);

      if (type === 'beep') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'laser') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.22);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        osc.connect(gain);
        osc.start();
        osc.stop(ctx.currentTime + 0.22);
      } else if (type === 'crystal') {
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'sine';
          o.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);
          g.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.05);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(ctx.currentTime + idx * 0.05);
          o.stop(ctx.currentTime + 0.65);
        });
      } else if (type === 'level') {
        [440, 554.37, 659.25, 880].forEach((freq, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
          g.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.07);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(ctx.currentTime + idx * 0.07);
          o.stop(ctx.currentTime + 0.55);
        });
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0 : volume * 0.15;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    return () => {
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  if (!config.showPageShowcase) {
    return null;
  }

  const projects = config.projects || [];
  const skills = config.skills || [];

  return (
    <section className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-8 pt-16 pb-28 flex flex-col gap-10">
      {/* Interactive Music Player Bar (Aesthetic Floating Glass Deck) */}
      {config.enableMusicPlayer && (
        <div className="w-full rounded-2xl p-4 sm:p-5 bg-black/40 border border-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <button
              onClick={togglePlayMusic}
              className="w-12 h-12 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 shrink-0"
              title={isPlaying ? 'Pause Lo-Fi' : 'Play Lo-Fi Ambient'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold font-mono text-white">
                  {config.musicTrackTitle || 'Chef - Midnight Chill'}
                </span>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30">
                  <Radio className="w-3 h-3 text-purple-400 animate-pulse" />
                  <span>SYNTH LIVE</span>
                </span>
              </div>
              <p className="text-xs text-white/40 font-mono mt-0.5">
                {config.musicTrackArtist || 'Cheffy Beats'} • Web Audio Synthesizer
              </p>
            </div>
          </div>

          {/* Equalizer Frequency Bars */}
          <div className="flex items-end gap-1 h-7 px-3 py-1 bg-black/40 rounded-xl border border-white/5">
            {[35, 75, 50, 95, 60, 40, 85, 100, 70, 45, 90, 60, 80, 55].map((h, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-150 ${
                  isPlaying
                    ? 'bg-gradient-to-t from-purple-500 to-cyan-400'
                    : 'bg-white/20'
                }`}
                style={{
                  height: isPlaying ? `${h}%` : '20%',
                  animation: isPlaying ? `pulse 0.8s ease-in-out infinite alternate` : 'none',
                  animationDelay: `${(i * 0.06).toFixed(2)}s`,
                }}
              />
            ))}
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-20 accent-purple-500 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Header of Main Page Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Works & Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            {config.showcaseTitle || 'Portfolio & Arsenal'}
          </h2>
          <p className="text-sm font-mono text-white/40 mt-1">
            {config.showcaseSubtitle || 'Selected works, interactive modules & technical stack'}
          </p>
        </div>

        {/* Live Clock & Status Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/70">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>{config.location || 'MASKAT'}: {currentTime}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Available</span>
          </div>
        </div>
      </div>

      {/* Featured Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="group relative rounded-2xl p-5 bg-black/40 border border-white/10 hover:border-purple-400/40 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(168,85,247,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-purple-300">
                  {proj.tag}
                </span>
                {proj.stars && (
                  <span className="flex items-center gap-1 text-xs font-mono text-amber-300/80">
                    <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                    <span>{proj.stars}</span>
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                {proj.title}
              </h3>
              <p className="text-xs text-white/60 leading-relaxed mt-2 font-sans">
                {proj.description}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-5 pt-3 border-t border-white/5">
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-mono transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Demo</span>
                </a>
              )}
              {proj.github && (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 text-xs font-mono transition-colors"
                >
                  <PlatformIcon iconKey="github" size={14} />
                  <span>Code</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Skills Arsenal & Interactive Soundboard Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Skills & Technical Stack (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl p-5 bg-black/40 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400 mb-1">
              <Cpu className="w-4 h-4" />
              <span>Technical Arsenal</span>
            </div>
            <p className="text-xs text-white/50 font-mono">
              Core technologies, systems architecture, and specialized engineering toolkits
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-purple-600/20 border border-white/10 hover:border-purple-400/40 text-xs font-mono text-white/80 hover:text-white transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Interactive Audio VFX Soundboard (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl p-5 bg-black/40 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
              <Activity className="w-4 h-4" />
              <span>Interactive Soundboard</span>
            </div>
            <p className="text-xs text-white/50 font-mono">
              Real-time Web Audio synthesized cues
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => playSoundEffect('beep')}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white/5 hover:bg-purple-600/30 border border-white/10 text-xs font-mono text-white/80 hover:text-purple-200 transition-all active:scale-95 shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>Cyber Beep</span>
            </button>

            <button
              onClick={() => playSoundEffect('laser')}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white/5 hover:bg-cyan-600/30 border border-white/10 text-xs font-mono text-white/80 hover:text-cyan-200 transition-all active:scale-95 shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Laser Zap</span>
            </button>

            <button
              onClick={() => playSoundEffect('crystal')}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white/5 hover:bg-emerald-600/30 border border-white/10 text-xs font-mono text-white/80 hover:text-emerald-200 transition-all active:scale-95 shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Crystal Ping</span>
            </button>

            <button
              onClick={() => playSoundEffect('level')}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white/5 hover:bg-amber-600/30 border border-white/10 text-xs font-mono text-white/80 hover:text-amber-200 transition-all active:scale-95 shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Level Up</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
