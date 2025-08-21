import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  Settings,
  Users,
  UserPlus,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Product", path: "/product", icon: Package },
    { name: "How It Works", path: "/how-it-works", icon: Settings },
    { name: "Join Waitlist", path: "/join-waitlist", icon: UserPlus },
    { name: "Partner Access", path: "/creator-access", icon: Users },
    { name: "FAQ", path: "/faq", icon: HelpCircle },
  ];

  const isActive = (path: string) => location.pathname === path;
  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <>
      {/* 🔳 Dim background when mobile and expanded */}
      {isMobile && isExpanded && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* ✅ Show sidebar ONLY when expanded */}
      {(isExpanded || isMobile) && (
        <div
          className={`fixed right-0 top-0 h-full w-64 bg-[#141414] text-white z-50 transition-all duration-300`}
        >
          {/* Logo */}
          <div className="p-4 border-b border-border">
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">α1</span>
              </div>
              <span className="text-lg font-bold text-white">ALPHA 1</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2 flex flex-col items-center">
            {navItems.map((item) => {
              const isItemActive = isActive(item.path);
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => isMobile && setIsExpanded(false)}
                  className={`group relative flex items-center justify-start w-full p-3 rounded-lg transition-all duration-300 ${
                    isItemActive
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* ✅ Always-visible toggle button (desktop & mobile) */}
<button
  onClick={toggleSidebar}
  className="fixed top-4 right-4 z-50 p-1 text-white"
>

        {isExpanded ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </>
  );
};

export default Sidebar;
