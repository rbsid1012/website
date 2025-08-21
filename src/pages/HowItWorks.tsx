import PageHeader from '@/components/PageHeader';
import { Smartphone, CreditCard, Shield, Key, Zap, Users, CheckCircle, MapPin, Battery } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const HowItWorks = () => {
  const steps = [
    {
      icon: Smartphone,
      title: 'Create Your Profile',
      description: 'Begin your journey by creating a personalized account on our platform.',
      details: 'Add your basic info, profile picture, and preferences. This profile becomes the central hub linking your identity to your smart ring securely.'
    },
    {
      icon: CreditCard,
      title: 'Set Up Ring & Load Tokens',
      description: 'Connect your ring and prepare it for transactions.',
      details: 'Pair your Cosmic Attire Smart Ring with your profile, assign permissions, and top up tokens for seamless access and payments.'
    },
    {
      icon: Shield,
      title: 'Verify Instantly',
      description: 'With 5-step verification and HMAC encryption - Access locations and services with just a tap',
      details: 'Place your ring near any Cosmic Attire reader. The system instantly recognizes your credentials, verifying your identity safely and effortlessly—no passwords or cards needed.'
    },
    {
      icon: Key,
      title: 'Load Tokens for Payments',
      description: 'Empower your ring for seamless transactions.',
      details: 'Add tokens to your account via our app or website. Use your ring to make fast, contactless payments at partner locations, events, or services—your wallet, now at your fingertips.'
    }
  ];

  const techFeatures = [
    {
      icon: MapPin,
      title: 'Geofencing',
      description: 'Location-based access activates features only in authorized areas.',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: CheckCircle,
      title: '5-Factor Verification',
      description: 'Multi-layered security ensures your identity is verified safely.',
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      icon: Battery,
      title: 'No Charging Needed',
      description: 'Passive NFC technology works 24/7 without any power source.',
      color: 'from-yellow-500/20 to-orange-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <PageHeader 
        title="How It Works" 
        subtitle="Discover the revolutionary technology that makes ALPHA 1 the ultimate contactless experience."
        breadcrumb="Technology"
      />

      {/* Steps Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="alpha-card group relative overflow-hidden p-6 rounded-xl transition-transform transform hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/50 hover:bg-primary/10"
            >
              <div className="absolute top-4 right-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-sm">{index + 1}</span>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground/80">{step.details}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visual Process Flow */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 alpha-gradient-text">
            The ALPHA 1 Ring Experience
          </h2>
          <div className="alpha-section-divider mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From first tap to seamless interaction - experience the future of contactless technology.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center space-y-4"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto alpha-floating">
              <Smartphone className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Digital Identity</h3>
            <p className="text-muted-foreground">
              Your personal ID, securely stored on your ring for instant verification anywhere.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center space-y-4"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto alpha-pulse">
              <Zap className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">OmniKey</h3>
            <p className="text-muted-foreground">
              All your keys, access cards, and permissions—conveniently in one smart ring.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center space-y-4"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto alpha-glow">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Smart Wallet</h3>
            <p className="text-muted-foreground">
              Load tokens and make seamless, contactless payments with a simple tap.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technical Deep Dive */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 alpha-gradient-text">
            Advanced Technology
          </h2>
          <div className="alpha-section-divider mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cutting-edge security, passive NFC, and universal compatibility make your experience seamless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="alpha-card group p-6 rounded-xl transition-transform transform hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/50"
            >
              <div className={`w-full h-32 bg-gradient-to-br ${feature.color} rounded-lg mb-6 flex items-center justify-center`}>
                <feature.icon className="w-16 h-16 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Button at the end */}
        <div className="text-center mt-16">
          <Link
            to="/product#video-section"
            className="inline-block px-8 py-4 bg-primary rounded-full font-semibold text-black hover:text-white hover:bg-gradient-to-r hover:from-primary hover:to-secondary transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/50"
          >
            Watch Product in Action
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
