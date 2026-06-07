import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import useScrollReveal from '../hooks/useScrollReveal';
import Confetti from '../components/Confetti';
import TootsMascot from '../components/TootsMascot';
import { StarDoodle, SpiralDoodle, StickerBadge } from '../components/HandDrawnDoodles';
import { useTheme } from '../context/ThemeContext';
import { Icons } from '../components/Icon';
const EMAILJS_SERVICE_ID = 'service_6yarmxa';
const EMAILJS_TEMPLATE_ID = 'template_q8rt1ki';
const EMAILJS_PUBLIC_KEY = 'EK5d4-Qh-aPXFtWhE';

export default function Contact() {
  useScrollReveal();
  const { theme } = useTheme();
  const isKids = theme === 'kids';

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    childAge: '1.5-2yrs',
    program: 'Playgroup',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize EmailJS on mount
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  const validate = () => {
    const tempErrors = {};
    if (!form.fullName.trim()) tempErrors.fullName = 'Full Name is required';
    if (!form.email.trim()) {
      tempErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Email Address is invalid';
    }
    if (!form.phone.trim()) {
      tempErrors.phone = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(form.phone.replace(/[\s-()]/g, ''))) {
      tempErrors.phone = 'Phone Number must be a 10-digit number';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrorMessage('');

    // If template credentials are still placeholders, trigger a mock success response
    const isMock =
      EMAILJS_SERVICE_ID === 'YOUR_EMAILJS_SERVICE_ID' ||
      EMAILJS_TEMPLATE_ID === 'YOUR_EMAILJS_TEMPLATE_ID' ||
      EMAILJS_PUBLIC_KEY === 'YOUR_EMAILJS_PUBLIC_KEY';

    if (isMock) {
      setTimeout(() => {
        setLoading(false);
        setShowConfetti(true);
        setShowSuccessModal(true);
        setForm({
          fullName: '',
          email: '',
          phone: '',
          childAge: '1.5-2yrs',
          program: 'Playgroup',
          message: ''
        });
      }, 1500);
    } else {
      // Send actual EmailJS request
      const templateParams = {
        from_name: form.fullName,
        reply_to: form.email,
        phone_number: form.phone,
        child_age: form.childAge,
        program_interest: form.program,
        message: form.message
      };

      emailjs
        .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(() => {
          setLoading(false);
          setShowConfetti(true);
          setShowSuccessModal(true);
          setForm({
            fullName: '',
            email: '',
            phone: '',
            childAge: '1.5-2yrs',
            program: 'Playgroup',
            message: ''
          });
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
          setErrorMessage('Oops! Something went wrong. Please call us directly at +91 76240 12997.');
        });
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowConfetti(false);
  };

  return (
    <div className={`min-h-screen pb-20 relative ${isKids ? 'bg-cream' : 'bg-slate-50'}`}>
      {showConfetti && <Confetti />}

      {/* 1. HERO */}
      <section className={`relative py-12 px-4 border-b transition-colors duration-300 overflow-hidden ${isKids ? 'bg-gradient-to-b from-white/30 to-cream border-b-2 border-navy' : 'bg-white border-b border-slate-200'
        }`}>
        {/* Scattered Doodles */}
        {isKids && (
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <StarDoodle color="plum" size={32} className="absolute top-[20%] left-[8%] animate-spin-slow" />
            <SpiralDoodle color="gold" size={36} className="absolute bottom-[20%] right-[10%] animate-float-slow" />
          </div>
        )}

        <div className={`max-w-7xl mx-auto px-4 mb-4 text-sm font-bold ${isKids ? 'text-navy/60' : 'text-slate-400'}`}>
          <Link to="/" className="hover:text-violet transition-colors">Home</Link> &gt; <span className={isKids ? 'text-navy' : 'text-slate-700'}>Contact Us</span>
        </div>

        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          {isKids ? (
            <StickerBadge text="Get In Touch 👋" color="gold" rotate="-2deg" className="mb-2" />
          ) : (
            <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-800 text-sm font-semibold rounded-full border border-slate-200 mb-2">
              Get In Touch 👋
            </span>
          )}
          <h1 className={`text-4xl sm:text-5xl ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>
            Let's Talk & Play! 👋
          </h1>
          <p className={`max-w-xl mx-auto ${isKids ? 'text-navy/70 font-semibold' : 'text-slate-600 font-normal'}`}>
            Have questions about admissions, school curriculum, or daycare timings? Write to us, call us, or drop by!
          </p>
        </div>
      </section>

      {/* 2. TWO-COLUMN SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* LEFT COLUMN - INFO PANEL */}
        <div className={`lg:col-span-5 p-8 md:p-10 text-white relative overflow-hidden flex flex-col justify-between reveal active min-h-[450px] ${isKids
          ? 'bg-plum border-3 border-navy rounded-[40px] shadow-[8px_8px_0px_0px_#3B0764]'
          : 'bg-slate-900 border border-slate-800 rounded-2xl shadow-md'
          }`}>
          {/* Animated Background Blob */}
          {isKids && <div className="absolute inset-[-40px] bg-white/10 rounded-[60%_40%_30%_70%/_60%_30%_70%_40%] animate-blob-morph -z-10" />}

          <div className="space-y-8">
            <div>
              <h2 className={`text-3xl font-extrabold text-white mb-2 ${isKids ? 'font-display' : 'font-sans'}`}>Tinkytots Preschool</h2>
              <p className="text-white/80 font-medium">Jagatpur Gota Campus</p>
            </div>

            {/* Stagger Slide Items */}
            <div className="space-y-6 text-sm font-semibold">
              <div className="flex items-start space-x-3">
                <span className="text-xl">📍</span>
                <div>
                  <p className="font-bold text-white">Our Address</p>
                  <p className="text-white/90 font-medium mt-0.5">Jagatpur Road, Gota, Ahmedabad, Gujarat, 382470</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-xl">📞</span>
                <div>
                  <p className="font-bold text-white">Call Us Directly</p>
                  <p className="mt-0.5">
                    <a href="tel:+917624012997" className="underline hover:text-amber transition-colors font-medium">
                      +91 76240 12997
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-xl">✉️</span>
                <div>
                  <p className="font-bold text-white">Email Us</p>
                  <p className="mt-0.5">
                    <a href="mailto:hello@tinkytots.com" className="underline hover:text-amber transition-colors font-medium">
                      hello@tinkytots.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-xl">🕗</span>
                <div>
                  <p className="font-bold text-white">Office Hours</p>
                  <p className="text-white/90 font-medium mt-0.5">Mon–Sat | 8:30 AM – 2:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social icons row */}
          <div className="pt-8 border-t border-white/20">
            <p className="text-xs font-bold text-white/80 mb-3">FOLLOW OUR ACTIVITIES</p>
            <Icons />
          </div>
        </div>

        {/* RIGHT COLUMN - CONTACT FORM */}
        <div className={`lg:col-span-7 p-6 md:p-10 reveal active ${isKids
          ? 'bg-white border-3 border-navy rounded-[40px] shadow-[8px_8px_0px_0px_#3B0764]'
          : 'bg-white border border-slate-200 rounded-2xl shadow-sm'
          }`}>

          {/* Notification for clients testing POC */}
          <div className={`p-3 rounded-2xl mb-6 text-xs font-semibold ${isKids ? 'bg-yellow-50 border border-navy/20 text-navy' : 'bg-slate-50 border border-slate-100 text-slate-750'
            }`}>
            📢 **POC Note**: Submitting this form uses a simulator by default so you can view animations out-of-the-box.
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Full Name */}
            <div className="relative">
              <label htmlFor="fullName" className={`block text-sm font-bold mb-1.5 ${isKids ? 'text-navy' : 'text-slate-700'}`}>
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:outline-none transition-colors ${isKids
                  ? `rounded-2xl border-2 bg-cream/30 text-navy font-semibold ${errors.fullName ? 'border-plum ring-1 ring-plum/20' : 'border-navy/30 focus:border-plum'}`
                  : `rounded-lg bg-white text-slate-800 border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500/20 ${errors.fullName ? 'border-red-500 ring-1 ring-red-500/20' : ''}`
                  }`}
                placeholder="Parent's Name"
              />
              {errors.fullName && (
                <p className={`text-xs mt-1.5 ${isKids ? 'text-plum font-bold animate-pulse' : 'text-red-500 font-medium'}`}>
                  ⚠️ {errors.fullName}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className={`block text-sm font-bold mb-1.5 ${isKids ? 'text-navy' : 'text-slate-700'}`}>
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border focus:outline-none transition-colors ${isKids
                    ? `rounded-2xl border-2 bg-cream/30 text-navy font-semibold ${errors.email ? 'border-plum ring-1 ring-plum/20' : 'border-navy/30 focus:border-plum'}`
                    : `rounded-lg bg-white text-slate-800 border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500/20 ${errors.email ? 'border-red-500 ring-1 ring-red-500/20' : ''}`
                    }`}
                  placeholder="parent@example.com"
                />
                {errors.email && (
                  <p className={`text-xs mt-1.5 ${isKids ? 'text-plum font-bold animate-pulse' : 'text-red-500 font-medium'}`}>
                    ⚠️ {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className={`block text-sm font-bold mb-1.5 ${isKids ? 'text-navy' : 'text-slate-700'}`}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border focus:outline-none transition-colors ${isKids
                    ? `rounded-2xl border-2 bg-cream/30 text-navy font-semibold ${errors.phone ? 'border-plum ring-1 ring-plum/20' : 'border-navy/30 focus:border-plum'}`
                    : `rounded-lg bg-white text-slate-800 border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500/20 ${errors.phone ? 'border-red-500 ring-1 ring-red-500/20' : ''}`
                    }`}
                  placeholder="10-digit number"
                />
                {errors.phone && (
                  <p className={`text-xs mt-1.5 ${isKids ? 'text-plum font-bold animate-pulse' : 'text-red-500 font-medium'}`}>
                    ⚠️ {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Child Age */}
              <div>
                <label htmlFor="childAge" className={`block text-sm font-bold mb-1.5 ${isKids ? 'text-navy' : 'text-slate-700'}`}>
                  Child's Age
                </label>
                <select
                  id="childAge"
                  name="childAge"
                  value={form.childAge}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border focus:outline-none transition-colors ${isKids
                    ? 'border-2 border-navy/30 focus:border-plum bg-cream/30 rounded-2xl font-semibold text-navy'
                    : 'border border-slate-300 focus:border-slate-500 bg-white rounded-lg text-slate-800 font-normal'
                    }`}
                >
                  <option value="1.5-2yrs">1.5 – 2 yrs</option>
                  <option value="2-3yrs">2 – 3 yrs</option>
                  <option value="3-4yrs">3 – 4 yrs</option>
                  <option value="4-5yrs">4 – 5 yrs</option>
                  <option value="5-6yrs">5 – 6 yrs</option>
                </select>
              </div>

              {/* Program Interested In */}
              <div>
                <label htmlFor="program" className={`block text-sm font-bold mb-1.5 ${isKids ? 'text-navy' : 'text-slate-700'}`}>
                  Program Interested In
                </label>
                <select
                  id="program"
                  name="program"
                  value={form.program}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border focus:outline-none transition-colors ${isKids
                    ? 'border-2 border-navy/30 focus:border-plum bg-cream/30 rounded-2xl font-semibold text-navy'
                    : 'border border-slate-300 focus:border-slate-500 bg-white rounded-lg text-slate-800 font-normal'
                    }`}
                >
                  <option value="Playgroup">Playgroup (1.5 - 2.5y)</option>
                  <option value="Nursery">Nursery (2.5 - 3.5y)</option>
                  <option value="Junior-KG">Junior KG (3.5 - 4.5y)</option>
                  <option value="Senior-KG">Senior KG (4.5 - 5.5y)</option>
                  <option value="Daycare">Daycare Facility 🌙</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className={`block text-sm font-bold mb-1.5 ${isKids ? 'text-navy' : 'text-slate-700'}`}>
                Message / Custom Enquiry
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleInputChange}
                rows="4"
                className={`w-full px-4 py-3 border focus:outline-none transition-colors ${isKids
                  ? 'border-2 border-navy/30 focus:border-plum bg-cream/30 rounded-2xl text-navy font-semibold'
                  : 'border border-slate-300 focus:border-slate-500 bg-white rounded-lg text-slate-800 font-normal'
                  }`}
                placeholder="Ask us anything!"
              ></textarea>
            </div>

            {/* Error Message */}
            {errorMessage && <p className={`font-bold text-sm text-center ${isKids ? 'text-plum' : 'text-red-500'}`}>⚠️ {errorMessage}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 transition-all flex items-center justify-center space-x-2 ${isKids
                ? 'bg-plum hover:bg-violet/95 text-white font-accent text-lg rounded-2xl border-3 border-navy shadow-[6px_6px_0px_0px_#3B0764] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#3B0764] active:scale-98'
                : 'bg-slate-900 hover:bg-slate-800 text-white font-sans font-semibold text-base rounded-lg shadow-sm hover:translate-y-[-1px] active:scale-98'
                }`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  {/* CSS Spinner */}
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending Enquiry...</span>
                </div>
              ) : (
                <span>Send Message 🚀</span>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* 3. MAP SECTION */}
      <section className={`max-w-7xl mx-auto px-4 py-16 border-t reveal ${isKids ? 'border-navy/10' : 'border-slate-200'}`}>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className={`text-3xl ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>
            Come Visit Us 📍
          </h2>
          <p className={`mt-2 ${isKids ? 'text-navy/70 font-medium' : 'text-slate-650 font-normal'}`}>
            Centrally located on Jagatpur Road, Gota. We have convenient visitor parking and high-security access.
          </p>
        </div>

        {/* Map Frame */}
        <div className={`relative overflow-hidden bg-white h-[500px] w-full ${isKids
          ? 'border-4 border-plum rounded-3xl shadow-[8px_8px_0px_0px_#3B0764]'
          : 'border border-slate-200 rounded-2xl shadow-sm'
          }`}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.3643729910777!2d72.5358043!3d23.0956463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8334460773d5%3A0x63390cc98bb9eb98!2sJagatpur%20Rd%2C%20Gota%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Tinkytots Preschool Google Map Location"
          ></iframe>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <a
            href="https://maps.google.com/?q=Jagatpur+Road,+Gota,+Ahmedabad,+Gujarat+382470"
            target="_blank"
            rel="noopener noreferrer"
            className={
              isKids
                ? "px-6 py-3 bg-gold hover:bg-amber/90 text-navy font-accent text-sm sm:text-base border-2 border-navy rounded-xl shadow-[3px_3px_0px_0px_#3B0764] hover:translate-y-[-1px] transition-all"
                : "px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-sans font-semibold text-sm sm:text-base rounded-lg shadow-sm hover:translate-y-[-1px] transition-all"
            }
          >
            🗺️ Get Directions
          </a>
          <a
            href="tel:+917624012997"
            className={
              isKids
                ? "px-6 py-3 bg-white hover:bg-cream text-navy font-accent text-sm sm:text-base border-2 border-navy rounded-xl shadow-[3px_3px_0px_0px_#3B0764] hover:translate-y-[-1px] transition-all"
                : "px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-sans font-semibold text-sm sm:text-base rounded-lg shadow-sm hover:translate-y-[-1px] transition-all"
            }
          >
            📞 Call Now
          </a>
        </div>
      </section>

      {/* 4. SUCCESS DIALOG MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-[#3B0764]/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className={`bg-white text-center relative w-full ${isKids
            ? 'border-3 border-navy rounded-[36px] max-w-sm p-6 shadow-[10px_10px_0px_0px_#3B0764] animate-[bounce-light_0.4s_ease-out_forwards]'
            : 'border border-slate-200 rounded-2xl max-w-sm p-8 shadow-xl'
            }`}>

            {/* Cute Owl Mascot Top Header */}
            {isKids && (
              <div className="flex justify-center -mt-16 mb-4">
                <div className="bg-white border-3 border-navy rounded-full p-3 shadow-md">
                  <TootsMascot size={110} />
                </div>
              </div>
            )}

            <h3 className={`text-2xl leading-tight ${isKids ? 'font-display font-extrabold text-navy' : 'font-sans font-bold text-slate-800'}`}>
              🎉 Message Sent!
            </h3>

            <p className={`text-sm mt-3 leading-relaxed ${isKids ? 'font-semibold text-navy/70' : 'text-slate-650'}`}>
              We'll get back to you within 24 hours. Let's make learning memorable together!
            </p>

            <button
              onClick={handleCloseModal}
              className={`w-full py-2.5 mt-6 transition-all text-sm ${isKids
                ? 'bg-plum hover:bg-violet/95 text-white font-accent rounded-xl border-2 border-navy shadow-[3px_3px_0px_0px_#3B0764] active:scale-95'
                : 'bg-slate-900 hover:bg-slate-800 text-white font-sans font-semibold rounded-lg shadow-sm active:scale-95'
                }`}
            >
              Awesome, Thanks! 💛
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
