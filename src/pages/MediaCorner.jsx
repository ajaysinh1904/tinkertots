import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import Lightbox from '../components/Lightbox';
import { StickerBadge, StarDoodle, HeartDoodle } from '../components/HandDrawnDoodles';
import { useTheme } from '../context/ThemeContext';

const galleryImages = [
  { id: 1, src: 'images/gallery/img1.jpeg', title: 'Interactive Reading Circles 📚', category: 'Classroom' },
  { id: 2, src: 'images/gallery/img2.jpeg', title: 'Annual Sports Day Relay 🏆', category: 'Events' },
  { id: 3, src: 'images/gallery/img3.jpeg', title: 'Clay Modelling Workshop 🎨', category: 'Activities' },
  { id: 4, src: 'images/gallery/img4.jpeg', title: 'Diwali Lantern Crafting 🪔', category: 'Celebrations' },
  { id: 5, src: 'images/gallery/img5.jpeg', title: 'Messy Finger Painting 🎨', category: 'Classroom' },
  { id: 6, src: 'images/gallery/img6.jpg', title: 'Planting Sunflower Seedlings 🌱', category: 'Activities' },
  { id: 7, src: 'images/gallery/img7.jpg', title: 'Christmas Carols & Tree 🎄', category: 'Celebrations' },
  { id: 8, src: 'images/gallery/img8.jpg', title: 'Shape Sorting Puzzles 🧩', category: 'Classroom' },
  { id: 9, src: 'images/gallery/img9.jpg', title: 'Kids Outdoor Morning Yoga 🧘', category: 'Activities' },
  { id: 10, src: 'images/gallery/img2.jpeg', title: 'Father & Child Craft Session 🤝', category: 'Events' },
  { id: 11, src: 'images/gallery/img3.jpeg', title: 'Xylophone Jam Session 🎵', category: 'Activities' },
  { id: 12, src: 'images/gallery/img4.jpeg', title: 'Eco Holi Celebrations 🎨', category: 'Celebrations' },
];

// GalleryItem component that renders the border first and loads the image smoothly when visible
function GalleryItem({ img, onClick }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const isKids = theme === 'kids';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden bg-white transition-all h-[260px] w-full ${
        isKids
          ? 'border-3 border-navy rounded-3xl shadow-[6px_6px_0px_0px_#3B0764] hover:-translate-y-1'
          : 'border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5'
      }`}
    >
      {/* Image (smooth fade & scale after visibility & download triggers) */}
      <img
        src={img.src}
        alt={img.title}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-[800ms] ease-out ${
          isVisible && isLoaded ? 'opacity-100 scale-100 blur-none' : 'opacity-0 scale-95 blur-[2px]'
        }`}
      />

      {/* Dark Hover Overlay */}
      <div className="absolute inset-0 bg-[#3B0764]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className={`leading-tight ${isKids ? 'font-display font-bold text-lg' : 'font-sans font-bold text-lg'}`}>
            {img.title}
          </h3>
          {isKids ? (
            <span className="inline-block mt-2 px-3 py-1 bg-gold text-navy font-accent text-xs rounded-full">
              🔍 {img.category}
            </span>
          ) : (
            <span className="inline-block mt-2 px-3 py-1 bg-slate-800 text-white font-sans text-xs font-semibold rounded-md border border-slate-700">
              🔍 {img.category}
            </span>
          )}
        </div>
      </div>

      {/* Small Zoom Icon indicator */}
      <div className={`absolute top-4 right-4 bg-white/90 border rounded-full w-8 h-8 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow ${
        isKids ? 'border-navy' : 'border-slate-350'
      }`}>
        🔍
      </div>
    </div>
  );
}

export const blogPosts = [
  {
    id: 1,
    title: 'Nurturing Reading Habits in Early Childhood 📖',
    category: 'Parenting Guide',
    date: 'June 05, 2026',
    excerpt: 'How reading picture books together before bedtime boosts speech, literacy, and child focus.',
    img: 'https://picsum.photos/seed/reading-books/600/400',
    color: 'border-t-gold',
    badgeColor: 'gold',
  },
  {
    id: 2,
    title: 'The Value of Unstructured Play in Sandbox 🧩',
    category: 'Montessori Method',
    date: 'May 28, 2026',
    excerpt: 'Why free-play lets kids develop cognitive logic, problem-solving skills, and friend groups.',
    img: 'https://picsum.photos/seed/sandbox-play/600/400',
    color: 'border-t-plum',
    badgeColor: 'plum',
  },
  {
    id: 3,
    title: 'Tactile Learning: Fun Crafts at Home 🎨',
    category: 'DIY Art & Craft',
    date: 'May 12, 2026',
    excerpt: 'Sensory-rich DIY play projects using flour, clay, and leaves from the garden.',
    img: 'https://picsum.photos/seed/craft-diy/600/400',
    color: 'border-t-lilac',
    badgeColor: 'lilac',
  },
  {
    id: 4,
    title: 'Helping Your Child Adjust to Preschool Life 🎒',
    category: 'Separation Anxiety',
    date: 'May 01, 2026',
    excerpt: 'Practical advice and routine adjustments to make the drop-off stress-free for toddlers.',
    img: 'https://picsum.photos/seed/separation-anxiety/600/400',
    color: 'border-t-blush',
    badgeColor: 'blush',
  },
  {
    id: 5,
    title: 'Healthy Snack Ideas for Energetic Kids 🍎',
    category: 'Nutrition & Diet',
    date: 'April 20, 2026',
    excerpt: 'Quick, delicious, and nutrient-dense school lunchbox recipes that children will actually finish.',
    img: 'https://picsum.photos/seed/kids-nutrition/600/400',
    color: 'border-t-lavender',
    badgeColor: 'lavender',
  },
  {
    id: 6,
    title: 'Understanding Spatial Development in Toddlers 🪁',
    category: 'Cognitive Science',
    date: 'April 05, 2026',
    excerpt: 'How basic block building and outdoor playground games construct early geometric reasoning.',
    img: 'https://picsum.photos/seed/geometric-reasoning/600/400',
    color: 'border-t-gold',
    badgeColor: 'gold',
  }
];

const parentReviews = [
  {
    stars: 5,
    quote: "Low student-to-teacher ratios here mean my son gets individual attention. The activity logs we receive every evening keep us fully connected with his progress.",
    parent: "Dr. Mihir Mehta",
    childClass: "Sr. KG",
    bg: 'bg-yellow-50'
  },
  {
    stars: 5,
    quote: "Very pleased with the hygiene measures in classrooms. Daily sanitization and mandatory shoe rules make this campus extremely safe for toddlers.",
    parent: "Mrs. Nidhi Shah",
    childClass: "Playgroup",
    bg: 'bg-red-50'
  },
  {
    stars: 5,
    quote: "Montessori phonic worksheets are brilliant! My daughter started spelling three-letter words within three months of joining nursery.",
    parent: "Mr. Jayesh Patel",
    childClass: "Nursery",
    bg: 'bg-blue-50'
  },
  {
    stars: 5,
    quote: "Tinkytots focuses on outdoor nature play, gardening, and sandbox skills which are missing from normal computer-based pre-schools. Five stars!",
    parent: "Mrs. Pooja Patel",
    childClass: "Jr. KG",
    bg: 'bg-yellow-50'
  },
  {
    stars: 5,
    quote: "A wonderful school layout. Wavy borders, illustrations, and colorful characters are visual treats that make my kids excited for school mornings.",
    parent: "Mr. Hasmukh Patel",
    childClass: "Sr. KG",
    bg: 'bg-red-50'
  },
  {
    stars: 5,
    quote: "Great parent-teacher workshops! The advice on managing separation anxiety at home has changed our family routines for the better.",
    parent: "Mrs. Tina Vyas",
    childClass: "Nursery",
    bg: 'bg-blue-50'
  }
];

export default function MediaCorner() {
  useScrollReveal();
  const { theme } = useTheme();
  const isKids = theme === 'kids';
  const [activeTab, setActiveTab] = useState('gallery');
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [lightboxState, setLightboxState] = useState({ isOpen: false, index: 0 });

  // Filter images
  const filteredImages = galleryImages.filter((img) => {
    if (galleryFilter === 'All') return true;
    return img.category === galleryFilter;
  });

  // Lightbox handlers
  const openLightbox = (index) => {
    setLightboxState({ isOpen: true, index });
  };

  const handlePrev = () => {
    setLightboxState((prev) => ({
      ...prev,
      index: (prev.index - 1 + filteredImages.length) % filteredImages.length
    }));
  };

  const handleNext = () => {
    setLightboxState((prev) => ({
      ...prev,
      index: (prev.index + 1) % filteredImages.length
    }));
  };

  const handleClose = () => {
    setLightboxState({ isOpen: false, index: 0 });
  };

  // Re-observe revealed items on tab change
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => el.classList.add('active')); // default active on tabs to prevent white spaces
  }, [activeTab, galleryFilter]);

  return (
    <div className={`min-h-screen ${isKids ? 'bg-cream' : 'bg-slate-50'}`}>

      {/* 1. HERO CORNER */}
      <section className={`relative py-12 px-4 border-b transition-colors duration-300 overflow-hidden ${
        isKids ? 'bg-gradient-to-b from-white/30 to-cream border-b-2 border-navy' : 'bg-white border-b border-slate-200'
      }`}>
        {/* Breadcrumb */}
        <div className={`max-w-7xl mx-auto px-4 mb-4 text-sm font-bold ${isKids ? 'text-navy/60' : 'text-slate-400'}`}>
          <Link to="/" className="hover:text-violet transition-colors">Home</Link> &gt; <span className={isKids ? 'text-navy' : 'text-slate-700'}>Media Corner</span>
        </div>

        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          {isKids ? (
            <StickerBadge text="Our Media Corner 📸" color="gold" rotate="-2deg" className="mb-2" />
          ) : (
            <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-800 text-sm font-semibold rounded-full border border-slate-200 mb-2">
              Our Media Corner 📸
            </span>
          )}
          <h1 className={`text-4xl sm:text-5xl ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>
            Peek Into Our Magical Garden 🌻
          </h1>
          <p className={`max-w-xl mx-auto ${isKids ? 'text-navy/70 font-semibold' : 'text-slate-600 font-normal'}`}>
            See our classroom environments, view our educational blog, or read feedback from school families.
          </p>
        </div>
      </section>

      {/* 2. TAB CONTROL BUTTONS */}
      <section className="py-8 max-w-4xl mx-auto px-4">
        <div className={`flex justify-center p-2 bg-white space-x-2 ${
          isKids
            ? 'border-3 border-navy rounded-3xl shadow-[4px_4px_0px_0px_#3B0764]'
            : 'border border-slate-200 shadow-sm rounded-2xl'
        }`}>
          {[
            { id: 'gallery', label: '📸 Gallery' },
            { id: 'blog', label: '📝 Blog' },
            { id: 'parents', label: '💬 Parents\' View' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm md:text-base rounded-2xl transition-all duration-200 ${
                isKids
                  ? activeTab === tab.id
                    ? 'bg-plum text-white shadow-[2px_2px_0px_0px_#3B0764] border-2 border-navy font-accent'
                    : 'bg-transparent text-navy hover:bg-cream/50 font-accent'
                  : activeTab === tab.id
                    ? 'bg-slate-900 text-white font-sans font-semibold border border-slate-900'
                    : 'bg-transparent text-slate-650 hover:bg-slate-100 font-sans font-semibold'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. GALLERY TAB */}
      {activeTab === 'gallery' && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          {/* Gallery Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['All', 'Classroom', 'Events', 'Activities', 'Celebrations'].map((filter) => (
              <button
                key={filter}
                onClick={() => setGalleryFilter(filter)}
                className={
                  isKids
                    ? `px-4 py-1.5 rounded-full border-2 font-accent text-xs sm:text-sm shadow-[2px_2px_0px_0px_#3B0764] transition-all ${
                        galleryFilter === filter ? 'bg-gold border-navy text-navy' : 'bg-white border-navy/30 text-navy/70 hover:border-navy hover:text-navy'
                      }`
                    : `px-4 py-1.5 rounded-full border font-sans font-semibold text-xs sm:text-sm shadow-sm transition-all bg-white ${
                        galleryFilter === filter ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-950'
                      }`
                }
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Stagger fade in images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((img, idx) => (
              <GalleryItem
                key={img.id}
                img={img}
                onClick={() => openLightbox(idx)}
              />
            ))}
          </div>

          {/* Lightbox Trigger */}
          <Lightbox
            isOpen={lightboxState.isOpen}
            images={filteredImages}
            currentIndex={lightboxState.index}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </section>
      )}

      {/* 4. BLOG TAB */}
      {activeTab === 'blog' && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <div
                key={post.id}
                className={
                  isKids
                    ? `bg-white border-3 border-navy rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_#3B0764] flex flex-col justify-between hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_#3B0764] transition-all ${post.color} border-t-[8px]`
                    : `bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:translate-y-[-2px] hover:shadow-md transition-all ${post.color} border-t-[4px]`
                }
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div>
                  <div className={`w-full h-48 overflow-hidden relative ${isKids ? 'border-b-2 border-navy' : 'border-b border-slate-100'}`}>
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover" />

                    {/* Rotated Category Tag */}
                    <div className="absolute top-4 left-4">
                      {isKids ? (
                        <StickerBadge text={post.category} color={post.badgeColor} rotate="-2deg" className="py-1 px-3 text-xs" />
                      ) : (
                        <span className="inline-block px-3 py-1 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-semibold rounded-md border border-slate-700">
                          {post.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <span className={`text-xs block ${isKids ? 'text-navy/50 font-bold' : 'text-slate-400 font-medium'}`}>{post.date}</span>
                    <h2 className={`text-xl hover:text-violet transition-colors leading-tight ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>
                      <Link to={`/media/blog/${post.id}`}>{post.title}</Link>
                    </h2>
                    <p className={`text-sm line-clamp-3 leading-relaxed ${isKids ? 'text-navy/70 font-semibold' : 'text-slate-600 font-normal'}`}>
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={`/media/blog/${post.id}`}
                    className={
                      isKids
                        ? "w-full py-2 bg-transparent hover:bg-violet border-2 border-navy text-navy hover:text-white font-accent text-xs rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_#3B0764] hover:translate-y-[-1px] transition-all"
                        : "w-full py-2 bg-transparent hover:bg-slate-900 border border-slate-250 text-slate-650 hover:text-white font-sans font-semibold text-xs rounded-lg flex items-center justify-center shadow-sm hover:translate-y-[-0.5px] transition-all"
                    }
                  >
                    Read Article ➔
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. PARENTS' VIEW TAB */}
      {activeTab === 'parents' && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className={`text-3xl ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>
              Straight from the Hearts of Our School Families 💛
            </h2>
            <p className={`mt-2 ${isKids ? 'text-navy/70 font-medium' : 'text-slate-650 font-normal'}`}>
              Read verified reviews from parents about their child's happiness, safety, and development.
            </p>
          </div>

          {/* Infinite Scroll Top Marquee of stars */}
          <div className={`border-y py-3.5 mb-12 overflow-hidden leading-[0] ${isKids ? 'bg-white border-navy-2' : 'bg-white border-slate-205'}`}>
            <div className="marquee-container select-none">
              <div className={`marquee-content flex items-center space-x-8 text-sm ${isKids ? 'font-accent text-navy' : 'font-sans font-semibold text-slate-600'}`}>
                <span>⭐⭐⭐⭐⭐ Top Rated on Google Maps</span>
                <span>⭐⭐⭐⭐⭐ Best Montessori in Ahmedabad</span>
                <span>⭐⭐⭐⭐⭐ Certified Safe & Secure School</span>
                <span>⭐⭐⭐⭐⭐ 100% Parent Happiness Index</span>
                {/* Repeat */}
                <span>⭐⭐⭐⭐⭐ Top Rated on Google Maps</span>
                <span>⭐⭐⭐⭐⭐ Best Montessori in Ahmedabad</span>
                <span>⭐⭐⭐⭐⭐ Certified Safe & Secure School</span>
                <span>⭐⭐⭐⭐⭐ 100% Parent Happiness Index</span>
              </div>
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {parentReviews.map((rev, idx) => (
              <div
                key={idx}
                className={
                  isKids
                    ? `border-3 border-navy rounded-3xl p-6 shadow-[6px_6px_0px_0px_#3B0764] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_#3B0764] transition-all flex flex-col justify-between ${rev.bg} hover:ring-2 hover:ring-plum/20`
                    : `border border-slate-200 rounded-2xl p-6 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all flex flex-col justify-between bg-white hover:ring-1 hover:ring-slate-350`
                }
              >
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex space-x-1">
                    {Array.from({ length: rev.stars }).map((_, i) => (
                      <span key={i} className="text-plum text-lg">★</span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className={`text-sm md:text-base italic leading-relaxed ${isKids ? 'text-navy font-semibold' : 'text-slate-600 font-normal'}`}>
                    "{rev.quote}"
                  </p>
                </div>

                <div className={`mt-6 pt-4 border-t flex justify-between items-center ${isKids ? 'border-navy/10' : 'border-slate-100'}`}>
                  <span className={`font-bold text-sm ${isKids ? 'font-display text-navy' : 'font-sans text-slate-800'}`}>{rev.parent}</span>
                  <span className={
                    isKids
                      ? "px-2.5 py-0.5 bg-white border border-navy/30 rounded-full font-accent text-[10px] text-navy shadow-[1px_1px_0px_0px_rgba(59, 7, 100,0.1)]"
                      : "px-2.5 py-0.5 bg-slate-50 border border-slate-200 rounded-md font-sans text-[10px] text-slate-500"
                  }>
                    {rev.childClass}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
