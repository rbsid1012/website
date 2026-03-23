import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, X, Smartphone, Fingerprint, Shield } from "lucide-react";

const VerticalVerificationFlow = () => {
  const [verificationStep, setVerificationStep] = useState(0);

  // Auto-advance verification animation
  useEffect(() => {
    const interval = setInterval(() => {
      setVerificationStep(prev => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      step: 1,
      title: "Tap Ring at Reader",
      description: "Ring approaches access control point for secure identification",
      icon: Smartphone,
    },
    {
      step: 2,
      title: "Identity Verification",
      description: "Encrypted ID checked against access list in real-time",
      icon: Fingerprint,
    },
    {
      step: 3,
      title: "Access Result",
      description: "Authorization status returned instantly to the reader",
      icon: Shield,
    },
  ];

  const getStepStatus = (stepIndex: number) => {
    if (verificationStep === 4) {
      if (stepIndex < 2) return 'complete';
      if (stepIndex === 2) return 'denied';
      return 'inactive';
    }
    if (stepIndex < verificationStep) return 'complete';
    if (stepIndex === verificationStep) return 'active';
    return 'inactive';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="p-6 sm:p-8 md:p-10 rounded-3xl max-w-2xl mx-auto"
      style={{
        background: 'hsla(0, 0%, 100%, 0.06)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid hsla(0, 0%, 100%, 0.12)',
        boxShadow: '0 24px 80px -12px hsla(0, 0%, 0%, 0.5)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 sm:mb-10">
        <div 
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: 'hsla(0, 0%, 100%, 0.1)',
            border: '1px solid hsla(0, 0%, 100%, 0.2)',
          }}
        >
          <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-foreground">Verification Flow</h4>
          <p className="text-xs sm:text-sm text-muted-foreground">Secure access control process</p>
        </div>
      </div>

      {/* Vertical Steps */}
      <div className="relative">
        {/* Vertical Progress Line - Behind everything with lower z-index */}
        <div className="absolute left-[22px] sm:left-[26px] top-6 bottom-6 w-[2px]" style={{ zIndex: 0 }}>
          <div className="absolute inset-0 bg-white/10 rounded-full" />
          <motion.div 
            className="absolute left-0 top-0 w-full bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full"
            animate={{
              height: verificationStep >= 3 ? '100%' : 
                     verificationStep >= 2 ? '75%' : 
                     verificationStep >= 1 ? '50%' : 
                     verificationStep >= 0 ? '25%' : '0%',
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        <div className="flex flex-col gap-4 sm:gap-6" style={{ position: 'relative', zIndex: 1 }}>
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const isActive = status === 'active';
            const isComplete = status === 'complete';
            const isDenied = status === 'denied';
            const StepIcon = step.icon;
            
            return (
              <motion.div
                key={step.step}
                animate={{
                  scale: isActive ? 1.01 : 1,
                  opacity: status === 'inactive' ? 0.5 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-4 sm:gap-5"
              >
                {/* Step Icon - Above the line with higher z-index */}
                <motion.div
                  className="relative w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{ zIndex: 10,
                    background: isDenied
                      ? 'hsla(348, 83%, 47%, 0.2)' 
                      : isComplete 
                        ? 'hsla(160, 84%, 39%, 0.2)' 
                        : isActive 
                          ? 'hsla(0, 0%, 100%, 0.15)' 
                          : 'hsla(0, 0%, 100%, 0.05)',
                    border: isDenied 
                      ? '2px solid hsla(348, 83%, 47%, 0.6)' 
                      : isComplete 
                        ? '2px solid hsla(160, 84%, 39%, 0.6)' 
                        : isActive 
                          ? '2px solid hsla(0, 0%, 100%, 0.4)' 
                          : '2px solid hsla(0, 0%, 100%, 0.15)',
                    boxShadow: isActive ? '0 0 24px hsla(0, 0%, 100%, 0.2)' : 'none',
                  }}
                  animate={{
                    boxShadow: isActive 
                      ? ['0 0 16px hsla(0, 0%, 100%, 0.2)', '0 0 28px hsla(0, 0%, 100%, 0.3)', '0 0 16px hsla(0, 0%, 100%, 0.2)']
                      : 'none',
                  }}
                  transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                >
                  {isDenied ? (
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-crimson" />
                  ) : isComplete ? (
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
                  ) : (
                    <StepIcon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/80" />
                  )}
                </motion.div>

                {/* Step Content Card */}
                <div 
                  className="flex-1 p-4 sm:p-5 rounded-2xl transition-all duration-300"
                  style={{
                    background: isActive ? 'hsla(0, 0%, 100%, 0.08)' : 'hsla(0, 0%, 100%, 0.03)',
                    border: isActive ? '1px solid hsla(0, 0%, 100%, 0.15)' : '1px solid hsla(0, 0%, 100%, 0.06)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Step {step.step}
                    </span>
                    {isComplete && (
                      <span className="text-[10px] sm:text-xs font-medium text-emerald-500">
                        Complete
                      </span>
                    )}
                  </div>
                  <h5 className="text-sm sm:text-base font-semibold text-foreground mb-1.5 leading-tight">
                    {step.title}
                  </h5>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Result indicators for step 3 */}
                  {index === 2 && (verificationStep === 3 || verificationStep === 4) && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 sm:mt-4"
                    >
                      {verificationStep === 3 ? (
                        <div 
                          className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
                          style={{
                            background: 'hsla(160, 84%, 39%, 0.15)',
                            border: '1px solid hsla(160, 84%, 39%, 0.4)',
                            color: 'hsl(160, 84%, 45%)',
                          }}
                        >
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          Access Granted
                        </div>
                      ) : (
                        <div 
                          className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
                          style={{
                            background: 'hsla(348, 83%, 47%, 0.15)',
                            border: '1px solid hsla(348, 83%, 47%, 0.4)',
                            color: 'hsl(348, 83%, 55%)',
                          }}
                        >
                          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          Access Denied
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Offline Access Note */}
      <div className="mt-8 sm:mt-10 pt-6 border-t border-white/10">
        <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed">
          Cached credentials enable offline access for pre-approved locations. 
          <span className="block sm:inline"> Access logs sync when connection is restored.</span>
        </p>
      </div>
    </motion.div>
  );
};

export default VerticalVerificationFlow;
