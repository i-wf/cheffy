import { memo } from 'react';
import { useCustomization } from '../context/CustomizationContext';

function isVideoUrl(url: string): boolean {
  if (!url) return false;
  const clean = url.split('?')[0].toLowerCase();
  return clean.endsWith('.mp4') || clean.endsWith('.webm') || clean.endsWith('.mov') || url.includes('video');
}

export const HeavenlyBackground = memo(function HeavenlyBackground() {
  const { config } = useCustomization();

  const isVideo = config.bgMediaType === 'video' || isVideoUrl(config.bgCustomUrl);
  const overlayOpacity = (config.bgOverlayOpacity ?? 45) / 100;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: config.backgroundColor || '#070709' }}
    >
      {/* MP4 Video Background */}
      {isVideo && config.bgCustomUrl && (
        <div className="absolute inset-0">
          <video
            src={config.bgCustomUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
          />
        </div>
      )}

      {/* Static Wallpaper Image Background */}
      {!isVideo && config.bgCustomUrl && (
        <div className="absolute inset-0">
          <img
            src={config.bgCustomUrl}
            alt="Background Wallpaper"
            className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
          />
        </div>
      )}

      {/* Atmospheric Fallback when no image/video is set */}
      {!config.bgCustomUrl && (
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-b from-purple-900/15 via-white/[0.02] to-transparent blur-[140px]" />
          <div className="absolute -bottom-20 left-1/4 w-[500px] h-[400px] rounded-full bg-blue-900/15 blur-[120px]" />
        </div>
      )}

      {/* Tunable Dark Overlay for Card Readability */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
        }}
      />

      {/* Subtle Ambient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
    </div>
  );
});
