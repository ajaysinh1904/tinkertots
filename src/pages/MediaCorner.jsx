import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import Lightbox from '../components/Lightbox';
import { StickerBadge, StarDoodle, HeartDoodle } from '../components/HandDrawnDoodles';

const galleryImages = [
  { id: 1, src: 'https://picsum.photos/seed/classroom-kids/600/450', title: 'Interactive Reading Circles 📚', category: 'Classroom' },
  { id: 2, src: 'https://picsum.photos/seed/kids-play/600/450', title: 'Annual Sports Day Relay 🏆', category: 'Events' },
  { id: 3, src: 'https://picsum.photos/seed/clay-art/600/450', title: 'Clay Modelling Workshop 🎨', category: 'Activities' },
  { id: 4, src: 'https://picsum.photos/seed/diwali-party/600/450', title: 'Diwali Lantern Crafting 🪔', category: 'Celebrations' },
  { id: 5, src: 'https://picsum.photos/seed/kids-painting/600/450', title: 'Messy Finger Painting 🎨', category: 'Classroom' },
  { id: 6, src: 'https://picsum.photos/seed/kids-garden/600/450', title: 'Planting Sunflower Seedlings 🌱', category: 'Activities' },
  { id: 7, src: 'https://picsum.photos/seed/xmas-party/600/450', title: 'Christmas Carols & Tree 🎄', category: 'Celebrations' },
  { id: 8, src: 'https://picsum.photos/seed/kids-puzzle/600/450', title: 'Shape Sorting Puzzles 🧩', category: 'Classroom' },
  { id: 9, src: 'https://picsum.photos/seed/yoga-kids/600/450', title: 'Kids Outdoor Morning Yoga 🧘', category: 'Activities' },
  { id: 10, src: 'https://picsum.photos/seed/parent-meet/600/450', title: 'Father & Child Craft Session 🤝', category: 'Events' },
  { id: 11, src: 'https://picsum.photos/seed/kids-music/600/450', title: 'Xylophone Jam Session 🎵', category: 'Activities' },
  { id: 12, src: 'https://picsum.photos/seed/holi-kids/600/450', title: 'Eco Holi Celebrations 🎨', category: 'Celebrations' },
];

export const blogPosts = [
  {
    id: 1,
    title: 'Nurturing Reading Habits in Early Childhood 📖',
    category: 'Parenting Guide',
    date: 'June 05, 2026',
    excerpt: 'How reading picture books together before bedtime boosts speech, literacy, and child focus.',
    img: 'https://picsum.photos/seed/reading-books/600/400',
    color: 'border-t-sunshine',
    badgeColor: 'sunshine',
  },
  {
    id: 2,
    title: 'The Value of Unstructured Play in Sandbox 🧩',
    category: 'Montessori Method',
    date: 'May 28, 2026',
    excerpt: 'Why free-play lets kids develop cognitive logic, problem-solving skills, and friend groups.',
    img: 'https://picsum.photos/seed/sandbox-play/600/400',
    color: 'border-t-coral',
    badgeColor: 'coral',
  },
  {
    id: 3,
    title: 'Tactile Learning: Fun Crafts at Home 🎨',
    category: 'DIY Art & Craft',
    date: 'May 12, 2026',
    excerpt: 'Sensory-rich DIY play projects using flour, clay, and leaves from the garden.',
    img: 'https://picsum.photos/seed/craft-diy/600/400',
    color: 'border-t-skyblue',
    badgeColor: 'skyblue',
  },
  {
    id: 4,
    title: 'Helping Your Child Adjust to Preschool Life 🎒',
    category: 'Separation Anxiety',
    date: 'May 01, 2026',
    excerpt: 'Practical advice and routine adjustments to make the drop-off stress-free for toddlers.',
    img: 'https://picsum.photos/seed/separation-anxiety/600/400',
    color: 'border-t-mint',
    badgeColor: 'mint',
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
    color: 'border-t-sunshine',
    badgeColor: 'sunshine',
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
    <div className="bg-cream min-h-screen">
      
      {/* 1. HERO CORNER */}
      <section className="relative py-12 px-4 bg-gradient-to-b from-white/30 to-cream border-b-2 border-navy overflow-hidden">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 mb-4 text-sm font-bold text-navy/60">
          <Link to="/" className="hover:text-coral transition-colors">Home</Link> &gt; <span className="text-navy">Media Corner</span>
        </div>

        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <StickerBadge text="Our Media Corner 📸" color="sunshine" rotate="-2deg" className="mb-2" />
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-navy">
            Peek Into Our Magical Garden 🌻
          </h1>
          <p className="text-navy/70 max-w-xl mx-auto font-semibold">
            See our classroom environments, view our educational blog, or read feedback from school families.
          </p>
        </div>
      </section>

      {/* 2. TAB CONTROL BUTTONS */}
      <section className="py-8 max-w-4xl mx-auto px-4">
        <div className="flex justify-center border-3 border-navy rounded-3xl p-2 bg-white shadow-[4px_4px_0px_0px_#1A1A2E] space-x-2">
          {[
            { id: 'gallery', label: '📸 Gallery' },
            { id: 'blog', label: '📝 Blog' },
            { id: 'parents', label: '💬 Parents\' View' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm md:text-base font-accent rounded-2xl transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-coral text-white shadow-[2px_2px_0px_0px_#1A1A2E] border-2 border-navy'
                  : 'bg-transparent text-navy hover:bg-cream/50'
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
                className={`px-4 py-1.5 rounded-full border-2 font-accent text-xs sm:text-sm shadow-[2px_2px_0px_0px_#1A1A2E] transition-all ${
                  galleryFilter === filter
                    ? 'bg-sunshine border-navy text-navy'
                    : 'bg-white border-navy/30 text-navy/70 hover:border-navy hover:text-navy'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Stagger fade in images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => openLightbox(idx)}
                className="group relative cursor-pointer border-3 border-navy rounded-3xl overflow-hidden bg-white shadow-[6px_6px_0px_0px_#1A1A2E] hover:-translate-y-1 transition-all h-[260px] animate-[fadeIn_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Photo */}
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-[#1A1A2E]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-display font-bold text-lg leading-tight">
                      {img.title}
                    </h3>
                    <span className="inline-block mt-2 px-3 py-1 bg-sunshine text-navy font-accent text-xs rounded-full">
                      🔍 {img.category}
                    </span>
                  </div>
                </div>

                {/* Small Zoom Icon indicator */}
                <div className="absolute top-4 right-4 bg-white/90 border border-navy rounded-full w-8 h-8 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow">
                  🔍
                </div>
              </div>
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
                className={`bg-white border-3 border-navy rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_#1A1A2E] flex flex-col justify-between hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_#1A1A2E] transition-all ${post.color} border-t-[8px]`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div>
                  <div className="w-full h-48 border-b-2 border-navy overflow-hidden relative">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                    
                    {/* Rotated Category Tag */}
                    <div className="absolute top-4 left-4">
                      <StickerBadge text={post.category} color={post.badgeColor} rotate="-2deg" className="py-1 px-3 text-xs" />
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <span className="text-xs text-navy/50 font-bold block">{post.date}</span>
                    <h2 className="font-display font-extrabold text-navy text-xl hover:text-coral transition-colors leading-tight">
                      <Link to={`/media/blog/${post.id}`}>{post.title}</Link>
                    </h2>
                    <p className="text-sm text-navy/70 line-clamp-3 font-semibold leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={`/media/blog/${post.id}`}
                    className="w-full py-2 bg-transparent hover:bg-coral border-2 border-navy text-navy hover:text-white font-accent text-xs rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A2E] hover:translate-y-[-1px] transition-all"
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
            <h2 className="text-3xl font-display font-extrabold text-navy">
              Straight from the Hearts of Our School Families 💛
            </h2>
            <p className="text-navy/70 mt-2 font-medium">
              Read verified reviews from parents about their child's happiness, safety, and development.
            </p>
          </div>

          {/* Infinite Scroll Top Marquee of stars */}
          <div className="bg-white border-y-2 border-navy py-3.5 mb-12 overflow-hidden leading-[0]">
            <div className="marquee-container select-none">
              <div className="marquee-content flex items-center space-x-8 font-accent text-sm text-navy">
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
                className={`border-3 border-navy rounded-3xl p-6 shadow-[6px_6px_0px_0px_#1A1A2E] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_#1A1A2E] transition-all flex flex-col justify-between ${rev.bg} hover:ring-2 hover:ring-coral/20`}
              >
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex space-x-1">
                    {Array.from({ length: rev.stars }).map((_, i) => (
                      <span key={i} className="text-coral text-lg">★</span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm md:text-base text-navy font-semibold italic leading-relaxed">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-navy/10 flex justify-between items-center">
                  <span className="font-display font-bold text-navy text-sm">{rev.parent}</span>
                  <span className="px-2.5 py-0.5 bg-white border border-navy/30 rounded-full font-accent text-[10px] text-navy shadow-[1px_1px_0px_0px_rgba(26,26,46,0.1)]">
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
