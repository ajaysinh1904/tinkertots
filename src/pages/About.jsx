import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import { StarDoodle, SpiralDoodle, HeartDoodle, StickerBadge } from '../components/HandDrawnDoodles';
import { useTheme } from '../context/ThemeContext';

// Reusable CountUp component for Stats
function CountUpNumber({ end, suffix = '', isDarkBg = false, isKids = true }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    let startTimestamp = null;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / 1500, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={elementRef} className={
      isKids
        ? "font-display font-extrabold text-4xl md:text-5xl text-plum"
        : isDarkBg
          ? "font-sans font-bold text-4xl md:text-5xl text-white"
          : "font-sans font-bold text-4xl md:text-5xl text-slate-800"
    }>
      {count}{suffix}
    </span>
  );
}

export default function About() {
  useScrollReveal();
  const { theme } = useTheme();
  const isKids = theme === 'kids';
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      stars: 5,
      quote: "Tinkytots is a second home for my daughter. The teachers are incredibly warm, and she comes home every day excited to share what sandbox and reading activities she did!",
      author: "Sneha Patel",
      child: "Aarushi (Nursery)"
    },
    {
      stars: 5,
      quote: "The visual and illustrated approach they have for classrooms makes learning look like play. Aarav's spatial and language skills have grown dramatically since joining playgroup.",
      author: "Rajesh Sharma",
      child: "Aarav (Playgroup)"
    },
    {
      stars: 5,
      quote: "We were worried about child safety, but Tinkytots has the best CCTV network and hygiene standards in Gota. Low ratios mean teachers really listen to parents' daily feedback.",
      author: "Komal Dodiya",
      child: "Meera (Junior KG)"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className={isKids ? "bg-cream" : "bg-slate-50"}>
      
      {/* 1. HERO STORY HEADER */}
      <section className={`relative py-16 px-4 border-b transition-colors duration-300 overflow-hidden ${
        isKids ? 'bg-gradient-to-b from-white/30 to-cream border-b-2 border-navy' : 'bg-white border-b border-slate-200'
      }`}>
        {/* Breadcrumb */}
        <div className={`max-w-7xl mx-auto px-4 mb-4 text-sm font-bold ${isKids ? 'text-navy/60' : 'text-slate-400'}`}>
          <Link to="/" className="hover:text-violet transition-colors">Home</Link> &gt; <span className={isKids ? 'text-navy' : 'text-slate-700'}>About Us</span>
        </div>

        {/* Floating Doodles */}
        {isKids && (
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <StarDoodle color="plum" size={28} className="absolute top-[20%] left-[8%]" />
            <HeartDoodle color="lavender" size={32} className="absolute bottom-[20%] right-[8%] animate-bounce-light" />
          </div>
        )}

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left: Heading + Story */}
          <div className="space-y-6 reveal active">
            {isKids ? (
              <StickerBadge text="Our Story 📖" color="gold" rotate="-2deg" className="mb-2" />
            ) : (
              <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-800 text-sm font-semibold rounded-full border border-slate-200 mb-2">
                Our Story 📖
              </span>
            )}
            
            <h1 className={`text-4xl sm:text-5xl leading-tight ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-extrabold text-slate-900'}`}>
              Crafting Magical Foundations Since 2020 🌻
            </h1>
            
            <p className={`leading-relaxed ${isKids ? 'text-navy/80 font-medium text-base sm:text-lg' : 'text-slate-600 font-normal text-base sm:text-lg'}`}>
              Tinkytots was founded by a team of Montessori specialists and parents in Jagatpur, Ahmedabad, who wanted something better than rigid traditional schools. We designed an illustrated children's book format that turns lesson plans into interactive sensory discoveries.
            </p>

            <p className={`leading-relaxed ${isKids ? 'text-navy/80 font-medium text-base sm:text-lg' : 'text-slate-600 font-normal text-base sm:text-lg'}`}>
              Every child here learns through sandbox games, visual cards, tactile blocks, and outdoor garden workshops. We focus heavily on safety, hygiene, and low teacher ratios so your child is well-nourished, valued, and safe.
            </p>
          </div>

          {/* Right: Side image in blob frame */}
          <div className="flex justify-center reveal active">
            <div className={
              isKids
                ? "w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] overflow-hidden border-3 border-navy rounded-[30%_70%_70%_30%/_50%_60%_40%_50%] animate-blob-morph shadow-[8px_8px_0px_0px_#3B0764]"
                : "w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] overflow-hidden border border-slate-200 rounded-3xl shadow-lg bg-white"
            }>
              <img
                src="https://picsum.photos/seed/tinkertots-children-story/500/500"
                alt="Children reading books together at Tinkytots"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISION & MISSION CARDS */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision Card */}
          <div className={`p-8 rounded-3xl relative overflow-hidden reveal ${isKids ? 'bg-lilac/10 border-3 border-navy shadow-[6px_6px_0px_0px_#3B0764]' : 'bg-white border border-slate-200 shadow-sm rounded-2xl'}`}>
            {/* Organic Sky Blue Blob Backdrop */}
            {isKids && <div className="absolute inset-[-40px] bg-lilac/10 rounded-[60%_40%_30%_70%/_60%_30%_70%_40%] animate-blob-morph -z-10" />}
            <div className="text-4xl mb-4">🌟</div>
            <h2 className={`text-2xl mb-4 ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>Our Vision</h2>
            <p className={`leading-relaxed ${isKids ? 'text-navy/80 font-semibold' : 'text-slate-600 font-normal'}`}>
              To be the most trustworthy and joyful preschool in Ahmedabad, helping children develop cognitive independence, values of kindness, and a lifelong curiosity for learning.
            </p>
          </div>

          {/* Mission Card */}
          <div className={`p-8 rounded-3xl relative overflow-hidden reveal ${isKids ? 'bg-red-50/70 border-3 border-navy shadow-[6px_6px_0px_0px_#3B0764]' : 'bg-white border border-slate-200 shadow-sm rounded-2xl'}`}>
            {/* Organic Coral Blob Backdrop */}
            {isKids && <div className="absolute inset-[-40px] bg-plum/10 rounded-[40%_60%_50%_50%/_50%_40%_60%_50%] animate-blob-morph -z-10" />}
            <div className="text-4xl mb-4">🚀</div>
            <h2 className={`text-2xl mb-4 ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>Our Mission</h2>
            <p className={`leading-relaxed ${isKids ? 'text-navy/80 font-semibold' : 'text-slate-600 font-normal'}`}>
              To design safety-first, illustrated, activity-based Montessori learning environments where low ratios, trained teachers, and parent partnerships enable healthy child development.
            </p>
          </div>

        </div>
      </section>

      {/* WAVE DIVIDER */}
      {isKids ? (
        <div className="w-full overflow-hidden leading-[0] bg-cream">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-white fill-current">
            <path d="M0,0 C150,90 350,120 600,60 C850,0 1050,30 1200,90 L1200,120 L0,120 Z" />
          </svg>
        </div>
      ) : (
        <div className="h-8 bg-slate-50 border-b border-slate-200/50" />
      )}

      {/* 3. OUR VALUES */}
      <section className={`py-20 px-4 relative z-10 ${isKids ? 'bg-white' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <h2 className={`text-3xl sm:text-4.5xl ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>
              Values We Plant in Our Garden 🌱
            </h2>
            <p className={`mt-2 ${isKids ? 'text-navy/70 font-medium' : 'text-slate-600 font-normal'}`}>
              We practice six core values every day to ensure child growth and parent peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Curiosity 🔍', desc: 'Encouraging questions, sensory trials, and custom learning paths.', color: 'bg-yellow-50', rot: '-2deg' },
              { title: 'Kindness 💛', desc: 'Practicing share-and-care circles, emotional empathy, and kind greetings.', color: 'bg-red-50', rot: '2deg' },
              { title: 'Safety 🛡️', desc: 'Ensuring 100% CCTV coverage, verified staff, and secure drop-offs.', color: 'bg-blue-50', rot: '-3deg' },
              { title: 'Creativity 🎨', desc: 'Fostering free art, block buildings, music making, and clay play.', color: 'bg-green-50', rot: '1deg' },
              { title: 'Integrity 🤝', desc: 'Building parent trust with honest notifications and daily logs.', color: 'bg-purple-50', rot: '-2deg' },
              { title: 'Joy 🌈', desc: 'Making school feel like an interactive children\'s playground.', color: 'bg-yellow-50', rot: '3deg' }
            ].map((val, idx) => (
              <div
                key={idx}
                className={
                  isKids
                    ? `border-3 border-navy rounded-3xl p-6 shadow-[4px_4px_0px_0px_#3B0764] flex flex-col space-y-3 transition-transform hover:scale-103 reveal ${val.color}`
                    : `border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col space-y-3 hover:scale-101 hover:shadow-md transition-all bg-white reveal`
                }
                style={isKids ? { transform: `rotate(${val.rot})`, transitionDelay: `${idx * 75}ms` } : { transitionDelay: `${idx * 75}ms` }}
              >
                <h3 className={`text-xl ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-850'}`}>
                  {val.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isKids ? 'text-navy/70 font-semibold' : 'text-slate-600 font-normal'}`}>
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAVE DIVIDER */}
      {isKids ? (
        <div className="w-full overflow-hidden leading-[0] bg-white">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-cream fill-current">
            <path d="M0,0 C150,90 350,120 600,60 C850,0 1050,30 1200,90 L1200,120 L0,120 Z" />
          </svg>
        </div>
      ) : (
        <div className="h-8 bg-white border-t border-slate-200/50" />
      )}

      {/* 4. LEADERSHIP TEAM */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <h2 className={`text-3xl sm:text-4.5xl ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>
            {isKids ? 'Our Loving Leaders & Guides 🦉' : 'Our Leadership & Faculty'}
          </h2>
          <p className={`mt-2 ${isKids ? 'text-navy/70 font-medium' : 'text-slate-600 font-normal'}`}>
            Meet our directors and program guides committed to giving your child the best foundation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Dr. Shruti Patel 🎓',
              role: 'Founder & Director',
              bio: 'Ph.D. in Early Child Psychology with 15+ years experience designing activity-based primary curriculums.',
              img: 'https://picsum.photos/seed/director-shruti/300/300'
            },
            {
              name: 'Mrs. Aarti Vyas 🎨',
              role: 'Head of Academics',
              bio: 'Certified Montessori trainer. Specializes in sandbox motor skills development and language phonics.',
              img: 'https://picsum.photos/seed/teacher-aarti/300/300'
            },
            {
              name: 'Ms. Nikita Mehta 🛡️',
              role: 'Child Welfare Coordinator',
              bio: 'Specialist in safety, pediatric first aid, and parent relationship management. Coordinates daily health logs.',
              img: 'https://picsum.photos/seed/coordinator-nikita/300/300'
            }
          ].map((member, idx) => (
            <div
              key={idx}
              className={
                isKids
                  ? "bg-white border-3 border-navy rounded-3xl p-6 flex flex-col items-center text-center shadow-[6px_6px_0px_0px_#3B0764] hover:scale-102 transition-transform duration-200 reveal"
                  : "bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:scale-101 hover:shadow-md transition-all duration-200 reveal"
              }
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {/* Photo placeholder */}
              <div className={`w-32 h-32 rounded-full p-1 overflow-hidden shadow-inner mb-4 ${isKids ? 'border-4 border-lavender' : 'border border-slate-200'}`}>
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <h3 className={`text-xl ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>
                {member.name}
              </h3>
              
              <span className={
                isKids
                  ? "inline-block px-3 py-1 bg-lilac/10 text-navy font-accent text-xs border border-navy/30 rounded-full mt-1.5 mb-3"
                  : "inline-block px-3 py-1 bg-slate-100 text-slate-700 font-sans text-xs font-semibold border border-slate-200 rounded-md mt-1.5 mb-3"
              }>
                {member.role}
              </span>

              <p className={`text-sm leading-relaxed mb-4 ${isKids ? 'text-navy/70 font-medium' : 'text-slate-600 font-normal'}`}>
                {member.bio}
              </p>

              {/* LinkedIn icon link */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs transition-colors flex items-center ${
                  isKids ? 'font-accent text-navy hover:text-violet' : 'font-sans font-semibold text-slate-500 hover:text-slate-800'
                }`}
              >
                LinkedIn profile ➔
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 5. STATS BAND (Reused) */}
      <section className={`relative py-16 px-4 z-20 overflow-hidden transition-all ${isKids ? 'bg-gradient-to-br from-plum via-[#FF8E53] to-gold border-y-3 border-navy' : 'bg-slate-900 border-y border-slate-800'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {[
            { end: 5500, label: 'Sq.ft Campus 🏫', suffix: '+' },
            { end: 20, label: 'Kids Per Batch 👶', suffix: ' Max' },
            { end: 100, label: 'Combined Experience 🏆', suffix: '+' },
            { end: 15, label: 'Faculty & Staff 👩‍🏫', suffix: '+' }
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`p-5 flex flex-col items-center text-center transition-transform duration-200 ${
                isKids 
                  ? 'bg-white border-2 border-navy rounded-2xl shadow-[4px_4px_0px_0px_#3B0764] hover:scale-103' 
                  : 'bg-slate-800/80 border border-slate-700/50 rounded-xl shadow-sm hover:scale-101'
              }`}
            >
              <CountUpNumber end={stat.end} suffix={stat.suffix} isDarkBg={!isKids} isKids={isKids} />
              <span className={`text-xs sm:text-sm mt-2 leading-tight ${isKids ? 'font-accent text-navy' : 'font-sans font-semibold text-slate-350'}`}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS AUTO-SLIDER */}
      <section className="py-20 px-4 max-w-5xl mx-auto relative z-10">
        <div className="text-center max-w-xl mx-auto mb-12 reveal">
          <h2 className={`text-3xl sm:text-4.5xl ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>
            Hearts of Our School Families 💛
          </h2>
        </div>

        {/* Carousel slide window */}
        <div className={`relative overflow-hidden min-h-[220px] p-6 md:p-10 flex flex-col justify-between reveal ${
          isKids 
            ? 'bg-yellow-50/70 border-3 border-navy rounded-3xl shadow-[6px_6px_0px_0px_#3B0764]' 
            : 'bg-white border border-slate-200 rounded-2xl shadow-sm'
        }`}>
          {/* Big decorative quote mark */}
          {isKids && (
            <div className="absolute top-2 left-4 text-7xl md:text-8xl text-gold/30 font-accent select-none pointer-events-none">
              “
            </div>
          )}

          <div className="relative z-10 space-y-4">
            {/* Stars */}
            <div className="flex space-x-1 justify-center md:justify-start">
              {Array.from({ length: testimonials[activeSlide].stars }).map((_, i) => (
                <span key={i} className="text-gold text-xl">★</span>
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className={`text-base sm:text-lg md:text-xl italic font-semibold leading-relaxed text-center md:text-left transition-all duration-300 ${isKids ? 'text-navy' : 'text-slate-700'}`}>
              "{testimonials[activeSlide].quote}"
            </p>
          </div>

          {/* Author info */}
          <div className={`pt-4 border-t flex flex-col sm:flex-row justify-between items-center relative z-10 text-center sm:text-left ${isKids ? 'border-navy/10' : 'border-slate-100'}`}>
            <div>
              <h4 className={`font-base ${isKids ? 'font-display font-extrabold text-navy text-base' : 'font-sans font-bold text-slate-800 text-base'}`}>
                {testimonials[activeSlide].author}
              </h4>
              <p className={`text-xs ${isKids ? 'text-navy/60 font-bold' : 'text-slate-500 font-medium'}`}>
                Parent of {testimonials[activeSlide].child}
              </p>
            </div>

            {/* Slide dots indicators */}
            <div className="flex space-x-2 mt-4 sm:mt-0">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-3.5 h-3.5 rounded-full border transition-colors ${
                    isKids ? 'border-navy' : 'border-slate-350'
                  } ${activeSlide === idx ? (isKids ? 'bg-plum' : 'bg-slate-800') : 'bg-white'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
