import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { analytics } from "@/lib/analytics";
import heroRings from "@/assets/hero-rings.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* Background Image Layer - ONLY this fades/animates */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%] sm:h-[65%] md:h-[70%] lg:h-[75%] z-0">
        <motion.img
          src={heroRings}
          alt="Smart Rings on display"
          className="w-full h-full object-cover object-center scale-100 sm:scale-[1.05] lg:scale-[1.15]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          style={{
            objectPosition: 'center 30%',
          }}
        />
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 via-25% to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 md:h-48 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Static Pillars Layer - NO animation, always visible on larger screens */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[75%] z-[1] pointer-events-none hidden md:block"
        style={{ opacity: 1 }}
      >
        {/* White pillar overlay effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, transparent 40%, hsla(0, 0%, 100%, 0.03) 60%, hsla(0, 0%, 100%, 0.08) 100%)',
          }}
        />
      </div>

      {/* Hero Content - positioned higher on the page, z-index 2 for proper layering */}
      <div className="relative z-[2] flex-1 flex flex-col items-center justify-start px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        <div className="text-center max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
          {/* Overline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-muted-foreground/70 mb-3 sm:mb-4"
          >
           Smart Ring Platform
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-[1.2] tracking-tight mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          >
            <span className="block">The most trusted</span>
            <span className="block mt-1 sm:mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              way to wear{" "}
              <span 
                className="font-script text-[1.1em] tracking-wide"
                style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 500 }}
              >
                payments.
              </span>
            </span>
          </motion.h1>

          {/* CTA Buttons - z-index 2 to sit above background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-[2]"
          >
            {/* Primary CTA - View Omni Key - Scrolls to ring section */}
            <button
              onClick={() => {
                analytics.track("hero_alpha_view");
                const ringSection = document.getElementById("ring-prototype");
                ringSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center justify-center gap-2 rounded-full px-5 sm:px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto min-h-[44px]"
              style={{
                background: 'hsla(0, 0%, 100%, 0.08)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid hsla(var(--crimson) / 0.4)',
                boxShadow: '0 0 20px -5px hsl(var(--crimson) / 0.3), 0 8px 32px -8px hsla(0, 0%, 0%, 0.5)',
              }}
            >
              View Omni Key
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Secondary CTA - Watch Demo */}
            <Link
              to="/demo"
              onClick={() => analytics.track("hero_demo_watch")}
              className="group inline-flex items-center justify-center gap-2 rounded-full px-5 sm:px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 w-full sm:w-auto min-h-[44px]"
              style={{
                background: 'hsla(0, 0%, 100%, 0.04)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid hsla(0, 0%, 100%, 0.15)',
              }}
            >
              <Play className="w-4 h-4" />
              Watch Demo Video
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - hidden on very small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-[10px] sm:text-xs tracking-widest uppercase">Scroll to discover</span>
          <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
