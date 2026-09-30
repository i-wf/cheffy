import { memo } from 'react';

interface GhostDecorationProps {
  size?: number;
}

export const GhostDecoration = memo(function GhostDecoration({ size = 110 }: GhostDecorationProps) {
  return (
    <div
      className="absolute pointer-events-none z-30 select-none"
      style={{
        width: `${size}px`,
        height: `${size * 1.3}px`,
        left: '-15%',
        top: '45%',
        transform: 'translate(-35%, -50%)',
      }}
    >
      <svg
        viewBox="0 0 160 210"
        className="w-full h-full overflow-visible filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.65)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ghostBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#f5f5fa" />
            <stop offset="100%" stopColor="#e4e4ed" />
          </linearGradient>
          <radialGradient id="ghostBlush" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff77a8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff77a8" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="animate-subtle-float">
          {/* Ghost Body (Tail curving around the avatar) */}
          <path
            d="M 85 20 C 130 20 145 65 140 105 C 135 145 110 165 95 180 C 75 200 50 205 35 195 C 20 185 30 165 48 155 C 70 142 85 125 82 100 C 80 80 60 70 52 55 C 44 40 55 20 85 20 Z"
            fill="url(#ghostBodyGrad)"
            stroke="#121218"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* Left Eye (Curved happy eye) */}
          <path
            d="M 72 65 Q 82 58 90 65"
            stroke="#121218"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Eye (Curved happy eye) */}
          <path
            d="M 106 63 Q 116 56 124 63"
            stroke="#121218"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Open Cute Blushing Mouth */}
          <path
            d="M 90 77 Q 98 96 108 77 Z"
            fill="#ff4d79"
            stroke="#121218"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Tongue highlight inside mouth */}
          <path
            d="M 94 85 Q 98 94 104 86"
            fill="#ff99b3"
          />

          {/* Left Pink Cheek */}
          <circle cx="68" cy="74" r="8" fill="url(#ghostBlush)" />

          {/* Right Pink Cheek */}
          <circle cx="128" cy="72" r="8" fill="url(#ghostBlush)" />
        </g>
      </svg>
    </div>
  );
});
