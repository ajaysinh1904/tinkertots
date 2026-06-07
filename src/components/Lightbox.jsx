import React, { useEffect } from 'react';

export default function Lightbox({
  isOpen,
  images = [],
  currentIndex = 0,
  onClose,
  onPrev,
  onNext
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock scrolling on body when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onPrev, onNext, onClose]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1A1A2E]/80 backdrop-blur-md">
      {/* Close Button Top Right */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 bg-white border-2 border-navy rounded-full text-navy font-bold text-xl flex items-center justify-center shadow-[4px_4px_0px_0px_#1A1A2E] hover:bg-coral hover:text-white transition-colors duration-150 active:scale-95"
        aria-label="Close Lightbox"
      >
        ✕
      </button>

      {/* Left Arrow Button */}
      <button
        onClick={onPrev}
        className="absolute left-4 md:left-8 w-12 h-12 bg-white border-2 border-navy rounded-full text-navy font-bold text-xl flex items-center justify-center shadow-[4px_4px_0px_0px_#1A1A2E] hover:bg-sunshine active:scale-95 transition-all"
        aria-label="Previous Image"
      >
        ◀
      </button>

      {/* Center Image Content */}
      <div className="flex flex-col items-center max-w-[90%] max-h-[80%]">
        <div className="relative border-4 border-navy rounded-2xl overflow-hidden bg-white shadow-[8px_8px_0px_0px_#1A1A2E]">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].title || 'Preschool Gallery'}
            className="max-w-full max-h-[65vh] object-contain block"
          />
          
          {/* Caption Overlay */}
          <div className="bg-white border-t-2 border-navy p-3 text-center">
            <h4 className="font-display font-bold text-navy text-lg">
              {images[currentIndex].title}
            </h4>
            <p className="text-xs text-navy/60 font-semibold mt-0.5">
              {images[currentIndex].category}
            </p>
          </div>
        </div>

        {/* Counter Pill */}
        <div className="mt-4 font-accent text-sm bg-sunshine border-2 border-navy px-4 py-1.5 rounded-full shadow-[2px_2px_0px_0px_#1A1A2E] text-navy">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Right Arrow Button */}
      <button
        onClick={onNext}
        className="absolute right-4 md:right-8 w-12 h-12 bg-white border-2 border-navy rounded-full text-navy font-bold text-xl flex items-center justify-center shadow-[4px_4px_0px_0px_#1A1A2E] hover:bg-sunshine active:scale-95 transition-all"
        aria-label="Next Image"
      >
        ▶
      </button>
    </div>
  );
}
