import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import TootsMascot from '../components/TootsMascot';
import AnimatedProgress from '../components/AnimatedProgress';
import { StarDoodle, SpiralDoodle, HeartDoodle, DotDoodle, StickerBadge } from '../components/HandDrawnDoodles';
import { useTheme } from '../context/ThemeContext';

// Helper Component for Count Up animation
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

    return () => {
      observer.disconnect();
    };
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

export default function Home() {
  useScrollReveal();
  const { theme } = useTheme();
  const isKids = theme === 'kids';
  const [activeTab, setActiveTab] = useState('curriculum');

  // Interactive mouse handler for 3D Tilt
  const handleMouseMove = (e) => {
    if (!isKids) return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const rotateX = -(y / (box.height / 2)) * 12; // 12 deg max
    const rotateY = (x / (box.width / 2)) * 12;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e) => {
    if (!isKids) return;
    const card = e.currentTarget;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
  };

  // Generate floating emojis in hero background
  const particles = [
    { emoji: '⭐', delay: '0s', left: '10%', duration: '9s' },
    { emoji: '📚', delay: '2s', left: '25%', duration: '12s' },
    { emoji: '✏️', delay: '4s', left: '40%', duration: '7s' },
    { emoji: '🎨', delay: '1s', left: '55%', duration: '11s' },
    { emoji: '🔢', delay: '5s', left: '70%', duration: '10s' },
    { emoji: '🎵', delay: '3s', left: '85%', duration: '8s' },
    { emoji: '🌻', delay: '6s', left: '18%', duration: '14s' },
    { emoji: '🧸', delay: '1.5s', left: '32%', duration: '10s' },
    { emoji: '🎈', delay: '3.5s', left: '48%', duration: '13s' },
    { emoji: '🍎', delay: '7s', left: '62%', duration: '9s' },
    { emoji: '🪁', delay: '0.5s', left: '78%', duration: '11s' },
    { emoji: '🦉', delay: '4.5s', left: '92%', duration: '8s' },
    { emoji: '🌈', delay: '2.5s', left: '5%', duration: '12s' },
    { emoji: '🧩', delay: '8s', left: '37%', duration: '10s' },
    { emoji: '🦖', delay: '1.2s', left: '68%', duration: '13s' },
    { emoji: '🚲', delay: '3.2s', left: '82%', duration: '9s' },
    { emoji: '⭐', delay: '5.2s', left: '13%', duration: '11s' },
    { emoji: '🎨', delay: '6.2s', left: '47%', duration: '12s' },
    { emoji: '📚', delay: '2.8s', left: '75%', duration: '10s' },
    { emoji: '🍦', delay: '4.8s', left: '89%', duration: '7s' }
  ];

  return (
    <div className={`overflow-hidden ${isKids ? 'bg-cream' : 'bg-slate-50'}`}>

      {/* 1. HERO SECTION */}
      <section className={`relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-4 md:px-8 transition-colors duration-300 ${
        isKids ? 'bg-gradient-to-b from-white/20 to-cream' : 'bg-white border-b border-slate-200'
      }`}>

        {/* Floating Particle Background */}
        {isKids && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p, idx) => (
              <span
                key={idx}
                className="floating-particle text-2xl select-none"
                style={{
                  left: p.left,
                  animationDelay: p.delay,
                  animationDuration: p.duration
                }}
              >
                {p.emoji}
              </span>
            ))}
          </div>
        )}

        {/* Scattered Doodles */}
        {isKids && (
          <>
            <StarDoodle color="plum" size={36} className="absolute top-[15%] left-[8%] hidden md:block" />
            <SpiralDoodle color="gold" size={40} className="absolute bottom-[20%] left-[5%] hidden md:block" />
            <HeartDoodle color="lavender" size={32} className="absolute top-[25%] right-[10%] hidden md:block" />
            <StarDoodle color="lilac" size={28} className="absolute bottom-[15%] right-[8%] hidden md:block" />
          </>
        )}

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          {/* Left Text */}
          <div className="space-y-6 text-center lg:text-left reveal active">
            {isKids ? (
              <StickerBadge text="Now Enrolling for 2026-27! 🎒" color="gold" className="mb-2" />
            ) : (
              <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-800 text-sm font-semibold rounded-full border border-slate-200 mb-2">
                Now Enrolling for 2026-27! 🎒
              </span>
            )}

            <h1 className={`text-4xl sm:text-5xl lg:text-6.5xl leading-tight ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-extrabold text-slate-900'}`}>
              Where Little Minds <br />
              <span className="text-plum relative inline-block">
                Bloom 🌻
                {isKids && (
                  <svg className="absolute bottom-[-10px] left-0 w-full h-[12px] text-gold" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                )}
              </span>
            </h1>

            <p className={`text-lg md:text-xl max-w-xl mx-auto lg:mx-0 ${isKids ? 'text-navy/80 font-medium' : 'text-slate-600 font-normal'}`}>
              A place of wonder, play, and discovery for ages 1.5–6. Empowering kids with Montessori and activity-based learning in Gota, Ahmedabad.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 w-full">
              <Link
                to="/contact"
                className={`w-full sm:w-auto px-8 py-4 text-lg text-center transition-all duration-200 ${
                  isKids 
                    ? 'bg-plum hover:bg-violet/90 text-white font-accent rounded-2xl border-3 border-navy shadow-[6px_6px_0px_0px_#3B0764] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#3B0764]'
                    : 'bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-sm hover:translate-y-[-1px]'
                }`}
              >
                Book a Free Visit 🤝
              </Link>
              <Link
                to="/about"
                className={`w-full sm:w-auto px-8 py-4 text-lg text-center transition-all duration-200 ${
                  isKids
                    ? 'bg-white/70 hover:bg-white text-navy font-accent rounded-2xl border-3 border-navy shadow-[6px_6px_0px_0px_rgba(59, 7, 100,0.15)] hover:translate-y-[-2px]'
                    : 'bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-200 shadow-sm hover:translate-y-[-1px]'
                }`}
              >
                Learn More 📖
              </Link>
            </div>

            {/* Visiting hours badge */}
            <div className={`inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold ${
              isKids ? 'border-2 border-navy/30 shadow-[2px_2px_0px_0px_rgba(59, 7, 100,0.05)] text-navy' : 'border border-slate-200 shadow-sm text-slate-700'
            }`}>
              <span>🕗</span>
              <span>Mon–Sat | 8:30 AM – 2:30 PM</span>
            </div>
          </div>

          {/* Right Image with morphing blob and doodles */}
          <div className="relative flex justify-center lg:justify-end reveal active">
            {/* Background morphing blob */}
            {isKids && <div className="absolute inset-0 bg-gradient-to-tr from-lilac/40 to-lavender/30 animate-blob-morph -z-10 scale-95" />}

            {/* Large illustration container */}
            <div className={
              isKids
                ? "w-[320px] sm:w-[450px] h-[320px] sm:h-[450px] overflow-hidden border-4 border-navy rounded-[60%_40%_30%_70%/_60%_30%_70%_40%] animate-blob-morph shadow-[12px_12px_0px_0px_#3B0764]"
                : "w-[320px] sm:w-[450px] h-[320px] sm:h-[450px] overflow-hidden border border-slate-200 rounded-3xl shadow-lg bg-white"
            }>
              <img
                src="/images/home/img1.png"
                alt="Happy children learning and playing"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Float badge overlay */}
            <div className={
              isKids
                ? "absolute bottom-[5%] left-[5%] transform rotate-[-6deg] bg-blush text-navy font-accent text-xs sm:text-sm px-4 py-2 border-2 border-navy rounded-xl shadow-[3px_3px_0px_0px_#3B0764] select-none"
                : "absolute bottom-[5%] left-[5%] bg-emerald-50 text-emerald-800 font-sans font-semibold text-xs sm:text-sm px-4 py-2 border border-emerald-200 rounded-lg shadow-sm select-none"
            }>
              🌿 Green Campus
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <section className={`bg-white py-6 relative z-20 transition-all ${isKids ? 'border-y-3 border-navy' : 'border-y border-slate-200'}`}>
        <div className="marquee-container">
          <div className={`marquee-content text-sm sm:text-base ${isKids ? 'font-accent text-navy' : 'font-sans font-semibold text-slate-600'}`}>
            <span>✅ CCTV Secured</span>
            <span>🧼 Hygiene Certified</span>
            <span>👩‍🏫 Trained Teachers</span>
            <span>📚 Activity-Based Learning</span>
            <span>🌱 Eco-Friendly Campus</span>
            <span>🏆 Top Rated Preschool</span>
            {/* Repeat for infinite scrolling effect */}
            <span>✅ CCTV Secured</span>
            <span>🧼 Hygiene Certified</span>
            <span>👩‍🏫 Trained Teachers</span>
            <span>📚 Activity-Based Learning</span>
            <span>🌱 Eco-Friendly Campus</span>
            <span>🏆 Top Rated Preschool</span>
          </div>
        </div>
      </section>

      {/* WAVE DIVIDER (Crest Down) */}
      {isKids ? (
        <div className="w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-white fill-current">
            <path d="M0,0 C150,90 350,120 600,60 C850,0 1050,30 1200,90 L1200,120 L0,120 Z" />
          </svg>
        </div>
      ) : (
        <div className="h-8 bg-slate-50 border-b border-slate-200/50" />
      )}

      {/* 3. PROGRAMS SECTION */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          {isKids && (
            <div className="flex justify-center mb-2">
              <StarDoodle color="gold" size={32} />
            </div>
          )}
          <h2 className={`text-3xl sm:text-4.5xl ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>
            {isKids ? 'Find the Right Program for Your Tiny Star ⭐' : 'Our Age-Appropriate Educational Programs'}
          </h2>
          <p className={`mt-2 ${isKids ? 'text-navy/70 font-medium' : 'text-slate-600 font-normal'}`}>
            Curated age-appropriate programs filled with hands-on activities, outdoor play, and social skill building.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'Playgroup 🎨',
              age: '1.5 – 2.5 yrs',
              desc: 'Sensory explorations, soft-play circles, and language starters to build confidence.',
              color: 'bg-yellow-100 hover:bg-amber/20',
              border: 'border-t-gold',
              badgeColor: 'bg-gold',
              img: 'https://picsum.photos/seed/playgroup/250/200'
            },
            {
              title: 'Nursery 🧸',
              age: '2.5 – 3.5 yrs',
              desc: 'Early socialization, phonic sounds, basic numbers, and fine motor activity worksheets.',
              color: 'bg-red-50 hover:bg-violet/20',
              border: 'border-t-plum',
              badgeColor: 'bg-plum text-white',
              img: 'https://picsum.photos/seed/nursery/250/200'
            },
            {
              title: 'Junior KG 📚',
              age: '3.5 – 4.5 yrs',
              desc: 'Sentence building, creative writing, science discovery, and analytical math concepts.',
              color: 'bg-blue-50 hover:bg-lilac/20',
              border: 'border-t-lilac',
              badgeColor: 'bg-lilac text-white',
              img: 'https://picsum.photos/seed/junior-kg/250/200'
            },
            {
              title: 'Senior KG 🎓',
              age: '4.5 – 5.5 yrs',
              desc: 'Advanced logic, public speaking, computing basics, and mock tests for primary readiness.',
              color: 'bg-green-50 hover:bg-blush/20',
              border: 'border-t-blush',
              badgeColor: 'bg-blush',
              img: 'https://picsum.photos/seed/senior-kg/250/200'
            }
          ].map((prog, idx) => (
            <div
              key={idx}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={
                isKids
                  ? `tilt-card rounded-3xl border-3 border-navy bg-white overflow-hidden p-5 flex flex-col justify-between shadow-[6px_6px_0px_0px_#3B0764] hover:-translate-y-1 transition-all ${prog.border} border-t-[8px] reveal`
                  : `rounded-2xl border border-slate-200 bg-white overflow-hidden p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all ${prog.border} border-t-[4px] reveal`
              }
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="space-y-4">
                {/* Visual Image */}
                <div className={`w-full h-36 overflow-hidden ${isKids ? 'rounded-2xl border-2 border-navy' : 'rounded-xl border border-slate-100'}`}>
                  <img src={prog.img} alt={prog.title} className="w-full h-full object-cover" />
                </div>

                {/* Age Tag */}
                {isKids ? (
                  <span className={`inline-block px-3 py-1 font-accent text-xs border border-navy rounded-full shadow-[1px_1px_0px_0px_#3B0764] ${prog.badgeColor}`}>
                    👶 {prog.age}
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 font-sans text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    👶 {prog.age}
                  </span>
                )}

                <h3 className={`text-xl ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>
                  {prog.title}
                </h3>

                <p className={`text-sm line-clamp-3 ${isKids ? 'text-navy/80 font-medium' : 'text-slate-600 font-normal'}`}>
                  {prog.desc}
                </p>
              </div>

              <div className="pt-6">
                <Link
                  to="/contact"
                  className={`inline-flex items-center text-xs transition-colors ${
                    isKids ? 'font-accent text-navy hover:text-violet' : 'font-sans font-semibold text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Explore program details <span className="ml-1 text-sm">➔</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WAVE DIVIDER (Crest Up) */}
      {isKids ? (
        <div className="w-full overflow-hidden leading-[0] bg-cream">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-white fill-current transform rotate-180">
            <path d="M0,0 C150,90 350,120 600,60 C850,0 1050,30 1200,90 L1200,120 L0,120 Z" />
          </svg>
        </div>
      ) : (
        <div className="h-8 bg-white border-t border-slate-200/50" />
      )}

      {/* 4. ACADEMICS TABS SECTION */}
      <section className={`py-20 px-4 relative z-10 overflow-hidden ${isKids ? 'bg-white' : 'bg-slate-50 border-b border-slate-200/80'}`}>
        <div className="max-w-7xl mx-auto relative">

          {/* Lavender blob container backdrops */}
          {isKids && <div className="absolute inset-0 bg-lavender/10 rounded-[40%_60%_70%_30%/_50%_60%_40%_50%] -z-10 scale-105 animate-blob-morph" />}

          <div className="text-center max-w-2xl mx-auto mb-12 reveal">
            <h2 className={`text-3xl sm:text-4.5xl ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>
              Tinkertots Approach to Learning
            </h2>
            <p className={`mt-2 ${isKids ? 'text-navy/70 mt-2 font-medium' : 'text-slate-600 font-normal mt-2'}`}>
              We design activities using the Montessori method to unlock five-dimensional developmental milestones.
            </p>
          </div>

          {/* Tabs header */}
          <div className="flex justify-center space-x-2 sm:space-x-4 mb-8 reveal">
            {[
              { id: 'curriculum', label: '🧠 Curriculum', color: 'bg-gold' },
              { id: 'keyareas', label: '🔑 Key Areas', color: 'bg-lilac' },
              { id: 'activities', label: '🎯 Activities', color: 'bg-blush' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 border-2 rounded-2xl relative transition-all duration-200 ${
                  isKids
                    ? activeTab === tab.id
                      ? 'bg-navy text-white border-navy shadow-[4px_4px_0px_0px_rgba(59, 7, 100,0.2)] font-accent'
                      : 'bg-cream/50 text-navy border-navy/20 hover:border-navy font-accent'
                    : activeTab === tab.id
                      ? 'bg-slate-900 text-white border-slate-900 font-sans font-semibold'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 font-sans font-semibold'
                }`}
              >
                {tab.label}
                {isKids && activeTab === tab.id && (
                  <span className="absolute bottom-[-6px] left-[15%] right-[15%] h-1 bg-gold rounded-full active-tab-underline" />
                )}
              </button>
            ))}
          </div>

          {/* Tabs content */}
          <div className={`max-w-4xl mx-auto p-6 md:p-10 min-h-[260px] flex items-center justify-center reveal ${
            isKids
              ? 'bg-white border-3 border-navy rounded-3xl shadow-[8px_8px_0px_0px_#3B0764]'
              : 'bg-white border border-slate-200 rounded-2xl shadow-sm'
          }`}>
            {activeTab === 'curriculum' && (
              <div className="space-y-6 text-center md:text-left w-full">
                <h3 className={`text-2xl ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>Empirical Montessori Curriculum</h3>
                <p className={`${isKids ? 'text-navy/80 font-medium' : 'text-slate-600 font-normal'}`}>
                  Our syllabus integrates interactive child-directed modules where children learn practical lifecycle tasks, vocabulary, tactile arithmetic, and early spatial coordination concepts.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                  {['Self-Directed Play', 'Sensory Materials', 'Tactile Phonics', 'Math Manipulatives', 'Practical Life Skills'].map((tag, i) => (
                    <span
                      key={i}
                      className={
                        isKids
                          ? "px-3.5 py-1.5 bg-yellow-50 text-navy font-accent text-xs border border-navy/40 rounded-full shadow-[2px_2px_0px_0px_rgba(59, 7, 100,0.1)]"
                          : "px-3.5 py-1.5 bg-slate-50 text-slate-700 font-sans text-xs font-semibold border border-slate-200 rounded-full"
                      }
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'keyareas' && (
              <div className="space-y-6 text-center md:text-left w-full">
                <h3 className={`text-2xl ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>Five Developmental Pillars</h3>
                <p className={`${isKids ? 'text-navy/80 font-medium' : 'text-slate-600 font-normal'}`}>
                  We balance cognitive milestones with social-emotional growth, language articulation, fine and gross motor mastery, and artistic self-expression.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                  {['Cognitive Logic', 'Gross Motor Play', 'Linguistic Literacy', 'Creative Expression', 'Social-Emotional Core'].map((tag, i) => (
                    <span
                      key={i}
                      className={
                        isKids
                          ? "px-3.5 py-1.5 bg-blue-50 text-navy font-accent text-xs border border-navy/40 rounded-full shadow-[2px_2px_0px_0px_rgba(59, 7, 100,0.1)]"
                          : "px-3.5 py-1.5 bg-slate-50 text-slate-700 font-sans text-xs font-semibold border border-slate-200 rounded-full"
                      }
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activities' && (
              <div className="space-y-6 text-center md:text-left w-full">
                <h3 className={`text-2xl ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>Weekly Interactive Workshops</h3>
                <p className={`${isKids ? 'text-navy/80 font-medium' : 'text-slate-600 font-normal'}`}>
                  Every week is full of sensory discoveries! Kids engage in gardening, music circles, finger painting, block building, gymnastics, and clay modelling.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                  {['Gardening 🌱', 'Clay Art 🎨', 'Phonics Reading 📚', 'Yoga Circles 🧘', 'Music & Dance 🎵'].map((tag, i) => (
                    <span
                      key={i}
                      className={
                        isKids
                          ? "px-3.5 py-1.5 bg-green-50 text-navy font-accent text-xs border border-navy/40 rounded-full shadow-[2px_2px_0px_0px_rgba(59, 7, 100,0.1)]"
                          : "px-3.5 py-1.5 bg-slate-50 text-slate-700 font-sans text-xs font-semibold border border-slate-200 rounded-full"
                      }
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 5. WHY CHOOSE US SECTION */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Progress Bars (Left) */}
          <div className={`space-y-4 p-6 md:p-8 reveal ${isKids ? 'bg-white border-3 border-navy rounded-3xl shadow-[6px_6px_0px_0px_#3B0764]' : 'bg-white border border-slate-200 rounded-2xl shadow-sm'}`}>
            <h2 className={`text-2xl sm:text-3xl ${isKids ? 'font-display font-extrabold text-navy mb-6' : 'font-sans font-bold text-slate-800 mb-6'}`}>
              Our Growth Highlights 📈
            </h2>

            <AnimatedProgress label="Creative Learning" percentage={97} color="plum" emoji="🎨" />
            <AnimatedProgress label="Child Safety" percentage={100} color="blush" emoji="🛡️" />
            <AnimatedProgress label="Happiness Index" percentage={98} color="gold" emoji="😄" />
            <AnimatedProgress label="Parent Involvement" percentage={95} color="lavender" emoji="🤝" />
            <AnimatedProgress label="Developmental Growth" percentage={96} color="lilac" emoji="📈" />
          </div>

          {/* Bio + Image (Right) */}
          <div className="space-y-6 reveal">
            {isKids ? (
              <StickerBadge text="Safe & Certified 🏆" color="plum" className="mb-2" />
            ) : (
              <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-800 text-sm font-semibold rounded-full border border-slate-200 mb-2">
                Safe & Certified 🏆
              </span>
            )}

            <h2 className={`text-3xl sm:text-4.5xl leading-tight ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-extrabold text-slate-900'}`}>
              A Warm Haven Where Happiness Meets Safety 🏡
            </h2>

            <p className={`${isKids ? 'text-navy/80 font-medium text-base sm:text-lg' : 'text-slate-600 font-normal text-base sm:text-lg'}`}>
              At Tinkytots, child wellness and development are structured into every room. We create custom growth tracks, keep ratios low, and maintain hygiene controls.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={isKids ? "bg-lilac/10 border-2 border-navy/30 px-4 py-3 rounded-2xl flex items-center space-x-3" : "bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl flex items-center space-x-3 text-slate-700 font-sans"}>
                <span className="text-2xl">👩‍🏫</span>
                <span className={isKids ? "font-accent text-sm text-navy" : "font-sans font-semibold text-sm text-slate-700"}>1:8 Teacher Ratio</span>
              </div>
              <div className={isKids ? "bg-blush/10 border-2 border-navy/30 px-4 py-3 rounded-2xl flex items-center space-x-3" : "bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl flex items-center space-x-3 text-slate-700 font-sans"}>
                <span className="text-2xl">🧼</span>
                <span className={isKids ? "font-accent text-sm text-navy" : "font-sans font-semibold text-sm text-slate-700"}>Daily Sanitization</span>
              </div>
            </div>

            {/* School photo in blob frame */}
            <div className={
              isKids
                ? "w-full h-76 md:h-64 overflow-hidden border-3 border-navy rounded-[30%_70%_70%_30%/_50%_60%_40%_50%] animate-blob-morph shadow-[6px_6px_0px_0px_#3B0764]"
                : "w-full h-76 md:h-64 overflow-hidden border border-slate-200 rounded-2xl shadow-md bg-white"
            }>
              <img
                src="/images/home/img2.png"
                alt="Preschool school classroom safety and setup"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 6. ANIMATED STATS COUNTER SECTION */}
      <section className={`relative py-16 px-4 z-20 overflow-hidden transition-all ${isKids ? 'bg-gradient-to-br from-plum via-[#FF8E53] to-gold border-y-3 border-navy' : 'bg-slate-900 border-y border-slate-800'}`}>
        {/* Decorative Doodles floating background inside stats */}
        {isKids && (
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <StarDoodle color="white" size={32} className="absolute top-[20%] left-[10%] animate-spin-slow" />
            <StarDoodle color="white" size={24} className="absolute bottom-[20%] right-[10%] animate-bounce-light" />
          </div>
        )}

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

      {/* 7. PARENT-TEACHER PARTNERSHIP */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Left */}
          <div className="relative order-2 lg:order-1 flex justify-center reveal">
            <div className={
              isKids
                ? "w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] overflow-hidden border-3 border-navy rounded-[40%_60%_40%_60%/_50%_40%_60%_50%] animate-blob-morph shadow-[8px_8px_0px_0px_#3B0764]"
                : "w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] overflow-hidden border border-slate-200 rounded-3xl shadow-md bg-white"
            }>
              <img
                src="/images/home/image2.jpg"
                alt="Parent teacher collaboration at Tinkytots"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Right */}
          <div className="space-y-6 order-1 lg:order-2 reveal">
            <h2 className={`text-3xl sm:text-4.5xl leading-tight ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-extrabold text-slate-900'}`}>
              You + Us = Their Best Start 💛
            </h2>
            <p className={`${isKids ? 'text-navy/80 font-medium text-base sm:text-lg' : 'text-slate-600 font-normal text-base sm:text-lg'}`}>
              We believe primary education is a collaborative journey. At Tinkytots, parents are active partners. We provide regular milestones tracking, school workshops, and dynamic progress reports.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className={
                isKids
                  ? "px-4 py-2 bg-yellow-100 border-2 border-navy rounded-full font-accent text-xs shadow-[2px_2px_0px_0px_#3B0764]"
                  : "px-4 py-1.5 bg-slate-100 border border-slate-200 rounded-full font-sans font-semibold text-xs text-slate-700"
              }>
                🧩 Active Learning
              </span>
              <span className={
                isKids
                  ? "px-4 py-2 bg-red-100 border-2 border-navy rounded-full font-accent text-xs shadow-[2px_2px_0px_0px_#3B0764]"
                  : "px-4 py-1.5 bg-slate-100 border border-slate-200 rounded-full font-sans font-semibold text-xs text-slate-700"
              }>
                🌈 Joyful Environment
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ADMISSION PROCESS SECTION */}
      <section className={`py-20 px-4 relative z-10 transition-colors ${isKids ? 'bg-green-50/70 border-t-3 border-navy' : 'bg-white border-t border-slate-200'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-2xl mx-auto mb-16 reveal">
            {isKids ? (
              <StickerBadge text="Admissions Open 🚀" color="blush" className="mb-2" />
            ) : (
              <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-800 text-sm font-semibold rounded-full border border-slate-200 mb-2">
                Admissions Open 🚀
              </span>
            )}
            <h2 className={`text-3xl sm:text-4.5xl ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>
              Simple 3-Step Admission 🚀
            </h2>
            <p className={`mt-2 ${isKids ? 'text-navy/70 font-medium' : 'text-slate-600 font-normal'}`}>
              Join the Tinkytots family in three straightforward steps. Let's make learning memorable!
            </p>
          </div>

          {/* Stepper container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 max-w-5xl mx-auto relative mb-12 reveal">
            {/* SVG animated connector line (Desktop only) */}
            {isKids && (
              <div className="absolute top-[40px] left-[15%] right-[15%] h-[10px] hidden lg:block pointer-events-none z-0">
                <svg width="100%" height="10" viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full">
                  <path d="M0,5 L100,5" stroke="#FF6B6B" strokeWidth="4" fill="none" className="dashed-line-animated" />
                </svg>
              </div>
            )}

            {[
              {
                step: '1',
                title: '📋 Enquiry',
                desc: 'Fill the enquiry form online or visit our Gota campus in person.',
                icon: '📋'
              },
              {
                step: '2',
                title: '✅ Verification',
                desc: 'Meet our lead educator and submit basic documents like Birth Certificate.',
                icon: '🤝'
              },
              {
                step: '3',
                title: '🎒 Enrolled!',
                desc: 'Pay the term deposit and receive the child welcome kit.',
                icon: '🎒'
              }
            ].map((stepItem, idx) => (
              <div
                key={idx}
                className={
                  isKids
                    ? "bg-white border-3 border-navy rounded-3xl p-6 relative z-10 flex flex-col items-center text-center shadow-[6px_6px_0px_0px_#3B0764] hover:scale-102 transition-transform duration-200"
                    : "bg-white border border-slate-200 rounded-2xl p-6 relative z-10 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:scale-101 transition-all duration-200"
                }
              >
                {/* Number Indicator */}
                <div className={
                  isKids
                    ? "w-12 h-12 bg-plum text-white border-2 border-navy rounded-full flex items-center justify-center font-accent text-lg shadow-[2px_2px_0px_0px_#3B0764] absolute top-[-24px]"
                    : "w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-sans font-bold text-sm absolute top-[-20px]"
                }>
                  {stepItem.step}
                </div>

                <div className="text-4xl mt-4 mb-3">{stepItem.icon}</div>
                <h3 className={`text-xl mb-2 ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>
                  {stepItem.title}
                </h3>
                <p className={`text-sm ${isKids ? 'text-navy/70 font-medium' : 'text-slate-600 font-normal'}`}>
                  {stepItem.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick contact details pills */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 reveal">
            <a
              href="mailto:admissions@tinkytots.com"
              className={
                isKids
                  ? "px-6 py-2.5 bg-white hover:bg-cream border-2 border-navy rounded-full font-accent text-sm text-navy shadow-[3px_3px_0px_0px_#3B0764] hover:translate-y-[-1px] transition-all"
                  : "px-6 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-full font-sans font-semibold text-sm text-slate-700 shadow-sm hover:translate-y-[-1px] transition-all"
              }
            >
              ✉️ admissions@tinkytots.com
            </a>
            <a
              href="tel:+917624012997"
              className={
                isKids
                  ? "px-6 py-2.5 bg-white hover:bg-cream border-2 border-navy rounded-full font-accent text-sm text-navy shadow-[3px_3px_0px_0px_#3B0764] hover:translate-y-[-1px] transition-all"
                  : "px-6 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-full font-sans font-semibold text-sm text-slate-700 shadow-sm hover:translate-y-[-1px] transition-all"
              }
            >
              📞 +91 76240 12997
            </a>
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
        <div className="h-8 bg-white border-b border-slate-200/50" />
      )}

      {/* 9. BLOG SPOTLIGHT SECTION */}
      <section className={`py-20 px-4 relative z-10 ${isKids ? 'bg-white' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <h2 className={`text-3xl sm:text-4.5xl ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>
              From Our Learning Garden 🌱
            </h2>
            <p className={`mt-2 ${isKids ? 'text-navy/70 font-medium' : 'text-slate-600 font-normal'}`}>
              Insights, parenting tips, and classroom stories written directly by our teachers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Nurturing Reading Habits in Early Childhood 📖',
                category: 'Parenting Guide',
                date: 'June 05, 2026',
                excerpt: 'How reading picture books together before bedtime boosts speech, literacy, and child focus.',
                color: 'border-t-gold',
                badgeColor: 'gold',
                img: 'https://picsum.photos/seed/reading-books/400/250'
              },
              {
                title: 'The Value of Unstructured Play in Sandbox 🧩',
                category: 'Montessori Method',
                date: 'May 28, 2026',
                excerpt: 'Why free-play lets kids develop cognitive logic, problem-solving skills, and friend groups.',
                color: 'border-t-plum',
                badgeColor: 'plum',
                img: 'https://picsum.photos/seed/sandbox-play/400/250'
              },
              {
                title: 'Tactile Learning: Fun Crafts at Home 🎨',
                category: 'DIY Art & Craft',
                date: 'May 12, 2026',
                excerpt: 'Sensory-rich DIY play projects using flour, clay, and leaves from the garden.',
                color: 'border-t-lilac',
                badgeColor: 'lilac',
                img: 'https://picsum.photos/seed/craft-diy/400/250'
              }
            ].map((blog, idx) => (
              <div
                key={idx}
                className={
                  isKids
                    ? `bg-white border-3 border-navy rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_#3B0764] flex flex-col justify-between reveal ${blog.color} border-t-[8px] hover:translate-y-[-4px] transition-all`
                    : `bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between reveal ${blog.color} border-t-[4px] hover:translate-y-[-2px] hover:shadow-md transition-all`
                }
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div>
                  <div className={`w-full h-48 overflow-hidden relative ${isKids ? 'border-b-2 border-navy' : 'border-b border-slate-100'}`}>
                    <img src={blog.img} alt={blog.title} className="w-full h-full object-cover" />

                    {/* Rotated sticker badge */}
                    <div className="absolute top-4 left-4">
                      {isKids ? (
                        <StickerBadge text={blog.category} color={blog.badgeColor} rotate="-2deg" className="py-1 px-3 text-xs" />
                      ) : (
                        <span className="inline-block px-3 py-1 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-semibold rounded-md border border-slate-700">
                          {blog.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <span className={`text-xs block ${isKids ? 'text-navy/50 font-bold' : 'text-slate-400 font-medium'}`}>{blog.date}</span>
                    <h3 className={`text-lg hover:text-violet transition-colors leading-tight ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-850 hover:text-slate-950'}`}>
                      <Link to="/media">{blog.title}</Link>
                    </h3>
                    <p className={`text-sm line-clamp-3 leading-relaxed ${isKids ? 'text-navy/70 font-semibold' : 'text-slate-600 font-normal'}`}>
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to="/media"
                    className={`inline-flex items-center text-xs transition-colors ${
                      isKids ? 'font-accent text-navy hover:text-violet' : 'font-sans font-semibold text-slate-500 hover:text-slate-855'
                    }`}
                  >
                    Read More ➔
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. LET'S CONNECT CTA SECTION */}
      <section className={`py-16 px-4 relative z-10 overflow-hidden transition-all ${isKids ? 'bg-gradient-to-r from-plum to-[#FF8E53] border-t-3 border-navy' : 'bg-slate-900 border-t border-slate-850'}`}>
        {/* Floating Doodles */}
        {isKids && (
          <div className="absolute inset-0 pointer-events-none opacity-15">
            <StarDoodle color="white" size={40} className="absolute top-8 left-12 animate-bounce-light" />
            <SpiralDoodle color="white" size={32} className="absolute bottom-6 left-1/4" />
            <HeartDoodle color="white" size={28} className="absolute top-10 right-1/4 animate-spin-slow" />
          </div>
        )}

        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 gap-8">
          <div className="text-center lg:text-left space-y-4 max-w-lg">
            <h2 className={`text-3xl sm:text-4.5xl font-extrabold text-white leading-tight ${isKids ? 'font-display' : 'font-sans'}`}>
              Ready to Give Your Child the Best Start? 🌟
            </h2>
            <p className={`font-medium text-base sm:text-lg ${isKids ? 'text-white/90' : 'text-slate-350'}`}>
              Join hundreds of happy families in Gota. Schedule a visit or speak to our admissions team today!
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className={
                  isKids
                    ? "inline-block px-8 py-4 bg-white hover:bg-cream text-plum font-accent text-lg rounded-2xl border-3 border-navy shadow-[6px_6px_0px_0px_#3B0764] hover:translate-y-[-2px] transition-all duration-200"
                    : "inline-block px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-sans font-semibold text-lg rounded-xl shadow-md hover:translate-y-[-1px] transition-all duration-200"
                }
              >
                Contact Us Now 🚀
              </Link>
            </div>
          </div>

          {/* Large Toots illustration on the right */}
          {isKids && (
            <div className="w-[180px] sm:w-[220px] flex justify-center">
              <div className="bg-white border-3 border-navy rounded-[50%] p-4 shadow-[6px_6px_0px_0px_#3B0764] transform rotate-[4deg] hover:rotate-[0deg] transition-transform duration-300">
                <TootsMascot size={150} />
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
