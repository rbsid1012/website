import { motion } from "framer-motion";
import heroRings from "@/assets/hero-rings.jpg";

const ringVariants = [
  {
    name: "Omni Key Classic",
    finish: "Brushed Titanium",
    description: "Our signature finish for everyday wear. Lightweight, durable, and subtly elegant.",
    price: "₹24,999",
  },
  {
    name: "Omni Key Stealth",
    finish: "Matte Black",
    description: "Low-profile design for those who prefer understated sophistication.",
    price: "₹27,999",
  },
  {
    name: "Omni Key Pro",
    finish: "Polished Silver",
    description: "Premium finish with enhanced NFC range and extended SOS battery life.",
    price: "₹34,999",
  },
];

const ProductShowcase = () => {
  return (
    <section id="products" className="section bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="overline mb-4">Our Collection</p>
          <h2 className="headline-lg mb-4">Omni Key Ring Variants</h2>
          <p className="body-lg max-w-2xl mx-auto">
            Choose the finish that matches your style. All variants share the same
            powerful payment and safety features.
          </p>
        </motion.div>

        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative max-w-4xl mx-auto mb-16"
        >
          <div className="aspect-[16/9] rounded-2xl overflow-hidden">
            <img
              src={heroRings}
              alt="Omni Key Smart Ring collection on display"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ringVariants.map((variant, index) => (
            <motion.div
              key={variant.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="glass-card p-6 hover-lift group"
            >
              <div className="mb-4">
                <h3 className="text-lg font-medium text-foreground mb-1">
                  {variant.name}
                </h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {variant.finish}
                </p>
              </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {variant.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-foreground">
                  {variant.price}
                </span>
                <button
                  className="relative overflow-hidden px-4 py-2 text-xs font-semibold text-crimson rounded-full transition-all duration-300 hover:scale-105 group"
                  style={{
                    border: '1.5px solid rgba(220, 20, 60, 0.6)',
                    background: 'linear-gradient(135deg, rgba(220, 20, 60, 0.08) 0%, rgba(220, 20, 60, 0.02) 100%)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 16px rgba(220, 20, 60, 0.15), inset 1px 1px 0 rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <span className="relative z-10">View Omni Key</span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(220, 20, 60, 0.3), transparent)',
                    }}
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a href="#" className="btn-primary">
            Compare All Models
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
