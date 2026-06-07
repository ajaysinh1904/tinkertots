import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import TootsMascot from '../components/TootsMascot';
import AnimatedProgress from '../components/AnimatedProgress';
import { StarDoodle, SpiralDoodle, HeartDoodle, DotDoodle, StickerBadge } from '../components/HandDrawnDoodles';

// Helper Component for Count Up animation
function CountUpNumber({ end, suffix = '' }) {
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
    <span ref={elementRef} className="font-display font-extrabold text-4xl md:text-5xl text-coral">
      {count}{suffix}
    </span>
  );
}

export default function Home() {
  useScrollReveal();
  const [activeTab, setActiveTab] = useState('curriculum');

  // Interactive mouse handler for 3D Tilt
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const rotateX = -(y / (box.height / 2)) * 12; // 12 deg max
    const rotateY = (x / (box.width / 2)) * 12;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e) => {
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
    <div className="bg-cream overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-4 md:px-8 bg-gradient-to-b from-white/20 to-cream">
        
        {/* Floating Particle Background */}
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

        {/* Scattered Doodles */}
        <StarDoodle color="coral" size={36} className="absolute top-[15%] left-[8%] hidden md:block" />
        <SpiralDoodle color="sunshine" size={40} className="absolute bottom-[20%] left-[5%] hidden md:block" />
        <HeartDoodle color="lavender" size={32} className="absolute top-[25%] right-[10%] hidden md:block" />
        <StarDoodle color="skyblue" size={28} className="absolute bottom-[15%] right-[8%] hidden md:block" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          {/* Left Text */}
          <div className="space-y-6 text-center lg:text-left reveal active">
            <StickerBadge text="Now Enrolling for 2026-27! 🎒" color="sunshine" className="mb-2" />
            
            <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-display font-extrabold text-navy leading-tight">
              Where Little Minds <br/>
              <span className="text-coral relative inline-block">
                Bloom 🌻
                <svg className="absolute bottom-[-10px] left-0 w-full h-[12px] text-sunshine" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-navy/80 max-w-xl mx-auto lg:mx-0 font-medium">
              A place of wonder, play, and discovery for ages 1.5–6. Empowering kids with Montessori and activity-based learning in Gota, Ahmedabad.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-coral hover:bg-coral/90 text-white font-accent text-lg rounded-2xl border-3 border-navy shadow-[6px_6px_0px_0px_#1A1A2E] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#1A1A2E] transition-all duration-200 text-center"
              >
                Book a Free Visit 🤝
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto px-8 py-4 bg-white/70 hover:bg-white text-navy font-accent text-lg rounded-2xl border-3 border-navy shadow-[6px_6px_0px_0px_rgba(26,26,46,0.15)] hover:translate-y-[-2px] transition-all duration-200 text-center"
              >
                Learn More 📖
              </Link>
            </div>

            {/* Visiting hours badge */}
            <div className="inline-flex items-center space-x-2 bg-white border-2 border-navy/30 px-4 py-2 rounded-full shadow-[2px_2px_0px_0px_rgba(26,26,46,0.05)] text-xs sm:text-sm font-bold text-navy">
              <span>🕗</span>
              <span>Mon–Sat | 8:30 AM – 2:30 PM</span>
            </div>
          </div>

          {/* Right Image with morphing blob and doodles */}
          <div className="relative flex justify-center lg:justify-end reveal active">
            {/* Background morphing blob */}
            <div className="absolute inset-0 bg-gradient-to-tr from-skyblue/40 to-lavender/30 animate-blob-morph -z-10 scale-95" />
            
            {/* Large illustration container */}
            <div className="w-[320px] sm:w-[450px] h-[320px] sm:h-[450px] overflow-hidden border-4 border-navy rounded-[60%_40%_30%_70%/_60%_30%_70%_40%] animate-blob-morph shadow-[12px_12px_0px_0px_#1A1A2E]">
              <img
                src="https://picsum.photos/seed/tinkertots-kids-play/600/600"
                alt="Happy children learning and playing"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Float badge overlay */}
            <div className="absolute bottom-[5%] left-[5%] transform rotate-[-6deg] bg-mint text-navy font-accent text-xs sm:text-sm px-4 py-2 border-2 border-navy rounded-xl shadow-[3px_3px_0px_0px_#1A1A2E] select-none">
              🌿 Green Campus
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <section className="bg-white border-y-3 border-navy py-6 relative z-20">
        <div className="marquee-container">
          <div className="marquee-content font-accent text-sm sm:text-base text-navy">
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
      <div className="w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-white fill-current">
          <path d="M0,0 C150,90 350,120 600,60 C850,0 1050,30 1200,90 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* 3. PROGRAMS SECTION */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <div className="flex justify-center mb-2">
            <StarDoodle color="sunshine" size={32} />
          </div>
          <h2 className="text-3xl sm:text-4.5xl font-display font-extrabold text-navy">
            Find the Right Program for Your Tiny Star ⭐
          </h2>
          <p className="text-navy/70 mt-2 font-medium">
            Curated age-appropriate programs filled with hands-on activities, outdoor play, and social skill building.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'Playgroup 🎨',
              age: '1.5 – 2.5 yrs',
              desc: 'Sensory explorations, soft-play circles, and language starters to build confidence.',
              color: 'bg-yellow-100 hover:bg-sunshine/20',
              border: 'border-t-sunshine',
              badgeColor: 'bg-sunshine',
              img: 'https://picsum.photos/seed/playgroup/250/200'
            },
            {
              title: 'Nursery 🧸',
              age: '2.5 – 3.5 yrs',
              desc: 'Early socialization, phonic sounds, basic numbers, and fine motor activity worksheets.',
              color: 'bg-red-50 hover:bg-coral/20',
              border: 'border-t-coral',
              badgeColor: 'bg-coral text-white',
              img: 'https://picsum.photos/seed/nursery/250/200'
            },
            {
              title: 'Junior KG 📚',
              age: '3.5 – 4.5 yrs',
              desc: 'Sentence building, creative writing, science discovery, and analytical math concepts.',
              color: 'bg-blue-50 hover:bg-skyblue/20',
              border: 'border-t-skyblue',
              badgeColor: 'bg-skyblue text-white',
              img: 'https://picsum.photos/seed/junior-kg/250/200'
            },
            {
              title: 'Senior KG 🎓',
              age: '4.5 – 5.5 yrs',
              desc: 'Advanced logic, public speaking, computing basics, and mock tests for primary readiness.',
              color: 'bg-green-50 hover:bg-mint/20',
              border: 'border-t-mint',
              badgeColor: 'bg-mint',
              img: 'https://picsum.photos/seed/senior-kg/250/200'
            }
          ].map((prog, idx) => (
            <div
              key={idx}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`tilt-card rounded-3xl border-3 border-navy bg-white overflow-hidden p-5 flex flex-col justify-between shadow-[6px_6px_0px_0px_#1A1A2E] hover:-translate-y-1 transition-all ${prog.border} border-t-[8px] reveal`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="space-y-4">
                {/* Visual Image */}
                <div className="w-full h-36 rounded-2xl overflow-hidden border-2 border-navy">
                  <img src={prog.img} alt={prog.title} className="w-full h-full object-cover" />
                </div>
                
                {/* Age Tag */}
                <span className={`inline-block px-3 py-1 font-accent text-xs border border-navy rounded-full shadow-[1px_1px_0px_0px_#1A1A2E] ${prog.badgeColor}`}>
                  👶 {prog.age}
                </span>

                <h3 className="text-xl font-display font-extrabold text-navy">
                  {prog.title}
                </h3>
                
                <p className="text-sm text-navy/80 font-medium line-clamp-3">
                  {prog.desc}
                </p>
              </div>

              <div className="pt-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center text-xs font-accent text-navy hover:text-coral transition-colors"
                >
                  Explore program details <span className="ml-1 text-sm">➔</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WAVE DIVIDER (Crest Up) */}
      <div className="w-full overflow-hidden leading-[0] bg-cream">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-white fill-current transform rotate-180">
          <path d="M0,0 C150,90 350,120 600,60 C850,0 1050,30 1200,90 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* 4. ACADEMICS TABS SECTION */}
      <section className="py-20 px-4 bg-white relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          
          {/* Lavender blob container backdrops */}
          <div className="absolute inset-0 bg-lavender/10 rounded-[40%_60%_70%_30%/_50%_60%_40%_50%] -z-10 scale-105 animate-blob-morph" />

          <div className="text-center max-w-2xl mx-auto mb-12 reveal">
            <h2 className="text-3xl sm:text-4.5xl font-display font-extrabold text-navy">
              Tinkertots Approach to Learning
            </h2>
            <p className="text-navy/70 mt-2 font-medium">
              We design activities using the Montessori method to unlock five-dimensional developmental milestones.
            </p>
          </div>

          {/* Tabs header */}
          <div className="flex justify-center space-x-2 sm:space-x-4 mb-8 reveal">
            {[
              { id: 'curriculum', label: '🧠 Curriculum', color: 'bg-sunshine' },
              { id: 'keyareas', label: '🔑 Key Areas', color: 'bg-skyblue' },
              { id: 'activities', label: '🎯 Activities', color: 'bg-mint' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 font-accent text-sm sm:text-base border-2 rounded-2xl relative transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-navy text-white border-navy shadow-[4px_4px_0px_0px_rgba(26,26,46,0.2)]'
                    : 'bg-cream/50 text-navy border-navy/20 hover:border-navy'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-[-6px] left-[15%] right-[15%] h-1 bg-sunshine rounded-full active-tab-underline" />
                )}
              </button>
            ))}
          </div>

          {/* Tabs content */}
          <div className="max-w-4xl mx-auto bg-white border-3 border-navy rounded-3xl p-6 md:p-10 shadow-[8px_8px_0px_0px_#1A1A2E] min-h-[260px] flex items-center justify-center reveal">
            {activeTab === 'curriculum' && (
              <div className="space-y-6 text-center md:text-left w-full">
                <h3 className="text-2xl font-display font-extrabold text-navy">Empirical Montessori Curriculum</h3>
                <p className="text-navy/80 font-medium">
                  Our syllabus integrates interactive child-directed modules where children learn practical lifecycle tasks, vocabulary, tactile arithmetic, and early spatial coordination concepts.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                  {['Self-Directed Play', 'Sensory Materials', 'Tactile Phonics', 'Math Manipulatives', 'Practical Life Skills'].map((tag, i) => (
                    <span key={i} className="px-3.5 py-1.5 bg-yellow-50 text-navy font-accent text-xs border border-navy/40 rounded-full shadow-[2px_2px_0px_0px_rgba(26,26,46,0.1)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'keyareas' && (
              <div className="space-y-6 text-center md:text-left w-full">
                <h3 className="text-2xl font-display font-extrabold text-navy">Five Developmental Pillars</h3>
                <p className="text-navy/80 font-medium">
                  We balance cognitive milestones with social-emotional growth, language articulation, fine and gross motor mastery, and artistic self-expression.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                  {['Cognitive Logic', 'Gross Motor Play', 'Linguistic Literacy', 'Creative Expression', 'Social-Emotional Core'].map((tag, i) => (
                    <span key={i} className="px-3.5 py-1.5 bg-blue-50 text-navy font-accent text-xs border border-navy/40 rounded-full shadow-[2px_2px_0px_0px_rgba(26,26,46,0.1)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activities' && (
              <div className="space-y-6 text-center md:text-left w-full">
                <h3 className="text-2xl font-display font-extrabold text-navy">Weekly Interactive Workshops</h3>
                <p className="text-navy/80 font-medium">
                  Every week is full of sensory discoveries! Kids engage in gardening, music circles, finger painting, block building, gymnastics, and clay modelling.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                  {['Gardening 🌱', 'Clay Art 🎨', 'Phonics Reading 📚', 'Yoga Circles 🧘', 'Music & Dance 🎵'].map((tag, i) => (
                    <span key={i} className="px-3.5 py-1.5 bg-green-50 text-navy font-accent text-xs border border-navy/40 rounded-full shadow-[2px_2px_0px_0px_rgba(26,26,46,0.1)]">
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
          <div className="space-y-4 bg-white border-3 border-navy p-6 md:p-8 rounded-3xl shadow-[6px_6px_0px_0px_#1A1A2E] reveal">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-navy mb-6">
              Our Growth Highlights 📈
            </h2>
            
            <AnimatedProgress label="Creative Learning" percentage={97} color="coral" emoji="🎨" />
            <AnimatedProgress label="Child Safety" percentage={100} color="mint" emoji="🛡️" />
            <AnimatedProgress label="Happiness Index" percentage={98} color="sunshine" emoji="😄" />
            <AnimatedProgress label="Parent Involvement" percentage={95} color="lavender" emoji="🤝" />
            <AnimatedProgress label="Developmental Growth" percentage={96} color="skyblue" emoji="📈" />
          </div>

          {/* Bio + Image (Right) */}
          <div className="space-y-6 reveal">
            <StickerBadge text="Safe & Certified 🏆" color="coral" className="mb-2" />
            
            <h2 className="text-3xl sm:text-4.5xl font-display font-extrabold text-navy leading-tight">
              A Warm Haven Where Happiness Meets Safety 🏡
            </h2>

            <p className="text-navy/80 font-medium text-base sm:text-lg">
              At Tinkytots, child wellness and development are structured into every room. We create custom growth tracks, keep ratios low, and maintain hygiene controls.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-skyblue/10 border-2 border-navy/30 px-4 py-3 rounded-2xl flex items-center space-x-3">
                <span className="text-2xl">👩‍🏫</span>
                <span className="font-accent text-sm text-navy">1:8 Teacher Ratio</span>
              </div>
              <div className="bg-mint/10 border-2 border-navy/30 px-4 py-3 rounded-2xl flex items-center space-x-3">
                <span className="text-2xl">🧼</span>
                <span className="font-accent text-sm text-navy">Daily Sanitization</span>
              </div>
            </div>

            {/* School photo in blob frame */}
            <div className="w-full h-56 md:h-64 overflow-hidden border-3 border-navy rounded-[30%_70%_70%_30%/_50%_60%_40%_50%] animate-blob-morph shadow-[6px_6px_0px_0px_#1A1A2E]">
              <img
                src="https://picsum.photos/seed/tinkertots-school-room/600/400"
                alt="Preschool school classroom safety and setup"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 6. ANIMATED STATS COUNTER SECTION */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-coral via-[#FF8E53] to-sunshine border-y-3 border-navy z-20 overflow-hidden">
        {/* Decorative Doodles floating background inside stats */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <StarDoodle color="white" size={32} className="absolute top-[20%] left-[10%] animate-spin-slow" />
          <StarDoodle color="white" size={24} className="absolute bottom-[20%] right-[10%] animate-bounce-light" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {[
            { end: 5500, label: 'Sq.ft Campus 🏫', suffix: '+' },
            { end: 20, label: 'Kids Per Batch 👶', suffix: ' Max' },
            { end: 100, label: 'Combined Experience 🏆', suffix: '+' },
            { end: 15, label: 'Faculty & Staff 👩‍🏫', suffix: '+' }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-navy rounded-2xl p-5 flex flex-col items-center text-center shadow-[4px_4px_0px_0px_#1A1A2E] hover:scale-103 transition-transform duration-200"
            >
              <CountUpNumber end={stat.end} suffix={stat.suffix} />
              <span className="text-xs sm:text-sm font-accent text-navy mt-2 leading-tight">
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
            <div className="w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] overflow-hidden border-3 border-navy rounded-[40%_60%_40%_60%/_50%_40%_60%_50%] animate-blob-morph shadow-[8px_8px_0px_0px_#1A1A2E]">
              <img
                src="https://picsum.photos/seed/tinkertots-parent-teacher/500/500"
                alt="Parent teacher collaboration at Tinkytots"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Right */}
          <div className="space-y-6 order-1 lg:order-2 reveal">
            <h2 className="text-3xl sm:text-4.5xl font-display font-extrabold text-navy leading-tight">
              You + Us = Their Best Start 💛
            </h2>
            <p className="text-navy/80 font-medium text-base sm:text-lg">
              We believe primary education is a collaborative journey. At Tinkytots, parents are active partners. We provide regular milestones tracking, school workshops, and dynamic progress reports.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-yellow-100 border-2 border-navy rounded-full font-accent text-xs shadow-[2px_2px_0px_0px_#1A1A2E]">
                🧩 Active Learning
              </span>
              <span className="px-4 py-2 bg-red-100 border-2 border-navy rounded-full font-accent text-xs shadow-[2px_2px_0px_0px_#1A1A2E]">
                🌈 Joyful Environment
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ADMISSION PROCESS SECTION */}
      <section className="py-20 px-4 bg-green-50/70 border-t-3 border-navy relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-2xl mx-auto mb-16 reveal">
            <StickerBadge text="Admissions Open 🚀" color="mint" className="mb-2" />
            <h2 className="text-3xl sm:text-4.5xl font-display font-extrabold text-navy">
              Simple 3-Step Admission 🚀
            </h2>
            <p className="text-navy/70 mt-2 font-medium">
              Join the Tinkytots family in three straightforward steps. Let's make learning memorable!
            </p>
          </div>

          {/* Stepper container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 max-w-5xl mx-auto relative mb-12 reveal">
            {/* SVG animated connector line (Desktop only) */}
            <div className="absolute top-[40px] left-[15%] right-[15%] h-[10px] hidden lg:block pointer-events-none z-0">
              <svg width="100%" height="10" viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full">
                <path d="M0,5 L100,5" stroke="#FF6B6B" strokeWidth="4" fill="none" className="dashed-line-animated" />
              </svg>
            </div>

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
                className="bg-white border-3 border-navy rounded-3xl p-6 relative z-10 flex flex-col items-center text-center shadow-[6px_6px_0px_0px_#1A1A2E] hover:scale-102 transition-transform duration-200"
              >
                {/* Number Indicator */}
                <div className="w-12 h-12 bg-coral text-white border-2 border-navy rounded-full flex items-center justify-center font-accent text-lg shadow-[2px_2px_0px_0px_#1A1A2E] absolute top-[-24px]">
                  {stepItem.step}
                </div>

                <div className="text-4xl mt-4 mb-3">{stepItem.icon}</div>
                <h3 className="text-xl font-display font-extrabold text-navy mb-2">
                  {stepItem.title}
                </h3>
                <p className="text-sm text-navy/70 font-medium">
                  {stepItem.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick contact details pills */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 reveal">
            <a
              href="mailto:admissions@tinkytots.com"
              className="px-6 py-2.5 bg-white hover:bg-cream border-2 border-navy rounded-full font-accent text-sm text-navy shadow-[3px_3px_0px_0px_#1A1A2E] hover:translate-y-[-1px] transition-all"
            >
              ✉️ admissions@tinkytots.com
            </a>
            <a
              href="tel:+917624012997"
              className="px-6 py-2.5 bg-white hover:bg-cream border-2 border-navy rounded-full font-accent text-sm text-navy shadow-[3px_3px_0px_0px_#1A1A2E] hover:translate-y-[-1px] transition-all"
            >
              📞 +91 76240 12997
            </a>
          </div>
        </div>
      </section>

      {/* WAVE DIVIDER */}
      <div className="w-full overflow-hidden leading-[0] bg-cream">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-white fill-current">
          <path d="M0,0 C150,90 350,120 600,60 C850,0 1050,30 1200,90 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* 9. BLOG SPOTLIGHT SECTION */}
      <section className="py-20 px-4 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <h2 className="text-3xl sm:text-4.5xl font-display font-extrabold text-navy">
              From Our Learning Garden 🌱
            </h2>
            <p className="text-navy/70 mt-2 font-medium">
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
                color: 'border-t-sunshine',
                badgeColor: 'sunshine',
                img: 'https://picsum.photos/seed/reading-books/400/250'
              },
              {
                title: 'The Value of Unstructured Play in Sandbox 🧩',
                category: 'Montessori Method',
                date: 'May 28, 2026',
                excerpt: 'Why free-play lets kids develop cognitive logic, problem-solving skills, and friend groups.',
                color: 'border-t-coral',
                badgeColor: 'coral',
                img: 'https://picsum.photos/seed/sandbox-play/400/250'
              },
              {
                title: 'Tactile Learning: Fun Crafts at Home 🎨',
                category: 'DIY Art & Craft',
                date: 'May 12, 2026',
                excerpt: 'Sensory-rich DIY play projects using flour, clay, and leaves from the garden.',
                color: 'border-t-skyblue',
                badgeColor: 'skyblue',
                img: 'https://picsum.photos/seed/craft-diy/400/250'
              }
            ].map((blog, idx) => (
              <div
                key={idx}
                className={`bg-white border-3 border-navy rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_#1A1A2E] flex flex-col justify-between reveal ${blog.color} border-t-[8px] hover:translate-y-[-4px] transition-all`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div>
                  <div className="w-full h-48 border-b-2 border-navy overflow-hidden relative">
                    <img src={blog.img} alt={blog.title} className="w-full h-full object-cover" />
                    
                    {/* Rotated sticker badge */}
                    <div className="absolute top-4 left-4">
                      <StickerBadge text={blog.category} color={blog.badgeColor} rotate="-2deg" className="py-1 px-3 text-xs" />
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <span className="text-xs text-navy/50 font-bold block">{blog.date}</span>
                    <h3 className="font-display font-extrabold text-navy text-lg hover:text-coral transition-colors leading-tight">
                      <Link to="/media">{blog.title}</Link>
                    </h3>
                    <p className="text-sm text-navy/70 line-clamp-3 font-semibold leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to="/media"
                    className="inline-flex items-center text-xs font-accent text-navy hover:text-coral transition-colors"
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
      <section className="py-16 px-4 bg-gradient-to-r from-coral to-[#FF8E53] border-t-3 border-navy relative z-10 overflow-hidden">
        {/* Floating Doodles */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <StarDoodle color="white" size={40} className="absolute top-8 left-12 animate-bounce-light" />
          <SpiralDoodle color="white" size={32} className="absolute bottom-6 left-1/4" />
          <HeartDoodle color="white" size={28} className="absolute top-10 right-1/4 animate-spin-slow" />
        </div>

        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 gap-8">
          <div className="text-center lg:text-left space-y-4 max-w-lg">
            <h2 className="text-3xl sm:text-4.5xl font-display font-extrabold text-white leading-tight">
              Ready to Give Your Child the Best Start? 🌟
            </h2>
            <p className="text-white/90 font-medium text-base sm:text-lg">
              Join hundreds of happy families in Gota. Schedule a visit or speak to our admissions team today!
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-white hover:bg-cream text-coral font-accent text-lg rounded-2xl border-3 border-navy shadow-[6px_6px_0px_0px_#1A1A2E] hover:translate-y-[-2px] transition-all duration-200"
              >
                Contact Us Now 🚀
              </Link>
            </div>
          </div>

          {/* Large Toots illustration on the right */}
          <div className="w-[180px] sm:w-[220px] flex justify-center">
            <div className="bg-white border-3 border-navy rounded-[50%] p-4 shadow-[6px_6px_0px_0px_#1A1A2E] transform rotate-[4deg] hover:rotate-[0deg] transition-transform duration-300">
              <TootsMascot size={150} />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
