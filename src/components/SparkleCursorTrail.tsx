import { useEffect, useRef } from 'react';
import { useCustomization } from '../context/CustomizationContext';

export function SparkleCursorTrail() {
  const { config } = useCustomization();
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawnTime = useRef(0);

  useEffect(() => {
    if (!config.enableSparkleTrail) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      // Throttle spawn to once every 60ms to avoid any DOM overload
      if (now - lastSpawnTime.current < 60) return;
      lastSpawnTime.current = now;

      const sparkle = document.createElement('img');
      sparkle.src = '/sparkle_white.gif';
      sparkle.alt = '';
      sparkle.className = 'pointer-events-none fixed z-50 transition-opacity duration-500';
      const size = Math.floor(Math.random() * 4 + 14); // 14px - 18px
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;
      sparkle.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
      sparkle.style.filter = 'drop-shadow(0 0 5px rgba(255,255,255,0.8))';
      sparkle.style.opacity = '1';

      container.appendChild(sparkle);

      // Fade and remove smoothly
      requestAnimationFrame(() => {
        sparkle.style.opacity = '0';
        sparkle.style.transform = `translate(-50%, -60%) scale(0.6)`;
      });

      setTimeout(() => {
        sparkle.remove();
      }, 450);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [config.enableSparkleTrail]);

  if (!config.enableSparkleTrail) return null;

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-50 overflow-hidden" />;
}
