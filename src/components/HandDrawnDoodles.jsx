import React from 'react';

const colors = {
  coral: '#FF6B6B',
  sunshine: '#FFD93D',
  lavender: '#B197FC',
  skyblue: '#74C0FC',
  mint: '#69DB7C',
  navy: '#1A1A2E',
};

export function StarDoodle({ color = 'coral', size = 24, className = '', animate = 'spin-slow' }) {
  const hex = colors[color] || color;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`animate-${animate} ${className}`}
      style={{ display: 'inline-block' }}
    >
      <path
        d="M12 2 C12 8, 8 12, 2 12 C8 12, 12 16, 12 22 C12 16, 16 12, 22 12 C16 12, 12 8, 12 2 Z"
        fill={hex}
        stroke="#1A1A2E"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SpiralDoodle({ color = 'sunshine', size = 30, className = '', animate = 'float-slow' }) {
  const hex = colors[color] || color;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`animate-${animate} ${className}`}
      style={{ display: 'inline-block' }}
    >
      <path
        d="M16 16 C14 14, 13 18, 16 19 C20 20, 21 13, 16 11 C9 8, 10 23, 17 24 C26 25, 27 6, 15 4 C6 2, 2 17, 10 26 C15 31, 29 27, 27 15"
        stroke={hex}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function HeartDoodle({ color = 'lavender', size = 24, className = '', animate = 'float-slow' }) {
  const hex = colors[color] || color;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`animate-${animate} ${className}`}
      style={{ display: 'inline-block' }}
    >
      <path
        d="M12 21 C12 21, 3 14, 3 8.5 C3 5.5, 5.5 3, 8.5 3 C10.5 3, 11.5 4, 12 5 C12.5 4, 13.5 3, 15.5 3 C18.5 3, 21 5.5, 21 8.5 C21 14, 12 21, 12 21 Z"
        fill={hex}
        stroke="#1A1A2E"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DotDoodle({ color = 'skyblue', size = 12, className = '' }) {
  const hex = colors[color] || color;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block' }}
    >
      <path
        d="M8 13.5 C11.0376 13.5 13.5 11.0376 13.5 8 C13.5 4.96243 11.0376 2.5 8 2.5 C4.96243 2.5 2.5 4.96243 2.5 8 C2.5 11.0376 4.96243 13.5 8 13.5 Z"
        fill={hex}
        stroke="#1A1A2E"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function StickerBadge({ text = '', color = 'sunshine', className = '', rotate = '-3deg' }) {
  const bg = color === 'sunshine' ? 'bg-sunshine' : color === 'coral' ? 'bg-coral text-white' : color === 'lavender' ? 'bg-lavender text-white' : 'bg-mint';
  return (
    <span
      className={`inline-block px-4 py-2 font-accent text-sm md:text-base border-2 border-navy rounded-xl shadow-[4px_4px_0px_0px_#1A1A2E] transform transition-transform hover:scale-105 select-none ${bg} ${className}`}
      style={{ transform: `rotate(${rotate})` }}
    >
      {text}
    </span>
  );
}
