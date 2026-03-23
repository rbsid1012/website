import { motion } from "framer-motion";
import { Check } from "lucide-react";

const features = [
  "Press‑and‑hold SOS from the ring with configurable escalation rules.",
  "Pair and unpair rings and devices with verifiable ownership checks.",
  "Instantly disable all payments from any trusted device.",
  "Configure per‑day and per‑transaction limits before the ring can be used.",
];

const SafetyControl = () => {
  return (
    <section className="section bg-background">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-20 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="overline mb-3 sm:mb-4">Safety & Control</p>
            <h2 className="headline-lg mb-6 sm:mb-8">
              Designed for the moments that matter.
            </h2>

            <ul className="space-y-3 sm:space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-2.5 sm:gap-3"
                >
                  <div className="mt-0.5 sm:mt-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-foreground" strokeWidth={2.5} />
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column - Cards */}
          <div className="space-y-4 sm:space-y-6">
            {/* SOS Priority Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-5 sm:p-6 md:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <h4 className="text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">SOS Priority</h4>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Emergency response ready</p>
                </div>
                <span className="badge-crimson self-start">SOS Ready</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-muted-foreground">
                <div>
                  <p className="text-foreground/60 mb-0.5 sm:mb-1">Last Tested</p>
                  <p>Jan 21, 2026 — 14:32</p>
                </div>
                <div>
                  <p className="text-foreground/60 mb-0.5 sm:mb-1">Contacts Linked</p>
                  <p>3 verified</p>
                </div>
              </div>
            </motion.div>

            {/* Global Kill Switch Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="glass-card p-5 sm:p-6 md:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">Global Kill Switch</h4>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    Instantly disable all payment functionality
                  </p>
                </div>
                
                {/* Toggle */}
                <button className="relative w-12 h-6 sm:w-14 sm:h-7 bg-muted rounded-full transition-colors hover:bg-muted/80 flex-shrink-0">
                  <div className="absolute left-0.5 sm:left-1 top-0.5 sm:top-1 w-5 h-5 bg-foreground/80 rounded-full transition-transform" />
                </button>
              </div>
              
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border">
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  When enabled, all NFC payments will be blocked immediately across all paired rings.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyControl;
