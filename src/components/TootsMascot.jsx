import React from 'react';

export default function TootsMascot({ size = 100, className = '' }) {
  // Pure SVG/CSS illustrated owl mascot "Toots"
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      {/* Shadow */}
      <ellipse cx="100" cy="180" rx="60" ry="12" fill="#3B0764" fillOpacity="0.1" />

      {/* Feet */}
      <circle cx="75" cy="172" r="10" fill="#7B2D8B" />
      <circle cx="85" cy="174" r="8" fill="#7B2D8B" />
      <circle cx="115" cy="174" r="8" fill="#7B2D8B" />
      <circle cx="125" cy="172" r="10" fill="#7B2D8B" />

      {/* Wings - Left & Right */}
      {/* Left Wing */}
      <path
        d="M50 110 C20 110, 15 140, 45 150 C55 152, 60 140, 58 130 Z"
        fill="#E9D5F5"
        stroke="#3B0764"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Right Wing */}
      <path
        d="M150 110 C180 110, 185 140, 155 150 C145 152, 140 140, 142 130 Z"
        fill="#E9D5F5"
        stroke="#3B0764"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Main Body */}
      <rect
        x="45"
        y="60"
        width="110"
        height="115"
        rx="55"
        fill="#C084FC"
        stroke="#3B0764"
        strokeWidth="4"
      />

      {/* Belly Patch */}
      <path
        d="M60 115 C60 90, 140 90, 140 115 C140 150, 60 150, 60 115 Z"
        fill="#FDF8FF"
        stroke="#3B0764"
        strokeWidth="3"
        strokeDasharray="4 2"
      />

      {/* Little feathers on belly */}
      <path d="M90 115 Q100 125 110 115" stroke="#3B0764" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M80 130 Q100 142 120 130" stroke="#3B0764" strokeWidth="2.5" strokeLinecap="round" />

      {/* Eye Background Circles (White and large) */}
      <circle cx="75" cy="85" r="28" fill="white" stroke="#3B0764" strokeWidth="4" />
      <circle cx="125" cy="85" r="28" fill="white" stroke="#3B0764" strokeWidth="4" />

      {/* Pupils (Big round black circles with eye highlights) */}
      <circle cx="78" cy="85" r="16" fill="#3B0764" />
      <circle cx="122" cy="85" r="16" fill="#3B0764" />

      {/* Eye Highlights */}
      <circle cx="73" cy="80" r="5" fill="white" />
      <circle cx="117" cy="80" r="5" fill="white" />
      <circle cx="83" cy="88" r="2" fill="white" />
      <circle cx="127" cy="88" r="2" fill="white" />

      {/* Beak */}
      <path
        d="M93 93 L107 93 L100 108 Z"
        fill="#F5B800"
        stroke="#3B0764"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Graduation Cap (Toots is a smart owl!) */}
      {/* Cap Cap (Square tilted top) */}
      <path
        d="M100 25 L160 40 L100 55 L40 40 Z"
        fill="#3B0764"
        stroke="#3B0764"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Cap Base (Fitted on head) */}
      <path
        d="M72 45 C72 45, 75 56, 100 56 C125 56, 128 45, 128 45"
        stroke="#3B0764"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Cap Tassel */}
      <path
        d="M100 40 L55 35 L50 60"
        stroke="#F5B800"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="50" cy="62" r="4" fill="#F5B800" />
    </svg>
  );
}
