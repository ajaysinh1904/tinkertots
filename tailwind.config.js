/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      // ─────────────────────────────────────────
      // 🎨 ROYAL STORYBOOK — Color Palette
      // ─────────────────────────────────────────
      colors: {
        // PRIMARY — replaces 'coral'
        plum:     '#7B2D8B',   // nav, headings, strong accents
        violet:   '#C026D3',   // hover states, links, highlights

        // SECONDARY — replaces 'sunshine'
        gold:     '#F5B800',   // CTA buttons, badges, stars
        amber:    '#FBBF24',   // hover gold, secondary accents

        // SUPPORTING — replaces 'skyblue' / 'mint'
        lilac:    '#E9D5F5',   // card backgrounds, soft sections
        blush:    '#F3E5F5',   // page section alternates
        lavender: '#C084FC',   // tags, pills, decorative

        // NEUTRALS — replaces 'cream' / 'navy'
        cream:    '#FDF8FF',   // main page background (warm white)
        parchment:'#F5EEF8',   // alternate section background
        navy:     '#3B0764',   // body text, borders (deep purple-black)

        // EXTRAS
        rose:     '#F0ABFC',   // decorative blobs, doodles
        stardust: '#FAF5FF',   // hero background tint
      },

      // ─────────────────────────────────────────
      // 🔤 Typography
      // ─────────────────────────────────────────
      fontFamily: {
        display: ['"Baloo 2"',     'cursive'],
        body:    ['"Nunito"',      'sans-serif'],
        accent:  ['"Fredoka One"', 'cursive'],
      },

      // ─────────────────────────────────────────
      // 🔲 Border
      // ─────────────────────────────────────────
      borderWidth: {
        '3': '3px',
      },

      // ─────────────────────────────────────────
      // 🌟 Box Shadows — Royal edition
      //    Replace all [8px_8px_0px_0px_#1A1A2E]
      //    with [8px_8px_0px_0px_#3B0764]
      // ─────────────────────────────────────────
      boxShadow: {
        'royal-sm':  '3px 3px 0px 0px #3B0764',
        'royal-md':  '6px 6px 0px 0px #3B0764',
        'royal-lg':  '8px 8px 0px 0px #3B0764',
        'royal-xl':  '10px 10px 0px 0px #3B0764',
        'gold-glow': '0 0 20px 4px rgba(245,184,0,0.25)',
        'plum-glow': '0 0 20px 4px rgba(123,45,139,0.20)',
      },

      // ─────────────────────────────────────────
      // 🎞️ Keyframe Animations
      // ─────────────────────────────────────────
      keyframes: {
        /* ── Blob morph ── */
        'blob-morph': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '33%':      { borderRadius: '70% 30% 50% 50% / 50% 60% 40% 60%' },
          '66%':      { borderRadius: '50% 50% 30% 70% / 40% 40% 60% 60%' },
        },
        /* ── Spin ── */
        'spin-slow': {
          '0%':   { transform: 'rotate(0deg)'   },
          '100%': { transform: 'rotate(360deg)' },
        },
        /* ── Float ── */
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)'   },
          '50%':      { transform: 'translateY(-15px)' },
        },
        /* ── Stars twinkle (new for Royal theme) ── */
        'twinkle': {
          '0%, 100%': { opacity: '1',   transform: 'scale(1)'    },
          '50%':      { opacity: '0.3', transform: 'scale(0.7)'  },
        },
        /* ── Magic shimmer on gold buttons ── */
        'shimmer': {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center'  },
        },
        /* ── Card reveal ── */
        'cardReveal': {
          '0%':   { opacity: '0', transform: 'translateY(24px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0)    scale(1)'    },
        },
        /* ── Border draw ── */
        'borderDraw': {
          '0%':   { opacity: '0', transform: 'scale(0.92)' },
          '60%':  { opacity: '1', transform: 'scale(1.02)' },
          '100%': { opacity: '1', transform: 'scale(1)'    },
        },
        /* ── Shadow pop ── */
        'shadowPop': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        /* ── Image reveal ── */
        'imgReveal': {
          '0%':   { opacity: '0', transform: 'scale(0.93)' },
          '100%': { opacity: '1', transform: 'scale(1)'    },
        },
        /* ── Fade in ── */
        'fadeIn': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        /* ── Reveal up (scroll) ── */
        'revealUp': {
          '0%':   { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
        /* ── Modal bounce ── */
        'bounce-light': {
          '0%':   { transform: 'scale(0.85)', opacity: '0' },
          '60%':  { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)',    opacity: '1' },
        },
        /* ── Counter bounce ── */
        'counterBounce': {
          '0%, 100%': { transform: 'scale(1)'    },
          '50%':      { transform: 'scale(1.15)' },
        },
        /* ── Progress bar fill ── */
        'progressFill': {
          '0%':   { width: '0%'                   },
          '100%': { width: 'var(--progress-width)' },
        },
        /* ── Confetti ── */
        'confettiFly': {
          '0%':   { transform: 'translateY(0) rotate(0deg)',     opacity: '1' },
          '100%': { transform: 'translateY(-80vh) rotate(720deg)', opacity: '0' },
        },
        /* ── WhatsApp pulse ring ── */
        'pulseRing': {
          '0%':   { transform: 'scale(1)',   opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0'   },
        },
        /* ── Chatbot slide up ── */
        'slideUp': {
          '0%':   { opacity: '0', transform: 'translateY(24px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0)    scale(1)'    },
        },
        /* ── Typing dots ── */
        'typingDot': {
          '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: '0.4' },
          '40%':           { transform: 'scale(1)',   opacity: '1'   },
        },
        /* ── Trust bar marquee ── */
        'marquee': {
          '0%':   { transform: 'translateX(0%)'   },
          '100%': { transform: 'translateX(-50%)' },
        },
        /* ── Sticker wobble ── */
        'stickerWobble': {
          '0%, 100%': { transform: 'rotate(-2deg) scale(1)'    },
          '50%':      { transform: 'rotate(2deg)  scale(1.05)' },
        },
        /* ── Particle float ── */
        'particleFloat': {
          '0%':   { transform: 'translateY(0px)   rotate(0deg)',   opacity: '0.7' },
          '50%':  { transform: 'translateY(-20px) rotate(180deg)', opacity: '1'   },
          '100%': { transform: 'translateY(0px)   rotate(360deg)', opacity: '0.7' },
        },
      },

      // ─────────────────────────────────────────
      // ⚡ Animation Shortcuts
      // ─────────────────────────────────────────
      animation: {
        'blob-morph':    'blob-morph 10s ease-in-out infinite',
        'spin-slow':     'spin-slow 20s linear infinite',
        'float-slow':    'float-slow 6s ease-in-out infinite',
        'twinkle':       'twinkle 2.5s ease-in-out infinite',
        'shimmer':       'shimmer 2s linear infinite',
        'cardReveal':    'cardReveal 0.6s ease-out forwards',
        'borderDraw':    'borderDraw 0.5s ease-out forwards',
        'shadowPop':     'shadowPop  0.3s ease-out forwards',
        'imgReveal':     'imgReveal  0.4s ease-out forwards',
        'fadeIn':        'fadeIn     0.5s ease-out forwards',
        'revealUp':      'revealUp   0.6s ease-out forwards',
        'bounce-light':  'bounce-light 0.4s ease-out forwards',
        'counterBounce': 'counterBounce 0.4s ease-in-out',
        'progressFill':  'progressFill 1.2s ease-out forwards',
        'confettiFly':   'confettiFly 1.6s ease-out forwards',
        'pulseRing':     'pulseRing   1.4s ease-out infinite',
        'slideUp':       'slideUp     0.35s ease-out forwards',
        'typingDot':     'typingDot   1.2s ease-in-out infinite',
        'marquee':       'marquee     28s linear infinite',
        'stickerWobble': 'stickerWobble 2.5s ease-in-out infinite',
        'particleFloat': 'particleFloat 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
