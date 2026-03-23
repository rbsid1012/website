import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Hackathon", href: "/hackathon" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Help & Support", href: "/support" },
];

const FloatingMenu = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* ── Hamburger Button ── always fixed top-right */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed top-4 right-4 z-[100] p-3 rounded-full border border-white/10 flex items-center justify-center"
        style={{
          background: "hsla(0, 0%, 4%, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          minWidth: 48,
          minHeight: 48,
        }}
        whileTap={{ scale: 0.92 }}
        aria-label="Toggle menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </motion.button>

      {/* ── Slide-in Drawer ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              className="fixed top-0 right-0 z-[95] h-full w-64 border-l border-white/10 p-8 flex flex-col gap-2 pt-20"
              style={{
                background: "hsla(0, 0%, 4%, 0.97)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 px-4 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-all duration-200 min-h-[48px] flex items-center"
                  style={{
                    background:
                      location.pathname === link.href
                        ? "hsla(0,0%,100%,0.08)"
                        : undefined,
                    color:
                      location.pathname === link.href ? "#fff" : undefined,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingMenu;