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
  const [isExpanded, setIsExpanded] = useState(false); // starts closed
  const location = useLocation();

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
      {/* Dim background when sidebar is open */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-[#141414] text-white z-50 w-64 transition-transform duration-300 ${
          isExpanded ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Logo + cross */}
        <div className="p-4 border-b border-border flex flex-col items-center relative">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mb-2">
            <span className="text-primary-foreground font-bold text-sm">α1</span>
          </div>
          <span className="text-lg font-bold text-white mb-2">ALPHA 1</span>

          {/* Close button */}
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 p-2 bg-[#141414] rounded-md text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex flex-col items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsExpanded(false)} // auto-close on click
                className={`group relative flex items-center justify-start w-full p-3 rounded-lg transition-all duration-300 ${
                  isActive(item.path)
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

      {/* Hamburger / three-dot button */}
      {!isExpanded && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 right-4 z-50 p-2 rounded-md bg-[#141414] text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default Sidebar;
