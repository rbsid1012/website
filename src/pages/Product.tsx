import PageHeader from '@/components/PageHeader';
import { Zap, Shield, Smartphone, Battery } from 'lucide-react';
import { motion } from 'framer-motion';
import ringImage from '@/assets/without.png';
import { Link } from 'react-router-dom';

const Product = () => {
  const features = [
    {
      icon: Smartphone,
      title: 'Tap to Access Profile',
      description: 'Instantly share your digital profile with a simple tap. No apps, no scanning, just seamless connection.',
    },
    {
      icon: Zap,
      title: 'Token-Based Payments',
      description: 'Pre-loaded digital tokens for partner venues. Pay effortlessly for experiences.',
    },
    {
      icon: Shield,
      title: 'Water and Dust Proof',
      description: 'Built to withstand water splashes and dust, anytime, anywhere.',
    },
    {
      icon: Battery,
      title: 'Passive Technology',
      description: 'No charging required. Works 24/7 without any power source.',
    },
  ];

  const specs = [
    {
      title: 'Ring',
      details: ['Aesthetic and Minimalist Design', 'Available in all sizes', 'Near Field Communication', 'Unique To Each User'],
    },
    {
      title: 'Proximity Module',
      details: ['Highly Encrypted Structure', '13.56 MHz frequency', 'AES-256 Encryption', 'Secure Data'],
    },
    {
      title: 'Compatibility',
      details: ['All NFC-enabled devices', 'iOS 11+ / Android 4.4+', 'Universal payment terminals', 'No app required'],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Page Header */}
      <PageHeader
        title="COSMIC ATTIRE PRODUCT"
        subtitle="Introducing the universal proximity ring — the future of seamless interaction, payments, and digital identity."
        breadcrumb="Product"
      />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold alpha-gradient-text">
              Redefining How You Connect
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our smart wearable unites digital identity, payments, and emergency access in one sleek, lifestyle-ready ring.
            </p>
            <ul className="grid gap-2 text-white/90">
              {['Ultra-lightweight design', 'Totally waterproof', 'Lifetime lasting technology'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-1"></span>{item}
                </li>
              ))}
            </ul>
            <Link to="/join-waitlist" className="alpha-button text-lg mt-4 inline-block">
              Join the Revolution
            </Link>
          </motion.div>

          {/* Right Ring Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="flex justify-end relative"
          >
            <motion.img
              src={ringImage}
              alt="ALPHA 1 Smart Ring"
              className="w-[600px] md:w-[700px] h-auto object-contain"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-3xl md:text-4xl font-bold text-center alpha-gradient-text mb-12"
        >
          Key Features of ALPHA 1
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: idx * 0.15 }}
              whileHover={{ scale: 1.05 }}
              className="alpha-card p-6 rounded-xl border border-gray-700 hover:border-primary hover:shadow-xl hover:shadow-primary/30 transition-all cursor-pointer"
            >
              <feature.icon className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-300 text-sm text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technical Specs Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-3xl md:text-4xl font-bold text-center alpha-gradient-text mb-12"
        >
          The Cosmic Ecosystem
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specs.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: idx * 0.15 }}
              whileHover={{ scale: 1.03 }}
              className="alpha-card p-6 text-center border border-gray-700 rounded-xl hover:border-primary hover:shadow-xl hover:shadow-primary/20 transition-all cursor-pointer"
            >
              <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
              <ul className="space-y-2 text-gray-300">
                {item.details.map((spec, i) => <li key={i}>{spec}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-3xl md:text-4xl alpha-gradient-text mb-8"
        >
          See ALPHA 1 in Action
        </motion.h2>
        <div className="alpha-card max-w-4xl mx-auto rounded-lg overflow-hidden bg-gray-900/50 backdrop-blur-md p-12">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
            <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05 }}>
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4 alpha-pulse">
                <Zap className="w-10 h-10 text-primary" />
              </div>
              <p className="text-lg text-gray-300">Product video coming soon</p>
              <p className="text-sm text-gray-400 mt-2">Experience seamless interaction</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
