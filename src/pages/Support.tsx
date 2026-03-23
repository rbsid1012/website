import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Mail, FileText, Users, HelpCircle, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const filterPills = [
  "All Topics",
  "Sizing",
  "Battery",
  "Connectivity",
  "Payments",
  "Safety & SOS",
  "Shipping & Returns",
];

const faqs = [
  {
    question: "How do I measure my ring size?",
    answer: (
      <>
        <p className="mb-4">
          For accurate sizing, we recommend using our official Omni Key Sizing Kit.
          Wear the sizing ring for 24 hours to account for natural finger size changes
          throughout the day. This ensures optimal sensor performance and reliable NFC connectivity.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#" className="text-crimson underline underline-offset-4 hover:text-crimson/80 transition-colors">
            Order Sizing Kit
          </a>
          <a href="#" className="text-crimson underline underline-offset-4 hover:text-crimson/80 transition-colors">
            Watch Video Tutorial
          </a>
        </div>
      </>
    ),
  },
  {
    question: "Is the Omni Key ring waterproof?",
    answer: (
      <p>
        Yes, the Omni Key smart ring is rated IP68 water-resistant, meaning it can withstand
        submersion in fresh water up to 100 meters for 60 minutes. This makes it suitable for
        daily wear during handwashing, showering, and swimming. However, we recommend avoiding
        prolonged exposure to chlorinated pools or saltwater to maintain optimal performance.
      </p>
    ),
  },
  {
    question: "How long does the battery last?",
    answer: (
      <p>
        The Omni Key ring features passive NFC technology for payments, requiring no battery.
        For active features like SOS alerts and location tracking, the internal battery lasts
        up to 7 days on a single charge. Charging takes approximately 90 minutes using the
        included wireless charging dock.
      </p>
    ),
  },
  {
    question: "Does it work with iOS and Android?",
    answer: (
      <p>
        Yes, the Omni Key companion app is fully compatible with both iOS (14.0 and later) and
        Android (10.0 and later). The app enables you to configure payment limits, manage SOS
        contacts, view transaction history, and control all ring settings from your smartphone.
      </p>
    ),
  },
  {
    question: "What is the return policy?",
    answer: (
      <p>
        We offer a 30-day return policy for unused rings in original packaging. If you've used
        the sizing kit and the ring doesn't fit, we'll exchange it for the correct size free
        of charge. For quality issues or defects, our coverage protects replacements for up to
        2 years from the date of purchase.
      </p>
    ),
  },
  {
    question: "How do I reset or unpair my ring?",
    answer: (
      <p>
        To unpair your ring, open the Omni Key app, navigate to Settings → Ring Management →
        Unpair Device. To perform a factory reset, press and hold the ring against the charging
        dock for 15 seconds until you see a confirmation in the app. This will erase all
        stored data and payment credentials from the ring.
      </p>
    ),
  },
  {
    question: "What should I do if a payment fails?",
    answer: (
      <p>
        If a payment fails, first ensure the terminal supports contactless payments. Hold
        the ring flat against the payment terminal for 2-3 seconds. Check your spending
        limits in the app — you may have exceeded daily or per-transaction limits. If
        issues persist, verify that your linked payment method is active and has sufficient
        funds. Contact support if problems continue.
      </p>
    ),
  },
];

const contactCards = [
  {
    icon: Mail,
    title: "Email Support",
    subtitle: "Response within 24 hours",
    cta: "siddhartha@cosmicattire.in",
    href: "mailto:siddhartha@cosmicattire.in",
  },
  {
    icon: Phone,
    title: "Phone Support",
    subtitle: "Assistance during office hours",
    cta: "+91-6392092199",
    href: "tel:+916392092199",
  },
];

const Support = () => {
  const [activeFilter, setActiveFilter] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="section-narrow">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h1 className="headline-lg mb-4">Help & Support</h1>
              <p className="body-lg">
                Find answers about your Omni Key Smart Ring, payments, safety, and more.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for answers (e.g., 'Battery', 'Sizing')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-secondary/50 border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent transition-all"
                />
              </div>
            </motion.div>

            {/* Filter Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-2 mb-16"
            >
              {filterPills.map((pill) => (
                <button
                  key={pill}
                  onClick={() => setActiveFilter(pill)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${activeFilter === pill
                      ? "bg-crimson text-white"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                >
                  {pill}
                </button>
              ))}
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Contact Column */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">
                  Quick Contact
                </h3>
                {contactCards.map((card, index) => (
                  <a
                    key={card.title}
                    href={card.href}
                    className="glass-card p-5 block hover-lift group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-crimson/20 flex items-center justify-center flex-shrink-0">
                        <card.icon className="w-5 h-5 text-crimson" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground mb-1">
                          {card.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {card.subtitle}
                        </p>
                        <span className="text-xs text-crimson group-hover:underline underline-offset-2">
                          {card.cta}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </motion.div>

              {/* FAQ Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-2"
              >
                <div className="mb-8">
                  <h3 className="text-xl font-medium text-foreground mb-2">
                    Frequently Asked Questions
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Most common answers for new users.
                  </p>
                </div>

                <Accordion type="multiple" className="space-y-3">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-${index}`}
                      className="glass-card border-0 px-6 data-[state=open]:ring-1 data-[state=open]:ring-crimson/30"
                    >
                      <AccordionTrigger className="text-left text-sm font-medium py-5 hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </div>

            {/* Still Need Help Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mt-24 pb-8"
            >
              <h3 className="text-lg font-medium text-foreground mb-2">
                Still need help?
              </h3>
              <p className="text-sm text-muted-foreground mb-8">
                We're here to assist you with any questions or issues.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#" className="btn-primary">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Ask a Query
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
