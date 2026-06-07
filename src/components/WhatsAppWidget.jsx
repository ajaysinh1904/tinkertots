import React from 'react';

export default function WhatsAppWidget() {
  const whatsappNumber = '917624012997';
  const textMessage = encodeURIComponent("Hello Tinkytots! I'm interested in admissions. Please share more details.");
  const href = `https://wa.me/${whatsappNumber}?text=${textMessage}`;

  return (
    <div className="fixed bottom-[88px] right-[24px] z-[999] group flex items-center justify-end">
      {/* Tooltip (slides left on hover) */}
      <span className="mr-3 px-3 py-1.5 text-xs font-bold text-navy bg-white border-2 border-navy rounded-lg shadow-[2px_2px_0px_0px_#1A1A2E] whitespace-nowrap opacity-0 pointer-events-none translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
        Chat with us on WhatsApp 💬
      </span>

      {/* Button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-[56px] h-[56px] flex items-center justify-center bg-[#25D366] text-white rounded-full border-2 border-navy shadow-[4px_4px_0px_0px_#1A1A2E] hover:scale-105 active:scale-95 transition-transform duration-200 pulse-ring"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.978L2 22l5.188-1.359a9.94 9.94 0 0 0 4.817 1.23h.005c5.507 0 9.99-4.478 9.99-9.986 0-2.667-1.039-5.176-2.927-7.067A9.921 9.921 0 0 0 12.012 2zm5.72 14.102c-.311.871-1.802 1.6-2.477 1.7-1.536.223-3.237-.412-5.467-2.316C7.56 13.582 6.059 11.238 5.75 10.366c-.311-.871.306-1.554.802-1.956.126-.102.213-.173.284-.23.125-.102.26-.149.378-.149.124 0 .248.012.355.063.155.074.453.18.736.852.122.291.312.748.375.877.063.129.094.279.031.406-.062.127-.124.254-.249.381l-.22.257c-.126.129-.257.271-.11.527.318.552.793 1.096 1.378 1.613a7.359 7.359 0 0 0 2.213 1.373c.249.123.396.103.543-.062.148-.165.62-.724.786-.97.165-.246.331-.206.558-.121.229.085 1.455.686 1.706.812.251.126.418.188.48.297.062.109.062.631-.249 1.502z" />
        </svg>
      </a>
    </div>
  );
}
