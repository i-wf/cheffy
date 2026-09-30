import React, { useState } from 'react';
import {
  RotateCcw,
  Sliders,
  Eye,
  EyeOff,
  LogOut,
  Lock,
  ArrowLeft,
  KeyRound,
  Type,
  ImageIcon,
  Save,
  Check,
  Palette,
  Plus,
  Trash2,
  Layers,
  Upload,
  ArrowUp,
  ArrowDown,
  Edit3,
  X,
  Shield,
  Music,
  FolderGit2,
  Copy,
  UserPlus,
  Sparkles,
  Users,
  Flame,
  Rocket,
  ShieldCheck,
  Link as LinkIcon,
  ChevronDown,
  ChevronsUpDown,
  Coins,
} from 'lucide-react';
import {
  useCustomization,
  type FontFamilyType,
  type TemplateStyle,
  type ProjectItem,
} from '../context/CustomizationContext';
import { InteractiveProfileCard } from './InteractiveProfileCard';
import { PageShowcase } from './PageShowcase';
import { PlatformIcon, PLATFORM_REGISTRY, type PlatformKey } from './icons/PlatformIcons';

const COLOR_PRESETS = [
  { name: 'Onyx', primary: '#0e0e14', secondary: '#1a1a24', accent: '#a855f7', border: '#ffffff1a' },
  { name: 'Amethyst', primary: '#140c1e', secondary: '#231238', accent: '#c084fc', border: '#c084fc33' },
  { name: 'Emerald', primary: '#08140c', secondary: '#102619', accent: '#34d399', border: '#34d39933' },
  { name: 'Crimson', primary: '#1a090d', secondary: '#2e1017', accent: '#f43f5e', border: '#f43f5e33' },
  { name: 'Sapphire', primary: '#09131f', secondary: '#11233b', accent: '#38bdf8', border: '#38bdf833' },
  { name: 'Amber', primary: '#181206', secondary: '#2d210b', accent: '#fbbf24', border: '#fbbf2433' },
  { name: 'Frost', primary: '#161922', secondary: '#232838', accent: '#ffffff', border: '#ffffff33' },
  { name: 'Sunset', primary: '#1e0c24', secondary: '#0f1c30', accent: '#f472b6', border: '#f472b633' },
];

export function Dashboard() {
  const {
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
    setIsDashboardRoute,
    isAuthenticated,
    login,
    logout,
  } = useCustomization();

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginShowPass, setLoginShowPass] = useState(false);
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveStatusText, setSaveStatusText] = useState('Save Changes');

  // Collapsible Sections State
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const toggleSection = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const [allCollapsed, setAllCollapsed] = useState(false);
  const handleToggleAll = () => {
    if (allCollapsed) {
      setCollapsed({});
      setAllCollapsed(false);
    } else {
      setCollapsed({
        media: true,
        design: true,
        typography: true,
        cta: true,
        badges: true,
        logos: true,
        crypto: true,
        showcase: true,
        audio: true,
        security: true,
      });
      setAllCollapsed(true);
    }
  };

  // Modal State for Add Custom Badge
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [newBadgeName, setNewBadgeName] = useState('');
  const [newBadgeFile, setNewBadgeFile] = useState('');

  const handleSaveBadgeModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBadgeName.trim() || !newBadgeFile.trim()) return;
    addBadge({
      name: newBadgeName.trim(),
      file: newBadgeFile.trim(),
      enabled: true,
    });
    setShowBadgeModal(false);
    setNewBadgeName('');
    setNewBadgeFile('');
  };

  // Modal State for Add Crypto Button
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [newCryptoName, setNewCryptoName] = useState('Bitcoin');
  const [newCryptoCoinKey, setNewCryptoCoinKey] = useState('btc');
  const [newCryptoAddress, setNewCryptoAddress] = useState('');
  const [copiedCryptoTest, setCopiedCryptoTest] = useState<string | null>(null);

  const handleTestCopyCrypto = (cryptoId: string, address: string) => {
    navigator.clipboard.writeText(address).catch(() => {});
    setCopiedCryptoTest(cryptoId);
    setTimeout(() => setCopiedCryptoTest(null), 1800);
  };

  const handleSaveCryptoModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCryptoName.trim() || !newCryptoAddress.trim()) return;
    addCryptoButton({
      name: newCryptoName.trim(),
      coinKey: newCryptoCoinKey,
      address: newCryptoAddress.trim(),
      enabled: true,
    });
    setShowCryptoModal(false);
    setNewCryptoName('Bitcoin');
    setNewCryptoCoinKey('btc');
    setNewCryptoAddress('');
  };

  const handleCopyPassword = () => {
    const key = config.adminPassword || 'Chef!992831#Zyo$Quantum*Obsidian&Vault%Nexus';
    navigator.clipboard.writeText(key);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleGenerateLongKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
    let result = 'CHEF!';
    for (let i = 0; i < 42; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    updateConfig({ adminPassword: result });
  };

  // Modal State for Add & Edit Button
  const [showButtonModal, setShowButtonModal] = useState(false);
  const [editingBtnId, setEditingBtnId] = useState<string | null>(null);
  const [modalPlatform, setModalPlatform] = useState<PlatformKey>('discord');
  const [modalName, setModalName] = useState('Discord');
  const [modalUrl, setModalUrl] = useState('https://discord.com');
  const [modalCustomFile, setModalCustomFile] = useState('');

  // Modal State for Add & Edit Project
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectTag, setProjectTag] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [projectGithub, setProjectGithub] = useState('');
  const [projectStars, setProjectStars] = useState('');

  const openAddButtonModal = () => {
    setEditingBtnId(null);
    setModalPlatform('discord');
    setModalName('Discord');
    setModalUrl('https://discord.com');
    setModalCustomFile('');
    setShowButtonModal(true);
  };

  const openEditButtonModal = (btn: { id: string; name: string; url: string; iconKey?: string; file?: string }) => {
    setEditingBtnId(btn.id);
    setModalPlatform((btn.iconKey as PlatformKey) || 'link');
    setModalName(btn.name);
    setModalUrl(btn.url);
    setModalCustomFile(btn.file || '');
    setShowButtonModal(true);
  };

  const handleSaveButtonModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBtnId) {
      updateLogoButton(editingBtnId, {
        name: modalName || 'Link',
        url: modalUrl || 'https://',
        iconKey: modalPlatform,
        file: modalCustomFile || undefined,
      });
    } else {
      addLogoButton({
        name: modalName || 'Link',
        url: modalUrl || 'https://',
        iconKey: modalPlatform,
        file: modalCustomFile || undefined,
        enabled: true,
      });
    }
    setShowButtonModal(false);
    setEditingBtnId(null);
  };

  const openAddProjectModal = () => {
    setEditingProjectId(null);
    setProjectTitle('');
    setProjectDesc('');
    setProjectTag('TypeScript • React');
    setProjectLink('https://');
    setProjectGithub('https://github.com');
    setProjectStars('100');
    setShowProjectModal(true);
  };

  const openEditProjectModal = (p: ProjectItem) => {
    setEditingProjectId(p.id);
    setProjectTitle(p.title);
    setProjectDesc(p.description);
    setProjectTag(p.tag);
    setProjectLink(p.link || '');
    setProjectGithub(p.github || '');
    setProjectStars(p.stars || '');
    setShowProjectModal(true);
  };

  const handleSaveProjectModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProjectId) {
      updateProject(editingProjectId, {
        title: projectTitle,
        description: projectDesc,
        tag: projectTag,
        link: projectLink || undefined,
        github: projectGithub || undefined,
        stars: projectStars || undefined,
      });
    } else {
      addProject({
        title: projectTitle || 'Project Title',
        description: projectDesc || 'Project Description',
        tag: projectTag || 'Stack',
        link: projectLink || undefined,
        github: projectGithub || undefined,
        stars: projectStars || undefined,
      });
    }
    setShowProjectModal(false);
    setEditingProjectId(null);
  };

  const handleSave = async () => {
    setIsSaved(true);
    setSaveStatusText('Saving...');
    const ok = await saveToCodeMemory();
    if (ok) {
      setSaveStatusText('✓ Saved to Code & Storage!');
    } else {
      setSaveStatusText('✓ Saved Locally');
    }
    setTimeout(() => {
      setIsSaved(false);
      setSaveStatusText('Save Changes');
    }, 2200);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    configKey: 'avatarUrl' | 'bannerUrl' | 'bgCustomUrl'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        updateConfig({ [configKey]: result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCustomIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setModalCustomFile(result);
        setModalPlatform('custom');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBadgeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setNewBadgeFile(result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Password Lock Screen
  if (!isAuthenticated) {
    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const success = login(passwordInput);
      if (!success) {
        setLoginError('Access denied: Invalid master passphrase');
      }
    };

    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#070709] relative select-none">
        <div className="w-full max-w-sm rounded-3xl p-8 bg-[#0e0e14]/90 border border-white/10 backdrop-blur-2xl shadow-2xl z-10">
          <button
            onClick={() => {
              setIsDashboardRoute(false);
              window.history.pushState({}, '', '/');
            }}
            className="flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Profile</span>
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl mx-auto mb-3 bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-purple-300" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Admin Studio</h2>
            <p className="text-xs font-mono text-white/40 mt-1">Protected by ultra-long master key</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3">
            <div className="relative">
              <input
                type={loginShowPass ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter master passphrase..."
                className="w-full px-4 py-2.5 pr-10 rounded-xl bg-white/[0.05] border border-white/10 focus:border-purple-400/50 text-white placeholder-white/20 text-xs outline-none font-mono"
              />
              <button
                type="button"
                onClick={() => setLoginShowPass(!loginShowPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {loginShowPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {loginError && <p className="text-xs text-rose-400 font-mono text-center">{loginError}</p>}

            <button
              type="submit"
              className="w-full py-2.5 mt-1 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-medium transition-all shadow-md"
            >
              Unlock Studio
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#070709] text-white font-sans flex flex-col overflow-hidden select-none">
      {/* Top Fixed Header */}
      <header className="h-14 shrink-0 z-40 bg-[#0d0d12]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <Sliders className="w-4 h-4 text-purple-300" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              <span>Studio // /&</span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                LIVE SYNC
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile view switch */}
          <div className="lg:hidden flex items-center p-0.5 rounded-xl bg-white/5 border border-white/10">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                activeTab === 'editor' ? 'bg-white/20 text-white font-medium' : 'text-white/50'
              }`}
            >
              Settings
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                activeTab === 'preview' ? 'bg-white/20 text-white font-medium' : 'text-white/50'
              }`}
            >
              Preview
            </button>
          </div>

          <button
            onClick={handleSave}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all shadow-md ${
              isSaved ? 'bg-emerald-600 ring-2 ring-emerald-400' : 'bg-emerald-600 hover:bg-emerald-500'
            }`}
          >
            {isSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{saveStatusText}</span>
          </button>

          <button
            onClick={handleToggleAll}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-white/60 hover:text-white transition-colors"
            title={allCollapsed ? 'Expand All Sections' : 'Collapse All Sections'}
          >
            <ChevronsUpDown className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{allCollapsed ? 'Expand' : 'Collapse'}</span>
          </button>

          <button
            onClick={resetConfig}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-white/60 hover:text-white transition-colors"
            title="Reset Defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              setIsDashboardRoute(false);
              window.history.pushState({}, '', '/');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-mono text-white transition-colors shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Profile</span>
          </button>

          <button
            onClick={logout}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-300 border border-white/10 transition-colors"
            title="Log out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2-Window Split Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* WINDOW 1: Left Scrollable Settings Pane */}
        <div
          className={`w-full lg:w-[56%] xl:w-[58%] h-full overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar ${
            activeTab === 'preview' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* 1. MEDIA & ASSETS (Side-by-Side PFP, Banner, Background) */}
          <section className="p-3 sm:p-4 rounded-2xl bg-[#0e0e14] border border-white/10 shadow-lg space-y-3 transition-all">
            <div
              onClick={() => toggleSection('media')}
              className="flex items-center justify-between border-b border-white/5 pb-2 cursor-pointer select-none group"
            >
              <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-purple-300 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Media & Assets</span>
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-white/40 hidden sm:inline">PFP • Banner • Wallpaper • Cursor</span>
                <div className={`p-1 rounded-lg bg-white/5 text-white/60 group-hover:text-white transition-transform ${collapsed['media'] ? '-rotate-90' : 'rotate-0'}`}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {!collapsed['media'] && (
              <div className="space-y-3 animate-fadeIn">
                {/* 3-Column Side-by-Side: PFP, Banner, Wallpaper */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {/* Column 1: PFP / Avatar */}
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={config.avatarUrl || '/pfp.jpg'}
                          alt="PFP"
                          className="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-xs font-mono text-white font-medium block truncate">Avatar</span>
                          <span className="text-[10px] font-mono text-purple-300">{config.avatarSize || 104}px</span>
                        </div>
                      </div>
                      <label className="cursor-pointer px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono text-purple-300 shrink-0">
                        <Upload className="w-2.5 h-2.5 inline mr-1" />
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'avatarUrl')}
                        />
                      </label>
                    </div>

                    <div className="space-y-0.5">
                      <input
                        type="range"
                        min="64"
                        max="140"
                        step="4"
                        value={config.avatarSize || 104}
                        onChange={(e) => updateConfig({ avatarSize: Number(e.target.value) })}
                        className="accent-purple-500 cursor-pointer w-full h-1"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-white/50 block mb-1">Avatar Decoration</span>
                      <div className="grid grid-cols-3 gap-1">
                        {(['none', 'venom', 'ghost'] as const).map((dec) => (
                          <button
                            key={dec}
                            onClick={() => updateConfig({ profileDecoration: dec })}
                            className={`py-0.5 text-[10px] font-mono rounded-lg border capitalize transition-all ${
                              config.profileDecoration === dec
                                ? 'border-purple-400 bg-purple-500/20 text-white font-medium'
                                : 'border-white/10 text-white/40 hover:bg-white/5'
                            }`}
                          >
                            {dec}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Banner */}
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={config.bannerUrl || '/back.png'}
                          alt="Banner"
                          className="w-12 h-8 rounded-lg object-cover border border-white/20 shrink-0"
                        />
                        <span className="text-xs font-mono text-white font-medium truncate">Banner</span>
                      </div>
                      <label className="cursor-pointer px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono text-purple-300 shrink-0">
                        <Upload className="w-2.5 h-2.5 inline mr-1" />
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'bannerUrl')}
                        />
                      </label>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-white/50 block">Fade Transition</span>
                      <div className="grid grid-cols-3 gap-1">
                        {(['gradient', 'wavy', 'none'] as const).map((style) => (
                          <button
                            key={style}
                            onClick={() => updateConfig({ bannerFadeStyle: style })}
                            className={`py-0.5 text-[10px] font-mono rounded-lg border uppercase transition-all ${
                              config.bannerFadeStyle === style
                                ? 'border-purple-400 bg-purple-500/20 text-white font-medium'
                                : 'border-white/10 text-white/40 hover:bg-white/5'
                            }`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Wallpaper / Background */}
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-white font-medium">Wallpaper</span>
                      <div className="flex items-center p-0.5 rounded-lg bg-white/5 border border-white/10">
                        <button
                          onClick={() => updateConfig({ bgMediaType: 'image' })}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                            config.bgMediaType === 'image' ? 'bg-purple-600 text-white font-medium' : 'text-white/40'
                          }`}
                        >
                          IMG
                        </button>
                        <button
                          onClick={() => updateConfig({ bgMediaType: 'video' })}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                            config.bgMediaType === 'video' ? 'bg-purple-600 text-white font-medium' : 'text-white/40'
                          }`}
                        >
                          VID
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={config.bgCustomUrl}
                        onChange={(e) => updateConfig({ bgCustomUrl: e.target.value })}
                        placeholder="Image or MP4 URL..."
                        className="flex-1 min-w-0 px-2 py-0.5 rounded-lg bg-black/40 border border-white/10 text-[10px] text-white outline-none font-mono"
                      />
                      <label className="cursor-pointer px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono text-white/70 shrink-0">
                        <Upload className="w-2.5 h-2.5 inline mr-1" />
                        File
                        <input
                          type="file"
                          accept={config.bgMediaType === 'video' ? 'video/mp4,video/*' : 'image/*'}
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'bgCustomUrl')}
                        />
                      </label>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[10px] font-mono text-white/50">
                        <span>Darkness</span>
                        <span className="text-purple-300">{config.bgOverlayOpacity ?? 45}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="85"
                        step="5"
                        value={config.bgOverlayOpacity ?? 45}
                        onChange={(e) => updateConfig({ bgOverlayOpacity: Number(e.target.value) })}
                        className="accent-purple-500 cursor-pointer w-full h-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Compact Row: Cursor Preset & Sparkle Trail */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 border-t border-white/5">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[11px] font-mono text-white/70">Cursor</span>
                    <div className="grid grid-cols-3 gap-1">
                      {(['cross', 'default', 'custom'] as const).map((cur) => (
                        <button
                          key={cur}
                          onClick={() => updateConfig({ cursorType: cur })}
                          className={`px-2 py-0.5 text-[10px] font-mono rounded border uppercase transition-all ${
                            config.cursorType === cur
                              ? 'border-purple-400 bg-purple-500/20 text-white font-medium'
                              : 'border-white/10 text-white/40 hover:bg-white/5'
                          }`}
                        >
                          {cur}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div
                    onClick={() => updateConfig({ enableSparkleTrail: !config.enableSparkleTrail })}
                    className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-400/30 cursor-pointer transition-colors"
                  >
                    <div>
                      <span className="text-[11px] font-mono text-white font-medium block">Sparkle Cursor Trail</span>
                      <span className="text-[9px] text-white/40">{config.enableSparkleTrail ? 'GIF Particles ON' : 'OFF'}</span>
                    </div>
                    <div
                      className={`w-7 h-3.5 rounded-full p-0.5 transition-colors ${
                        config.enableSparkleTrail ? 'bg-purple-600' : 'bg-white/15'
                      }`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full bg-white transition-transform ${
                          config.enableSparkleTrail ? 'translate-x-3.5' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* 2. CARD DESIGN, COLORS & LAYOUTS SUITE */}
          <section className="p-3 sm:p-4 rounded-2xl bg-[#0e0e14] border border-white/10 shadow-lg space-y-3 transition-all">
            <div
              onClick={() => toggleSection('design')}
              className="flex items-center justify-between border-b border-white/5 pb-2 cursor-pointer select-none group"
            >
              <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-purple-300 flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Card Colors & Design Suite</span>
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-white/40 hidden sm:inline">Palettes • Geometry • Glass</span>
                <div className={`p-1 rounded-lg bg-white/5 text-white/60 group-hover:text-white transition-transform ${collapsed['design'] ? '-rotate-90' : 'rotate-0'}`}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {!collapsed['design'] && (
              <div className="space-y-3 animate-fadeIn">
                {/* Layout Mode (Separated / Single / Landscape) */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-white/60">Card Structure</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'separated', label: 'Separated Dual Cards' },
                      { id: 'single', label: 'Unified Single Card' },
                      { id: 'landscape', label: 'Landscape Compact (zyo.lol)' },
                    ].map((layout) => (
                      <button
                        key={layout.id}
                        onClick={() => updateConfig({ cardLayoutType: layout.id as any })}
                        className={`py-2 px-2 text-center rounded-xl text-xs font-mono border transition-all ${
                          config.cardLayoutType === layout.id
                            ? 'border-purple-400 bg-purple-500/20 text-white font-medium shadow-md'
                            : 'border-white/10 bg-white/[0.02] text-white/50 hover:bg-white/5'
                        }`}
                      >
                        {layout.label}
                      </button>
                    ))}
                  </div>
                </div>

            {/* Instant Palette Presets */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-white/60">Color Palette Presets</span>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                {COLOR_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() =>
                      updateConfig({
                        primaryColor: p.primary,
                        secondaryColor: p.secondary,
                        accentColor: p.accent,
                        cardBorderColor: p.border,
                        enableProfileGradient: true,
                      })
                    }
                    className="p-1.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-purple-400/50 flex flex-col items-center gap-1 transition-all group"
                  >
                    <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center overflow-hidden">
                      <div
                        className="w-full h-full"
                        style={{ background: `linear-gradient(135deg, ${p.primary}, ${p.accent})` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-white/60 group-hover:text-white truncate">
                      {p.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color Pickers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono text-white/60">Card Base Tint</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.primaryColor || '#1a1a22'}
                    onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                    className="w-7 h-7 rounded cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-xs font-mono text-white/80 uppercase">{config.primaryColor}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono text-white/60">Gradient 2nd Tint</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.secondaryColor || '#2b2b36'}
                    onChange={(e) => updateConfig({ secondaryColor: e.target.value })}
                    className="w-7 h-7 rounded cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-xs font-mono text-white/80 uppercase">{config.secondaryColor}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono text-white/60">Border / Stroke</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.cardBorderColor || '#ffffff22'}
                    onChange={(e) => updateConfig({ cardBorderColor: e.target.value })}
                    className="w-7 h-7 rounded cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-xs font-mono text-white/80 uppercase">{config.cardBorderColor || '#fff'}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono text-white/60">Accent & Glow</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.accentColor || '#a855f7'}
                    onChange={(e) => updateConfig({ accentColor: e.target.value, cardGlowColor: e.target.value })}
                    className="w-7 h-7 rounded cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-xs font-mono text-white/80 uppercase">{config.accentColor}</span>
                </div>
              </div>
            </div>

            {/* Verified Badge Checkmark Color */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xs font-mono text-white/70">Verified Badge Color</span>
              <div className="flex items-center gap-2">
                {[
                  { name: 'Cyan', color: '#22d3ee' },
                  { name: 'Gold', color: '#eab308' },
                  { name: 'Purple', color: '#a855f7' },
                  { name: 'Emerald', color: '#10b981' },
                  { name: 'Ruby', color: '#f43f5e' },
                ].map((c) => (
                  <button
                    key={c.name}
                    onClick={() => updateConfig({ verifiedBadgeColor: c.color })}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      config.verifiedBadgeColor === c.color ? 'border-white scale-110 shadow-lg' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.color }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Geometric Controls: Radius, Border Width, Ambient Glow */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-mono text-white/60">
                  <span>Border Radius</span>
                  <span className="text-purple-300">{config.cardBorderRadius || 24}px</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="40"
                  step="2"
                  value={config.cardBorderRadius || 24}
                  onChange={(e) => updateConfig({ cardBorderRadius: Number(e.target.value) })}
                  className="accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-mono text-white/60">
                  <span>Border Width</span>
                  <span className="text-purple-300">{config.cardBorderWidth ?? 1}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="1"
                  value={config.cardBorderWidth ?? 1}
                  onChange={(e) => updateConfig({ cardBorderWidth: Number(e.target.value) })}
                  className="accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-mono text-white/60">
                  <span>Ambient Card Glow</span>
                  <span className="text-purple-300">{config.cardGlowSpread || 0}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="2"
                  value={config.cardGlowSpread || 0}
                  onChange={(e) => updateConfig({ cardGlowSpread: Number(e.target.value) })}
                  className="accent-purple-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Card Texture Overlays */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-white/60">Card Glass Texture Overlay</span>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'none', label: 'None' },
                  { id: 'scanlines', label: 'Scanlines' },
                  { id: 'dots', label: 'Dots Matrix' },
                  { id: 'grid', label: 'Fine Grid' },
                ].map((tex) => (
                  <button
                    key={tex.id}
                    onClick={() => updateConfig({ cardTexture: tex.id as any })}
                    className={`py-1.5 text-center rounded-lg text-xs font-mono border transition-all ${
                      config.cardTexture === tex.id
                        ? 'border-purple-400 bg-purple-600 text-white font-medium'
                        : 'border-white/10 bg-white/[0.02] text-white/50 hover:bg-white/5'
                    }`}
                  >
                    {tex.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 10 Card Skin Templates (NO EMOJIS) */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-white/60">Template Morphism Presets</span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {[
                  { id: 'glassmorphism', label: 'Glass' },
                  { id: 'neomorphism', label: 'Neomorph' },
                  { id: 'tech', label: 'Tech' },
                  { id: 'minimalist', label: 'Minimal' },
                  { id: 'cyberpunk', label: 'Cyberpunk' },
                  { id: 'neon-glow', label: 'Neon Glow' },
                  { id: 'frosted-dark', label: 'Frosted Dark' },
                  { id: 'holographic', label: 'Holographic' },
                  { id: 'brutalist', label: 'Brutalist' },
                  { id: 'retro-crt', label: 'Retro CRT' },
                ].map((skin) => (
                  <button
                    key={skin.id}
                    onClick={() => updateConfig({ template: skin.id as TemplateStyle })}
                    className={`py-1.5 px-2 text-center rounded-lg text-xs font-mono border transition-all ${
                      config.template === skin.id
                        ? 'border-purple-400 bg-purple-600 text-white font-semibold'
                        : 'border-white/10 bg-white/[0.02] text-white/50 hover:bg-white/5'
                    }`}
                  >
                    {skin.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions, Opacity, Blur Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-mono text-white/60">
                  <span>Card Width</span>
                  <span className="text-purple-300">{config.cardWidth}px</span>
                </div>
                <input
                  type="range"
                  min="320"
                  max="640"
                  step="10"
                  value={config.cardWidth}
                  onChange={(e) => updateConfig({ cardWidth: Number(e.target.value) })}
                  className="accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-mono text-white/60">
                  <span>Glass Opacity</span>
                  <span className="text-purple-300">{config.profileOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={config.profileOpacity}
                  onChange={(e) => updateConfig({ profileOpacity: Number(e.target.value) })}
                  className="accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-mono text-white/60">
                  <span>Glass Blur</span>
                  <span className="text-purple-300">{config.profileBlur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="2"
                  value={config.profileBlur}
                  onChange={(e) => updateConfig({ profileBlur: Number(e.target.value) })}
                  className="accent-purple-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Motion & Alignment Toggles */}
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => updateConfig({ enableCardTilt: !config.enableCardTilt })}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-purple-400/40 cursor-pointer"
              >
                <span className="text-xs font-mono text-white/80">3D Tilt Physics</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${config.enableCardTilt ? 'bg-purple-600 text-white' : 'bg-white/10 text-white/40'}`}>
                  {config.enableCardTilt ? 'ON' : 'OFF'}
                </span>
              </div>

              <div
                onClick={() => updateConfig({ centeredLayout: !config.centeredLayout })}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-purple-400/40 cursor-pointer"
              >
                <span className="text-xs font-mono text-white/80">Center Profile Info</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${config.centeredLayout ? 'bg-purple-600 text-white' : 'bg-white/10 text-white/40'}`}>
                  {config.centeredLayout ? 'CENTER' : 'LEFT'}
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

          {/* 3. TYPOGRAPHY & TEXT EFFECTS */}
          <section className="p-3 sm:p-4 rounded-2xl bg-[#0e0e14] border border-white/10 shadow-lg space-y-3 transition-all">
            <div
              onClick={() => toggleSection('typography')}
              className="flex items-center justify-between border-b border-white/5 pb-2 cursor-pointer select-none group"
            >
              <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-purple-300 flex items-center gap-2">
                <Type className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Typography & Effects</span>
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-white/40 hidden sm:inline">Fonts • Bio FX • Discord Theme</span>
                <div className={`p-1 rounded-lg bg-white/5 text-white/60 group-hover:text-white transition-transform ${collapsed['typography'] ? '-rotate-90' : 'rotate-0'}`}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {!collapsed['typography'] && (
              <div className="space-y-3 animate-fadeIn">

            {/* Font Family Selector */}
            <div className="space-y-1">
              <span className="text-xs font-mono text-white/60">Global Font Family</span>
              <select
                value={config.fontFamily}
                onChange={(e) => updateConfig({ fontFamily: e.target.value as FontFamilyType })}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white font-mono outline-none"
              >
                <option value="minecraft">Minecraft (Pixel Retro)</option>
                <option value="inter">Inter (Modern Clean Sans)</option>
                <option value="jetbrains">JetBrains Mono (Code)</option>
                <option value="firacode">Fira Code (Developer)</option>
                <option value="syne">Syne (Geometric Aesthetic)</option>
                <option value="poppins">Poppins (Clean Sans)</option>
                <option value="montserrat">Montserrat (Bold Classic)</option>
                <option value="space-grotesk">Space Grotesk (Tech Neo-Grotesque)</option>
                <option value="bebas-neue">Bebas Neue (Impact Display)</option>
                <option value="orbitron">Orbitron (Cyber Sci-Fi)</option>
                <option value="russo-one">Russo One (Heavy Headline)</option>
                <option value="righteous">Righteous (Urban Smooth)</option>
                <option value="permanent-marker">Permanent Marker (Street Tag)</option>
                <option value="bangers">Bangers (Comic Pop)</option>
                <option value="silkscreen">Silkscreen (Arcade Pixel)</option>
              </select>
            </div>

            {/* Username Effects */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-white/60">Username Special Effect</span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {[
                  { id: 'typewriter', label: 'Typewriter' },
                  { id: 'rainbow', label: 'Rainbow' },
                  { id: 'glitch', label: 'Glitch' },
                  { id: 'glow', label: 'Neon Glow' },
                  { id: 'wave', label: 'Wave' },
                  { id: 'none', label: 'None' },
                ].map((eff) => (
                  <button
                    key={eff.id}
                    onClick={() => updateConfig({ usernameEffect: eff.id as any })}
                    className={`py-1.5 px-1 text-center rounded-lg text-xs font-mono border transition-all ${
                      config.usernameEffect === eff.id
                        ? 'border-purple-400 bg-purple-600 text-white font-semibold'
                        : 'border-white/10 bg-white/[0.02] text-white/50 hover:bg-white/5'
                    }`}
                  >
                    {eff.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description Animation Effect Selector */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-white/60">Bio Description Animation Effect</span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {[
                  { id: 'typewriter', label: 'Typewriter' },
                  { id: 'rainbow', label: 'Rainbow' },
                  { id: 'glitch', label: 'Glitch' },
                  { id: 'glow', label: 'Neon Glow' },
                  { id: 'wave', label: 'Wave' },
                  { id: 'none', label: 'None' },
                ].map((eff) => (
                  <button
                    key={eff.id}
                    onClick={() => updateConfig({ descriptionEffect: eff.id as any })}
                    className={`py-1.5 px-1 text-center rounded-lg text-xs font-mono border transition-all ${
                      (config.descriptionEffect || 'none') === eff.id
                        ? 'border-purple-400 bg-purple-600 text-white font-semibold'
                        : 'border-white/10 bg-white/[0.02] text-white/50 hover:bg-white/5'
                    }`}
                  >
                    {eff.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Click to Enter Landing Screen Controls (media_1790438807113.png) */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-white/90 block font-medium">"Click to Enter" Gate Screen</span>
                  <span className="text-[10px] text-white/40">Dark blurred landing screen before showing site (media_1790438807113.png)</span>
                </div>
                <button
                  type="button"
                  onClick={() => updateConfig({ enableClickToEnter: !config.enableClickToEnter })}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-all ${
                    config.enableClickToEnter
                      ? 'bg-purple-600 border-purple-500 text-white font-semibold shadow-sm'
                      : 'bg-white/5 border-white/10 text-white/40'
                  }`}
                >
                  {config.enableClickToEnter ? 'GATE ON' : 'OFF'}
                </button>
              </div>

              {config.enableClickToEnter && (
                <div className="space-y-1 pt-1">
                  <span className="text-xs font-mono text-white/60">Unlock Prompt Text</span>
                  <input
                    type="text"
                    value={config.clickToEnterText || ''}
                    onChange={(e) => updateConfig({ clickToEnterText: e.target.value })}
                    placeholder="click to enter..."
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white font-mono outline-none"
                  />
                </div>
              )}
            </div>

            {/* Profile Info Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <span className="text-xs font-mono text-white/60">Username</span>
                <input
                  type="text"
                  value={config.username}
                  onChange={(e) => updateConfig({ username: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white font-mono outline-none"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-white/60">Bio Description</span>
                <input
                  type="text"
                  value={config.description}
                  onChange={(e) => updateConfig({ description: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white font-mono outline-none"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-white/60">Location</span>
                <input
                  type="text"
                  value={config.location}
                  onChange={(e) => updateConfig({ location: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white font-mono outline-none"
                />
              </div>
            </div>

            {/* Discord Widget & Theme Selector (User requested theme 1, 2, 3 route) */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2.5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 space-y-1">
                  <span className="text-xs font-mono text-white/60">Discord Status User ID</span>
                  <input
                    type="text"
                    value={config.discordId}
                    onChange={(e) => updateConfig({ discordId: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white font-mono outline-none"
                    placeholder="e.g. 183234792534310912"
                  />
                </div>
                <button
                  onClick={() =>
                    updateConfig({
                      profileWidget: config.profileWidget === 'discord' ? 'none' : 'discord',
                    })
                  }
                  className={`py-2 px-3 rounded-lg text-xs font-mono border shrink-0 transition-colors ${
                    config.profileWidget === 'discord'
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : 'bg-white/5 border-white/10 text-white/40'
                  }`}
                >
                  Presence: {config.profileWidget === 'discord' ? 'ON' : 'OFF'}
                </button>
              </div>

              {config.profileWidget === 'discord' && (
                <div className="pt-2 border-t border-white/5 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-mono text-white/60">Presence Theme</span>
                    <div className="flex items-center gap-1.5">
                      {([1, 2, 3] as const).map((thm) => (
                        <button
                          key={thm}
                          onClick={() => updateConfig({ discordTheme: thm })}
                          className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                            (config.discordTheme || 1) === thm
                              ? 'border-purple-400 bg-purple-600 text-white font-semibold shadow-sm'
                              : 'border-white/10 bg-white/5 text-white/50 hover:bg-white/10'
                          }`}
                        >
                          Theme {thm}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 p-2 flex justify-center">
                    <img
                      src={`https://discord.c99.nl/widget/theme-${config.discordTheme || 1}/${config.discordId || '183234792534310912'}.png`}
                      alt="Discord Presence Preview"
                      className="max-h-24 object-contain rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          )}
        </section>

          {/* 4. COMMUNITY / CLICK TO JOIN CTA BUTTON */}
          <section className="p-3 sm:p-4 rounded-2xl bg-[#0e0e14] border border-white/10 shadow-lg space-y-3 transition-all">
            <div
              onClick={() => toggleSection('cta')}
              className="flex items-center justify-between border-b border-white/5 pb-2 cursor-pointer select-none group"
            >
              <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-purple-300 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>"Click to Join" Button Studio</span>
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateConfig({ showJoinButton: !config.showJoinButton });
                  }}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-mono border transition-colors ${
                    config.showJoinButton
                      ? 'bg-purple-600 border-purple-500 text-white font-medium shadow-sm'
                      : 'bg-white/5 border-white/10 text-white/40'
                  }`}
                >
                  CTA: {config.showJoinButton ? 'ACTIVE' : 'OFF'}
                </button>
                <div className={`p-1 rounded-lg bg-white/5 text-white/60 group-hover:text-white transition-transform ${collapsed['cta'] ? '-rotate-90' : 'rotate-0'}`}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {!collapsed['cta'] && (
              <div className="space-y-3 animate-fadeIn">
                {/* Fields Grid */}
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-white/60">Button Title Text</span>
                      <input
                        type="text"
                        value={config.joinButtonText || ''}
                        onChange={(e) => updateConfig({ joinButtonText: e.target.value })}
                        placeholder="e.g. Click to Join"
                        className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white font-mono outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-mono text-white/60">Subtext / Community Tag</span>
                      <input
                        type="text"
                        value={config.joinButtonSubtext || ''}
                        onChange={(e) => updateConfig({ joinButtonSubtext: e.target.value })}
                        placeholder="e.g. discord.gg/chef or 1,420+ Members"
                        className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white font-mono outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-white/60">Destination Invite Link</span>
                      <input
                        type="text"
                        value={config.joinButtonUrl || ''}
                        onChange={(e) => updateConfig({ joinButtonUrl: e.target.value })}
                        placeholder="https://discord.gg/..."
                        className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white font-mono outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-mono text-white/60">Status Pill Badge (optional)</span>
                      <input
                        type="text"
                        value={config.joinButtonBadge || ''}
                        onChange={(e) => updateConfig({ joinButtonBadge: e.target.value })}
                        placeholder="ONLINE / VERIFIED / JOIN"
                        className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white font-mono outline-none"
                      />
                    </div>
                  </div>

                  {/* Icon Selector */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono text-white/60">Button Icon</span>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                      {[
                        { id: 'discord', label: 'Discord', icon: <PlatformIcon iconKey="discord" size={16} /> },
                        { id: 'sparkles', label: 'Sparkles', icon: <Sparkles className="w-3.5 h-3.5" /> },
                        { id: 'users', label: 'Community', icon: <Users className="w-3.5 h-3.5" /> },
                        { id: 'flame', label: 'Flame', icon: <Flame className="w-3.5 h-3.5" /> },
                        { id: 'rocket', label: 'Rocket', icon: <Rocket className="w-3.5 h-3.5" /> },
                        { id: 'link', label: 'Link', icon: <LinkIcon className="w-3.5 h-3.5" /> },
                      ].map((ic) => (
                        <button
                          key={ic.id}
                          onClick={() => updateConfig({ joinButtonIcon: ic.id as any })}
                          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-mono border transition-all ${
                            (config.joinButtonIcon || 'discord') === ic.id
                              ? 'border-purple-400 bg-purple-600 text-white font-semibold shadow'
                              : 'border-white/10 bg-white/[0.02] text-white/50 hover:bg-white/5'
                          }`}
                        >
                          {ic.icon}
                          <span className="text-[11px] truncate">{ic.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Style Selector */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono text-white/60">Visual Theme</span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                      {[
                        { id: 'glow-gradient', label: 'Gradient Glow' },
                        { id: 'glass-frost', label: 'Frosted Glass' },
                        { id: 'neon-purple', label: 'Neon Purple' },
                        { id: 'cyber-cyan', label: 'Cyber Cyan' },
                        { id: 'minimal', label: 'Minimal Dark' },
                      ].map((st) => (
                        <button
                          key={st.id}
                          onClick={() => updateConfig({ joinButtonStyle: st.id as any })}
                          className={`py-1.5 px-2 text-center rounded-xl text-xs font-mono border transition-all ${
                            (config.joinButtonStyle || 'glow-gradient') === st.id
                              ? 'border-purple-400 bg-purple-600 text-white font-semibold shadow'
                              : 'border-white/10 bg-white/[0.02] text-white/50 hover:bg-white/5'
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* 5. CUSTOM BADGES & PLACEMENT */}
          <section className="p-3 sm:p-4 rounded-2xl bg-[#0e0e14] border border-white/10 shadow-lg space-y-3 transition-all">
            <div
              onClick={() => toggleSection('badges')}
              className="flex items-center justify-between border-b border-white/5 pb-2 cursor-pointer select-none group"
            >
              <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-purple-300 flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Custom Badges & Placement</span>
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowBadgeModal(true);
                  }}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Badge</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateConfig({ glowBadges: !config.glowBadges });
                  }}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-mono border transition-colors ${
                    config.glowBadges
                      ? 'bg-purple-600/30 border-purple-400 text-purple-200'
                      : 'bg-white/5 border-white/10 text-white/40'
                  }`}
                >
                  Glow: {config.glowBadges ? 'ON' : 'OFF'}
                </button>
                <div className={`p-1 rounded-lg bg-white/5 text-white/60 group-hover:text-white transition-transform ${collapsed['badges'] ? '-rotate-90' : 'rotate-0'}`}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {!collapsed['badges'] && (
              <div className="space-y-3 animate-fadeIn">
                {/* Placement Switcher (Including Inline Capsule) */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-white/60">Badge Placement Position</span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                    {[
                      { id: 'capsule', label: 'Capsule Pill' },
                      { id: 'inline-capsule', label: 'Inline Capsule' },
                      { id: 'inline', label: 'Inline Raw' },
                      { id: 'avatar-corner', label: 'Avatar Corner' },
                      { id: 'vertical-pinned', label: 'Side Bar' },
                    ].map((pos) => (
                      <button
                        key={pos.id}
                        onClick={() => updateConfig({ badgePosition: pos.id as any })}
                        className={`py-1.5 px-1.5 text-center rounded-lg text-xs font-mono border transition-all ${
                          config.badgePosition === pos.id
                            ? 'border-purple-400 bg-purple-600 text-white font-semibold'
                            : 'border-white/10 bg-white/[0.02] text-white/50 hover:bg-white/5'
                        }`}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Badges Toggle Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {config.badges.map((badge) => (
                    <div
                      key={badge.id}
                      onClick={() => toggleBadge(badge.id)}
                      className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        badge.enabled
                          ? 'border-purple-500/50 bg-purple-500/10 text-white'
                          : 'border-white/10 bg-white/[0.02] text-white/40 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden flex-1 min-w-0">
                        <img src={badge.file} alt={badge.name} className="w-4 h-4 object-contain shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        <span className="text-xs font-mono truncate">{badge.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 ml-1">
                        {badge.id.startsWith('badge_') && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeBadge(badge.id);
                            }}
                            className="p-1 rounded hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors"
                            title="Delete custom badge"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                        <div
                          className={`w-3 h-3 rounded-full border flex items-center justify-center shrink-0 ${
                            badge.enabled ? 'bg-purple-600 border-purple-500' : 'border-white/20'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 6. REDIRECT BUTTONS (LOGOS & ORDER RECORDER) */}
          <section className="p-3 sm:p-4 rounded-2xl bg-[#0e0e14] border border-white/10 shadow-lg space-y-3 transition-all">
            <div
              onClick={() => toggleSection('logos')}
              className="flex items-center justify-between border-b border-white/5 pb-2 cursor-pointer select-none group"
            >
              <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-purple-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Redirect Buttons</span>
              </h2>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openAddButtonModal();
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-mono text-white shadow-md transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Button</span>
                </button>
                <div className={`p-1 rounded-lg bg-white/5 text-white/60 group-hover:text-white transition-transform ${collapsed['logos'] ? '-rotate-90' : 'rotate-0'}`}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {!collapsed['logos'] && (
              <div className="space-y-3 animate-fadeIn">

            {/* Logo Sizing & Dock Bar Suite */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-3.5">
              {/* Main Logo Size Slider with Steppers */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/80 font-medium flex items-center gap-1.5">
                    <span>Logo & Icon Size</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {(config.logoSize || 72) < 52 ? 'Compact' : (config.logoSize || 72) < 70 ? 'Normal' : (config.logoSize || 72) < 90 ? 'Large' : (config.logoSize || 72) < 115 ? 'Jumbo' : 'Giant'}
                    </span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateConfig({ logoSize: Math.max(28, (config.logoSize || 72) - 4) })}
                      className="w-5 h-5 rounded flex items-center justify-center bg-white/5 hover:bg-white/15 text-white/70 text-xs font-mono transition-colors"
                      title="Decrease by 4px"
                    >
                      -
                    </button>
                    <span className="text-purple-300 font-bold w-12 text-center text-xs">
                      {config.logoSize || 72}px
                    </span>
                    <button
                      onClick={() => updateConfig({ logoSize: Math.min(150, (config.logoSize || 72) + 4) })}
                      className="w-5 h-5 rounded flex items-center justify-center bg-white/5 hover:bg-white/15 text-white/70 text-xs font-mono transition-colors"
                      title="Increase by 4px"
                    >
                      +
                    </button>
                  </div>
                </div>

                <input
                  type="range"
                  min="28"
                  max="150"
                  step="2"
                  value={config.logoSize || 72}
                  onChange={(e) => updateConfig({ logoSize: Number(e.target.value) })}
                  className="w-full h-2 rounded-lg bg-white/10 accent-purple-500 cursor-pointer"
                />

                {/* Instant Size Presets */}
                <div className="grid grid-cols-5 gap-1 pt-1">
                  {[
                    { label: '48px', val: 48, name: 'MD' },
                    { label: '64px', val: 64, name: 'LG' },
                    { label: '76px', val: 76, name: 'XL' },
                    { label: '96px', val: 96, name: 'JUMBO' },
                    { label: '120px', val: 120, name: 'MAX' },
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      onClick={() => updateConfig({ logoSize: preset.val })}
                      className={`py-1 text-[10px] font-mono rounded-lg border transition-all ${
                        (config.logoSize || 72) === preset.val
                          ? 'border-purple-400 bg-purple-600 text-white font-bold shadow'
                          : 'border-white/10 bg-white/[0.02] text-white/40 hover:bg-white/5 hover:text-white/80'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dock Bar Container Sizing (Padding & Gap) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/5">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-white/60">
                    <span>Dock Bar Padding</span>
                    <span className="text-purple-300">{config.dockBarPadding ?? 20}px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="44"
                    step="2"
                    value={config.dockBarPadding ?? 20}
                    onChange={(e) => updateConfig({ dockBarPadding: Number(e.target.value) })}
                    className="w-full h-1.5 rounded-lg bg-white/10 accent-purple-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-white/60">
                    <span>Icon Spacing (Gap)</span>
                    <span className="text-purple-300">{config.dockBarGap ?? 20}px</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="40"
                    step="2"
                    value={config.dockBarGap ?? 20}
                    onChange={(e) => updateConfig({ dockBarGap: Number(e.target.value) })}
                    className="w-full h-1.5 rounded-lg bg-white/10 accent-purple-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Glow Toggle */}
              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <div
                  onClick={() => updateConfig({ glowLogoButtons: !config.glowLogoButtons })}
                  className="flex items-center justify-between w-full cursor-pointer py-1 text-xs font-mono"
                >
                  <span className="text-white/80">Ambient Icon Glow FX</span>
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-md transition-colors ${config.glowLogoButtons ? 'bg-purple-600 text-white font-semibold shadow' : 'bg-white/10 text-white/40'}`}>
                    {config.glowLogoButtons ? 'GLOW ON' : 'OFF'}
                  </span>
                </div>
              </div>
            </div>

            {/* List with Order Recorder & Reordering (↑ / ↓) */}
            <div className="space-y-2">
              {config.logoButtons.map((logo, index) => (
                <div
                  key={logo.id}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors"
                >
                  <span className="w-6 text-center text-xs font-mono text-purple-400 font-bold shrink-0">
                    #{index + 1}
                  </span>

                  <div className="flex flex-col gap-0.5 shrink-0">
                    <button
                      onClick={() => moveLogoButton(index, 'up')}
                      disabled={index === 0}
                      className="p-1 rounded bg-white/5 hover:bg-white/15 disabled:opacity-20 text-white/70"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => moveLogoButton(index, 'down')}
                      disabled={index === config.logoButtons.length - 1}
                      className="p-1 rounded bg-white/5 hover:bg-white/15 disabled:opacity-20 text-white/70"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="w-8 h-8 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center shrink-0">
                    <PlatformIcon iconKey={logo.iconKey || 'link'} customFile={logo.file} size={18} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono font-medium text-white truncate">{logo.name}</div>
                    <div className="text-[10px] font-mono text-white/40 truncate">{logo.url}</div>
                  </div>

                  <button
                    onClick={() => openEditButtonModal(logo)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-purple-600/30 text-white/60 hover:text-purple-300 border border-white/10"
                    title="Edit Button"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => updateLogoButton(logo.id, { enabled: !logo.enabled })}
                    className={`px-2 py-1 rounded-lg text-[10px] font-mono border transition-all shrink-0 ${
                      logo.enabled ? 'bg-purple-600 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-white/30'
                    }`}
                  >
                    {logo.enabled ? 'ON' : 'OFF'}
                  </button>

                  <button
                    onClick={() => removeLogoButton(logo.id)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-white/40 hover:text-rose-300 border border-white/10"
                    title="Delete Button"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

          {/* 7. CRYPTO WALLET BUTTONS (COPY-TO-ADDRESS ONLY) */}
          <section className="p-3 sm:p-4 rounded-2xl bg-[#0e0e14] border border-white/10 shadow-lg space-y-3 transition-all">
            <div
              onClick={() => toggleSection('crypto')}
              className="flex items-center justify-between border-b border-white/5 pb-2 cursor-pointer select-none group"
            >
              <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-purple-300 flex items-center gap-2">
                <Coins className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Crypto Wallet Buttons</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 lowercase">
                  {(config.cryptoButtons || []).filter((c) => c.enabled).length} active
                </span>
              </h2>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCryptoModal(true);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-mono text-white shadow-md transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Coin</span>
                </button>
                <div className={`p-1 rounded-lg bg-white/5 text-white/60 group-hover:text-white transition-transform ${collapsed['crypto'] ? '-rotate-90' : 'rotate-0'}`}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {!collapsed['crypto'] && (
              <div className="space-y-3 animate-fadeIn">
                <div className="p-2.5 rounded-xl bg-purple-500/5 border border-purple-500/20 text-[11px] font-mono text-purple-200/80 leading-relaxed">
                  💡 <span className="font-semibold text-purple-300">Copy-to-Address only:</span> When visitors click these coins on your card, your wallet address copies directly to their clipboard with a visual "Copied!" notification (no external redirect).
                </div>

                <div className="space-y-2">
                  {(config.cryptoButtons || []).map((coin) => (
                    <div
                      key={coin.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-[130px]">
                        <div className="w-8 h-8 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center shrink-0">
                          <PlatformIcon iconKey={coin.coinKey as PlatformKey} size={18} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-mono font-semibold text-white truncate">{coin.name}</div>
                          <div className="text-[10px] font-mono text-purple-400 uppercase tracking-wider">{coin.coinKey}</div>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 flex items-center gap-2">
                        <input
                          type="text"
                          value={coin.address}
                          onChange={(e) => updateCryptoButton(coin.id, { address: e.target.value })}
                          placeholder={`Enter ${coin.name} address (e.g. 0x... / bc1...)`}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-white placeholder-white/20 outline-none focus:border-purple-400/50"
                        />
                        {coin.address && (
                          <button
                            type="button"
                            onClick={() => handleTestCopyCrypto(coin.id, coin.address)}
                            className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-mono text-white/70 hover:text-white border border-white/10 shrink-0 flex items-center gap-1"
                            title="Test Clipboard Copy"
                          >
                            {copiedCryptoTest === coin.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400 font-bold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Test</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleCryptoButton(coin.id)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono border transition-all ${
                            coin.enabled
                              ? 'bg-purple-600 border-purple-500 text-white font-medium shadow-sm'
                              : 'bg-white/5 border-white/10 text-white/40'
                          }`}
                        >
                          {coin.enabled ? 'ACTIVE' : 'OFF'}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeCryptoButton(coin.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-white/40 hover:text-rose-300 border border-white/10 transition-colors"
                          title="Delete Coin"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 8. MAIN PAGE SHOWCASE & WORKS */}
          <section className="p-3 sm:p-4 rounded-2xl bg-[#0e0e14] border border-white/10 shadow-lg space-y-3 transition-all">
            <div
              onClick={() => toggleSection('showcase')}
              className="flex items-center justify-between border-b border-white/5 pb-2 cursor-pointer select-none group"
            >
              <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-purple-300 flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Main Page Showcase & Works</span>
              </h2>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateConfig({ showPageShowcase: !config.showPageShowcase });
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-colors ${
                    config.showPageShowcase
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : 'bg-white/5 border-white/10 text-white/40'
                  }`}
                >
                  {config.showPageShowcase ? 'ENABLED' : 'DISABLED'}
                </button>
                <div className={`p-1 rounded-lg bg-white/5 text-white/60 group-hover:text-white transition-transform ${collapsed['showcase'] ? '-rotate-90' : 'rotate-0'}`}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {!collapsed['showcase'] && (
              <div className="space-y-3 animate-fadeIn">
                {/* Showcase Title & Subtitle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-white/60">Section Title</span>
                    <input
                      type="text"
                      value={config.showcaseTitle || ''}
                      onChange={(e) => updateConfig({ showcaseTitle: e.target.value })}
                      placeholder="Portfolio & Arsenal"
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white font-mono outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-mono text-white/60">Section Subtitle</span>
                    <input
                      type="text"
                      value={config.showcaseSubtitle || ''}
                      onChange={(e) => updateConfig({ showcaseSubtitle: e.target.value })}
                      placeholder="Selected works, interactive modules & tech stack"
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white font-mono outline-none"
                    />
                  </div>
                </div>

                {/* Projects Manager Header & Button */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono text-white/70">Featured Projects List</span>
                  <button
                    type="button"
                    onClick={openAddProjectModal}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-mono shadow-sm"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Project</span>
                  </button>
                </div>

                {/* Projects List */}
                <div className="space-y-2">
                  {(config.projects || []).map((proj) => (
                    <div
                      key={proj.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-mono text-white truncate">{proj.title}</span>
                          <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-purple-500/20 text-purple-300">
                            {proj.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/40 font-mono truncate mt-0.5">{proj.description}</p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => openEditProjectModal(proj)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-purple-600/30 text-white/60 hover:text-purple-300 border border-white/10"
                          title="Edit Project"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeProject(proj.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-white/40 hover:text-rose-300 border border-white/10"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 9. BACKGROUND AUDIO PLAYER / LO-FI DECK */}
          <section className="p-3 sm:p-4 rounded-2xl bg-[#0e0e14] border border-white/10 shadow-lg space-y-3 transition-all">
            <div
              onClick={() => toggleSection('audio')}
              className="flex items-center justify-between border-b border-white/5 pb-2 cursor-pointer select-none group"
            >
              <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-purple-300 flex items-center gap-2">
                <Music className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Background Audio Player & Lo-Fi Deck</span>
              </h2>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateConfig({ enableMusicPlayer: !config.enableMusicPlayer });
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-colors ${
                    config.enableMusicPlayer
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : 'bg-white/5 border-white/10 text-white/40'
                  }`}
                >
                  {config.enableMusicPlayer ? 'ENABLED' : 'DISABLED'}
                </button>
                <div className={`p-1 rounded-lg bg-white/5 text-white/60 group-hover:text-white transition-transform ${collapsed['audio'] ? '-rotate-90' : 'rotate-0'}`}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {!collapsed['audio'] && (
              <div className="space-y-3 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-white/60">Now Playing Title</span>
                    <input
                      type="text"
                      value={config.musicTrackTitle || ''}
                      onChange={(e) => updateConfig({ musicTrackTitle: e.target.value })}
                      placeholder="Track Title"
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white font-mono outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-white/60">Artist / Channel</span>
                    <input
                      type="text"
                      value={config.musicTrackArtist || ''}
                      onChange={(e) => updateConfig({ musicTrackArtist: e.target.value })}
                      placeholder="Artist Name"
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white font-mono outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* 10. STUDIO SECURITY & MASTER PASSPHRASE */}
          <section className="p-3 sm:p-4 rounded-2xl bg-[#0e0e14] border border-white/10 shadow-lg space-y-3 transition-all">
            <div
              onClick={() => toggleSection('security')}
              className="flex items-center justify-between border-b border-white/5 pb-2 cursor-pointer select-none group"
            >
              <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-purple-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Studio Security & Master Passphrase</span>
              </h2>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  High Entropy
                </span>
                <div className={`p-1 rounded-lg bg-white/5 text-white/60 group-hover:text-white transition-transform ${collapsed['security'] ? '-rotate-90' : 'rotate-0'}`}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {!collapsed['security'] && (
              <div className="space-y-3 animate-fadeIn">
                <p className="text-xs font-mono text-white/50 leading-relaxed">
                  This ultra-long master passphrase locks the secret <code className="text-purple-300 font-bold bg-white/5 px-1 rounded">/&</code> dashboard route so that nobody on the internet can guess it.
                </p>

                <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-white/70">Current Active Master Passphrase:</span>
                    <button
                      type="button"
                      onClick={handleCopyPassword}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-400/40 text-xs font-mono transition-all shadow-sm"
                    >
                      {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey ? '✓ Copied to Clipboard!' : 'Copy Key'}</span>
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={showPasswordText ? 'text' : 'password'}
                      readOnly
                      value={config.adminPassword || 'Chef!992831#Zyo$Quantum*Obsidian&Vault%Nexus'}
                      className="w-full px-3.5 py-2 pr-10 rounded-xl bg-black/60 border border-purple-500/30 text-xs text-purple-200 font-mono select-all outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordText(!showPasswordText)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                      title={showPasswordText ? 'Hide Password' : 'Show Password'}
                    >
                      {showPasswordText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleGenerateLongKey}
                    className="flex-1 py-2 px-4 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 border border-purple-400/40 text-purple-200 text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Generate New 48-Char Ultra Master Key</span>
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* WINDOW 2: Right Dedicated Fixed Preview Window */}
        <div
          className={`flex-1 h-full overflow-y-auto p-4 sm:p-6 bg-[#040406]/75 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col items-center justify-start custom-scrollbar ${
            activeTab === 'editor' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Top Status Bar of Preview Window */}
          <div className="w-full max-w-[540px] flex items-center justify-between mb-3 px-1 shrink-0">
            <span className="text-xs font-mono text-white/70 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Simulator // Window 2
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-purple-300 uppercase tracking-wider">
              {config.cardLayoutType} • {config.template}
            </span>
          </div>

          {/* Centered Live Card Preview */}
          <div className="w-full flex justify-center py-2">
            <InteractiveProfileCard />
          </div>

          {/* Main Page Showcase Preview below card */}
          {config.showPageShowcase && (
            <div className="w-full mt-8 border-t border-white/10 pt-6">
              <PageShowcase />
            </div>
          )}
        </div>
      </div>

      {/* POPUP MODAL FOR ADDING / EDITING REDIRECT BUTTON */}
      {showButtonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl p-6 bg-[#0e0e14] border border-white/15 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-400" />
                <span>{editingBtnId ? 'Edit Redirect Button' : 'Add Redirect Button'}</span>
              </h3>
              <button
                onClick={() => setShowButtonModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Platform Icon Grid (SHOWS ONLY LOGOS - NO COMPANY TEXT NAMES) */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-white/60">Choose Platform Icon</span>
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-48 overflow-y-auto p-1 custom-scrollbar">
                {Object.values(PLATFORM_REGISTRY).map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => {
                      setModalPlatform(p.key);
                      if (!editingBtnId) {
                        setModalName(p.name);
                        setModalUrl(p.defaultUrl);
                      }
                    }}
                    title={p.name}
                    className={`h-11 rounded-xl flex items-center justify-center transition-all ${
                      modalPlatform === p.key
                        ? 'bg-purple-600 text-white ring-2 ring-purple-400 scale-105 shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
                    }`}
                  >
                    <PlatformIcon iconKey={p.key} size={22} />
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Icon Upload or URL */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white/70">Custom Logo (File / URL)</span>
                {modalCustomFile && (
                  <div className="w-6 h-6 rounded bg-black/50 p-0.5 border border-white/10">
                    <img src={modalCustomFile} alt="preview" className="w-full h-full object-contain" />
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={modalCustomFile}
                  onChange={(e) => {
                    setModalCustomFile(e.target.value);
                    setModalPlatform('custom');
                  }}
                  placeholder="https://... custom SVG/PNG URL"
                  className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white outline-none font-mono"
                />
                <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-purple-300 shrink-0">
                  <Upload className="w-3.5 h-3.5 inline mr-1" />
                  Upload
                  <input
                    type="file"
                    accept="image/*,.svg"
                    className="hidden"
                    onChange={handleCustomIconUpload}
                  />
                </label>
              </div>
            </div>

            {/* Button Name & Target URL Inputs */}
            <form onSubmit={handleSaveButtonModal} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-white/60">Button Title</span>
                  <input
                    type="text"
                    required
                    value={modalName}
                    onChange={(e) => setModalName(e.target.value)}
                    placeholder="e.g. Discord"
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white outline-none font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono text-white/60">Destination URL</span>
                  <input
                    type="text"
                    required
                    value={modalUrl}
                    onChange={(e) => setModalUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white outline-none font-mono"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowButtonModal(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-xs font-mono text-white/50 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-mono text-white font-medium shadow-md transition-all"
                >
                  {editingBtnId ? 'Save Changes' : 'Create Button'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP MODAL FOR ADDING / EDITING FEATURED PROJECT */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl p-6 bg-[#0e0e14] border border-white/15 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-purple-400" />
                <span>{editingProjectId ? 'Edit Project' : 'Add Featured Project'}</span>
              </h3>
              <button
                onClick={() => setShowProjectModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProjectModal} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-white/60">Project Title</span>
                  <input
                    type="text"
                    required
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="e.g. Cloud Security Suite"
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-white/60">Tech Stack Tag</span>
                  <input
                    type="text"
                    required
                    value={projectTag}
                    onChange={(e) => setProjectTag(e.target.value)}
                    placeholder="e.g. TypeScript • Rust"
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-white/60">Description</span>
                <textarea
                  required
                  rows={2}
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  placeholder="Summary of architecture, performance, or purpose..."
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white outline-none font-mono resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-white/60">Live Demo URL</span>
                  <input
                    type="text"
                    value={projectLink}
                    onChange={(e) => setProjectLink(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-white/60">GitHub URL</span>
                  <input
                    type="text"
                    value={projectGithub}
                    onChange={(e) => setProjectGithub(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-white/60">Stars / Badge</span>
                  <input
                    type="text"
                    value={projectStars}
                    onChange={(e) => setProjectStars(e.target.value)}
                    placeholder="e.g. 1.2k"
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white outline-none font-mono"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-xs font-mono text-white/50 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-mono text-white font-medium shadow-md transition-all"
                >
                  {editingProjectId ? 'Save Changes' : 'Add Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP MODAL FOR ADDING CUSTOM BADGE */}
      {showBadgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl p-6 bg-[#0e0e14] border border-white/15 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Add Custom Badge</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowBadgeModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBadgeModal} className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-white/60">Badge Name</span>
                <input
                  type="text"
                  required
                  value={newBadgeName}
                  onChange={(e) => setNewBadgeName(e.target.value)}
                  placeholder="e.g. VIP Member, Solana Dev, OG"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white outline-none font-mono"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-white/60">Badge Icon (Upload or URL)</span>
                  {newBadgeFile && (
                    <div className="w-7 h-7 rounded bg-black/60 p-1 border border-purple-500/40 flex items-center justify-center">
                      <img src={newBadgeFile} alt="badge preview" className="w-5 h-5 object-contain" />
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={newBadgeFile}
                    onChange={(e) => setNewBadgeFile(e.target.value)}
                    placeholder="https://... PNG / SVG URL"
                    className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white outline-none font-mono"
                  />
                  <label className="cursor-pointer px-3 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-400/40 text-xs font-mono text-purple-300 shrink-0 flex items-center gap-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*,.svg"
                      className="hidden"
                      onChange={handleBadgeFileUpload}
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowBadgeModal(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-xs font-mono text-white/50 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-mono text-white font-medium shadow-md transition-all"
                >
                  Add Badge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP MODAL FOR ADDING CRYPTO BUTTON */}
      {showCryptoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl p-6 bg-[#0e0e14] border border-white/15 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <Coins className="w-4 h-4 text-purple-400" />
                <span>Add Crypto Wallet Button</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowCryptoModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCryptoModal} className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-white/60">Select Cryptocurrency</span>
                <div className="grid grid-cols-5 gap-1.5">
                  {[
                    { key: 'btc', name: 'Bitcoin' },
                    { key: 'eth', name: 'Ethereum' },
                    { key: 'sol', name: 'Solana' },
                    { key: 'ltc', name: 'Litecoin' },
                    { key: 'usdt', name: 'Tether' },
                    { key: 'bnb', name: 'BNB' },
                    { key: 'xrp', name: 'XRP' },
                    { key: 'doge', name: 'Dogecoin' },
                    { key: 'ada', name: 'Cardano' },
                    { key: 'matic', name: 'Polygon' },
                  ].map((c) => (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => {
                        setNewCryptoCoinKey(c.key);
                        setNewCryptoName(c.name);
                      }}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        newCryptoCoinKey === c.key
                          ? 'bg-purple-600 text-white border-purple-400 shadow-md scale-105'
                          : 'bg-white/5 hover:bg-white/10 text-white/70 border-white/10'
                      }`}
                    >
                      <PlatformIcon iconKey={c.key as PlatformKey} size={20} />
                      <span className="text-[10px] font-mono font-medium truncate">{c.key.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-white/60">Display Name</span>
                <input
                  type="text"
                  required
                  value={newCryptoName}
                  onChange={(e) => setNewCryptoName(e.target.value)}
                  placeholder="e.g. Bitcoin / Main Wallet"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-white/60">Wallet Address (To Copy on Click)</span>
                <input
                  type="text"
                  required
                  value={newCryptoAddress}
                  onChange={(e) => setNewCryptoAddress(e.target.value)}
                  placeholder="Paste your wallet address here..."
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white outline-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowCryptoModal(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-xs font-mono text-white/50 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-mono text-white font-medium shadow-md transition-all"
                >
                  Create Crypto Button
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
