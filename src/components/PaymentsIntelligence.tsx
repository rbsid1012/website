import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, X, WifiOff, CreditCard, Clock, MapPin, Radio } from "lucide-react";
import VerticalVerificationFlow from "./VerticalVerificationFlow";

const PaymentsIntelligence = () => {
  const [paymentStep, setPaymentStep] = useState(0);

  // Auto-advance payment animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPaymentStep(prev => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const stepVariants = {
    inactive: { opacity: 0.4, scale: 0.95 },
    active: { opacity: 1, scale: 1 },
    complete: { opacity: 0.7, scale: 0.98 }
  };

  return (
    <section className="section-narrow bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="overline mb-4">Process Flows</p>
          <h2 className="headline-lg">How it works</h2>
        </motion.div>

        {/* Payment Flow - Single Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 p-8 rounded-3xl max-w-2xl mx-auto"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 18px 60px rgba(0, 0, 0, 0.45)',
          }}
        >
          <div className="flex items-center gap-3 mb-8">
            <motion.div 
              className="w-10 h-10 rounded-full bg-crimson/20 flex items-center justify-center"
              animate={{ boxShadow: paymentStep > 0 ? '0 0 20px -5px hsla(0, 84%, 50%, 0.5)' : 'none' }}
            >
              <CreditCard className="w-5 h-5 text-crimson" />
            </motion.div>
            <div>
              <h4 className="text-sm font-medium">Payment Flow</h4>
              <p className="text-xs text-muted-foreground">NFC tap-to-pay process</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Step 1 - Tap */}
            <motion.div 
              className="flex items-start gap-4"
              variants={stepVariants}
              animate={paymentStep === 0 ? 'active' : paymentStep > 0 ? 'complete' : 'inactive'}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col items-center">
                <motion.div 
                  className="w-8 h-8 rounded-full bg-crimson/20 border border-crimson/40 flex items-center justify-center text-xs text-crimson font-medium"
                  animate={{ 
                    borderColor: paymentStep === 0 ? 'hsla(0, 84%, 50%, 0.8)' : 'hsla(0, 84%, 50%, 0.4)',
                    boxShadow: paymentStep === 0 ? '0 0 12px -2px hsla(0, 84%, 50%, 0.6)' : 'none'
                  }}
                >
                  {paymentStep > 0 ? <Check className="w-3 h-3" /> : '1'}
                </motion.div>
                <div className="w-px h-8 bg-border" />
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm font-medium mb-1">Tap Ring at Terminal</p>
                <p className="text-xs text-muted-foreground">NFC handshake initiated with POS device</p>
                {paymentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 flex items-center gap-2"
                  >
                    <Radio className="w-3 h-3 text-crimson animate-pulse" />
                    <span className="text-[10px] text-crimson">Scanning...</span>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Step 2 - Authorization */}
            <motion.div 
              className="flex items-start gap-4"
              variants={stepVariants}
              animate={paymentStep === 1 ? 'active' : paymentStep > 1 ? 'complete' : 'inactive'}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col items-center">
                <motion.div 
                  className="w-8 h-8 rounded-full bg-crimson/20 border border-crimson/40 flex items-center justify-center text-xs text-crimson font-medium"
                  animate={{ 
                    borderColor: paymentStep === 1 ? 'hsla(0, 84%, 50%, 0.8)' : 'hsla(0, 84%, 50%, 0.4)',
                    boxShadow: paymentStep === 1 ? '0 0 12px -2px hsla(0, 84%, 50%, 0.6)' : 'none'
                  }}
                >
                  {paymentStep > 1 ? <Check className="w-3 h-3" /> : '2'}
                </motion.div>
                <div className="w-px h-8 bg-border" />
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm font-medium mb-1">Tokenized Authorization</p>
                <p className="text-xs text-muted-foreground">Secure token sent to issuer for approval</p>
                {paymentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 flex items-center gap-2"
                  >
                    <div className="w-16 h-1 bg-secondary rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-crimson rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2 }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">Authorizing</span>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Step 3 - Result */}
            <motion.div 
              className="flex items-start gap-4"
              variants={stepVariants}
              animate={paymentStep >= 2 ? 'active' : 'inactive'}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col items-center">
                <motion.div 
                  className="w-8 h-8 rounded-full bg-crimson/20 border border-crimson/40 flex items-center justify-center text-xs text-crimson font-medium"
                  animate={{ 
                    borderColor: paymentStep >= 2 ? 'hsla(0, 84%, 50%, 0.8)' : 'hsla(0, 84%, 50%, 0.4)',
                    boxShadow: paymentStep >= 2 ? '0 0 12px -2px hsla(0, 84%, 50%, 0.6)' : 'none'
                  }}
                >
                  {paymentStep > 2 ? <Check className="w-3 h-3" /> : '3'}
                </motion.div>
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm font-medium mb-3">Transaction Result</p>
                <div className="grid grid-cols-2 gap-3">
                  <motion.div 
                    className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3"
                    animate={{ 
                      scale: paymentStep === 2 ? 1.02 : 1,
                      boxShadow: paymentStep === 2 ? '0 0 16px -4px hsla(142, 70%, 45%, 0.5)' : 'none'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span className="text-xs font-medium text-emerald-500">Confirmed</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Payment successful</p>
                  </motion.div>
                  <motion.div 
                    className="bg-crimson/10 border border-crimson/30 rounded-lg p-3"
                    animate={{ 
                      scale: paymentStep === 3 ? 1.02 : 1,
                      boxShadow: paymentStep === 3 ? '0 0 16px -4px hsla(0, 84%, 50%, 0.5)' : 'none'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <X className="w-3 h-3 text-crimson" />
                      <span className="text-xs font-medium text-crimson">Denied</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Limit exceeded</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Offline Mode */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <WifiOff className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-medium">Offline Payments</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Ring supports up to 10 offline transactions (max ₹2,000 each). 
              Transactions sync when device reconnects.
            </p>
          </div>
        </motion.div>

        {/* Vertical Verification Flow */}
        <div className="w-full px-4 sm:px-6 mb-12 sm:mb-16">
          <VerticalVerificationFlow />
        </div>

        {/* Transaction Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 rounded-3xl max-w-4xl mx-auto"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Transaction Intelligence</h4>
              <p className="text-xs text-muted-foreground">Every action logged with full context</p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Timestamp: 14:32:08 IST</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-crimson" />
                <span className="text-muted-foreground">Location: Chandigarh, India</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">TXN-8842</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentsIntelligence;