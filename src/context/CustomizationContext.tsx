import React, { createContext, useContext, useState, useEffect } from 'react';
import savedConfigData from '../data/savedConfig.json';

export type TemplateStyle = 
  | 'glassmorphism' 
  | 'neomorphism' 
  | 'tech' 
  | 'minimalist' 
  | 'cyberpunk' 
  | 'neon-glow' 
  | 'frosted-dark' 
  | 'holographic' 
  | 'brutalist' 
  | 'retro-crt';

export type FontFamilyType = 
  | 'minecraft' 
  | 'inter' 
  | 'jetbrains' 
  | 'firacode' 
  | 'syne' 
  | 'poppins' 
  | 'montserrat' 
  | 'space-grotesk' 
  | 'bebas-neue' 
  | 'playfair' 
  | 'orbitron' 
  | 'press-start' 
  | 'russo-one' 
  | 'righteous' 
  | 'permanent-marker' 
  | 'bangers' 
  | 'silkscreen';

export interface CustomBadgeItem {
  id: string;
  name: string;
  file: string;
  enabled: boolean;
}

export interface LogoButtonItem {
  id: string;
  name: string;
  url: string;
  iconKey?: string; // 'discord' | 'x' | 'tiktok' | 'spotify' | 'roblox' | 'youtube' | 'twitch' | 'github' etc.
  file?: string;    // custom image / svg URL
  enabled: boolean;
}

export interface CryptoButtonItem {
  id: string;
  name: string;      // e.g. 'Bitcoin', 'Ethereum'
  coinKey: string;    // 'btc' | 'eth' | 'sol' | 'ltc' | 'usdt' | 'bnb' | 'xrp' | 'doge' | 'ada' | 'matic'
  address: string;    // wallet address to copy
  enabled: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  link?: string;
  github?: string;
  stars?: string;
}

export interface SiteConfig {
  // Dimensions & Geometry
  cardWidth: number;   // 320 - 640
  cardHeight: number;  // 0 = auto

  // Performance & Motion
  enableCardTilt: boolean; // Ultra-smooth 144Hz 3D tilt

  // Global Typography
  fontFamily: FontFamilyType;

  // Template & Morphism
  template: TemplateStyle;

  // Assets (PFP, Banner, Wallpaper, Cursor)
  avatarUrl: string;
  avatarSize: number; // 64 - 140 px (toggable slider)
  bannerUrl: string;
  bgMediaType: 'image' | 'video';
  bgCustomUrl: string; // image or mp4 video URL
  bgOverlayOpacity: number; // 0 - 90
  cursorType: 'default' | 'cross' | 'custom';
  cursorCustomUrl: string;
  enableSparkleTrail: boolean;

  // Layout & Alignment
  cardLayoutType: 'single' | 'separated' | 'landscape'; // Separated Dual Cards, Unified Card, or Landscape
  centeredLayout: boolean; // Move profile in middle (switch)
  bannerFadeStyle: 'none' | 'gradient' | 'wavy';
  badgePosition: 'capsule' | 'vertical-pinned' | 'inline' | 'inline-capsule' | 'avatar-corner';
  profileDecoration: 'none' | 'venom' | 'ghost';
  showViewCount: boolean;
  viewCount: string;

  // Card Appearance & Color Design Suite
  cardBorderRadius: number; // 12 - 40 px
  cardBorderWidth: number;  // 0 - 3 px
  cardBorderColor: string;
  cardGlowColor: string;
  cardGlowSpread: number;   // 0 - 40 px
  cardTexture: 'none' | 'scanlines' | 'dots' | 'grid';
  verifiedBadgeColor: string; // Cyan, Gold, Purple, Emerald, Ruby

  // Main Page Showcase Section (OUT of the card!)
  showPageShowcase: boolean;
  showcaseTitle: string;
  showcaseSubtitle: string;
  projects: ProjectItem[];
  skills: string[];

  // Background Music / Lo-Fi Player
  enableMusicPlayer: boolean;
  musicTrackTitle: string;
  musicTrackArtist: string;
  musicAudioUrl: string;

  // General Customization
  username: string;
  usernameEffect: 'none' | 'typewriter' | 'rainbow' | 'glitch' | 'glow' | 'wave';
  description: string;
  descriptionEffect: 'none' | 'typewriter' | 'rainbow' | 'glitch' | 'glow' | 'wave';
  location: string;
  profileWidget: 'discord' | 'none';
  discordId: string;
  discordTheme: 1 | 2 | 3; // Themes 1, 2, 3 for discord.c99.nl
  profileOpacity: number; // 20 - 100
  profileBlur: number;    // 0 - 80

  // Click to Enter Landing Screen
  enableClickToEnter: boolean;
  clickToEnterText: string;

  // Glow Settings
  glowUsername: boolean;
  glowSocials: boolean;
  glowLogoButtons: boolean;
  glowBadges: boolean;

  // Colors
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  iconColor: string;
  backgroundEffectColor: string;
  primaryColor: string;
  secondaryColor: string;
  enableProfileGradient: boolean;

  // Other Customization Toggles
  monochromeIcons: boolean;
  animatedTitle: boolean;
  swapBoxColors: boolean;
  volumeControl: boolean;
  useDiscordAvatar: boolean;
  discordAvatarDecoration: boolean;

  // Logo Button Controls & Dock Bar Sizing
  logoSize: number; // 28 - 160 px
  dockBarPadding: number; // 10 - 44 px
  dockBarGap: number; // 8 - 40 px

  // Click to Join / Community CTA Button
  showJoinButton: boolean;
  joinButtonText: string;
  joinButtonSubtext: string;
  joinButtonUrl: string;
  joinButtonIcon: 'discord' | 'sparkles' | 'users' | 'flame' | 'rocket' | 'link';
  joinButtonStyle: 'glow-gradient' | 'glass-frost' | 'neon-purple' | 'cyber-cyan' | 'minimal';
  joinButtonBadge: string;

  // Master Admin Passphrase
  adminPassword?: string;

  // Custom Badges
  badges: CustomBadgeItem[];

  // Changeable Logo Buttons
  logoButtons: LogoButtonItem[];

  // Crypto / Wallet Address Copy Buttons
  cryptoButtons: CryptoButtonItem[];
}

const defaultBadges: CustomBadgeItem[] = [
  { id: 'better_crown', name: 'Crown', file: '/icons/better_crown_2-removebg-preview.png', enabled: true },
  { id: 'ak47_left', name: 'AK47 Left', file: '/icons/AK47_left.gif', enabled: true },
  { id: 'a6', name: 'Wings A6', file: '/icons/a6.png', enabled: true },
  { id: 'slayer', name: 'Kanji Slayer', file: '/icons/slayer_white.png', enabled: true },
  { id: 'a7', name: 'Wings A7', file: '/icons/a7.png', enabled: true },
  { id: 'ak47_right', name: 'AK47 Right', file: '/icons/AK47_RIght.gif', enabled: true },
  { id: 'purple_orb', name: 'Cyber Orb', file: '/icons/3c3cf39e307538e4e8231409994aabf7.gif', enabled: false },
  { id: 'spin_badge', name: 'Badge Spin', file: '/icons/856110470120210453.gif', enabled: false },
  { id: 'glitch_cat', name: 'Glitch Cat', file: '/icons/b0642c034bcf83509f86ff1bc493d8aa.gif', enabled: false },
  { id: 'magic_glow', name: 'Magic Glow', file: '/icons/cf04586a21e32ce7cadbbfcbf99cd624.gif', enabled: false },
  { id: 'cube_spin', name: '3D Cube', file: '/icons/Untitled_480_x_480_px_2.gif', enabled: false },
  { id: 'sin_titulo', name: 'Sin Titulo', file: '/icons/406_sin_titulo_20241209162217.png', enabled: false },
];

const defaultLogoButtons: LogoButtonItem[] = [
  { id: 'discord', name: 'Discord', iconKey: 'discord', file: '/icons/logo/14F54D83-4A75-4593-885C-6152E0D2C562.png', url: 'https://discord.com', enabled: true },
  { id: 'tiktok', name: 'TikTok', iconKey: 'tiktok', file: '/icons/logo/30DA14C4-8D0C-4105-A345-E0F68F461151.png', url: 'https://tiktok.com', enabled: true },
  { id: 'spotify', name: 'Spotify', iconKey: 'spotify', file: '/icons/logo/BC611DD6-29F7-4F55-87C6-531C8DD6C669.png', url: 'https://spotify.com', enabled: true },
  { id: 'roblox', name: 'Roblox', iconKey: 'roblox', file: '/icons/logo/E62F1811-A463-492C-8751-6CE0B1C801B3.png', url: 'https://roblox.com', enabled: true },
];

const defaultCryptoButtons: CryptoButtonItem[] = [
  { id: 'btc', name: 'Bitcoin', coinKey: 'btc', address: '', enabled: false },
  { id: 'eth', name: 'Ethereum', coinKey: 'eth', address: '', enabled: false },
  { id: 'sol', name: 'Solana', coinKey: 'sol', address: '', enabled: false },
  { id: 'ltc', name: 'Litecoin', coinKey: 'ltc', address: '', enabled: false },
  { id: 'usdt', name: 'Tether', coinKey: 'usdt', address: '', enabled: false },
];

const defaultProjects: ProjectItem[] = [
  {
    id: 'proj_1',
    title: 'Cheffy Cloud Engine',
    description: 'High-performance microservices cluster with 99.99% uptime and zero-latency WebSockets.',
    tag: 'TypeScript • Rust',
    link: 'https://cheffy.lol',
    github: 'https://github.com',
    stars: '1.4k',
  },
  {
    id: 'proj_2',
    title: 'Aesthetic UI / VFX Framework',
    description: 'Next-gen glassmorphism design system featuring GPU-accelerated shaders and LERP physics.',
    tag: 'React • Tailwind • WebGL',
    link: 'https://cheffy.lol',
    github: 'https://github.com',
    stars: '890',
  },
  {
    id: 'proj_3',
    title: 'Zero-Knowledge Security Suite',
    description: 'End-to-end cryptographic key vault utilizing Argon2id hashing and ChaCha20-Poly1305.',
    tag: 'Security • Cryptography',
    link: 'https://cheffy.lol',
    github: 'https://github.com',
    stars: '620',
  },
];

const defaultSkills: string[] = [
  'Full-Stack Dev',
  'TypeScript',
  'React / Next.js',
  'Rust',
  'Node.js',
  'Tailwind CSS',
  'UI/UX Design',
  'Linux & DevOps',
  'Reverse Engineering',
  'Cybersecurity',
];

const defaultConfig: SiteConfig = {
  cardWidth: 440,
  cardHeight: 0,
  enableCardTilt: true,
  fontFamily: 'minecraft',
  template: 'glassmorphism',

  avatarUrl: '/pfp.jpg',
  avatarSize: 104,
  bannerUrl: '/back.png',
  bgMediaType: 'image',
  bgCustomUrl: '',
  bgOverlayOpacity: 45,
  cursorType: 'cross',
  cursorCustomUrl: 'https://cur.cursors-4u.net/cursors/cur-4/cur381.cur',
  enableSparkleTrail: true,

  cardLayoutType: 'separated',
  centeredLayout: true,
  bannerFadeStyle: 'gradient',
  badgePosition: 'capsule',
  profileDecoration: 'venom',
  showViewCount: true,
  viewCount: '1.2K',

  // Card Appearance & Color Design Suite
  cardBorderRadius: 24,
  cardBorderWidth: 1,
  cardBorderColor: '#ffffff22',
  cardGlowColor: '#a855f7',
  cardGlowSpread: 0,
  cardTexture: 'none',
  verifiedBadgeColor: '#22d3ee',

  // Main Page Showcase Section (OUT of the card!)
  showPageShowcase: true,
  showcaseTitle: 'Portfolio & Arsenal',
  showcaseSubtitle: 'Selected works, interactive modules & technical stack',
  projects: defaultProjects,
  skills: defaultSkills,

  // Background Music / Lo-Fi Player
  enableMusicPlayer: true,
  musicTrackTitle: 'Chef - Midnight Chill',
  musicTrackArtist: 'Cheffy Beats',
  musicAudioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',

  username: 'S',
  usernameEffect: 'typewriter',
  description: 'welcome to my website',
  descriptionEffect: 'typewriter',
  location: 'MASKAT',
  profileWidget: 'discord',
  discordId: '183234792534310912',
  discordTheme: 2,
  profileOpacity: 85,
  profileBlur: 24,

  // Click to Enter Screen
  enableClickToEnter: true,
  clickToEnterText: 'click to enter...',

  glowUsername: true,
  glowSocials: true,
  glowLogoButtons: true,
  glowBadges: true,

  accentColor: '#000000',
  textColor: '#ffffff',
  backgroundColor: '#070709',
  iconColor: '#ffffff',
  backgroundEffectColor: '#3f3f3f',
  primaryColor: '#1a1a22',
  secondaryColor: '#2b2b36',
  enableProfileGradient: true,

  monochromeIcons: true,
  animatedTitle: true,
  swapBoxColors: false,
  volumeControl: true,
  useDiscordAvatar: false,
  discordAvatarDecoration: true,

  logoSize: 72,
  dockBarPadding: 20,
  dockBarGap: 20,

  // Click to Join / Community CTA
  showJoinButton: true,
  joinButtonText: 'Click to Join',
  joinButtonSubtext: 'discord.gg/chef',
  joinButtonUrl: 'https://discord.gg/chef',
  joinButtonIcon: 'discord',
  joinButtonStyle: 'glow-gradient',
  joinButtonBadge: 'ONLINE',

  // Master Admin Passphrase
  adminPassword: 'Chef!992831#Zyo$Quantum*Obsidian&Vault%Nexus',

  badges: defaultBadges,
  logoButtons: defaultLogoButtons,
  cryptoButtons: defaultCryptoButtons,
};

interface CustomizationContextType {
  config: SiteConfig;
  updateConfig: (updates: Partial<SiteConfig>) => void;
  toggleBadge: (badgeId: string) => void;
  addBadge: (item: Omit<CustomBadgeItem, 'id'>) => void;
  removeBadge: (badgeId: string) => void;
  addLogoButton: (item: Omit<LogoButtonItem, 'id'>) => void;
  removeLogoButton: (logoId: string) => void;
  updateLogoButton: (logoId: string, updates: Partial<LogoButtonItem>) => void;
  moveLogoButton: (index: number, direction: 'up' | 'down') => void;
  addCryptoButton: (item: Omit<CryptoButtonItem, 'id'>) => void;
  removeCryptoButton: (id: string) => void;
  updateCryptoButton: (id: string, updates: Partial<CryptoButtonItem>) => void;
  toggleCryptoButton: (id: string) => void;
  addProject: (item: Omit<ProjectItem, 'id'>) => void;
  removeProject: (id: string) => void;
  updateProject: (id: string, updates: Partial<ProjectItem>) => void;
  resetConfig: () => void;
  saveToCodeMemory: () => Promise<boolean>;
  isDashboardRoute: boolean;
  setIsDashboardRoute: (val: boolean) => void;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);
const STORAGE_KEY = 'chef_zyo_customization_v10';

export const CustomizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const savedLocal = localStorage.getItem(STORAGE_KEY);
      const parsedLocal = savedLocal ? JSON.parse(savedLocal) : null;
      const initial = { ...defaultConfig, ...(savedConfigData as any), ...(parsedLocal || {}) };

      const customAdded = (initial.badges || []).filter(
        (b: any) => !defaultBadges.some((db) => db.id === b.id)
      );

      const cleanBadges = [
        ...defaultBadges.map((b) => {
          const found = initial.badges?.find((pb: any) => pb.id === b.id);
          return found ? { ...b, enabled: found.enabled } : b;
        }),
        ...customAdded,
      ];

      // Sanitize expired blob URLs
      if (initial.bannerUrl && initial.bannerUrl.startsWith('blob:')) {
        initial.bannerUrl = '/back.png';
      }
      if (!initial.bannerUrl) {
        initial.bannerUrl = '/back.png';
      }
      if (initial.avatarUrl && initial.avatarUrl.startsWith('blob:')) {
        initial.avatarUrl = '/pfp.jpg';
      }

      const cleanLogos = (initial.logoButtons && initial.logoButtons.length > 0)
        ? initial.logoButtons
        : defaultLogoButtons;

      const cleanCrypto = (initial.cryptoButtons && initial.cryptoButtons.length > 0)
        ? initial.cryptoButtons
        : defaultCryptoButtons;

      return {
        ...defaultConfig,
        ...initial,
        badges: cleanBadges,
        logoButtons: cleanLogos,
        cryptoButtons: cleanCrypto,
      };
    } catch {
      return defaultConfig;
    }
  });

  const [isDashboardRoute, setIsDashboardRoute] = useState<boolean>(() => {
    return window.location.pathname === '/&';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('chef_secret_auth') === 'true';
  });

  // Track URL and hotkeys (Ctrl+Shift+D)
  useEffect(() => {
    const handlePopState = () => {
      setIsDashboardRoute(window.location.pathname === '/&');
    };
    window.addEventListener('popstate', handlePopState);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setIsDashboardRoute((prev) => {
          const next = !prev;
          window.history.pushState({}, '', next ? '/&' : '/');
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Sync to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config]);

  const updateConfig = (updates: Partial<SiteConfig>) => {
    setConfig((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const saveToCodeMemory = async (): Promise<boolean> => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      const res = await fetch('/api/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config, null, 2),
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const toggleBadge = (badgeId: string) => {
    setConfig((prev) => {
      const updated = prev.badges.map((b) => (b.id === badgeId ? { ...b, enabled: !b.enabled } : b));
      const next = { ...prev, badges: updated };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const addBadge = (item: Omit<CustomBadgeItem, 'id'>) => {
    setConfig((prev) => {
      const newBadge: CustomBadgeItem = {
        id: `badge_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        ...item,
      };
      const updated = [...prev.badges, newBadge];
      const next = { ...prev, badges: updated };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const removeBadge = (badgeId: string) => {
    setConfig((prev) => {
      const updated = prev.badges.filter((b) => b.id !== badgeId);
      const next = { ...prev, badges: updated };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const addLogoButton = (item: Omit<LogoButtonItem, 'id'>) => {
    setConfig((prev) => {
      const newButton: LogoButtonItem = {
        id: `btn_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        ...item,
      };
      const updated = [...prev.logoButtons, newButton];
      const next = { ...prev, logoButtons: updated };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const removeLogoButton = (logoId: string) => {
    setConfig((prev) => {
      const updated = prev.logoButtons.filter((l) => l.id !== logoId);
      const next = { ...prev, logoButtons: updated };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const updateLogoButton = (logoId: string, updates: Partial<LogoButtonItem>) => {
    setConfig((prev) => {
      const updated = prev.logoButtons.map((l) => (l.id === logoId ? { ...l, ...updates } : l));
      const next = { ...prev, logoButtons: updated };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const moveLogoButton = (index: number, direction: 'up' | 'down') => {
    setConfig((prev) => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.logoButtons.length) return prev;
      const copy = [...prev.logoButtons];
      const [moved] = copy.splice(index, 1);
      copy.splice(targetIndex, 0, moved);
      const next = { ...prev, logoButtons: copy };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const addCryptoButton = (item: Omit<CryptoButtonItem, 'id'>) => {
    setConfig((prev) => {
      const newItem: CryptoButtonItem = { ...item, id: `crypto_${Date.now()}_${Math.random().toString(36).substring(2, 6)}` };
      const next = { ...prev, cryptoButtons: [...prev.cryptoButtons, newItem] };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const removeCryptoButton = (id: string) => {
    setConfig((prev) => {
      const next = { ...prev, cryptoButtons: prev.cryptoButtons.filter((c) => c.id !== id) };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const updateCryptoButton = (id: string, updates: Partial<CryptoButtonItem>) => {
    setConfig((prev) => {
      const next = {
        ...prev,
        cryptoButtons: prev.cryptoButtons.map((c) => (c.id === id ? { ...c, ...updates } : c)),
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const toggleCryptoButton = (id: string) => {
    setConfig((prev) => {
      const next = {
        ...prev,
        cryptoButtons: prev.cryptoButtons.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c)),
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const addProject = (item: Omit<ProjectItem, 'id'>) => {
    setConfig((prev) => {
      const newProj: ProjectItem = {
        id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        ...item,
      };
      const updated = [...(prev.projects || []), newProj];
      const next = { ...prev, projects: updated };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const removeProject = (projId: string) => {
    setConfig((prev) => {
      const updated = (prev.projects || []).filter((p) => p.id !== projId);
      const next = { ...prev, projects: updated };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const updateProject = (projId: string, updates: Partial<ProjectItem>) => {
    setConfig((prev) => {
      const updated = (prev.projects || []).map((p) => (p.id === projId ? { ...p, ...updates } : p));
      const next = { ...prev, projects: updated };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
    try {
      localStorage.removeItem(STORAGE_KEY);
      fetch('/api/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(defaultConfig, null, 2),
      }).catch(() => {});
    } catch {
      // ignore
    }
  };

  const MASTER_PASSPHRASE = 'Chef!992831#Zyo$Quantum*Obsidian&Vault%Nexus';

  const login = (password: string): boolean => {
    const activePassphrase = config.adminPassword?.trim() || MASTER_PASSPHRASE;
    if (password === activePassphrase || password === MASTER_PASSPHRASE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('chef_secret_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('chef_secret_auth');
    setIsDashboardRoute(false);
    window.history.pushState({}, '', '/');
  };

  return (
    <CustomizationContext.Provider
      value={{
        config,
        updateConfig,
        toggleBadge,
        addBadge,
        removeBadge,
        addLogoButton,
        removeLogoButton,
        updateLogoButton,
        moveLogoButton,
        addCryptoButton,
        removeCryptoButton,
        updateCryptoButton,
        toggleCryptoButton,
        addProject,
        removeProject,
        updateProject,
        resetConfig,
        saveToCodeMemory,
        isDashboardRoute,
        setIsDashboardRoute,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
};
