import { motion } from "framer-motion";
import { AlertTriangle, Settings } from "lucide-react";

const pillars = [
  {
    icon: AlertTriangle,
    title: "Emergency‑First Design",
    description:
      "Press‑and‑hold SOS on the ring routes alerts to your trusted contacts and apps. Location, status, and last transactions are surfaced instantly for rapid response.",
  },
  {
    icon: Settings,
    title: "Full User Control",
    description:
      "Pair, lock, or disable the ring from a single control center. Update limits, revoke devices, and see what changed — with a clear audit trail for every action.",
  },
];

const ValuePillars = () => {
  return (
    <section className="section bg-background">
      <div className="container-wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 max-w-4xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 18px 60px rgba(0, 0, 0, 0.55)',
              }}
            >
              {/* Icon */}
              <div className="mb-4 sm:mb-6">
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <pillar.icon className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/80" strokeWidth={1.5} />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-medium text-foreground mb-2 sm:mb-4">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePillars;
