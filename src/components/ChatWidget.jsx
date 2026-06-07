import React, { useState, useEffect, useRef } from 'react';
import TootsMascot from './TootsMascot';

const PHONE_NUMBER = '+91 76240 12997';
const SCHOOL_ADDRESS = 'Jagatpur Road, Gota, Ahmedabad, Gujarat - 382470';

const chipAnswers = {
  '🕗 Timings': "We're open Mon–Sat, 8:30 AM to 2:30 PM 🕗 Drop-offs start at 8:15 AM!",
  '📋 Admissions': `Super easy! 📋 Fill enquiry → ✅ Submit birth certificate → 🎒 Get enrolled! Call ${PHONE_NUMBER} to book your slot.`,
  '📚 Our Classes': "We offer: Playgroup (1.5–2.5y), Nursery (2.5–3.5y), Jr.KG (3.5–4.5y), Sr.KG (4.5–5.5y) & Daycare 📚",
  '📍 Location': `We're at ${SCHOOL_ADDRESS} 📍 Click Contact Us for directions on the map!`,
  '💰 Fees': `Fees vary by program. Call ${PHONE_NUMBER} or visit us for a personalized fee card 💛`,
  '🌙 Daycare': "Yes! Full-day daycare available 🌙 Safe, supervised, and full of activities!"
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDot, setShowDot] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom whenever messages list updates
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Handle first open
  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (showDot) {
      setShowDot(false);
    }
    // Initialize welcome message if empty
    if (messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            sender: 'bot',
            text: "Hi there! 👋 I'm Toots! Ask me anything about our school 🏫"
          }
        ]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleChipClick = (label) => {
    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text: label };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const answerText = chipAnswers[label] || `Thank you! For more details, feel free to call us at ${PHONE_NUMBER}.`;
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: answerText }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSendText = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');

    const userMsg = { id: Date.now(), sender: 'user', text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Thanks! For detailed help, call ${PHONE_NUMBER} or WhatsApp us 😊`
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-[24px] left-[24px] z-[999] font-body">
      {/* Tooltip */}
      {!isOpen && (
        <div className="absolute bottom-[72px] left-0 bg-white text-navy font-bold text-xs px-3 py-1.5 border-2 border-navy rounded-lg shadow-[2px_2px_0px_0px_#1A1A2E] whitespace-nowrap animate-bounce">
          Ask Toots! 🦉
        </div>
      )}

      {/* Pulsing Notification Dot */}
      {showDot && (
        <span className="absolute top-0 right-0 flex h-4 w-4 z-[1000]">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-coral"></span>
        </span>
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={handleToggle}
        aria-label="Toggle chatbot"
        className="w-[56px] h-[56px] flex items-center justify-center bg-coral text-white rounded-full border-2 border-navy shadow-[4px_4px_0px_0px_#1A1A2E] hover:scale-105 active:scale-95 transition-transform duration-200"
      >
        <span className="text-2xl">🦉</span>
      </button>

      {/* Chat Window */}
      <div
        className={`absolute bottom-[72px] left-0 w-[300px] h-[420px] bg-white border-3 border-navy rounded-2xl shadow-[6px_6px_0px_0px_#1A1A2E] flex flex-col overflow-hidden transition-all duration-300 origin-bottom-left ${
          isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-coral to-sunshine px-4 py-3 border-b-2 border-navy flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white border border-navy rounded-full flex items-center justify-center p-0.5 overflow-hidden">
              <TootsMascot size={32} />
            </div>
            <div>
              <h4 className="text-navy font-display font-bold text-sm tracking-wide">Toots</h4>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-mint rounded-full animate-pulse"></span>
                <span className="text-[10px] text-navy/70 font-semibold">School Guide</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-navy hover:text-coral font-bold text-lg leading-none"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-3 overflow-y-auto bg-cream/30 space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col max-w-[85%] ${
                m.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
              }`}
            >
              <div
                className={`px-3 py-2 text-sm rounded-2xl border-2 border-navy shadow-[2px_2px_0px_0px_rgba(26,26,46,0.1)] ${
                  m.sender === 'user'
                    ? 'bg-coral text-white rounded-tr-none'
                    : 'bg-white text-navy rounded-tl-none border-l-4 border-l-coral'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center space-x-1 bg-white border-2 border-navy px-3 py-2.5 rounded-2xl rounded-tl-none max-w-[60px]">
              <span className="w-1.5 h-1.5 bg-navy rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-navy rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-navy rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies Chips */}
        {messages.length > 0 && (
          <div className="px-3 py-2 bg-cream/10 border-t border-navy/10 flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto">
            {Object.keys(chipAnswers).map((chip) => (
              <button
                key={chip}
                onClick={() => handleChipClick(chip)}
                className="text-[11px] font-bold px-2 py-1 bg-white border border-navy rounded-full hover:bg-sunshine active:bg-sunshine transition-colors duration-150 shadow-[1px_1px_0px_0px_#1A1A2E]"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <form onSubmit={handleSendText} className="p-2 border-t-2 border-navy bg-white flex space-x-1.5">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 text-xs px-3 py-2 bg-cream/40 border border-navy rounded-lg focus:outline-none focus:ring-1 focus:ring-coral text-navy placeholder-navy/40"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="px-3 py-2 bg-coral hover:bg-coral/90 text-white rounded-lg border border-navy shadow-[2px_2px_0px_0px_#1A1A2E] text-xs font-bold active:scale-95 transition-transform"
          >
            ➔
          </button>
        </form>
      </div>
    </div>
  );
}
