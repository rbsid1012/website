import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const LoadingDots = () => (
  <div className="flex space-x-1 ml-2">
    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
  </div>
);

const HackathonRegister = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [teamSize, setTeamSize] = useState(1);
  const [teamMembers, setTeamMembers] = useState([
    { name: "", rollNumber: "", email: "", phone: "" }
  ]);
  const [formData, setFormData] = useState({
    teamName: "",
    experience: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Password validation
    if (formData.password.length < 8) {
      alert("❌ Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      // Step 1: Create user account with Supabase Auth (using first team member's email)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: teamMembers[0].email,
        password: formData.password,
        options: {
          data: {
            name: teamMembers[0].name,
            team_name: formData.teamName,
          }
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        alert(`❌ Registration failed: ${authError.message}`);
        setIsLoading(false);
        return;
      }

      // Step 2: Store registration data in database via Cloudflare Worker
      const apiUrl = import.meta.env.VITE_HACKATHON_API_URL;

      if (apiUrl) {
        const response = await fetch(`${apiUrl}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: authData.user?.id,
            name: teamMembers[0].name,
            email: teamMembers[0].email,
            phone: teamMembers[0].phone,
            team_name: formData.teamName,
            team_members: teamMembers,
            experience: formData.experience,
          }),
        });

        if (!response.ok) {
          console.error('Failed to store registration data');
        }
      }

      // Success - show confirmation
      setIsSubmitted(true);
      setTeamMembers([{ name: "", rollNumber: "", email: "", phone: "" }]);
      setTeamSize(1);
      setFormData({
        teamName: "",
        experience: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error('Registration error:', error);
      alert("❌ Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTeamSizeChange = (size: number) => {
    setTeamSize(size);
    const newMembers = Array.from({ length: size }, (_, i) =>
      teamMembers[i] || { name: "", rollNumber: "", email: "", phone: "" }
    );
    setTeamMembers(newMembers);
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setTeamMembers(updatedMembers);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center"
            >
              <Check className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500" />
            </motion.div>

            {/* Success Message */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground mb-4">
              Registration Successful!
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-8">
              Welcome to the Cosmic Attire IoT Bootcamp & Hackathon! Check your email for next steps.
            </p>

            {/* Back Button */}
            <Button
              onClick={() => navigate("/hackathon")}
              variant="outline"
              className="group rounded-full px-6 py-3 h-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Hackathon
            </Button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

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
            <p className="overline mb-3">Registration</p>
            <h1 className="text-2xl sm:text-3xl font-light text-foreground mb-3">
              Register for the Hackathon
            </h1>
            <p className="text-sm text-muted-foreground">
              Fill in your details to join the Cosmic Attire IoT Bootcamp
            </p>
          </motion.div>

          {/* Registration Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="glass-card p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6"
          >
            {/* Team Size Selector */}
            <div className="space-y-2">
              <Label htmlFor="teamSize" className="text-sm font-medium text-foreground">
                Team Size *
              </Label>
              <select
                id="teamSize"
                value={teamSize}
                onChange={(e) => handleTeamSizeChange(Number(e.target.value))}
                className="w-full h-11 sm:h-12 rounded-xl bg-white/5 border border-white/10 focus:border-crimson/50 focus:outline-none text-foreground px-4 transition-colors cursor-pointer"
                style={{ backgroundImage: 'none' }}
              >
                <option value={1} className="bg-background text-foreground">1 Member (Solo)</option>
                <option value={2} className="bg-background text-foreground">2 Members</option>
                <option value={3} className="bg-background text-foreground">3 Members</option>
                <option value={4} className="bg-background text-foreground">4 Members</option>
              </select>
            </div>

            {/* Team Members Section */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">Team Member Details</h3>
              {teamMembers.map((member, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-4">
                  <p className="text-sm font-medium text-crimson">Member {index + 1}{index === 0 ? ' (Team Lead)' : ''}</p>

                  {/* Member Name */}
                  <div className="space-y-2">
                    <Label htmlFor={`member-name-${index}`} className="text-xs font-medium text-foreground">
                      Full Name *
                    </Label>
                    <Input
                      id={`member-name-${index}`}
                      type="text"
                      required
                      value={member.name}
                      onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                      placeholder="Enter full name"
                      className="h-10 rounded-xl bg-white/5 border-white/10 focus:border-crimson/50 transition-colors"
                    />
                  </div>

                  {/* Member Roll Number */}
                  <div className="space-y-2">
                    <Label htmlFor={`member-roll-${index}`} className="text-xs font-medium text-foreground">
                      Roll Number *
                    </Label>
                    <Input
                      id={`member-roll-${index}`}
                      type="text"
                      required
                      value={member.rollNumber}
                      onChange={(e) => handleMemberChange(index, 'rollNumber', e.target.value)}
                      placeholder="Enter roll number"
                      className="h-10 rounded-xl bg-white/5 border-white/10 focus:border-crimson/50 transition-colors"
                    />
                  </div>

                  {/* Member Email */}
                  <div className="space-y-2">
                    <Label htmlFor={`member-email-${index}`} className="text-xs font-medium text-foreground">
                      Email Address *
                    </Label>
                    <Input
                      id={`member-email-${index}`}
                      type="email"
                      required
                      value={member.email}
                      onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                      placeholder="Enter email address"
                      className="h-10 rounded-xl bg-white/5 border-white/10 focus:border-crimson/50 transition-colors"
                    />
                    {index === 0 && (
                      <p className="text-xs text-crimson/80">
                        📧 This email will be used for logging into your team account
                      </p>
                    )}
                  </div>

                  {/* Member Phone */}
                  <div className="space-y-2">
                    <Label htmlFor={`member-phone-${index}`} className="text-xs font-medium text-foreground">
                      Phone Number *
                    </Label>
                    <Input
                      id={`member-phone-${index}`}
                      type="tel"
                      required
                      value={member.phone}
                      onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                      placeholder="Enter phone number"
                      className="h-10 rounded-xl bg-white/5 border-white/10 focus:border-crimson/50 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>


            {/* Team Name */}
            <div className="space-y-2">
              <Label htmlFor="teamName" className="text-sm font-medium text-foreground">
                Team Name *
              </Label>
              <Input
                id="teamName"
                name="teamName"
                type="text"
                required
                value={formData.teamName}
                onChange={handleInputChange}
                placeholder="Enter your team name"
                className="h-11 sm:h-12 rounded-xl bg-white/5 border-white/10 focus:border-crimson/50 transition-colors"
              />
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-sm font-medium text-foreground">
                IoT/Tech Experience
              </Label>
              <Input
                id="experience"
                name="experience"
                type="text"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="e.g., 2 years with Arduino, Raspberry Pi"
                className="h-11 sm:h-12 rounded-xl bg-white/5 border-white/10 focus:border-crimson/50 transition-colors"
              />
            </div>



            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Team Password *
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="At least 8 characters"
                className="h-11 sm:h-12 rounded-xl bg-white/5 border-white/10 focus:border-crimson/50 transition-colors"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                Confirm Password *
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Re-enter your password"
                className="h-11 sm:h-12 rounded-xl bg-white/5 border-white/10 focus:border-crimson/50 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 sm:h-14 rounded-full text-sm sm:text-base font-semibold transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--crimson)) 0%, hsl(0, 70%, 45%) 100%)',
                boxShadow: '0 8px 32px -8px hsla(0, 84%, 50%, 0.4), 0 0 0 1px hsla(0, 84%, 50%, 0.2)',
              }}
            >
              {isLoading ? (
                <>
                  Submitting
                  <LoadingDots />
                </>
              ) : (
                "Submit Registration"
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By registering, you agree to receive updates about the hackathon.
            </p>
          </motion.form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HackathonRegister;
