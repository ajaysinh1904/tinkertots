import React, { useLayoutEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogPosts } from './MediaCorner';
import { StickerBadge } from '../components/HandDrawnDoodles';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Scroll to top on mount
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const post = blogPosts.find((p) => p.id === parseInt(id || '1'));

  if (!post) {
    return (
      <div className="bg-cream min-h-screen flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-3xl font-display font-extrabold text-navy">Article Not Found</h1>
        <p className="text-navy/70 mt-2">The blog post you are looking for does not exist.</p>
        <Link to="/media" className="mt-6 px-6 py-2.5 bg-plum text-white font-accent rounded-xl border-2 border-navy">
          Back to Media Corner ➔
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen pb-20 font-body">
      {/* 1. BREADCRUMBS & ARTICLE HEADER */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <div className="text-sm font-bold text-navy/60 mb-6 flex flex-wrap gap-1">
          <Link to="/" className="hover:text-violet transition-colors">Home</Link> &gt; 
          <Link to="/media" className="hover:text-violet transition-colors">Media Corner</Link> &gt; 
          <span className="text-navy truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
        </div>

        <div className="space-y-4">
          <StickerBadge text={post.category} color={post.badgeColor} rotate="-1deg" className="px-3.5 py-1 text-xs" />
          <h1 className="text-3xl sm:text-4.5xl font-display font-extrabold text-navy leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center space-x-2 text-xs font-bold text-navy/50">
            <span>Published on {post.date}</span>
            <span>•</span>
            <span>Written by Tinkytots Faculty 🦉</span>
          </div>
        </div>
      </section>

      {/* 2. FULL-WIDTH HERO IMAGE */}
      <section className="max-w-5xl mx-auto px-4 mb-12">
        <div className="w-full h-[300px] sm:h-[450px] border-3 border-navy rounded-[32px] overflow-hidden shadow-[8px_8px_0px_0px_#3B0764] bg-white">
          <img
            src={post.img}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 3. DUMMY ARTICLE CONTENT */}
      <article className="max-w-3xl mx-auto px-4 text-navy font-medium text-base sm:text-lg leading-relaxed space-y-6">
        <p>
          At Tinkytots, early learning is structured to follow the child's natural learning curiosity. We see children not as empty vessels to fill with names and arithmetic sheets, but as active scientists seeking to touch, build, test, and understand. This article covers why sensory and visual integration helps primary schoolers build cognitive pathways.
        </p>

        <h3 className="text-2xl font-display font-bold text-navy pt-4">
          1. Sensory Mastery: Learning by Doing
        </h3>
        <p>
          Using real Montessori phonic cylinders, sand boards, and geometric shapes, children engage their sense of touch alongside hearing. Research in pediatric growth highlights that tactile feedback directly builds long-term spatial and linguistic memory. Sandbox play, clay modeling, and sorting seeds aren't just games—they form the structural basis of logic and division!
        </p>

        <blockquote className="bg-yellow-50/70 border-l-4 border-l-gold p-5 rounded-2xl border-2 border-navy/25 my-8 text-sm sm:text-base font-semibold italic">
          "Education is a natural process carried out by the child and is not acquired by listening to words but by experiences in the environment." — Dr. Maria Montessori
        </blockquote>

        <h3 className="text-2xl font-display font-bold text-navy pt-4">
          2. The Importance of Routine & Sandbox Exploration
        </h3>
        <p>
          Establishing consistent morning circles, sanitizing hands before lunches, and gathering around story circles sets a secure rhythm. In Gota, Ahmedabad, we balance academic literacy blocks with unstructured garden playtime. This ensures that children develop social collaboration skills, group empathy, and physical coordination.
        </p>

        <p>
          We recommend parents continue these simple sensory practices at home. Reading picture books aloud before bed, asking open-ended questions about their drawings, and letting them sort colored blocks are excellent ways to partner with our school goals.
        </p>

        {/* Back Button */}
        <div className="pt-8 flex justify-center md:justify-start">
          <button
            onClick={() => navigate('/media')}
            className="px-6 py-3 bg-white hover:bg-cream text-navy font-accent text-sm rounded-xl border-2 border-navy shadow-[4px_4px_0px_0px_#3B0764] hover:translate-y-[-1px] transition-all"
          >
            ← Back to Media Corner
          </button>
        </div>
      </article>

    </div>
  );
}
