import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Clock,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Lightbulb,
  Cpu,
  Shield,
  Zap
} from "lucide-react";
import { supabase } from "@/lib/supabase";

// Problem statements for Round 1 - Challenge Tracks
const problemStatements = [
  // BLE Tracks
  {
    id: 1,
    title: "BLE Proximity & Localization",
    description: "This track focuses on using Bluetooth Low Energy signals to detect the presence of nearby devices and estimate their distance or relative location. It emphasizes indoor localization techniques where traditional GPS systems are ineffective.",
    category: "BLE Tracks",
    icon: Cpu,
  },
  {
    id: 2,
    title: "BLE Secure Communication & Pairing",
    description: "This track concentrates on establishing secure BLE connections between devices. The focus is on authenticated pairing, encrypted communication, and preventing unauthorized access or data interception.",
    category: "BLE Tracks",
    icon: Shield,
  },

  // IoT Web Server, Back-End & Cyber Security Tracks
  {
    id: 3,
    title: "IoT Web Dashboard & Device Management",
    description: "This track focuses on designing web-based platforms that allow users to monitor, manage, and control IoT devices remotely. Emphasis is placed on real-time data visualization and device control through web interfaces.",
    category: "IoT Web & Security",
    icon: Cpu,
  },
  {
    id: 4,
    title: "IoT Cyber Security & Intrusion Detection",
    description: "This track focuses on protecting IoT systems against cyber threats. It involves monitoring system behavior to detect anomalies, unauthorized access, or malicious activity.",
    category: "IoT Web & Security",
    icon: Shield,
  },
  {
    id: 5,
    title: "Secure OTA & Firmware Management",
    description: "This track explores secure methods for remotely updating IoT device firmware. It emphasizes firmware authenticity, integrity verification, and safe update mechanisms to prevent device compromise.",
    category: "IoT Web & Security",
    icon: Zap,
  },

  // NFC Technology Tracks
  {
    id: 6,
    title: "NFC Authentication & Access Control",
    description: "This track focuses on using Near Field Communication for secure authentication and access control systems. It emphasizes short-range communication for identity verification and permission-based access.",
    category: "NFC Technology",
    icon: Shield,
  },
  {
    id: 7,
    title: "NFC Secure Transactions & Identity Systems",
    description: "This track explores NFC-based systems designed for secure transactions and identity management. The focus is on data protection, secure validation, and preventing replay or cloning attacks.",
    category: "NFC Technology",
    icon: Shield,
  },

  // Open Innovation Track
  {
    id: 8,
    title: "Open Innovation Track",
    description: "This track allows participants to propose innovative IoT solutions beyond the predefined tracks. Present your unique idea that addresses real-world problems using IoT, BLE, NFC, or related technologies. Your solution should demonstrate creativity, technical feasibility, and potential impact.",
    category: "Open Innovation",
    icon: Lightbulb,
  },
];

const SUBMISSION_START = new Date("2026-02-04T00:00:00"); // When submissions open
const SUBMISSION_END = new Date("2026-02-06T08:00:00"); // When submissions close

const HackathonRound1 = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [timeState, setTimeState] = useState<"before" | "during" | "ended">("before");
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("hackathon_signed_in");
    if (!isAuthenticated) {
      navigate("/hackathon/auth");
    }
  }, [navigate]);

  // Timer logic
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();

      if (now < SUBMISSION_START) {
        setTimeState("before");
        const diff = SUBMISSION_START.getTime() - now.getTime();
        setCountdown(calculateTime(diff));
      } else if (now >= SUBMISSION_START && now <= SUBMISSION_END) {
        setTimeState("during");
        const diff = SUBMISSION_END.getTime() - now.getTime();
        setCountdown(calculateTime(diff));
      } else {
        setTimeState("ended");
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const calculateTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    return { days, hours, minutes, seconds };
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);

    if (file) {
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      if (file.size > maxSize) {
        setFileError("File size exceeds 2MB limit. Please upload a smaller file.");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || timeState !== "during") return;

    setIsSubmitting(true);
    setFileError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert("Please sign in to submit your solution.");
        setIsSubmitting(false);
        return;
      }


      // Upload file to Cloudinary
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`;

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', 'hackathon-submissions/round1');
      formData.append('public_id', `${user.id}_${Date.now()}`);

      const uploadResponse = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        console.error('Cloudinary upload error:', errorData);
        setFileError(`Upload failed: ${errorData.error?.message || 'Unknown error'}`);
        setIsSubmitting(false);
        return;
      }

      const uploadResult = await uploadResponse.json();
      const fileUrl = uploadResult.secure_url;

      // Save submission to database
      const { error: dbError } = await supabase
        .from('hackathon_submissions')
        .insert({
          user_id: user.id,
          file_url: fileUrl,
          file_name: selectedFile.name,
          file_size: selectedFile.size,
          round: 1,
          submitted_at: new Date().toISOString(),
        });

      if (dbError) {
        console.error('Database error:', dbError);
        setFileError(`Submission failed: ${dbError.message}`);
        setIsSubmitting(false);
        return;
      }

      // Success!
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      setFileError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("hackathon_signed_in");
    localStorage.removeItem("hackathon_team_name");
    navigate("/hackathon");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back & Logout */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate("/hackathon")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Hackathon
            </motion.button>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Logout
            </Button>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <p className="overline mb-3">Round 1</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground mb-4">
              Problem Statements
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Choose one problem statement and submit your solution. Each team can only submit once.
            </p>
          </motion.div>

          {/* Timer Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-6 sm:p-8 mb-8 sm:mb-12 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-crimson" />
              <span className="text-sm font-medium text-muted-foreground">
                {timeState === "before" && "Submission starts in"}
                {timeState === "during" && "Submission ends in"}
                {timeState === "ended" && "Submissions closed"}
              </span>
            </div>

            {timeState !== "ended" ? (
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground tabular-nums">
                    {String(countdown.days).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-1">Days</div>
                </div>
                <span className="text-2xl sm:text-3xl text-muted-foreground">:</span>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground tabular-nums">
                    {String(countdown.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-1">Hours</div>
                </div>
                <span className="text-2xl sm:text-3xl text-muted-foreground">:</span>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground tabular-nums">
                    {String(countdown.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-1">Mins</div>
                </div>
                <span className="text-2xl sm:text-3xl text-muted-foreground">:</span>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground tabular-nums">
                    {String(countdown.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-1">Secs</div>
                </div>
              </div>
            ) : (
              <div className="text-xl sm:text-2xl text-muted-foreground">
                Round 1 has ended
              </div>
            )}
          </motion.div>


          {/* Rules & Regulations Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-lg sm:text-xl font-medium text-foreground mb-6 text-center">
              Rules & Regulations
            </h2>
            <div className="glass-card p-5 sm:p-6 md:p-8 space-y-6">
              {/* Rule 1 */}
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-crimson mb-2">
                  1. Participation Format & Team Size
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Team size can range from 1 to 4 members.
                </p>
              </div>

              {/* Rule 2 */}
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-crimson mb-2">
                  2. Single Team Policy
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  A participant is allowed to be a part of only one team. If any participant is found to be associated with multiple teams, they will be immediately disqualified.
                </p>
              </div>

              {/* Rule 3 */}
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-crimson mb-2">
                  3. Hackathon Structure & Rounds
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                  The hackathon will consist of three rounds:
                </p>
                <ul className="list-disc list-inside text-xs sm:text-sm text-muted-foreground space-y-1 ml-2">
                  <li>Round 1: Elimination Round</li>
                  <li>Round 2: Sudden Challenge</li>
                  <li>Round 3: Pitching Competition</li>
                </ul>
              </div>

              {/* Rule 4 */}
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-crimson mb-2">
                  4. Eliminations
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Eliminations in any round are final and will not be revised or reconsidered under any circumstances.
                </p>
              </div>

              {/* Rule 5 */}
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-crimson mb-2">
                  5. Submission Deadline
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  All submissions must be completed and submitted within the allotted time only. No extensions will be provided.
                </p>
              </div>

              {/* Rule 6 */}
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-crimson mb-2">
                  6. Presentation (PPT) Guidelines
                </h3>
                <ul className="list-disc list-inside text-xs sm:text-sm text-muted-foreground space-y-1 ml-2">
                  <li>The final presentation must not exceed 20 slides.</li>
                  <li>The first slide must include team details (team name, problem title, institute).</li>
                  <li>One slide must include team member details, including names, roles, and prior experience.</li>
                  <li>The presentation must include a summary/conclusion slide at the end.</li>
                </ul>
              </div>

              {/* Rule 7 */}
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-crimson mb-2">
                  7. Originality, Inspiration & Innovation
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                  Participants may take inspiration from existing solutions, real-world problems, or prior experiences. However, direct copying of ideas, content, or solutions from the internet or any other source is strictly prohibited.
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                  Any form of cheating or plagiarism will result in immediate elimination.
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                  Each idea must clearly define its Unique Selling Points (USPs) and explain:
                </p>
                <ul className="list-disc list-inside text-xs sm:text-sm text-muted-foreground space-y-1 ml-2">
                  <li>What makes the idea innovative</li>
                  <li>How it is different from existing solutions</li>
                  <li>Why it creates unique value or impact</li>
                </ul>
              </div>

              {/* Rule 8 */}
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-crimson mb-2">
                  8. Judging Criteria
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  The judging criteria will be shared with participants soon, outlining the evaluation parameters and patterns followed by the judging panel.
                </p>
              </div>

              {/* Rule 9 */}
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-crimson mb-2">
                  9. Judging Decision
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  The decision of the judging panel will be final and binding, and no appeals will be entertained.
                </p>
              </div>

              {/* Rule 10 */}
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-crimson mb-2">
                  10. Code of Conduct
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Participants are expected to maintain professional and ethical behavior throughout the hackathon. Any misconduct may lead to disqualification.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Problem Statements Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-lg sm:text-xl font-medium text-foreground mb-6 text-center">
              Choose Your Challenge
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {problemStatements.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="glass-card p-5 sm:p-6 hover:border-crimson/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-crimson/10 border border-crimson/30 flex items-center justify-center flex-shrink-0">
                      <problem.icon className="w-5 h-5 sm:w-6 sm:h-6 text-crimson" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] sm:text-xs font-medium text-crimson uppercase tracking-wider">
                          {problem.category}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-medium text-foreground mb-2">
                        {problem.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Submission Portal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-crimson/10 border border-crimson/30 flex items-center justify-center">
                <FileText className="w-5 h-5 text-crimson" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-foreground">Submission Portal</h2>
                <p className="text-xs text-muted-foreground">Upload your solution (Max 2MB)</p>
              </div>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-2">
                  Submission Received!
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your solution has been submitted successfully. Good luck!
                </p>
              </div>
            ) : timeState === "ended" ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 border-2 border-muted flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-2">
                  Submissions Closed
                </h3>
                <p className="text-sm text-muted-foreground">
                  The submission window has ended. Stay tuned for results!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* File Upload Area */}
                <div
                  onClick={() => timeState === "during" && fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${timeState === "during"
                    ? "border-white/20 hover:border-crimson/50 cursor-pointer"
                    : "border-white/10 cursor-not-allowed opacity-50"
                    }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    disabled={timeState !== "during"}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.zip,.rar,.txt"
                  />

                  <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />

                  {selectedFile ? (
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {timeState === "before"
                          ? "Uploads will be enabled when submissions open"
                          : "Click to upload or drag and drop"
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, DOC, DOCX, ZIP (Max 2MB)
                      </p>
                    </div>
                  )}
                </div>

                {/* File Error */}
                {fileError && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-400">{fileError}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={!selectedFile || timeState !== "during" || isSubmitting}
                  className="w-full h-12 sm:h-14 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 disabled:opacity-50"
                  style={{
                    background: selectedFile && timeState === "during"
                      ? 'linear-gradient(135deg, hsl(var(--crimson)) 0%, hsl(0, 70%, 45%) 100%)'
                      : undefined,
                    boxShadow: selectedFile && timeState === "during"
                      ? '0 8px 32px -8px hsla(0, 84%, 50%, 0.4), 0 0 0 1px hsla(0, 84%, 50%, 0.2)'
                      : undefined,
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Submit Solution"}
                </Button>

                {timeState === "before" && (
                  <p className="text-xs text-center text-muted-foreground">
                    Submissions will open once the timer reaches zero
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HackathonRound1;
