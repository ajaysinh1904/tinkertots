import React, { useMemo } from 'react';

export default function Confetti() {
  const pieces = useMemo(() => {
    const colors = ['#F5B800', '#7B2D8B', '#C026D3', '#E9D5F5', '#C084FC', '#F0ABFC'];
    return Array.from({ length: 40 }).map((_, i) => {
      // Calculate random polar coordinates, then convert to rectangular for translation vectors
      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 250;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance - 80; // slightly biased upwards
      const r = Math.random() * 720 - 360; // spin degrees
      const color = colors[Math.floor(Math.random() * colors.length)];
      const width = 6 + Math.random() * 10;
      const height = 10 + Math.random() * 12;
      const delay = Math.random() * 0.15;
      const borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      return { id: i, x, y, r, color, width, height, delay, borderRadius };
    });
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[9999] overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            '--x': `${p.x}px`,
            '--y': `${p.y}px`,
            '--r': `${p.r}deg`,
            backgroundColor: p.color,
            width: `${p.width}px`,
            height: `${p.height}px`,
            animationDelay: `${p.delay}s`,
            borderRadius: p.borderRadius,
            position: 'absolute',
            top: '50%',
            left: '50%',
          }}
        />
      ))}
    </div>
  );
}
