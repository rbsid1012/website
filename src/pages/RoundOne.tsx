import { motion } from "framer-motion";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Lightbulb, Target, Upload, X } from "lucide-react";

const RoundOne = () => {
  // JSON data for rules and regulations
  const rulesData = {
    title: "Rules & Regulations",
    description: "Please read and follow all rules carefully to ensure fair participation.",
    rules: [
      "Team size can range from 1 to 4 members.",
      "A participant is allowed to be a part of only one team. If any participant is found to be associated with multiple teams, they will be immediately disqualified.",
      `The hackathon will consist of three rounds: 
      Round 1: Elimination Round
      Round 2: Sudden Challenge
      Round 3: Pitching Competition`,
      "Eliminations in any round are final and will not be revised or reconsidered under any circumstances.",
      "All submissions must be completed and submitted within the allotted time only. No extensions will be provided.",
      `The final presentation must not exceed 20 slides.
      The first slide must include team details (team name, problem title, institute).
      One slide must include team member details, including names, roles, and prior experience.
      The presentation must include a summary/conclusion slide at the end.`,
      "Maintain professionalism and respect towards all participants."
    ]
  };

  // JSON data for problem statements
  const problemStatements = [
    {
      id: 1,
      title: "Smart Wearable for Health Monitoring",
      description: "Develop a wearable device that monitors vital health metrics in real-time and provides actionable insights.",
      category: "Healthcare",
      difficulty: "Medium",
      points: 100
    },
    {
      id: 2,
      title: "IoT-Based Environmental Sensor Network",
      description: "Create a network of sensors to monitor environmental parameters like air quality, temperature, and humidity.",
      category: "Environment",
      difficulty: "Hard",
      points: 150
    },
    {
      id: 3,
      title: "AI-Powered Smart Home Assistant",
      description: "Build an intelligent home assistant that learns user preferences and automates daily tasks.",
      category: "Smart Home",
      difficulty: "Medium",
      points: 120
    },
    {
      id: 4,
      title: "Sustainable Energy Management System",
      description: "Design a system to optimize energy consumption in buildings using IoT and machine learning.",
      category: "Energy",
      difficulty: "Hard",
      points: 140
    },
    {
      id: 5,
      title: "Wearable Safety Device for Workers",
      description: "Create a wearable device that enhances safety for workers in hazardous environments.",
      category: "Safety",
      difficulty: "Easy",
      points: 80
    }
  ];

  // State for submission modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionData, setSubmissionData] = useState({
    selectedProblem: "",
    description: "",
    files: [] as File[]
  });

  // Get team name from localStorage (set during registration)
  const teamName = localStorage.getItem('hackathon_team_name') || '';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 2 * 1024 * 1024; // 2MB
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        alert(`${file.name} is too large. Maximum size is 2MB.`);
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        alert(`${file.name} is not a valid file type. Only PDF and PPTX files are allowed.`);
        return false;
      }
      return true;
    });

    setSubmissionData(prev => ({ ...prev, files: validFiles }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!teamName) {
      alert("Team name not found. Please register again.");
      return;
    }
    
    if (!submissionData.selectedProblem || submissionData.files.length === 0) {
      alert("Please select a problem and upload at least one file.");
      return;
    }

    // Here you would typically send the data to your backend
    const formData = new FormData();
    formData.append("problemId", submissionData.selectedProblem);
    formData.append("teamName", teamName);
    formData.append("description", submissionData.description);
    submissionData.files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    try {
      // Simulate API call
      alert("Submission successful! Your idea has been submitted.");
      setIsModalOpen(false);
      setSubmissionData({
        selectedProblem: "",
        description: "",
        files: []
      });
    } catch (error) {
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8 sm:mb-12">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground"
            >
              Round 1
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="rounded-full px-6 py-3 h-auto text-sm sm:text-base font-semibold transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--crimson)) 0%, hsl(0, 70%, 45%) 100%)',
                      boxShadow: '0 8px 32px -8px hsla(0, 84%, 50%, 0.4), 0 0 0 1px hsla(0, 84%, 50%, 0.2)',
                    }}
                  >
                    Submit Your Idea
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Submit Your Hackathon Idea</DialogTitle>
                    <DialogDescription>
                      Fill in the details below to submit your innovative idea for Round 1.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Problem Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="problem">Select Problem Statement *</Label>
                      <Select value={submissionData.selectedProblem} onValueChange={(value) => setSubmissionData(prev => ({ ...prev, selectedProblem: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a problem statement" />
                        </SelectTrigger>
                        <SelectContent>
                          {problemStatements.map((problem) => (
                            <SelectItem key={problem.id} value={problem.id.toString()}>
                              {problem.title} ({problem.category})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>


                    {/* File Upload */}
                    <div className="space-y-2">
                      <Label htmlFor="files">Upload Files * (PDF or PPTX, max 2MB each)</Label>
                      <Input
                        id="files"
                        type="file"
                        multiple
                        accept=".pdf,.pptx"
                        onChange={handleFileUpload}
                        className="file:mr-4 file:py-3 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-crimson file:text-white hover:file:bg-crimson/80 h-16"
                      />
                      {submissionData.files.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Uploaded files:</p>
                          {submissionData.files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-muted p-5 rounded">
                              <span className="text-sm">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setSubmissionData(prev => ({ ...prev, files: prev.files.filter((_, i) => i !== index) }))}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" style={{
                        background: 'linear-gradient(135deg, hsl(var(--crimson)) 0%, hsl(0, 70%, 45%) 100%)',
                      }}>
                        Submit Idea
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>

          {/* Rules and Regulations Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                  {rulesData.title}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {rulesData.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {rulesData.rules.map((rule, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{rule}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Problem Statements Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl font-light text-foreground mb-6 flex items-center gap-2">
              <Target className="w-7 h-7 text-crimson" />
              Problem Statements
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {problemStatements.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="glass-card h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge
                          variant={
                            problem.difficulty === 'Easy' ? 'default' :
                            problem.difficulty === 'Medium' ? 'secondary' : 'destructive'
                          }
                          className="text-xs"
                        >
                          {problem.difficulty}
                        </Badge>
                        <span className="text-sm font-semibold text-crimson">
                          {problem.points} pts
                        </span>
                      </div>
                      <CardTitle className="text-lg sm:text-xl leading-tight">
                        {problem.title}
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        {problem.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm sm:text-base text-muted-foreground mb-4">
                        {problem.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full rounded-full"
                      >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Select This Problem
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RoundOne;
