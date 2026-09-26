import {
  CustomizationProvider,
  useCustomization,
} from './context/CustomizationContext';
import { HeavenlyBackground } from './components/HeavenlyBackground';
import { AestheticCursor } from './components/AestheticCursor';
import { SparkleCursorTrail } from './components/SparkleCursorTrail';
import { InteractiveProfileCard } from './components/InteractiveProfileCard';
import { PageShowcase } from './components/PageShowcase';
import { Dashboard } from './components/Dashboard';

function AppContent() {
  const { isDashboardRoute, config } = useCustomization();

  // If secret route /& is visited
  if (isDashboardRoute) {
    return <Dashboard />;
  }

  const showShowcase = config.showPageShowcase ?? true;

  return (
    <div
      className={`relative min-h-screen w-full flex flex-col items-center selection:bg-white/20 selection:text-white ${
        showShowcase ? 'overflow-y-auto' : 'overflow-hidden justify-center'
      }`}
    >
      {/* Background Effect (Aurora, Snowflakes, Rain, Stars, Blurred, etc.) */}
      <HeavenlyBackground />

      {/* Sparkle Cursor Trail with sparkle_white.gif */}
      <SparkleCursorTrail />

      {/* Custom Cross/Glow Cursor */}
      <AestheticCursor />

      {/* HERO SECTION: Center Profile Card */}
      <section className="relative z-10 w-full min-h-[92vh] flex flex-col items-center justify-center p-3 sm:p-6">
        <InteractiveProfileCard />

        {/* Smooth Scroll Prompt Indicator to Next Page Section */}
        {showShowcase && (
          <div className="mt-8 flex flex-col items-center justify-center text-center text-white/40 text-xs font-mono select-none">
            <span className="flex items-center gap-1.5 animate-bounce text-purple-300/80">
              <span>↓ Scroll to explore portfolio & soundboard ↓</span>
            </span>
          </div>
        )}
      </section>

      {/* MAIN PAGE SHOWCASE SECTION (OUT of the card!) */}
      {showShowcase && <PageShowcase />}
    </div>
  );
}

export default function App() {
  return (
    <CustomizationProvider>
      <AppContent />
    </CustomizationProvider>
  );
}
