import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { CheckCircle, Mail, User, Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Rocket, Diamond, Users, Palette } from 'lucide-react'

/* =======================
   Motion Variants
======================= */
const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7 } },
};

/* =======================
   Particle Background
======================= */
const PARTICLES = [
  { top: '12%', left: '18%', d: 7, delay: 0 },
  { top: '28%', left: '72%', d: 8, delay: 1.2 },
  { top: '46%', left: '10%', d: 6, delay: 0.6 },
  { top: '58%', left: '62%', d: 7.5, delay: 0.3 },
  { top: '74%', left: '30%', d: 9, delay: 1.0 },
  { top: '20%', left: '50%', d: 7.8, delay: 0.4 },
  { top: '84%', left: '80%', d: 8.5, delay: 1.4 },
];

const ParticlesBG = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {PARTICLES.map((p, i) => (
      <motion.span
        key={i}
        className="absolute w-2 h-2 rounded-full bg-primary/40"
        style={{ top: p.top, left: p.left }}
        initial={{ y: 0, opacity: 0.5 }}
        animate={{ y: [-14, 0, -14], opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: p.d,
          delay: p.delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

/* =======================
   Main Page Component
======================= */
export default function JoinCosmicTeam() {
const [formData, setFormData] = useState({
  name: '',
  email: '',
  contact: '',
  role: '',
  whyJoin: '',
  experience: '',
});

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    await fetch("https://script.google.com/macros/s/AKfycbwG1TJs8U4JlKbYuNST_fcGsbthNMdv0XytejazMVx3P7DUHYE8pq1BDIDAW1d1XQXNoA/exec", {
      method: "POST",
      mode: "no-cors", // required for browser -> Apps Script
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setIsSubmitted(true);
    toast({
      title: "Application submitted!",
      description: "Your details have been sent to Cosmic Attire.",
    });
  } catch (err) {
    console.error(err);
    toast({ title: "Error", description: "Something went wrong, try again." });
  } finally {
    setIsLoading(false);
  }
};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  /* =======================
     Success Screen
  ======================= */
if (isSubmitted) {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <ParticlesBG />
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeIn}
        className="text-center max-w-2xl mx-auto px-4"
      >
        {/* Red glowing circle with check icon */}
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 alpha-pulse">
          <CheckCircle className="w-12 h-12 text-red-500" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 alpha-gradient-text">
          Thanks for Applying!
        </h1>

        {/* Subtext */}
        <p className="text-lg text-muted-foreground">
          We’ve received your application to <span className="font-semibold">Cosmic Attire</span>.  
          Our team will review it and get back to you soon.
        </p>
      </motion.div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-black text-foreground">
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <ParticlesBG />

        <div className="absolute inset-0">
          <img
            src="/public/team-working.png"
            alt="Cosmic Attire Team"
            className="w-full h-full object-cover scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 backdrop-blur-sm"></div>
        </div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10 text-center px-4"
        >
          <motion.h1
            variants={fadeUp}
            className="text-6xl md:text-8xl font-extrabold tracking-tight"
            style={{
              background: 'linear-gradient(90deg, #7f5af0, #2cb67d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            JOIN THE COSMIC TEAM
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
          >
            We’re building the future of wearable tech and fashion. Join
            innovators, creators, and dreamers shaping the next big thing with
            Cosmic Attire.
          </motion.p>

          <motion.button
            variants={fadeUp}
            onClick={() =>
              document
                .getElementById('join-form')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="alpha-button mt-10 text-lg px-10 py-4"
          >
            Apply to Join
          </motion.button>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-20 text-center">
  <motion.h2
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    variants={fadeUp}
    className="text-3xl md:text-4xl font-bold alpha-gradient-text"
  >
    Why Join the Cosmic Attire Team?
  </motion.h2>

  <motion.div
    className="mt-12 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
    variants={staggerParent}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
  >
    {[
      {
        title: 'Shape the Future',
        desc: 'Be part of a movement redefining fashion with technology.',
        icon: Rocket,
      },
      {
        title: 'Early Access',
        desc: 'Gain early access to prototype rings and unreleased designs.',
        icon: Diamond,
      },
      {
        title: 'Direct Collaboration',
        desc: 'Work side by side with founders, creators, and innovators.',
        icon: Users,
      },
      {
        title: 'Influence Design',
        desc: 'Help shape the limited edition Cosmic Attire pieces.',
        icon: Palette,
      },
    ].map((item, i) => (
      <motion.div
        key={i}
        variants={fadeUp}
        className="group relative flex flex-col items-center rounded-2xl bg-neutral-900/80 border border-white/10 p-10 shadow-lg transition-all hover:shadow-red-500/30 hover:-translate-y-2"
      >
        {/* Glowing Red Background Animation */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 bg-red-500 blur-2xl transition duration-500"></div>

        {/* Icon */}
        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-neutral-800 mb-6 text-red-500">
          <item.icon className="w-7 h-7" />
        </div>

        {/* Title */}
        <h3
          className="text-xl font-bold mb-3 tracking-wide"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed">
          {item.desc}
        </p>
      </motion.div>
    ))}
  </motion.div>
</section>


      {/* APPLICATION FORM */}
      <section id="join-form" className="container mx-auto px-4 pb-20">
        <motion.form
          onSubmit={handleSubmit}
          className="alpha-card max-w-2xl mx-auto space-y-6 p-8 rounded-3xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Apply to Join Cosmic Attire
          </h2>

          {/* NAME */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="alpha-input w-full pl-10"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="alpha-input w-full pl-10"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* CONTACT NUMBER */}
<div className="space-y-2">
  <label htmlFor="contact" className="block text-sm font-medium">
    Contact Number *
  </label>
  <div className="relative">
    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
    <input
      id="contact"
      type="tel"
      name="contact"
      required
      value={formData.contact}
      onChange={handleChange}
      className="alpha-input w-full pl-10"
      placeholder="+1 234 567 890"
    />
  </div>
</div>

{/* WHY JOIN */}
<div className="space-y-2">
  <label htmlFor="whyJoin" className="block text-sm font-medium">
    Why do you want to work with Cosmic Attire?
  </label>
  <textarea
    id="whyJoin"
    name="whyJoin"
    rows={4}
    value={formData.whyJoin}
    onChange={handleChange}
    className="alpha-input w-full resize-none"
    placeholder="Tell us what excites you about joining the team..."
  />
</div>
{/* EXPERIENCE */}
<div className="space-y-2">
  <label htmlFor="experience" className="block text-sm font-medium">
    Any previous experience?
  </label>
  <textarea
    id="experience"
    name="experience"
    rows={4}
    value={formData.experience}
    onChange={handleChange}
    className="alpha-input w-full resize-none"
    placeholder="Share any relevant past work, projects, or skills..."
  />
</div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="alpha-button w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting application...</span>
              </div>
            ) : (
              'Join the Team'
            )}
          </button>

          <div className="mt-2 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              By applying, you agree to receive updates about Cosmic Attire. We
              respect your privacy.
            </p>
          </div>
        </motion.form>
      </section>
    </div>
  );
}
