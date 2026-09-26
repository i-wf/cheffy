import { memo } from 'react';

interface VenomDecorationProps {
  size?: number;
}

export const VenomDecoration = memo(function VenomDecoration({ size = 138 }: VenomDecorationProps) {
  return (
    <div
      className="absolute pointer-events-none z-30 select-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <svg
        viewBox="0 0 240 240"
        className="w-full h-full overflow-visible filter drop-shadow-[0_0_12px_rgba(0,0,0,0.95)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="venomDarkGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#25252d" />
            <stop offset="60%" stopColor="#0a0a0f" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          <linearGradient id="venomGlossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
          </linearGradient>
          <filter id="venomGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g className="animate-venom-squirm origin-center">
          {/* Main Symbiote Mass: Background Spikes & Tendrils */}
          {/* Top-Right aggressive spikes */}
          <path
            d="M 155 45 Q 185 10 205 15 Q 188 35 180 50 Q 215 30 230 42 Q 195 62 178 75 Z"
            fill="url(#venomDarkGrad)"
            stroke="#000"
            strokeWidth="1.2"
          />
          <path
            d="M 170 30 Q 195 2 210 0 Q 198 25 185 38 Z"
            fill="#050508"
          />

          {/* Top-Left jagged tendril burst */}
          <path
            d="M 85 45 Q 55 10 35 15 Q 52 35 60 50 Q 25 30 10 42 Q 45 62 62 75 Z"
            fill="url(#venomDarkGrad)"
            stroke="#000"
            strokeWidth="1.2"
          />
          <path
            d="M 70 30 Q 45 2 30 0 Q 42 25 55 38 Z"
            fill="#050508"
          />

          {/* Crown Top spikes */}
          <path
            d="M 105 38 Q 120 -5 125 -8 Q 128 15 130 38 Q 145 5 152 10 Q 140 30 138 42 Q 95 5 88 10 Q 100 30 105 38 Z"
            fill="url(#venomDarkGrad)"
            stroke="#000"
            strokeWidth="1.2"
          />

          {/* Right side claws & thorns */}
          <path
            d="M 195 105 Q 235 90 240 100 Q 220 115 198 120 Q 238 132 235 145 Q 212 138 190 135 Z"
            fill="url(#venomDarkGrad)"
            stroke="#000"
            strokeWidth="1.2"
          />
          <path
            d="M 188 80 Q 225 65 232 72 Q 210 88 192 95 Z"
            fill="#050508"
          />
          <path
            d="M 185 140 Q 225 160 230 172 Q 205 165 180 155 Z"
            fill="#000000"
          />

          {/* Left side claws & tendrils */}
          <path
            d="M 45 105 Q 5 90 0 100 Q 20 115 42 120 Q 2 132 5 145 Q 28 138 50 135 Z"
            fill="url(#venomDarkGrad)"
            stroke="#000"
            strokeWidth="1.2"
          />
          <path
            d="M 52 80 Q 15 65 8 72 Q 30 88 48 95 Z"
            fill="#050508"
          />
          <path
            d="M 55 140 Q 15 160 10 172 Q 35 165 60 155 Z"
            fill="#000000"
          />

          {/* Bottom Drips & Tendrils */}
          <path
            d="M 105 202 Q 120 245 125 248 Q 128 225 130 202 Q 145 235 152 230 Q 140 210 138 198 Q 95 235 88 230 Q 100 210 105 202 Z"
            fill="url(#venomDarkGrad)"
            stroke="#000"
            strokeWidth="1.2"
          />
          <path
            d="M 155 195 Q 185 230 205 225 Q 188 205 180 190 Q 215 210 228 198 Q 195 178 178 165 Z"
            fill="url(#venomDarkGrad)"
            stroke="#000"
            strokeWidth="1.2"
          />
          <path
            d="M 85 195 Q 55 230 35 225 Q 52 205 60 190 Q 25 210 12 198 Q 45 178 62 165 Z"
            fill="url(#venomDarkGrad)"
            stroke="#000"
            strokeWidth="1.2"
          />

          {/* Connecting Webbing & Symbiote Strands around circle rim */}
          <circle
            cx="120"
            cy="120"
            r="64"
            fill="none"
            stroke="#08080c"
            strokeWidth="8"
            strokeDasharray="14 6 8 4"
            opacity="0.9"
          />
          <circle
            cx="120"
            cy="120"
            r="60"
            fill="none"
            stroke="#000000"
            strokeWidth="6"
          />

          {/* Fine Web Strands bridging across tendrils */}
          <path
            d="M 60 50 Q 80 30 105 38 M 135 38 Q 160 30 180 50 M 180 190 Q 160 210 135 202 M 105 202 Q 80 210 60 190"
            stroke="#1c1c24"
            strokeWidth="1.5"
            fill="none"
            opacity="0.75"
          />
          <path
            d="M 45 80 Q 20 100 45 120 M 195 80 Q 220 100 195 120"
            stroke="#1c1c24"
            strokeWidth="1.5"
            fill="none"
            opacity="0.75"
          />

          {/* Spiky Inner Teeth / Rim Claws encroaching the circle */}
          <path d="M 75 62 L 68 55 L 82 58 Z" fill="#000" />
          <path d="M 165 62 L 172 55 L 158 58 Z" fill="#000" />
          <path d="M 60 120 L 52 118 L 62 125 Z" fill="#000" />
          <path d="M 180 120 L 188 118 L 178 125 Z" fill="#000" />
          <path d="M 75 178 L 68 185 L 82 182 Z" fill="#000" />
          <path d="M 165 178 L 172 185 L 158 182 Z" fill="#000" />
          <path d="M 120 54 L 118 46 L 124 50 Z" fill="#000" />
          <path d="M 120 186 L 118 194 L 124 190 Z" fill="#000" />

          {/* Symbiote Slime Gloss Highlights */}
          <ellipse cx="90" cy="40" rx="3" ry="1.5" transform="rotate(-30 90 40)" fill="white" opacity="0.3" />
          <ellipse cx="150" cy="40" rx="3" ry="1.5" transform="rotate(30 150 40)" fill="white" opacity="0.3" />
          <ellipse cx="210" cy="110" rx="3" ry="1.5" transform="rotate(75 210 110)" fill="white" opacity="0.25" />
          <ellipse cx="30" cy="110" rx="3" ry="1.5" transform="rotate(-75 30 110)" fill="white" opacity="0.25" />
        </g>
      </svg>
    </div>
  );
});
