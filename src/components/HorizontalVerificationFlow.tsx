import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, X, Smartphone, Fingerprint, Shield } from "lucide-react";

const HorizontalVerificationFlow = () => {
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
      description: "Ring approaches access control point",
      icon: Smartphone,
    },
    {
      step: 2,
      title: "Identity Verification",
      description: "Encrypted ID checked against access list",
      icon: Fingerprint,
    },
    {
      step: 3,
      title: "Access Result",
      description: "Authorization status returned",
      icon: Shield,
    },
  ];

  const getStepStatus = (stepIndex: number) => {
    if (verificationStep === 4) {
      // Denied state
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
      className="p-8 rounded-3xl"
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 18px 60px rgba(0, 0, 0, 0.45)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Shield className="w-5 h-5 text-foreground" />
        </div>
        <div>
          <h4 className="text-sm font-medium">Verification Flow</h4>
          <p className="text-xs text-muted-foreground">Access control process</p>
        </div>
      </div>

      {/* Horizontal Steps */}
      <div className="relative">
        {/* Progress Line Container - z-0 to stay behind icons */}
        <div className="absolute top-6 left-0 right-0 h-[2px] mx-16 z-0">
          <div className="absolute inset-0 bg-white/10 rounded-full" />
          <motion.div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
            animate={{
              width: verificationStep >= 3 ? '100%' : 
                     verificationStep >= 2 ? '75%' : 
                     verificationStep >= 1 ? '50%' : 
                     verificationStep >= 0 ? '25%' : '0%',
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const isActive = status === 'active';
            const isComplete = status === 'complete';
            const isDenied = status === 'denied';
            
            return (
              <motion.div
                key={step.step}
                animate={{
                  scale: isActive ? 1.02 : 1,
                  opacity: status === 'inactive' ? 0.5 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center"
              >
                {/* Step Number Pill - z-10 to stay above progress line */}
                <motion.div
                  className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all duration-300"
                  style={{
                    background: isDenied
                      ? 'rgba(220, 20, 60, 0.2)' 
                      : isComplete 
                        ? 'rgba(16, 185, 129, 0.2)' 
                        : isActive 
                          ? 'rgba(255, 255, 255, 0.15)' 
                          : 'rgba(255, 255, 255, 0.05)',
                    border: isDenied 
                      ? '2px solid rgba(220, 20, 60, 0.6)' 
                      : isComplete 
                        ? '2px solid rgba(16, 185, 129, 0.6)' 
                        : isActive 
                          ? '2px solid rgba(255, 255, 255, 0.4)' 
                          : '2px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: isActive ? '0 0 20px rgba(255, 255, 255, 0.2)' : 'none',
                  }}
                  animate={{
                    boxShadow: isActive 
                      ? ['0 0 15px rgba(255, 255, 255, 0.2)', '0 0 25px rgba(255, 255, 255, 0.3)', '0 0 15px rgba(255, 255, 255, 0.2)']
                      : 'none',
                  }}
                  transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                >
                  {isDenied ? (
                    <X className="w-5 h-5 text-crimson" />
                  ) : isComplete ? (
                    <Check className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <step.icon className="w-5 h-5 text-foreground/80" />
                  )}
                </motion.div>

                {/* Card Content */}
                <div 
                  className="p-4 rounded-2xl w-full"
                  style={{
                    background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    border: isActive ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid transparent',
                  }}
                >
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Step {step.step}
                  </p>
                  <h5 className="text-sm font-medium text-foreground mb-2">
                    {step.title}
                  </h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Result indicators for step 3 */}
                  {index === 2 && (verificationStep === 3 || verificationStep === 4) && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3"
                    >
                      {verificationStep === 3 ? (
                        <div 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                          style={{
                            background: 'rgba(16, 185, 129, 0.15)',
                            border: '1px solid rgba(16, 185, 129, 0.4)',
                            color: 'rgb(16, 185, 129)',
                          }}
                        >
                          <Check className="w-3 h-3" />
                          Access Granted
                        </div>
                      ) : (
                        <div 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                          style={{
                            background: 'rgba(220, 20, 60, 0.15)',
                            border: '1px solid rgba(220, 20, 60, 0.4)',
                            color: 'rgb(220, 20, 60)',
                          }}
                        >
                          <X className="w-3 h-3" />
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
      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-xs text-muted-foreground text-center">
          Cached credentials enable offline access for pre-approved locations. Access logs sync when connection restored.
        </p>
      </div>
    </motion.div>
  );
};

export default HorizontalVerificationFlow;
