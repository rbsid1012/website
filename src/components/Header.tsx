import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // ✅ Detect careers page
  // const isCareersPage = location.pathname === "/careers";
  const hideFullHeader = [
  "/hackathon",
  "/partnerships",
  "/coming-soon",
  "/careers",
  "/about",        // add
  "/support",      // add
  ].includes(location.pathname);

  const isHome = location.pathname === "/";
const shouldHide = hideFullHeader || (isHome && scrolled);
 
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);

    if (href.includes("#")) {
      const [path, hash] = href.split("#");

      if (location.pathname === path || path === "/") {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: shouldHide ? 0 : 1,
        y: shouldHide ? -100 : 0,
      }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8"
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 12px)",
        paddingBottom: "8px",
        pointerEvents: hideFullHeader ? "none" : "auto", // 🔥 prevents invisible blocking
      }}
    >
      {/* Desktop Navigation */}
      <div className="hidden lg:block max-w-3xl mx-auto">
        <motion.nav
          className="flex items-center justify-center px-4 md:px-6 py-3 rounded-full border border-white/10"
          style={{
            background: `hsla(0, 0%, 4%, ${scrolled ? 0.92 : 0.7})`,
            backdropFilter: `blur(${scrolled ? 28 : 20}px)`,
            WebkitBackdropFilter: `blur(${scrolled ? 28 : 20}px)`,
            boxShadow: scrolled
              ? "0 12px 40px -8px hsla(0, 0%, 0%, 0.9), 0 0 0 1px hsla(0, 0%, 100%, 0.08)"
              : "0 8px 32px -8px hsla(0, 0%, 0%, 0.5), 0 0 0 1px hsla(0, 0%, 100%, 0.05)",
          }}
        >
          <div className="flex items-center justify-center gap-1 xl:gap-2 w-full">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className="group relative px-3 xl:px-4 py-2.5 text-xs text-muted-foreground hover:text-foreground transition-all duration-300 rounded-full hover:bg-white/[0.08] whitespace-nowrap"
              >
                <motion.span
                  className="relative z-10"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {link.label}
                </motion.span>

                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-crimson to-transparent group-hover:w-3/4 transition-all duration-300 ease-out" />

                {location.pathname === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </motion.nav>
      </div>

      {/* Mobile Navigation */}
      {/* Mobile Navigation */}
{/* Mobile Navigation */}
{/* Mobile Navigation */}
<div className="lg:hidden">
  <motion.nav
    className="flex items-center px-2 py-2 rounded-full border border-white/10 overflow-x-auto scrollbar-hide"
    style={{
      background: `hsla(0, 0%, 4%, ${scrolled ? 0.92 : 0.7})`,
      backdropFilter: `blur(${scrolled ? 28 : 20}px)`,
      WebkitBackdropFilter: `blur(${scrolled ? 28 : 20}px)`,
      boxShadow: scrolled
        ? "0 12px 40px -8px hsla(0, 0%, 0%, 0.9), 0 0 0 1px hsla(0, 0%, 100%, 0.08)"
        : "0 8px 32px -8px hsla(0, 0%, 0%, 0.5), 0 0 0 1px hsla(0, 0%, 100%, 0.05)",
    }}
  >
    {navLinks.map((link) => (
      <Link
        key={link.label}
        to={link.href}
        onClick={() => handleNavClick(link.href)}
        className="relative flex-shrink-0 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-all duration-300 rounded-full hover:bg-white/[0.08] whitespace-nowrap"
      >
        {link.label}
        {location.pathname === link.href && (
          <motion.div
            layoutId="activeNavMobile"
            className="absolute inset-0 bg-white/10 rounded-full -z-10"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    ))}
  </motion.nav>
</div>
 
    </motion.header>
  );
};

export default Header;