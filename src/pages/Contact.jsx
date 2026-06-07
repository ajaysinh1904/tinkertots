import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import useScrollReveal from '../hooks/useScrollReveal';
import Confetti from '../components/Confetti';
import TootsMascot from '../components/TootsMascot';
import { StarDoodle, SpiralDoodle, StickerBadge } from '../components/HandDrawnDoodles';

const EMAILJS_SERVICE_ID = 'service_6yarmxa';
const EMAILJS_TEMPLATE_ID = 'template_q8rt1ki';
const EMAILJS_PUBLIC_KEY = 'EK5d4-Qh-aPXFtWhE';

export default function Contact() {
  useScrollReveal();

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
    <div className="bg-cream min-h-screen pb-20 font-body relative">
      {showConfetti && <Confetti />}

      {/* 1. HERO */}
      <section className="relative py-12 px-4 bg-gradient-to-b from-white/30 to-cream border-b-2 border-navy overflow-hidden">
        {/* Scattered Doodles */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <StarDoodle color="coral" size={32} className="absolute top-[20%] left-[8%] animate-spin-slow" />
          <SpiralDoodle color="sunshine" size={36} className="absolute bottom-[20%] right-[10%] animate-float-slow" />
        </div>

        <div className="max-w-7xl mx-auto px-4 mb-4 text-sm font-bold text-navy/60">
          <Link to="/" className="hover:text-coral transition-colors">Home</Link> &gt; <span className="text-navy">Contact Us</span>
        </div>

        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <StickerBadge text="Get In Touch 👋" color="sunshine" rotate="-2deg" className="mb-2" />
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-navy">
            Let's Talk & Play! 👋
          </h1>
          <p className="text-navy/70 max-w-xl mx-auto font-semibold">
            Have questions about admissions, school curriculum, or daycare timings? Write to us, call us, or drop by!
          </p>
        </div>
      </section>

      {/* 2. TWO-COLUMN SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* LEFT COLUMN - INFO PANEL */}
        <div className="lg:col-span-5 bg-coral border-3 border-navy rounded-[40px] p-8 md:p-10 text-white relative overflow-hidden shadow-[8px_8px_0px_0px_#1A1A2E] flex flex-col justify-between reveal active min-h-[450px]">
          {/* Animated Background Blob */}
          <div className="absolute inset-[-40px] bg-white/10 rounded-[60%_40%_30%_70%/_60%_30%_70%_40%] animate-blob-morph -z-10" />

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-display font-extrabold text-white mb-2">Tinkytots Preschool</h2>
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
                    <a href="tel:+917624012997" className="underline hover:text-sunshine transition-colors font-medium">
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
                    <a href="mailto:hello@tinkytots.com" className="underline hover:text-sunshine transition-colors font-medium">
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
            <div className="flex space-x-3">
              {['Facebook', 'Instagram', 'YouTube', 'LinkedIn'].map((soc) => (
                <a
                  key={soc}
                  href={`https://${soc.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white hover:bg-sunshine text-navy border-2 border-navy rounded-full flex items-center justify-center font-accent text-xs shadow-[3px_3px_0px_0px_#1A1A2E] hover:translate-y-[-2px] transition-all"
                >
                  {soc.substring(0, 2)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - CONTACT FORM */}
        <div className="lg:col-span-7 bg-white border-3 border-navy rounded-[40px] p-6 md:p-10 shadow-[8px_8px_0px_0px_#1A1A2E] reveal active">

          {/* Notification for clients testing POC */}
          <div className="bg-yellow-50 border border-navy/20 p-3 rounded-2xl mb-6 text-xs text-navy font-semibold">
            📢 **POC Note**: Submitting this form uses a simulator by default so you can view animations out-of-the-box.
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Full Name */}
            <div className="relative">
              <label htmlFor="fullName" className="block text-sm font-bold text-navy mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-2xl focus:outline-none text-navy bg-cream/30 ${errors.fullName ? 'border-coral ring-1 ring-coral/20' : 'border-navy/30 focus:border-coral'
                  }`}
                placeholder="Parent's Name"
              />
              {errors.fullName && <p className="text-coral text-xs font-bold mt-1.5 animate-pulse">⚠️ {errors.fullName}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-navy mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-2xl focus:outline-none text-navy bg-cream/30 ${errors.email ? 'border-coral ring-1 ring-coral/20' : 'border-navy/30 focus:border-coral'
                    }`}
                  placeholder="parent@example.com"
                />
                {errors.email && <p className="text-coral text-xs font-bold mt-1.5 animate-pulse">⚠️ {errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-navy mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-2xl focus:outline-none text-navy bg-cream/30 ${errors.phone ? 'border-coral ring-1 ring-coral/20' : 'border-navy/30 focus:border-coral'
                    }`}
                  placeholder="10-digit number"
                />
                {errors.phone && <p className="text-coral text-xs font-bold mt-1.5 animate-pulse">⚠️ {errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Child Age */}
              <div>
                <label htmlFor="childAge" className="block text-sm font-bold text-navy mb-1.5">
                  Child's Age
                </label>
                <select
                  id="childAge"
                  name="childAge"
                  value={form.childAge}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-navy/30 focus:border-coral bg-cream/30 rounded-2xl focus:outline-none font-semibold text-navy"
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
                <label htmlFor="program" className="block text-sm font-bold text-navy mb-1.5">
                  Program Interested In
                </label>
                <select
                  id="program"
                  name="program"
                  value={form.program}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-navy/30 focus:border-coral bg-cream/30 rounded-2xl focus:outline-none font-semibold text-navy"
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
              <label htmlFor="message" className="block text-sm font-bold text-navy mb-1.5">
                Message / Custom Enquiry
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 border-2 border-navy/30 focus:border-coral bg-cream/30 rounded-2xl focus:outline-none text-navy"
                placeholder="Ask us anything!"
              ></textarea>
            </div>

            {/* Error Message */}
            {errorMessage && <p className="text-coral font-bold text-sm text-center">⚠️ {errorMessage}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-coral hover:bg-coral/95 text-white font-accent text-lg rounded-2xl border-3 border-navy shadow-[6px_6px_0px_0px_#1A1A2E] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#1A1A2E] active:scale-98 transition-all flex items-center justify-center space-x-2"
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
      <section className="max-w-7xl mx-auto px-4 py-16 border-t border-navy/10 reveal">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-display font-extrabold text-navy">
            Come Visit Us 📍
          </h2>
          <p className="text-navy/70 mt-2 font-medium">
            Centrally located on Jagatpur Road, Gota. We have convenient visitor parking and high-security access.
          </p>
        </div>

        {/* Map Frame */}
        <div className="relative border-4 border-coral rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_#1A1A2E] bg-white h-[500px] w-full">
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
            className="px-6 py-3 bg-sunshine hover:bg-sunshine/90 text-navy font-accent text-sm sm:text-base border-2 border-navy rounded-xl shadow-[3px_3px_0px_0px_#1A1A2E] hover:translate-y-[-1px] transition-all"
          >
            🗺️ Get Directions
          </a>
          <a
            href="tel:+917624012997"
            className="px-6 py-3 bg-white hover:bg-cream text-navy font-accent text-sm sm:text-base border-2 border-navy rounded-xl shadow-[3px_3px_0px_0px_#1A1A2E] hover:translate-y-[-1px] transition-all"
          >
            📞 Call Now
          </a>
        </div>
      </section>

      {/* 4. SUCCESS DIALOG MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-[#1A1A2E]/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white border-3 border-navy rounded-[36px] max-w-sm w-full p-6 text-center shadow-[10px_10px_0px_0px_#1A1A2E] relative animate-[bounce-light_0.4s_ease-out_forwards]">

            {/* Cute Owl Mascot Top Header */}
            <div className="flex justify-center -mt-16 mb-4">
              <div className="bg-white border-3 border-navy rounded-full p-3 shadow-md">
                <TootsMascot size={110} />
              </div>
            </div>

            <h3 className="text-2xl font-display font-extrabold text-navy leading-tight">
              🎉 Message Sent!
            </h3>

            <p className="text-sm font-semibold text-navy/70 mt-3 leading-relaxed">
              We'll get back to you within 24 hours. Let's make learning memorable together!
            </p>

            <button
              onClick={handleCloseModal}
              className="mt-6 w-full py-2.5 bg-coral hover:bg-coral/95 text-white font-accent rounded-xl border-2 border-navy shadow-[3px_3px_0px_0px_#1A1A2E] active:scale-95 transition-all text-sm"
            >
              Awesome, Thanks! 💛
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
