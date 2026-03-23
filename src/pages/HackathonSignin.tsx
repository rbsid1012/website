import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

const HackathonSignin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
      return;
    }

    console.log('🔐 Attempting sign in...', { email: formData.email });

    try {
      // Sign in with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      console.log('📊 Supabase response:', { data, error });

      if (error) {
        console.error('❌ Sign in error:', error);
        alert(`Invalid credentials: ${error.message}`);
        return;
      }

      if (data.user) {
        console.log('✅ User signed in successfully:', data.user.id);

        // Set signed in flag for ProtectedRoute
        localStorage.setItem('hackathon_signed_in', 'true');
        console.log('📝 Set hackathon_signed_in to localStorage');

        // Store team name in localStorage for compatibility
        const teamName = data.user.user_metadata?.team_name || '';
        localStorage.setItem('hackathon_team_name', teamName);
        console.log('📝 Set hackathon_team_name:', teamName);

        console.log('🚀 Navigating to /hackathon/round1...');

        // Use setTimeout to ensure localStorage is committed and React re-renders
        setTimeout(() => {
          navigate('/hackathon/round1', { replace: true });
          console.log('✅ Navigation executed');
        }, 100);
      } else {
        console.warn('⚠️ No user data returned');
        alert("Sign-in failed: No user data returned.");
      }
    } catch (error) {
      console.error('❌ Sign in failed:', error);
      alert("Sign-in failed. Please try again.");
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-lg mx-auto">
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

          {/* Form Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-10"
          >
            <p className="overline mb-3">Sign In</p>
            <h1 className="text-2xl sm:text-3xl font-light text-foreground mb-3">
              Sign In to the Hackathon
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access the Cosmic Attire IoT Bootcamp
            </p>
          </motion.div>

          {/* Sign In Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="glass-card p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6"
          >
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="h-11 sm:h-12 rounded-xl bg-white/5 border-white/10 focus:border-crimson/50 transition-colors"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password *
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="h-11 sm:h-12 rounded-xl bg-white/5 border-white/10 focus:border-crimson/50 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 sm:h-14 rounded-full text-sm sm:text-base font-semibold transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--crimson)) 0%, hsl(0, 70%, 45%) 100%)',
                boxShadow: '0 8px 32px -8px hsla(0, 84%, 50%, 0.4), 0 0 0 1px hsla(0, 84%, 50%, 0.2)',
              }}
            >
              Sign In
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/hackathon/register")}
                className="text-crimson hover:underline"
              >
                Register here
              </button>
            </p>

            <p className="text-xs text-center text-muted-foreground mt-2">
              Use the email and password you registered with.
            </p>
          </motion.form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HackathonSignin;
