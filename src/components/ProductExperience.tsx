import { motion } from "framer-motion";
import { Check, X, User, Share2, CreditCard, Smartphone, Lock, Wifi, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { analytics } from "@/lib/analytics";

const ProductExperience = () => {
  const [globalBlockOn, setGlobalBlockOn] = useState(false);

  const handleGlobalBlockToggle = () => {
    const newState = !globalBlockOn;
    setGlobalBlockOn(newState);
    analytics.trackGlobalBlockToggle(newState);
  };

  return (
    <section className="section-narrow bg-background overflow-hidden">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <p className="overline mb-3 sm:mb-4">Product Experience</p>
          <h2 className="headline-lg">What does it look like to use?</h2>
        </motion.div>

        {/* Status Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Access Verified Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{
              y: -5,
              scale: 1.02,
              transition: { duration: 0.25, ease: "easeOut" }
            }}
            className="glass-card p-3 sm:p-4 md:p-5 transition-shadow duration-250 hover:shadow-[0_20px_50px_-12px_hsl(var(--crimson)_/_0.3)]"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
              </div>
              <h4 className="text-xs sm:text-sm font-medium">Access Verified</h4>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Identity confirmed via NFC</p>
            <div className="mt-2 sm:mt-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] sm:text-xs text-emerald-500">Active</span>
            </div>
          </motion.div>

          {/* Access Denied Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{
              y: -5,
              scale: 1.02,
              transition: { duration: 0.25, ease: "easeOut" }
            }}
            className="glass-card p-3 sm:p-4 md:p-5 transition-shadow duration-250 hover:shadow-[0_20px_50px_-12px_hsl(var(--crimson)_/_0.3)]"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-crimson/20 flex items-center justify-center flex-shrink-0">
                <X className="w-3 h-3 sm:w-4 sm:h-4 text-crimson" />
              </div>
              <h4 className="text-xs sm:text-sm font-medium">Access Denied</h4>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Verification failed or limit exceeded</p>
            <div className="mt-2 sm:mt-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-crimson" />
              <span className="text-[10px] sm:text-xs text-crimson">Blocked</span>
            </div>
          </motion.div>

          {/* Bio-Data Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{
              y: -5,
              scale: 1.02,
              transition: { duration: 0.25, ease: "easeOut" }
            }}
            className="glass-card p-3 sm:p-4 md:p-5 transition-shadow duration-250 hover:shadow-[0_20px_50px_-12px_hsl(var(--crimson)_/_0.3)]"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-foreground" />
              </div>
              <h4 className="text-xs sm:text-sm font-medium">Bio-Data</h4>
            </div>
            <div className="space-y-1 text-[10px] sm:text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Heart Rate</span>
                <span className="text-foreground">72 bpm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">SpO2</span>
                <span className="text-foreground">98%</span>
              </div>
            </div>
          </motion.div>

          {/* Networking Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{
              y: -5,
              scale: 1.02,
              transition: { duration: 0.25, ease: "easeOut" }
            }}
            className="glass-card p-3 sm:p-4 md:p-5 transition-shadow duration-250 hover:shadow-[0_20px_50px_-12px_hsl(var(--crimson)_/_0.3)] col-span-2 sm:col-span-1"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <Share2 className="w-3 h-3 sm:w-4 sm:h-4 text-foreground" />
              </div>
              <h4 className="text-xs sm:text-sm font-medium">Networking</h4>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">Share profile instantly</p>
            <div className="flex gap-1">
              <span className="px-1.5 sm:px-2 py-0.5 bg-secondary rounded text-[9px] sm:text-[10px]">LinkedIn</span>
              <span className="px-1.5 sm:px-2 py-0.5 bg-secondary rounded text-[9px] sm:text-[10px]">vCard</span>
            </div>
          </motion.div>

          {/* Payments Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{
              y: -5,
              scale: 1.02,
              transition: { duration: 0.25, ease: "easeOut" }
            }}
            className="glass-card p-3 sm:p-4 md:p-5 transition-shadow duration-250 hover:shadow-[0_20px_50px_-12px_hsl(var(--crimson)_/_0.3)] col-span-2 md:col-span-1"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-crimson/20 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-crimson" />
              </div>
              <h4 className="text-xs sm:text-sm font-medium">Payments</h4>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">NFC tap-to-pay</p>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-light">₹24,850</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">available</span>
            </div>
          </motion.div>
        </div>

        {/* Main Dashboard + Phone Mockup Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Main Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{
              y: -6,
              scale: 1.01,
              transition: { duration: 0.25, ease: "easeOut" }
            }}
            className="glass-card-elevated p-4 sm:p-6 md:p-8 transition-shadow duration-250 hover:shadow-[0_24px_60px_-15px_hsl(var(--crimson)_/_0.4)]"
          >
            {/* Top Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-6 sm:mb-8">
              <div className="badge-crimson">
                Emergency SOS
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500" />
                <span className="text-muted-foreground">Ring Status: Connected</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">Available Balance</p>
                <p className="text-xl sm:text-2xl font-light">₹24,850</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">Last Transaction</p>
                <p className="text-xl sm:text-2xl font-light">₹245</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Metro Café, 2 min ago</p>
              </div>
            </div>

            {/* Transaction Log */}
            <div className="border-t border-border pt-4 sm:pt-6 mb-4 sm:mb-6">
              <h4 className="text-xs sm:text-sm font-medium mb-3 sm:mb-4">Recent Activity</h4>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { merchant: "Metro Café", amount: "₹245", status: "Approved", type: "payment" },
                  { merchant: "Office Building", amount: "--", status: "Verified", type: "access" },
                  { merchant: "Quick Mart", amount: "₹1,890", status: "Approved", type: "payment" },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px] sm:text-xs">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 ${tx.type === "access" ? "bg-secondary" : "bg-crimson/20"
                        }`}>
                        {tx.type === "access" ? (
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-foreground" />
                        ) : (
                          <CreditCard className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-crimson" />
                        )}
                      </div>
                      <span className="text-muted-foreground truncate">{tx.merchant}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-foreground">{tx.amount}</span>
                      <span className={`hidden sm:inline ${tx.status === "Approved" ? "text-emerald-500" : "text-muted-foreground"}`}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Limits Summary */}
            <div className="border-t border-border pt-4 sm:pt-6">
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">Daily Limits</p>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex-1 h-1 sm:h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-crimson rounded-full" />
                </div>
                <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">₹8,450 / ₹25,000</span>
              </div>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-[280px] mx-auto">
              {/* Phone Frame */}
              <div className="relative w-full aspect-[280/580] bg-card rounded-[2rem] sm:rounded-[3rem] border-[6px] sm:border-[8px] border-secondary shadow-2xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-5 sm:h-7 bg-secondary rounded-b-xl sm:rounded-b-2xl z-10" />

                {/* Screen Content */}
                <div className="absolute inset-0 p-3 sm:p-4 pt-8 sm:pt-10 bg-background">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center mb-4 sm:mb-6 px-1 sm:px-2">
                    <span className="text-[8px] sm:text-[10px] text-muted-foreground">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-1.5 sm:w-4 sm:h-2 border border-muted-foreground rounded-sm">
                        <div className="w-2/3 h-full bg-emerald-500 rounded-sm" />
                      </div>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div>
                      <p className="text-[8px] sm:text-[10px] text-muted-foreground">Welcome back</p>
                      <p className="text-xs sm:text-sm font-medium">Omni Key Ring</p>
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-crimson/20 flex items-center justify-center">
                      <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 text-crimson" />
                    </div>
                  </div>

                  {/* Ring Status */}
                  <div className="glass-card p-2.5 sm:p-4 mb-3 sm:mb-4">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className="text-[10px] sm:text-xs font-medium">Ring Status</span>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[8px] sm:text-[10px] text-emerald-500">Connected</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                      <div className="bg-secondary/50 rounded-lg p-1.5 sm:p-2">
                        <p className="text-[7px] sm:text-[9px] text-muted-foreground">Battery</p>
                        <p className="text-[10px] sm:text-xs font-medium">85%</p>
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-1.5 sm:p-2">
                        <p className="text-[7px] sm:text-[9px] text-muted-foreground">Mode</p>
                        <p className="text-[10px] sm:text-xs font-medium">Active</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    <div className="bg-secondary/50 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
                      <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 mx-auto mb-0.5 sm:mb-1 text-crimson" />
                      <span className="text-[7px] sm:text-[9px]">Pay</span>
                    </div>
                    <div className="bg-secondary/50 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
                      <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mx-auto mb-0.5 sm:mb-1" />
                      <span className="text-[7px] sm:text-[9px]">Share</span>
                    </div>
                    <div className="bg-secondary/50 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 mx-auto mb-0.5 sm:mb-1" />
                      <span className="text-[7px] sm:text-[9px]">Profile</span>
                    </div>
                  </div>

                  {/* Recent Transaction */}
                  <div className="glass-card p-2 sm:p-3">
                    <p className="text-[8px] sm:text-[10px] text-muted-foreground mb-1.5 sm:mb-2">Last Transaction</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-crimson/20 flex items-center justify-center">
                          <CreditCard className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-crimson" />
                        </div>
                        <span className="text-[10px] sm:text-xs">Metro Café</span>
                      </div>
                      <span className="text-[10px] sm:text-xs font-medium">₹245</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Label */}
              <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary rounded-full">
                <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">Omni Key Companion App</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Global Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 sm:mt-10 md:mt-12 rounded-2xl sm:rounded-3xl border border-white/20 p-4 sm:p-6 md:p-8 lg:p-10 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 1px 1px 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Toggle row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div className="flex-1">
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-1 sm:mb-2">
                Global Block System
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground/90 max-w-md">
                Instantly lock all rings across your entire stack with a single command.
              </p>
            </div>

            <button
              onClick={handleGlobalBlockToggle}
              className={`relative inline-flex h-8 w-16 sm:h-10 sm:w-20 items-center rounded-full transition-all duration-300 flex-shrink-0 self-start sm:self-center ${globalBlockOn
                  ? "bg-gradient-to-r from-crimson to-crimson/80 shadow-lg shadow-crimson/40"
                  : "bg-white/10 border border-white/20 hover:bg-white/15"
                }`}
            >
              <span
                className={`absolute left-0.5 sm:left-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full transition-all duration-300 flex items-center justify-center ${globalBlockOn
                    ? "translate-x-[1.9rem] sm:translate-x-10 bg-white"
                    : "translate-x-0 bg-white/80"
                  }`}
              >
                {globalBlockOn ? (
                  <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-crimson" />
                ) : (
                  <Wifi className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                )}
              </span>
            </button>
          </div>

          {/* Dropdown body */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: globalBlockOn ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className={`mt-6 pt-6 border-t border-white/10 overflow-hidden transition-all duration-300 ${globalBlockOn ? "max-h-[600px]" : "max-h-0"
              }`}
          >
            {/* Vertical stacked list */}
            <div className="flex flex-col gap-3">
              {[
                { label: "Payments", status: "Blocked", icon: CreditCard },
                { label: "Access Control", status: "Blocked", icon: Lock },
                { label: "Networking", status: "Blocked", icon: Wifi },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: globalBlockOn ? 1 : 0, y: globalBlockOn ? 0 : 10 }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-xl bg-white/5 border border-white/10 p-3 sm:p-4 flex items-center justify-between"
                  style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-crimson flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-foreground">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-crimson animate-pulse" />
                    <span className="text-[10px] sm:text-xs font-semibold text-crimson uppercase tracking-wide">{item.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground/80 leading-relaxed">
              <AlertTriangle className="inline-block w-4 h-4 mr-2 text-crimson align-text-bottom" />
              Global block is now <span className="text-crimson font-semibold">ACTIVE</span>. All rings are being locked in real-time. This action cannot be undone remotely—physical verification required to restore access.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductExperience;
