import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCarousel from "@/components/ImageCarousel";
import { useNavigate } from "react-router-dom";

import {
  Sparkles,
  Calendar,
  Users,
  Rocket,
  Award,
  ArrowRight,
} from "lucide-react";

// ✅ IMPORT IMAGES (REQUIRED for src/assets)
import WebpageH1 from "@/assets/hack/WebpageH1.jpg";
import WebpageH3 from "@/assets/hack/WebpageH3.jpg";
import WebpageH5 from "@/assets/hack/WebpageH5.jpg";

// ✅ CLEAN IMAGE MAP (scalable, no repetition)
const images = {
  hero: WebpageH1,
  feature1: WebpageH3,
  feature2: WebpageH5,
};

const HackathonRecap = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-24 px-6">

        {/* HERO */}
        <section className="max-w-6xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="overline mb-4">Cosmic Attire Event Recap</p>

            <h1 className="headline-lg mb-6">
              IoT Bootcamp & Hackathon
            </h1>

            <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
              Builders from across the ecosystem joined the Cosmic Attire
              Bootcamp to prototype the future of wearable technology using Alpha 1.
            </p>
          </motion.div>
        </section>

        {/* 🔥 CAROUSEL */}
        <ImageCarousel />

        {/* 🔥 REFORMING SECTION */}
{/* REFORMING SECTION */}
<section className="max-w-5xl mx-auto mb-24">

  {/* Section Label */}
  <div className="flex items-center gap-3 mb-16">
    <span className="w-6 h-px bg-crimson" />
    <p className="text-xs uppercase tracking-widest text-crimson">What We Covered</p>
  </div>

  <div className="flex flex-col gap-1">

    {/* Panel 1 — Cybersecurity */}
    <div className="relative overflow-hidden rounded-2xl h-[280px] group">
      {/* Image */}
      <img
        src="/src/assets/hack/WebpageH2.jpg"
        alt="Cybersecurity"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      {/* Text */}
      <div className="absolute inset-0 flex flex-col justify-center px-10 max-w-lg">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1 h-1 rounded-full bg-crimson" />
          <p className="text-xs uppercase tracking-widest text-crimson">Security</p>
        </div>
        <h3 className="text-2xl font-light mb-3 leading-snug">
          Cybersecurity Insights
        </h3>
        <p className="text-sm text-white/60 leading-relaxed mb-4">
          Real-world vulnerabilities, secure architectures, encryption strategies and threat modeling for IoT systems.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Secure Comms", "Encryption", "Threat Modeling"].map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* Panel 2 — Industry Guidance */}
    <div className="relative overflow-hidden rounded-2xl h-[280px] group">
      {/* Image */}
      <img
        src="/src/assets/hack/WebpageH7.jpg"
        alt="Industry Guidance"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Gradient overlay — flipped for variety */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent" />

      {/* Text — right aligned */}
      <div className="absolute inset-0 flex flex-col justify-center items-end px-10">
        <div className="max-w-lg text-right">
          <div className="flex items-center justify-end gap-2 mb-3">
            <p className="text-xs uppercase tracking-widest text-crimson">Mentorship</p>
            <span className="w-1 h-1 rounded-full bg-crimson" />
          </div>
          <h3 className="text-2xl font-light mb-3 leading-snug">
            Industry-Level Guidance
          </h3>
          <p className="text-sm text-white/60 leading-relaxed mb-4">
            Mentorship from industry experts on scaling ideas into real-world products, MVPs and startup thinking.
          </p>
          <div className="flex flex-wrap justify-end gap-2">
            {["Product MVPs", "HW + SW", "Startup Guidance"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

  </div>
</section>

        {/* STORY */}
        <section className="max-w-6xl mx-auto mb-28 grid md:grid-cols-2 gap-10 items-center">
          <div className="h-[420px] rounded-xl overflow-hidden">
            <img
              src={images.hero}
              alt="Bootcamp"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Rocket className="w-5 h-5 text-crimson" />
              <span className="text-sm text-crimson">
                Bootcamp Experience
              </span>
            </div>

            <h2 className="text-3xl font-light mb-4">
              Where Builders Turn Ideas Into Products
            </h2>

            <p className="text-muted-foreground mb-6">
              The Cosmic Attire Bootcamp brought together engineers,
              designers, and innovators to prototype real-world IoT solutions.
            </p>

            <div className="flex gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-crimson" />
                Feb 02 – Feb 06
              </span>

              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-crimson" />
                200+ Builders
              </span>
            </div>
          </div>
        </section>

        {/* FEATURE GRID */}
        <section className="max-w-6xl mx-auto mb-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-3">
              Highlights From The Hackathon
            </h2>
            <p className="text-muted-foreground">
              Innovation, collaboration and breakthrough prototypes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="md:col-span-2 glass-card overflow-hidden">
              <img
                src={images.feature1}
                className="w-full h-72 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Builders Collaborating
                </h3>
                <p className="text-muted-foreground">
                  Teams collaborated to design wearable IoT systems.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 flex flex-col justify-center">
              <Sparkles className="w-6 h-6 text-crimson mb-3" />
              <h3 className="text-lg font-semibold mb-2">
                Innovative Ideas
              </h3>
              <p className="text-muted-foreground text-sm">
                The bootcamp fostered an environment where curiosity led to unique concepts, blending technology with practical problem-solving.
              </p>
            </div>

            <div className="glass-card p-6">
              <Award className="w-6 h-6 text-crimson mb-3" />
              <h3 className="text-lg font-semibold mb-2">
                Real Learnings
              </h3>
              <p className="text-muted-foreground text-sm">
               It was a hands-on experience where theory turned into practice through actual devices, circuits, and real-time problem solving.
              </p>
            </div>

            <div className="md:col-span-2 h-72 glass-card overflow-hidden">
              <img
                src={images.feature2}
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-4">
            Want To Join The Next Event?
          </h2>

          <p className="text-muted-foreground mb-8">
            Join the next Cosmic Attire Bootcamp and turn your ideas into real prototypes.
          </p>
<button
  onClick={() => navigate("/coming-soon")}
  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-white/40 transition"
>
  Explore Programs
  <ArrowRight className="w-4 h-4" />
</button>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default HackathonRecap;