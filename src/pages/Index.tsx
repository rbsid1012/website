import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Smartphone, Star, CheckCircle } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Smartphone,
      title: 'Instant Profile Sharing',
      description: 'Effortlessly share your contact details, socials, and more in seconds ,all through one smart tap.',
    },
    {
      icon: Zap,
      title: 'Token-Based Payments',
      description: 'Preloaded tokens let you transact instantly in a controlled vicinity — from entry to checkout.',
    },
    {
      icon: Shield,
      title: 'Frictionless access control',
      description: 'Gain instant entry and identity verification with just a tap, no PINs, passwords, or delays. Designed for speed, built for security',
    },
  ];

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Tech Entrepreneur',
      content: 'ALPHA 1 completely changed how I network at events. No more fumbling with business cards.',
      rating: 5,
    },
    {
      name: 'Sarah Kim',
      role: 'Event Organizer',
      content: 'The seamless payment system transformed our venue operations. Customers love the convenience.',
      rating: 5,
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Security Professional',
      content: 'Finally, emergency ID that works even when your phone is dead. Genius engineering.',
      rating: 5,
    },
  ];

  const scrollToFeatures = () => {
    const el = document.getElementById("features-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with video background */}
 <section className="relative h-screen overflow-hidden flex items-center justify-center text-center">
  {/* 🎥 Video Background */}
  <video
    className="absolute top-0 left-0 w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="/bg.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* 🌑 Black overlay for video dimming */}
  <div className="absolute inset-0 bg-black/65 z-10"></div>

  {/* 🔴 Red gradient overlay layered above black */}
  <div className="absolute inset-0 bg-gradient-to-tr from-red-800/40 via-black/60 to-black/80 z-20"></div>

  {/* 🌟 Hero Content */}
  <div className="relative z-30 text-white max-w-3xl px-4 space-y-8">
    <div className="inline-flex items-center space-x-2 bg-primary/20 rounded-full px-4 py-2 text-sm justify-center mx-auto">
      <div className="w-2 h-2 bg-primary rounded-full alpha-pulse"></div>
      <span className="text-primary font-medium">Coming to your vicinity very soon</span>
    </div>

{/* ALPHA 1 Title */}
<h1 className="text-center text-7xl sm:text-8xl lg:text-[11rem] font-extrabold leading-tight tracking-tight">
  <span className="block bg-gradient-to-br from-red-600 via-red-500 to-black text-transparent bg-clip-text drop-shadow-[0_0_40px_rgba(255,0,0,0.8)]">
    ALPHA 1
  </span>
</h1>

{/* Subtitle with white glow */}
<h2 className="text-center text-3xl sm:text-4xl lg:text-[3rem] font-bold leading-tight tracking-tight mt-4">
  <span className="block text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
    The Future of Connection
  </span>
</h2>




    <div className="flex flex-col sm:flex-row gap-4 justify-center">
<Link
  to="/join-waitlist"
  className="alpha-button text-lg group w-56 text-center justify-center"
>
  <span className="flex items-center justify-center">
    Join the Team
    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
  </span>
</Link>


      <Link
        to="/product"
        className="w-56 text-center justify-center px-6 py-3 border border-white rounded-lg text-white hover:border-primary transition-all hover:bg-primary/10 flex items-center"
      >
        About Our Product
      </Link>
    </div>

    <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70 mt-6">
      <div className="flex items-center space-x-2">
        <CheckCircle className="w-4 h-4 text-primary" />
        <span>No charging required</span>
      </div>
      <div className="flex items-center space-x-2">
        <CheckCircle className="w-4 h-4 text-primary" />
        <span>High-grade security</span>
      </div>
      <div className="flex items-center space-x-2">
        <CheckCircle className="w-4 h-4 text-primary" />
        <span>Universal compatibility</span>
      </div>
    </div>
  </div>

  {/* ⬇️ Scroll Down Arrow */}
  <div
    onClick={scrollToFeatures}
    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce text-white z-30"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</section>


      {/* Features Section */}
      <section id="features-section" className="container mx-auto px-4 py-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl alpha-heading mb-6 alpha-gradient-text">
            Revolutionary Features
          </h2>
          <div className="alpha-section-divider mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ALPHA 1 combines cutting-edge NFC technology with elegant design 
            to create the ultimate contactless experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="alpha-card group text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ... (Testimonials and CTA Sections stay the same if you want them) */}
    </div>
  );
};

export default Index;
