import { useState } from 'react';
import {
  Briefcase,
  GraduationCap,
  Building2,
  CheckCircle,
  Mail,
  User,
  Building,
} from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const CreatorAccess = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    description: '',
    requirements: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const partnerTypes = [
    {
      icon: Briefcase,
      title: 'Investors',
      description: 'Be part of the journey and fuel the future of wearable tech',
      benefits: [
        'Early equity participation',
        'Strategic involvement in growth',
        'Access to financial reports',
        'Exclusive networking with founders',
      ],
    },
    {
      icon: GraduationCap,
      title: 'Universities',
      description: 'Transform campus life with digital rings replacing outdated systems',
      benefits: [
        'Replace physical ID cards with digital rings',
        'Universal proximity unlocking for labs/hostels',
        'Cashless campus payments',
        'Data insights on student engagement',
      ],
    },
    {
      icon: Building2,
      title: 'Companies',
      description: 'Enable futuristic workplace solutions with Cosmic Attire rings',
      benefits: [
        'Secure employee authentication',
        'Corporate branding opportunities',
        'Access control & attendance with rings',
        'Seamless integration with workplace tools',
      ],
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Convert form data to URL-encoded string
      const formBody = new URLSearchParams(formData).toString();

      // Send POST request to Apps Script
      const response = await fetch("https://script.google.com/macros/s/AKfycbw-Lpu0WNfK4j41T5g4iLsXrhAkAlFlQQDsvhunpsjjY_V31GR2K0Z1TJPBlPFELde3CQ/exec", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody,
      });

      // Parse JSON response from Apps Script
      const result = await response.json();

      // Check status from Apps Script
      if (result.status === "success") {
        setIsSubmitted(true);
        toast({ title: result.message });
      } else {
        toast({ title: "Error", description: result.message || "Something went wrong." });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong while submitting your application.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-center max-w-2xl mx-auto px-4"
        >
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 alpha-pulse">
            <CheckCircle className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 alpha-gradient-text">
            Application Received
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for your interest in partnering with{' '}
            <span className="font-semibold">Cosmic Attire</span>. Our team will
            review your application and respond within 48 hours.
          </p>
          <button onClick={() => setIsSubmitted(false)} className="alpha-button mt-8">
            Submit Another Application
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/40 to-black"></div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight alpha-gradient-text mb-6">
            Partner with Cosmic Attire
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Join the movement shaping the future of wearable interaction.
          </p>
        </motion.div>
      </section>

      {/* Partnership Types */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 alpha-gradient-text">
            Partnership Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're looking for visionary partners to help bring Cosmic Attire to
            the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {partnerTypes.map((type, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="relative alpha-card p-6 rounded-xl transition-transform transform hover:-translate-y-2 hover:shadow-xl hover:shadow-red-500/30"
            >
              <div className="absolute inset-0 rounded-xl border border-transparent hover:border-red-500/40 transition-all"></div>
              <div className="relative z-10 text-center mb-6">
                <div className="w-16 h-16 bg-red-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <type.icon className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{type.title}</h3>
                <p className="text-muted-foreground mt-2">{type.description}</p>
              </div>
              <div className="relative z-10 space-y-3">
                <h4 className="font-semibold text-foreground">Benefits:</h4>
                {type.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="max-w-2xl mx-auto"
        >
          <div className="alpha-card">
            <h2 className="text-2xl font-bold mb-6 text-center text-foreground">
              Partnership Application
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
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
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="alpha-input w-full pl-10"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label htmlFor="company" className="block text-sm font-medium text-foreground">
                  Company/Organization
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="alpha-input w-full pl-10"
                    placeholder="Company or organization name"
                  />
                </div>
              </div>

              {/* Partnership Type */}
              <div className="space-y-2">
                <label htmlFor="role" className="block text-sm font-medium text-foreground">
                  Partnership Type *
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="alpha-input w-full"
                >
                  <option value="">Select partnership type</option>
                  <option value="investor">Investor</option>
                  <option value="university">University</option>
                  <option value="company">Company</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Conditional Question */}
              {formData.role !== 'investor' && formData.role !== '' && (
                <div className="space-y-2">
                  <label
                    htmlFor="requirements"
                    className="block text-sm font-medium text-foreground"
                  >
                    What are your requirements and expectations with Cosmic Attire?
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    rows={4}
                    value={formData.requirements}
                    onChange={handleChange}
                    className="alpha-input w-full resize-none"
                    placeholder="Share your requirements and expectations..."
                  />
                </div>
              )}

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
                  'Submit Partnership Application'
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default CreatorAccess;
