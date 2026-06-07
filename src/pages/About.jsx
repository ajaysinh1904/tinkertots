import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import { StarDoodle, SpiralDoodle, HeartDoodle, StickerBadge } from '../components/HandDrawnDoodles';

// Reusable CountUp component for Stats
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

    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={elementRef} className="font-display font-extrabold text-4xl md:text-5xl text-coral">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  useScrollReveal();
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
    <div className="bg-cream">
      
      {/* 1. HERO STORY HEADER */}
      <section className="relative py-16 px-4 bg-gradient-to-b from-white/30 to-cream border-b-2 border-navy overflow-hidden">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 mb-4 text-sm font-bold text-navy/60">
          <Link to="/" className="hover:text-coral transition-colors">Home</Link> &gt; <span className="text-navy">About Us</span>
        </div>

        {/* Floating Doodles */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <StarDoodle color="coral" size={28} className="absolute top-[20%] left-[8%]" />
          <HeartDoodle color="lavender" size={32} className="absolute bottom-[20%] right-[8%] animate-bounce-light" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left: Heading + Story */}
          <div className="space-y-6 reveal active">
            <StickerBadge text="Our Story 📖" color="sunshine" rotate="-2deg" className="mb-2" />
            
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-navy leading-tight">
              Crafting Magical Foundations Since 2020 🌻
            </h1>
            
            <p className="text-navy/80 font-medium text-base sm:text-lg leading-relaxed">
              Tinkytots was founded by a team of Montessori specialists and parents in Jagatpur, Ahmedabad, who wanted something better than rigid traditional schools. We designed an illustrated children's book format that turns lesson plans into interactive sensory discoveries.
            </p>

            <p className="text-navy/80 font-medium text-base sm:text-lg leading-relaxed">
              Every child here learns through sandbox games, visual cards, tactile blocks, and outdoor garden workshops. We focus heavily on safety, hygiene, and low teacher ratios so your child is well-nourished, valued, and safe.
            </p>
          </div>

          {/* Right: Side image in blob frame */}
          <div className="flex justify-center reveal active">
            <div className="w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] overflow-hidden border-3 border-navy rounded-[30%_70%_70%_30%/_50%_60%_40%_50%] animate-blob-morph shadow-[8px_8px_0px_0px_#1A1A2E]">
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
          <div className="bg-skyblue/10 border-3 border-navy p-8 rounded-3xl relative overflow-hidden shadow-[6px_6px_0px_0px_#1A1A2E] reveal">
            {/* Organic Sky Blue Blob Backdrop */}
            <div className="absolute inset-[-40px] bg-skyblue/10 rounded-[60%_40%_30%_70%/_60%_30%_70%_40%] animate-blob-morph -z-10" />
            <div className="text-4xl mb-4">🌟</div>
            <h2 className="text-2xl font-display font-extrabold text-navy mb-4">Our Vision</h2>
            <p className="text-navy/80 font-semibold leading-relaxed">
              To be the most trustworthy and joyful preschool in Ahmedabad, helping children develop cognitive independence, values of kindness, and a lifelong curiosity for learning.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-red-50/70 border-3 border-navy p-8 rounded-3xl relative overflow-hidden shadow-[6px_6px_0px_0px_#1A1A2E] reveal">
            {/* Organic Coral Blob Backdrop */}
            <div className="absolute inset-[-40px] bg-coral/10 rounded-[40%_60%_50%_50%/_50%_40%_60%_50%] animate-blob-morph -z-10" />
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-2xl font-display font-extrabold text-navy mb-4">Our Mission</h2>
            <p className="text-navy/80 font-semibold leading-relaxed">
              To design safety-first, illustrated, activity-based Montessori learning environments where low ratios, trained teachers, and parent partnerships enable healthy child development.
            </p>
          </div>

        </div>
      </section>

      {/* WAVE DIVIDER */}
      <div className="w-full overflow-hidden leading-[0] bg-cream">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-white fill-current">
          <path d="M0,0 C150,90 350,120 600,60 C850,0 1050,30 1200,90 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* 3. OUR VALUES */}
      <section className="py-20 px-4 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <h2 className="text-3xl sm:text-4.5xl font-display font-extrabold text-navy">
              Values We Plant in Our Garden 🌱
            </h2>
            <p className="text-navy/70 mt-2 font-medium">
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
                className={`border-3 border-navy rounded-3xl p-6 shadow-[4px_4px_0px_0px_#1A1A2E] flex flex-col space-y-3 transition-transform hover:scale-103 reveal ${val.color}`}
                style={{ transform: `rotate(${val.rot})`, transitionDelay: `${idx * 75}ms` }}
              >
                <h3 className="text-xl font-display font-extrabold text-navy">
                  {val.title}
                </h3>
                <p className="text-sm text-navy/70 font-semibold leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAVE DIVIDER */}
      <div className="w-full overflow-hidden leading-[0] bg-white">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-cream fill-current">
          <path d="M0,0 C150,90 350,120 600,60 C850,0 1050,30 1200,90 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* 4. LEADERSHIP TEAM */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <h2 className="text-3xl sm:text-4.5xl font-display font-extrabold text-navy">
            Our Loving Leaders & Guides 🦉
          </h2>
          <p className="text-navy/70 mt-2 font-medium">
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
              className="bg-white border-3 border-navy rounded-3xl p-6 flex flex-col items-center text-center shadow-[6px_6px_0px_0px_#1A1A2E] hover:scale-102 transition-transform duration-200 reveal"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {/* Photo placeholder with lavender ring */}
              <div className="w-32 h-32 rounded-full p-1 border-4 border-lavender overflow-hidden shadow-inner mb-4">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <h3 className="text-xl font-display font-extrabold text-navy">
                {member.name}
              </h3>
              
              <span className="inline-block px-3 py-1 bg-skyblue/10 text-navy font-accent text-xs border border-navy/30 rounded-full mt-1.5 mb-3">
                {member.role}
              </span>

              <p className="text-sm text-navy/70 font-medium leading-relaxed mb-4">
                {member.bio}
              </p>

              {/* LinkedIn icon link */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-accent text-navy hover:text-coral transition-colors flex items-center"
              >
                LinkedIn profile ➔
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 5. STATS BAND (Reused) */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-coral via-[#FF8E53] to-sunshine border-y-3 border-navy z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {[
            { end: 5500, label: 'Sq.ft Campus 🏫', suffix: '+' },
            { end: 20, label: 'Kids Per Batch 👶', suffix: ' Max' },
            { end: 100, label: 'Combined Experience 🏆', suffix: '+' },
            { end: 15, label: 'Faculty & Staff 👩‍🏫', suffix: '+' }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-navy rounded-2xl p-5 flex flex-col items-center text-center shadow-[4px_4px_0px_0px_#1A1A2E]"
            >
              <CountUpNumber end={stat.end} suffix={stat.suffix} />
              <span className="text-xs sm:text-sm font-accent text-navy mt-2 leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS AUTO-SLIDER */}
      <section className="py-20 px-4 max-w-5xl mx-auto relative z-10">
        <div className="text-center max-w-xl mx-auto mb-12 reveal">
          <h2 className="text-3xl sm:text-4.5xl font-display font-extrabold text-navy">
            Hearts of Our School Families 💛
          </h2>
        </div>

        {/* Carousel slide window */}
        <div className="relative overflow-hidden min-h-[220px] bg-yellow-50/70 border-3 border-navy rounded-3xl p-6 md:p-10 shadow-[6px_6px_0px_0px_#1A1A2E] flex flex-col justify-between reveal">
          {/* Big decorative quote mark */}
          <div className="absolute top-2 left-4 text-7xl md:text-8xl text-sunshine/30 font-accent select-none pointer-events-none">
            “
          </div>

          <div className="relative z-10 space-y-4">
            {/* Stars */}
            <div className="flex space-x-1 justify-center md:justify-start">
              {Array.from({ length: testimonials[activeSlide].stars }).map((_, i) => (
                <span key={i} className="text-sunshine text-xl">★</span>
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="text-base sm:text-lg md:text-xl text-navy italic font-semibold leading-relaxed text-center md:text-left transition-all duration-300">
              "{testimonials[activeSlide].quote}"
            </p>
          </div>

          {/* Author info */}
          <div className="pt-4 border-t border-navy/10 flex flex-col sm:flex-row justify-between items-center relative z-10 text-center sm:text-left">
            <div>
              <h4 className="font-display font-extrabold text-navy text-base">
                {testimonials[activeSlide].author}
              </h4>
              <p className="text-xs text-navy/60 font-bold">
                Parent of {testimonials[activeSlide].child}
              </p>
            </div>

            {/* Slide dots indicators */}
            <div className="flex space-x-2 mt-4 sm:mt-0">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-3.5 h-3.5 rounded-full border border-navy transition-colors ${
                    activeSlide === idx ? 'bg-coral' : 'bg-white'
                  }`}
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
