import { motion } from "framer-motion";
import { useState, lazy, Suspense } from "react";
import { CreditCard, CheckCircle2, Clock, MapPin } from "lucide-react";

// Lazy load the 3D ring for performance
const Ring3D = lazy(() => import("./Ring3D"));

const paymentSteps = [
  {
    step: 1,
    title: "Tap at Metro Café",
    description: "Ring detected at terminal",
    icon: CreditCard,
  },
  {
    step: 2,
    title: "Payment authorized",
    description: "₹247.00 · Payment done successfully",
    icon: CheckCircle2,
  },
  {
    step: 3,
    title: "Transaction logged",
    description: "TXN ID: AWR-2026-0124-9847",
    icon: Clock,
  },
  {
    step: 4,
    title: "Location captured",
    description: "Chandigarh · India",
    icon: MapPin,
  },
];

const RingPrototype = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const startPaymentDemo = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveStep(0);

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= paymentSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsAnimating(false), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  return (
    <section id="ring-prototype" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
      <div className="px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <p className="overline mb-3 sm:mb-4">Interactive Experience</p>
          <h2 className="headline-lg mb-3 sm:mb-4">Explore the Omni Key Ring</h2>
          <p className="body-lg max-w-xl sm:max-w-2xl mx-auto">
            Rotate the ring to discover what's happening behind every tap.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* 3D Ring Interaction */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full"
          >
            <div className="glass-card p-4 sm:p-6 overflow-hidden">
              <Suspense fallback={
                <div className="w-full h-[220px] sm:h-[280px] md:h-[320px] lg:h-[360px] flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-crimson border-t-transparent rounded-full animate-spin" />
                </div>
              }>
                <Ring3D />
              </Suspense>
              <p className="text-center text-xs sm:text-sm text-muted-foreground mt-3">
                Drag to rotate • Features cycle every 3 seconds
              </p>
            </div>
          </motion.div>

          {/* Payment Flow Animation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-4 sm:p-6 md:p-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div>
                <h3 className="text-base sm:text-lg font-medium text-foreground mb-0.5 sm:mb-1">
                  Payment Flow
                </h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  Watch a complete transaction with geofencing
                </p>
              </div>
              <button
                onClick={startPaymentDemo}
                disabled={isAnimating}
                className="btn-ghost text-xs disabled:opacity-50 self-start sm:self-auto min-h-[44px] px-4"
              >
                {isAnimating ? "Running..." : "Run Demo"}
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {paymentSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={false}
                  animate={{
                    opacity: index <= activeStep ? 1 : 0.3,
                    scale: index === activeStep ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg transition-colors ${index === activeStep ? "bg-secondary/50" : "bg-transparent"
                    }`}
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${index <= activeStep
                        ? "bg-foreground text-background"
                        : "bg-secondary text-muted-foreground"
                      }`}
                  >
                    <step.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-foreground">
                      {step.title}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  {index < activeStep && (
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground flex-shrink-0" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Final State */}
            <motion.div
              initial={false}
              animate={{
                opacity: activeStep === paymentSteps.length - 1 ? 1 : 0,
                y: activeStep === paymentSteps.length - 1 ? 0 : 10,
              }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-6 pt-6 border-t border-border text-center"
            >
              <p className="text-sm font-medium text-foreground mb-1">
                Transaction completed
              </p>
              <p className="text-xs text-muted-foreground">
                ₹247.00 · Chandigarh, India
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Captured via geofenced Omni Key smart ring
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RingPrototype;
