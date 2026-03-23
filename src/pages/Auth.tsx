import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth - in production, this would connect to Supabase
    setTimeout(() => {
      // Store auth state in localStorage for demo purposes
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      setIsLoading(false);
      navigate("/demo");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl md:text-3xl font-light mb-3">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isLogin 
                ? "Sign in to access your demo video and account" 
                : "Join Cosmic Attire to explore the omni key platform"
              }
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-6 md:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-xs text-muted-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-sm bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-foreground/30 transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs text-muted-foreground mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 text-sm bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-foreground/30 transition-all"
                  placeholder="••••••••"
                />
              </div>

              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full text-sm py-3.5 disabled:opacity-50"
              >
                {isLoading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-xs text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-foreground hover:underline"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-6 text-xs text-muted-foreground"
          >
            By continuing, you agree to our{" "}
            <Link to="/support" className="hover:text-foreground transition-colors underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/support" className="hover:text-foreground transition-colors underline">
              Privacy Policy
            </Link>
          </motion.p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
