import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PartnershipInquiryModal from "@/components/PartnershipInquiryModal";
import { Building2, Store, Briefcase, Truck } from "lucide-react";

const partnerTypes = [
  {
    icon: Building2,
    title: "Enterprise Partners",
    description: "Integrate Omni Key for employee access control and expense management across your organization.",
  },
  {
    icon: Store,
    title: "Merchant Partners",
    description: "Accept NFC ring payments and offer exclusive rewards to Omni Key users.",
  },
  {
    icon: Briefcase,
    title: "Technology Partners",
    description: "Build on our platform. APIs and SDKs for access control, payments, and identity verification.",
  },
  {
    icon: Truck,
    title: "Distribution Partners",
    description: "Bring Omni Key to new markets. Join our global distribution network.",
  },
];

const Partnerships = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 md:pt-32">
        <section className="section-narrow">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <p className="overline mb-4">Partnerships</p>
              <h1 className="headline-lg mb-4">Build With Us</h1>
              <p className="body-lg">
                Partner with Cosmic Attire to bring secure, wearable technology 
                to your customers and employees.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {partnerTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-2xl p-8 backdrop-blur transition-all hover:scale-[1.02]"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <type.icon className="w-8 h-8 text-crimson mb-4" />
                  <h3 className="text-lg font-medium mb-2">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl p-8 text-center backdrop-blur"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <h3 className="text-lg font-medium mb-2">Interested in partnering?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Get in touch with our partnerships team to explore opportunities.
              </p>
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-medium transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(220, 20, 60, 0.8) 0%, rgba(180, 20, 50, 0.9) 100%)',
                  boxShadow: '0 8px 32px rgba(220, 20, 60, 0.3)',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(220, 20, 60, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Partnerships
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Partnership Inquiry Modal */}
      <PartnershipInquiryModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </div>
  );
};

export default Partnerships;
