import React, { useId } from 'react';

/**
 * CinemaCameraIcon Component
 * Exact vector replication of the user's reference image:
 * "Video Camera Vector Png Transparent"
 * Uses an SVG mask so cutouts (film reel holes, monitor window, buttons)
 * are truly transparent and blend over any background color.
 */
export default function CinemaCameraIcon({
  className = 'w-12 h-12',
  color = 'currentColor',
}) {
  const maskId = useId();

  return (
    <svg
      viewBox="0 0 250 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask id={maskId}>
          {/* Base white mask allows everything through */}
          <rect width="100%" height="100%" fill="#FFFFFF" />

          {/* Black shapes punch transparent holes through the camera body */}
          {/* 1. Left Reel Hole */}
          <circle cx="115" cy="52" r="9" fill="#000000" />

          {/* 2. Right Reel Hole */}
          <circle cx="180" cy="66" r="8.5" fill="#000000" />

          {/* 3. Horizontal Film Slot Line */}
          <rect x="132" y="98" width="56" height="6.5" rx="3.25" fill="#000000" />

          {/* 4. Body Monitor Window */}
          <rect x="175" y="137" width="28" height="28" rx="8" fill="#000000" />

          {/* 5. Control Dial Buttons */}
          <circle cx="116" cy="165" r="5.5" fill="#000000" />
          <circle cx="132" cy="165" r="7.5" fill="#000000" />
        </mask>
      </defs>

      {/* Main Solid Silhouette masked with transparent cutouts */}
      <g mask={`url(#${maskId})`} fill={color}>
        {/* Left Film Reel */}
        <circle cx="115" cy="52" r="44" />

        {/* Right Film Reel */}
        <circle cx="180" cy="66" r="38" />

        {/* Main Camera Body */}
        <rect x="82" y="104" width="136" height="74" rx="12" />

        {/* Front Lens Hood (Matte Box) */}
        <path d="M 86 126 L 14 110 C 9 109 5 113 5 118 L 5 174 C 5 179 9 183 14 182 L 86 166 Z" />

        {/* Rear Viewfinder / Eyepiece */}
        <path d="M 218 128 L 236 123 C 238 122 240 124 240 126 L 240 138 C 240 140 238 142 236 141 L 218 136 Z" />
      </g>
    </svg>
  );
}
