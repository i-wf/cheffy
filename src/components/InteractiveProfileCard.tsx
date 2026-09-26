import { useRef, useEffect, useState, memo } from 'react';
import { MapPin, Eye, ArrowRight, Sparkles, Users, Flame, Rocket, Link as LinkIcon } from 'lucide-react';
import { useCustomization, type FontFamilyType } from '../context/CustomizationContext';
import { VenomDecoration } from './VenomDecoration';
import { PlatformIcon } from './icons/PlatformIcons';

function getJoinBtnStyle(style?: string): string {
  switch (style) {
    case 'glass-frost':
      return 'bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]';
    case 'neon-purple':
      return 'bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/60 shadow-[0_0_25px_rgba(168,85,247,0.35),inset_0_1px_1px_rgba(255,255,255,0.15)]';
    case 'cyber-cyan':
      return 'bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-400/60 shadow-[0_0_25px_rgba(6,182,212,0.35),inset_0_1px_1px_rgba(255,255,255,0.15)]';
    case 'minimal':
      return 'bg-[#121218] hover:bg-[#181822] border border-white/10 shadow-lg';
    case 'glow-gradient':
    default:
      return 'bg-gradient-to-r from-purple-600/80 via-indigo-600/80 to-purple-700/80 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/40 shadow-[0_4px_24px_rgba(147,51,234,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)]';
  }
}

function renderJoinIcon(icon?: string) {
  switch (icon) {
    case 'sparkles':
      return <Sparkles className="w-4 h-4 text-amber-300" />;
    case 'users':
      return <Users className="w-4 h-4 text-emerald-300" />;
    case 'flame':
      return <Flame className="w-4 h-4 text-rose-400" />;
    case 'rocket':
      return <Rocket className="w-4 h-4 text-cyan-300" />;
    case 'link':
      return <LinkIcon className="w-4 h-4 text-blue-300" />;
    case 'discord':
    default:
      return <PlatformIcon iconKey="discord" size={18} color="#ffffff" />;
  }
}

function getFontFamily(font: FontFamilyType): string {
  switch (font) {
    case 'minecraft': return "'Minecraft', monospace";
    case 'jetbrains': return "'JetBrains Mono', monospace";
    case 'firacode': return "'Fira Code', monospace";
    case 'syne': return "'Syne', sans-serif";
    case 'poppins': return "'Poppins', sans-serif";
    case 'montserrat': return "'Montserrat', sans-serif";
    case 'space-grotesk': return "'Space Grotesk', sans-serif";
    case 'bebas-neue': return "'Bebas Neue', sans-serif";
    case 'playfair': return "'Playfair Display', serif";
    case 'orbitron': return "'Orbitron', sans-serif";
    case 'press-start': return "'Press Start 2P', cursive";
    case 'russo-one': return "'Russo One', sans-serif";
    case 'righteous': return "'Righteous', cursive";
    case 'permanent-marker': return "'Permanent Marker', cursive";
    case 'bangers': return "'Bangers', cursive";
    case 'silkscreen': return "'Silkscreen', cursive";
    case 'inter':
    default:
      return "'Inter', system-ui, sans-serif";
  }
}

export const InteractiveProfileCard = memo(function InteractiveProfileCard() {
  const { config } = useCustomization();
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const [bannerError, setBannerError] = useState(false);

  useEffect(() => {
    setBannerError(false);
  }, [config.bannerUrl]);

  // Typewriter animation state & effect
  const [displayedText, setDisplayedText] = useState(config.username);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (config.usernameEffect !== 'typewriter') {
      setDisplayedText(config.username);
      return;
    }

    const fullText = config.username || 'S';
    let isMounted = true;
    let charIndex = 0;
    let isDeleting = false;
    let timer: any;

    const tick = () => {
      if (!isMounted) return;
      if (!isDeleting) {
        charIndex++;
        setDisplayedText(fullText.substring(0, charIndex));
        if (charIndex >= fullText.length) {
          isDeleting = true;
          timer = setTimeout(tick, 2000);
          return;
        }
        timer = setTimeout(tick, 130);
      } else {
        charIndex--;
        setDisplayedText(fullText.substring(0, charIndex));
        if (charIndex <= 0) {
          isDeleting = false;
          timer = setTimeout(tick, 700);
          return;
        }
        timer = setTimeout(tick, 70);
      }
    };

    timer = setTimeout(tick, 200);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [config.username, config.usernameEffect]);

  useEffect(() => {
    if (config.usernameEffect !== 'typewriter') return;
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(interval);
  }, [config.usernameEffect]);

  // Description typewriter animation state & effect
  const [displayedDesc, setDisplayedDesc] = useState(config.description);
  const [descCursorVisible, setDescCursorVisible] = useState(true);

  useEffect(() => {
    if (config.descriptionEffect !== 'typewriter') {
      setDisplayedDesc(config.description);
      return;
    }

    const fullDesc = config.description || 'welcome to my website';
    let isMounted = true;
    let charIndex = 0;
    let isDeleting = false;
    let timer: any;

    const tick = () => {
      if (!isMounted) return;
      if (!isDeleting) {
        charIndex++;
        setDisplayedDesc(fullDesc.substring(0, charIndex));
        if (charIndex >= fullDesc.length) {
          isDeleting = true;
          timer = setTimeout(tick, 2800);
          return;
        }
        timer = setTimeout(tick, 70);
      } else {
        charIndex--;
        setDisplayedDesc(fullDesc.substring(0, charIndex));
        if (charIndex <= 0) {
          isDeleting = false;
          timer = setTimeout(tick, 700);
          return;
        }
        timer = setTimeout(tick, 35);
      }
    };

    timer = setTimeout(tick, 500);

    const blinkInterval = setInterval(() => {
      if (isMounted) setDescCursorVisible((v) => !v);
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      clearInterval(blinkInterval);
    };
  }, [config.description, config.descriptionEffect]);

  // Ultra-smooth 144Hz continuous LERP physics (zero jitter, silky damping)
  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    if (!config.enableCardTilt) {
      card.style.transform = 'none';
      if (glare) glare.style.opacity = '0';
      return;
    }

    const target = { x: 0, y: 0, isHovering: false, glareX: 50, glareY: 50 };
    const current = { x: 0, y: 0, scale: 1, glareOpacity: 0 };
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const halfWidth = rect.width / 2;
      const halfHeight = rect.height / 2;

      target.x = (x - halfWidth) / 10;
      target.y = (y - halfHeight) / 14;
      target.isHovering = true;
      target.glareX = (x / rect.width) * 100;
      target.glareY = (y / rect.height) * 100;
    };

    const onMouseLeave = () => {
      target.x = 0;
      target.y = 0;
      target.isHovering = false;
    };

    const animateLoop = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      const targetScale = target.isHovering ? 1.02 : 1;
      current.scale += (targetScale - current.scale) * 0.12;

      card.style.transform = `perspective(1000px) rotateY(${current.x.toFixed(2)}deg) rotateX(${(-current.y).toFixed(2)}deg) scale3d(${current.scale.toFixed(3)}, ${current.scale.toFixed(3)}, ${current.scale.toFixed(3)})`;

      if (glare) {
        const targetOpacity = target.isHovering ? 0.75 : 0;
        current.glareOpacity += (targetOpacity - current.glareOpacity) * 0.12;
        glare.style.opacity = current.glareOpacity.toFixed(2);
        glare.style.background = `radial-gradient(circle 380px at ${target.glareX.toFixed(1)}% ${target.glareY.toFixed(1)}%, rgba(255,255,255,0.18), transparent 70%)`;
      }

      rafId = requestAnimationFrame(animateLoop);
    };

    card.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(animateLoop);

    return () => {
      cancelAnimationFrame(rafId);
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [config.enableCardTilt]);

  // Real Glass & Morphism styling classes
  const getTemplateContainerStyles = () => {
    switch (config.template) {
      case 'cyberpunk':
        return 'border-2 border-amber-500/40 bg-[#0a0a0f]/95 shadow-[0_0_40px_rgba(245,158,11,0.12),inset_0_1px_0_rgba(245,158,11,0.1)]';
      case 'neon-glow':
        return 'border border-purple-500/50 bg-[#0a0a12]/90 shadow-[0_0_50px_rgba(168,85,247,0.2),0_0_100px_rgba(168,85,247,0.08)] backdrop-blur-xl';
      case 'frosted-dark':
        return 'border border-white/[0.08] bg-black/40 backdrop-blur-3xl shadow-[0_16px_64px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.1)] ring-1 ring-white/[0.04]';
      case 'holographic':
        return 'border border-white/20 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.04] backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]';
      case 'brutalist':
        return 'border-2 border-white/30 bg-[#111] shadow-[8px_8px_0_rgba(255,255,255,0.1)]';
      case 'retro-crt':
        return 'border border-green-500/30 bg-[#040804]/95 shadow-[0_0_30px_rgba(34,197,94,0.1),inset_0_0_80px_rgba(34,197,94,0.03)]';
      case 'neomorphism':
        return 'shadow-[20px_20px_60px_#040406,-20px_-20px_60px_#14141c] border border-white/5 bg-[#0d0d12]';
      case 'tech':
        return 'border border-cyan-500/40 bg-[#090a10]/95 shadow-[0_0_35px_rgba(6,182,212,0.18),inset_0_1px_0_rgba(6,182,212,0.2)]';
      case 'minimalist':
        return 'border border-white/10 bg-[#0c0c0e] shadow-2xl';
      case 'glassmorphism':
      default:
        // Realistic frosted glass with top refractive bevel and bottom shadow
        return 'border border-white/[0.14] bg-white/[0.05] backdrop-blur-3xl shadow-[0_12px_40px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_1px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/[0.06]';
    }
  };

  const activeBadges = config.badges.filter((b) => b.enabled);
  const activeLogos = config.logoButtons.filter((l) => l.enabled);
  const logoBtnSize = config.logoSize || 72;
  const avatarSize = config.avatarSize || 104;
  const isSeparated = config.cardLayoutType === 'separated';

  const bannerSrc = (config.bannerUrl && !config.bannerUrl.startsWith('blob:')) ? config.bannerUrl : '/back.png';

  const primaryRgb = hexToRgb(config.primaryColor || '#1a1a22');
  const secondaryRgb = hexToRgb(config.secondaryColor || '#2b2b36');
  const opacityDec = (config.profileOpacity ?? 85) / 100;

  const cardBackgroundStyle = {
    background: config.enableProfileGradient
      ? `linear-gradient(145deg, rgba(${primaryRgb}, ${opacityDec}), rgba(${secondaryRgb}, ${opacityDec * 0.85}))`
      : `rgba(${primaryRgb}, ${opacityDec})`,
    backdropFilter: `blur(${config.profileBlur}px)`,
    WebkitBackdropFilter: `blur(${config.profileBlur}px)`,
    borderRadius: `${config.cardBorderRadius || 24}px`,
    borderWidth: `${config.cardBorderWidth ?? 1}px`,
    borderColor: config.cardBorderColor || undefined,
    boxShadow: (config.cardGlowSpread && config.cardGlowSpread > 0)
      ? `0 0 ${config.cardGlowSpread}px ${config.cardGlowColor || '#a855f7'}`
      : undefined,
  };

  return (
    <div style={{ perspective: 1200 }} className="relative flex items-center justify-center p-2 sm:p-4 w-full">
      <div
        ref={cardRef}
        style={{
          width: `${config.cardWidth}px`,
          fontFamily: getFontFamily(config.fontFamily),
          color: config.textColor,
          willChange: 'transform',
          transformStyle: 'preserve-3d',
        }}
        className="relative flex flex-col gap-3.5 select-none transition-transform duration-100 ease-out"
      >
        {/* Dynamic Specular Sheen Overlay */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-40 rounded-3xl transition-opacity duration-150"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18), transparent)',
            opacity: 0,
            mixBlendMode: 'overlay',
          }}
        />

        {/* PRIMARY CARD (Profile Info, Banner, Avatar, Bio, Widgets) */}
        <div
          style={{
            minHeight: config.cardHeight > 0 ? `${config.cardHeight}px` : undefined,
            ...cardBackgroundStyle,
          }}
          className={`relative overflow-hidden transition-shadow duration-300 ${getTemplateContainerStyles()}`}
        >
          {/* Card Texture Overlays */}
          {config.cardTexture === 'scanlines' && (
            <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] opacity-30" />
          )}
          {config.cardTexture === 'dots' && (
            <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:10px_10px] opacity-40" />
          )}
          {config.cardTexture === 'grid' && (
            <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:14px_14px] opacity-40" />
          )}

          {/* Option: Pinned Vertical Badges Rectangle on the right side */}
          {config.badgePosition === 'vertical-pinned' && activeBadges.length > 0 && (
            <div className="absolute right-3.5 top-[calc(9rem+1rem)] z-30 flex flex-col items-center gap-2 p-2 rounded-2xl border border-white/15 bg-black/45 backdrop-blur-xl shadow-lg">
              {activeBadges.map((badge) => (
                <div key={badge.id} className="relative group">
                  <img
                    src={badge.file}
                    alt={badge.name}
                    className="w-5 h-5 object-contain filter drop-shadow hover:scale-125 transition-transform duration-150 cursor-pointer"
                    style={{
                      filter: config.glowBadges ? 'drop-shadow(0 0 6px rgba(255,255,255,0.6))' : 'none',
                    }}
                  />
                  <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md bg-black/90 border border-white/10 text-[10px] font-mono text-white whitespace-nowrap shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    {badge.name}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Top Banner Section */}
          <div className="relative h-36 w-full overflow-hidden bg-gradient-to-br from-[#1a1a2e] to-[#0a0a14]">
            {bannerSrc && !bannerError ? (
              <img
                src={bannerSrc}
                alt="Banner"
                className="w-full h-full object-cover filter brightness-95 contrast-105"
                onError={() => setBannerError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-900/30 via-black/40 to-blue-900/30">
                <span className="text-[11px] font-mono text-white/30 uppercase tracking-widest">Header Banner</span>
              </div>
            )}

            {/* View Counter Badge in Banner (Top Right, matching image 1) */}
            {config.showViewCount && (
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/90 shadow-sm">
                <Eye className="w-3.5 h-3.5 text-white/80" />
                <span>{config.viewCount || '1.2K'}</span>
              </div>
            )}

            {/* Banner Transition Styles (Gradient Fade or Wavy Wave) */}
            {config.bannerFadeStyle === 'wavy' ? (
              <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden pointer-events-none z-10">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
                  <path
                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                    fill="currentColor"
                    className="text-black/85"
                  />
                </svg>
              </div>
            ) : config.bannerFadeStyle === 'gradient' ? (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            )}

            {config.template === 'tech' && (
              <>
                <div className="absolute top-2 left-2 text-[9px] font-mono text-cyan-400/80">SYS.2026 // READY</div>
                <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
              </>
            )}
          </div>

          {/* Main Details Section */}
          <div className={`relative px-6 pb-6 ${config.centeredLayout ? 'flex flex-col items-center text-center pt-0' : 'pt-0'}`}>
            {/* Avatar Area with Dynamic Sizing */}
            <div className={config.centeredLayout ? 'relative group shrink-0 -mt-14 mb-3' : 'flex items-end justify-between -mt-14 mb-3'}>
              <div className="relative group shrink-0">
                {/* Discord Venom Symbiote Decoration (Scales dynamically) */}
                {config.profileDecoration === 'venom' && (
                  <VenomDecoration size={Math.round(avatarSize * 1.45)} />
                )}

                {/* Avatar Circle with Customizable Size */}
                <div
                  style={{
                    width: `${avatarSize}px`,
                    height: `${avatarSize}px`,
                  }}
                  className="rounded-full p-1 bg-gradient-to-b from-white/30 via-white/10 to-black/60 shadow-2xl overflow-hidden border border-white/20 relative z-10 transition-all duration-200"
                >
                  <img
                    src={config.avatarUrl || '/pfp.jpg'}
                    alt={config.username}
                    className="w-full h-full rounded-full object-cover transition-transform duration-200 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/pfp.jpg';
                    }}
                  />
                </div>

                {/* Status Ring / Dot */}
                <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#070709] shadow-md flex items-center justify-center z-30">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                </div>

                {/* Avatar Corner Badges */}
                {config.badgePosition === 'avatar-corner' && activeBadges.length > 0 && (
                  <div className="absolute -top-3 -right-6 z-30 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 border border-white/20 backdrop-blur-md shadow-lg">
                    {activeBadges.map((badge) => (
                      <div key={badge.id} className="relative group">
                        <img
                          src={badge.file}
                          alt={badge.name}
                          className="w-4 h-4 object-contain filter drop-shadow hover:scale-125 transition-transform cursor-pointer"
                          style={{
                            filter: config.glowBadges ? 'drop-shadow(0 0 6px rgba(255,255,255,0.6))' : 'none',
                          }}
                        />
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-black/90 border border-white/10 text-[9px] font-mono text-white whitespace-nowrap shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
                          {badge.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Name & Cyan Verified Checkmark */}
            <div className={`flex items-center gap-2 relative flex-wrap ${config.centeredLayout ? 'justify-center' : ''}`}>
              <h1
                className={`text-2xl font-bold tracking-tight ${
                  config.usernameEffect === 'rainbow' ? 'animate-rainbow' : ''
                } ${config.usernameEffect === 'glitch' ? 'animate-fuzzy' : ''}`}
                style={{
                  color: config.usernameEffect === 'rainbow' ? undefined : config.textColor,
                  filter: config.glowUsername
                    ? config.usernameEffect === 'glow'
                      ? 'drop-shadow(0 0 16px rgba(168,85,247,0.85)) drop-shadow(0 0 32px rgba(168,85,247,0.4))'
                      : 'drop-shadow(0 0 12px rgba(255,255,255,0.45))'
                    : config.usernameEffect === 'glow'
                    ? 'drop-shadow(0 0 14px rgba(168,85,247,0.8))'
                    : 'none',
                }}
              >
                {config.usernameEffect === 'typewriter' ? (
                  <>
                    <span>{displayedText}</span>
                    <span className={`inline-block font-mono text-purple-400 font-light ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>
                      |
                    </span>
                  </>
                ) : config.usernameEffect === 'wave' ? (
                  <span className="inline-flex">
                    {config.username.split('').map((ch, idx) => (
                      <span
                        key={idx}
                        className="inline-block animate-bounce"
                        style={{ animationDelay: `${idx * 0.08}s`, animationDuration: '1s' }}
                      >
                        {ch === ' ' ? '\u00A0' : ch}
                      </span>
                    ))}
                  </span>
                ) : (
                  config.username
                )}
              </h1>

              {/* Verified Checkmark with Dynamic Color */}
              <svg
                className="w-5 h-5 shrink-0 inline-block"
                style={{
                  color: config.verifiedBadgeColor || '#22d3ee',
                  filter: `drop-shadow(0 0 8px ${config.verifiedBadgeColor || '#22d3ee'}80)`,
                }}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>

              {/* Badges Inlined next to name if requested */}
              {config.badgePosition === 'inline' && activeBadges.map((badge) => (
                <div key={badge.id} className="relative group inline-block">
                  <img
                    src={badge.file}
                    alt={badge.name}
                    className="w-5 h-5 object-contain filter drop-shadow hover:scale-125 transition-transform duration-150 cursor-pointer inline-block"
                    style={{
                      filter: config.glowBadges ? 'drop-shadow(0 0 6px rgba(255,255,255,0.6))' : 'none',
                    }}
                  />
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-black/90 border border-white/10 text-[10px] font-mono text-white whitespace-nowrap shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    {badge.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Dedicated Badges Pill / Capsule Container (Image 1: All in one rectangle / outliner) */}
            {config.badgePosition === 'capsule' && activeBadges.length > 0 && (
              <div className={`mt-2.5 flex items-center ${config.centeredLayout ? 'justify-center' : 'justify-start'}`}>
                <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#161622]/90 border border-white/15 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.5)]">
                  {activeBadges.map((badge) => (
                    <div key={badge.id} className="relative group">
                      <img
                        src={badge.file}
                        alt={badge.name}
                        className="w-5 h-5 object-contain filter drop-shadow hover:scale-125 transition-transform duration-150 cursor-pointer"
                        style={{
                          filter: config.glowBadges ? 'drop-shadow(0 0 6px rgba(255,255,255,0.6))' : 'none',
                        }}
                      />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-black/90 border border-white/10 text-[10px] font-mono text-white whitespace-nowrap shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
                        {badge.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description with Effects (Typewriter, Rainbow, Glitch, Glow, Wave) */}
            <div
              className={`text-sm mt-2 leading-relaxed opacity-85 ${
                config.descriptionEffect === 'rainbow' ? 'animate-rainbow font-medium' : ''
              } ${config.descriptionEffect === 'glitch' ? 'animate-fuzzy' : ''}`}
              style={{
                color: config.descriptionEffect === 'rainbow' ? undefined : config.textColor,
                filter:
                  config.descriptionEffect === 'glow'
                    ? 'drop-shadow(0 0 10px rgba(168,85,247,0.85)) drop-shadow(0 0 20px rgba(168,85,247,0.4))'
                    : 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
              }}
            >
              {config.descriptionEffect === 'typewriter' ? (
                <>
                  <span>{displayedDesc}</span>
                  <span
                    className={`inline-block font-mono text-purple-400 font-light ml-0.5 ${
                      descCursorVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    |
                  </span>
                </>
              ) : config.descriptionEffect === 'wave' ? (
                <span className="inline-flex flex-wrap">
                  {config.description.split('').map((ch, idx) => (
                    <span
                      key={idx}
                      className="inline-block animate-bounce"
                      style={{ animationDelay: `${idx * 0.05}s`, animationDuration: '1.2s' }}
                    >
                      {ch === ' ' ? '\u00A0' : ch}
                    </span>
                  ))}
                </span>
              ) : (
                config.description
              )}
            </div>

            {/* Location ("📍 MASKAT" - Matching image 1) */}
            {config.location && (
              <div className={`mt-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider opacity-75 ${config.centeredLayout ? 'justify-center' : ''}`}>
                <MapPin className="w-3.5 h-3.5 text-white/90 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
                <span>{config.location}</span>
              </div>
            )}

            {/* Discord Presence Widget Embed */}
            {config.profileWidget === 'discord' && (
              <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-md w-full">
                <a
                  href={`https://discord.com/users/${config.discordId || '183234792534310912'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-95 transition-opacity"
                >
                  <img
                    src={`https://discord.c99.nl/widget/theme-4/${config.discordId || '183234792534310912'}.png`}
                    alt="Discord Presence"
                    loading="lazy"
                    className="w-full h-auto block"
                  />
                </a>
              </div>
            )}

            {/* Click to Join / Community Invite CTA Button */}
            {config.showJoinButton && (
              <div className="mt-4 w-full">
                <a
                  href={config.joinButtonUrl || 'https://discord.gg/chef'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center justify-between px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden ${getJoinBtnStyle(config.joinButtonStyle)}`}
                >
                  {/* Shimmer sweep animation */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                  <div className="flex items-center gap-3 relative z-10 min-w-0">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white/10 border border-white/15 shadow-inner group-hover:scale-110 transition-transform">
                      {renderJoinIcon(config.joinButtonIcon)}
                    </div>
                    <div className="flex flex-col text-left truncate">
                      <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5 truncate">
                        {config.joinButtonText || 'Click to Join'}
                      </span>
                      {config.joinButtonSubtext && (
                        <span className="text-[11px] font-mono text-white/60 group-hover:text-white/80 transition-colors truncate">
                          {config.joinButtonSubtext}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 relative z-10 shrink-0">
                    {config.joinButtonBadge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.3)] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {config.joinButtonBadge}
                      </span>
                    )}
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </a>
              </div>
            )}

            {/* Single Card Mode: Logos embedded inside primary card */}
            {!isSeparated && activeLogos.length > 0 && (
              <div
                style={{
                  gap: `${config.dockBarGap ?? 20}px`,
                  marginTop: `${Math.max(16, (config.dockBarPadding ?? 20) + 4)}px`,
                  padding: `${Math.round((config.dockBarPadding ?? 20) * 0.4)}px 0`,
                }}
                className="flex items-center justify-center flex-wrap"
              >
                {activeLogos.map((logo) => (
                  <div key={logo.id} className="relative group">
                    <a
                      href={logo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-all duration-200 hover:scale-115 active:scale-95 text-white/90 hover:text-white"
                      style={{
                        width: `${logoBtnSize}px`,
                        height: `${logoBtnSize}px`,
                        filter: config.glowLogoButtons
                          ? 'drop-shadow(0 0 14px rgba(255,255,255,0.5))'
                          : 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
                      }}
                    >
                      {logo.iconKey && logo.iconKey !== 'custom' ? (
                        <PlatformIcon
                          iconKey={logo.iconKey}
                          customFile={logo.file}
                          size={Math.round(logoBtnSize * 0.90)}
                          className="transition-transform group-hover:scale-110"
                        />
                      ) : logo.file ? (
                        <img
                          src={logo.file}
                          alt={logo.name}
                          className="w-full h-full object-contain filter drop-shadow p-0.5"
                        />
                      ) : (
                        <PlatformIcon
                          iconKey="link"
                          size={Math.round(logoBtnSize * 0.90)}
                        />
                      )}
                    </a>

                    {/* Hover Tooltip (NAME ONLY per media_1790425267391.png) */}
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[#0e0e14]/95 border border-white/15 text-xs font-mono text-white whitespace-nowrap shadow-2xl pointer-events-none opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 z-50 flex items-center backdrop-blur-md">
                      <span className="font-semibold text-white">{logo.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SEPARATED CARDS TEMPLATE: Distinct standalone bottom card for logos and links */}
        {isSeparated && activeLogos.length > 0 && (
          <div
            style={{
              ...cardBackgroundStyle,
              padding: `${config.dockBarPadding ?? 20}px ${Math.round((config.dockBarPadding ?? 20) * 1.35)}px`,
              gap: `${config.dockBarGap ?? 20}px`,
            }}
            className={`relative flex items-center justify-center flex-wrap transition-all duration-300 ${getTemplateContainerStyles()}`}
          >
            {activeLogos.map((logo) => (
              <div key={logo.id} className="relative group">
                <a
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-all duration-200 hover:scale-115 active:scale-95 text-white/90 hover:text-white"
                  style={{
                    width: `${logoBtnSize}px`,
                    height: `${logoBtnSize}px`,
                    filter: config.glowLogoButtons
                      ? 'drop-shadow(0 0 14px rgba(255,255,255,0.5))'
                      : 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
                  }}
                >
                  {logo.iconKey && logo.iconKey !== 'custom' ? (
                    <PlatformIcon
                      iconKey={logo.iconKey}
                      customFile={logo.file}
                      size={Math.round(logoBtnSize * 0.90)}
                      className="transition-transform group-hover:scale-110"
                    />
                  ) : logo.file ? (
                    <img
                      src={logo.file}
                      alt={logo.name}
                      className="w-full h-full object-contain filter drop-shadow p-0.5"
                    />
                  ) : (
                    <PlatformIcon
                      iconKey="link"
                      size={Math.round(logoBtnSize * 0.90)}
                    />
                  )}
                </a>

                {/* Hover Tooltip (NAME ONLY per media_1790425267391.png) */}
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[#0e0e14]/95 border border-white/15 text-xs font-mono text-white whitespace-nowrap shadow-2xl pointer-events-none opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 z-50 flex items-center backdrop-blur-md">
                  <span className="font-semibold text-white">{logo.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

function hexToRgb(hex: string): string {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return `${r}, ${g}, ${b}`;
  }
  const r = parseInt(cleanHex.substring(0, 2), 16) || 15;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 15;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 18;
  return `${r}, ${g}, ${b}`;
}
