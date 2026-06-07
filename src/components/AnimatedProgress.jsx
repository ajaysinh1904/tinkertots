import React, { useState, useEffect, useRef } from 'react';

export default function AnimatedProgress({ label, percentage, color = 'plum', emoji = '⭐' }) {
  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger animation
            setWidth(percentage);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [percentage]);

  const bgClasses = {
    plum: 'bg-plum',
    gold: 'bg-gold',
    lilac: 'bg-lilac',
    blush: 'bg-blush',
    lavender: 'bg-lavender',
  };

  const bgClass = bgClasses[color] || 'bg-plum';

  return (
    <div ref={containerRef} className="w-full mb-6 font-body">
      <div className="flex justify-between items-center mb-2">
        <span className="font-display font-extrabold text-navy text-base md:text-lg flex items-center gap-2">
          <span>{emoji}</span> {label}
        </span>
        <span className="font-accent text-navy text-sm bg-white border border-navy/20 px-2 py-0.5 rounded-full shadow-[1px_1px_0px_0px_#3B0764]">
          {percentage}%
        </span>
      </div>
      
      {/* Bar Background */}
      <div className="w-full h-6 bg-white border-2 border-navy rounded-full overflow-hidden p-0.5 shadow-[2px_2px_0px_0px_#3B0764]">
        {/* Filled Portion */}
        <div
          className={`h-full rounded-full transition-all duration-[1500ms] ease-out ${bgClass}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
