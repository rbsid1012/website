import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Rocket, ArrowLeft } from "lucide-react";

const HackathonAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth - in production, this would connect to Supabase
    setTimeout(() => {
      // Store auth state in localStorage for demo purposes
      localStorage.setItem("hackathonAuthenticated", "true");
      localStorage.setItem("hackathonUserEmail", email);
      if (!isLogin && username) {
        localStorage.setItem("hackathonUsername", username);
      }
      setIsLoading(false);
      navigate("/hackathon/round1");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-md mx-auto">
          {/* Back Link */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/hackathon")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Hackathon
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            {/* Hackathon Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-crimson/10 border border-crimson/30 mb-6">
              <Rocket className="w-4 h-4 text-crimson" />
              <span className="text-xs sm:text-sm text-crimson font-medium">
                IoT Bootcamp & Hackathon
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-light mb-3">
              {isLogin ? "Join the Hackathon" : "Create Your Account"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isLogin 
                ? "Sign in to access problem statements and submit your solutions" 
                : "Register to participate in the Cosmic Attire IoT Hackathon"
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
              {/* Username - Only for Signup */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-foreground">
                    Username
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required={!isLogin}
                    className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-crimson/50 transition-colors"
                    placeholder="Choose a username"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-crimson/50 transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-crimson/50 transition-colors"
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

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 sm:h-14 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--crimson)) 0%, hsl(0, 70%, 45%) 100%)',
                  boxShadow: '0 8px 32px -8px hsla(0, 84%, 50%, 0.4), 0 0 0 1px hsla(0, 84%, 50%, 0.2)',
                }}
              >
                {isLoading ? "Please wait..." : isLogin ? "Sign In & Continue" : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-xs text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-crimson hover:underline font-medium"
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

export default HackathonAuth;
