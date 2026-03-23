import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Briefcase, X, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react"; 

/* ================================
   🔥 HARD CODE SCRIPT URL HERE
================================ */

const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxpWGVzThPA7Hk9yRwcFVP7TlRz320r8r0OPvRQdCTj8KsiM7V1HhFCJxSQyi-kXV1g/exec"
/* ================================
   TYPES
================================ */

interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

interface RoleBracket {
  bracket: string;
  description: string;
  roles: JobRole[];
}

/* ================================
   ALL JOB ROLES
================================ */

const roleBrackets: RoleBracket[] =[
  {
    bracket: "Tech",
    description:
      "Build the core technology powering next-generation wearable payments and digital identity systems.",
    roles: [
      {
        id: "TECH-01",
        title: "IoT & Embedded Systems Intern",
        department: "Engineering",
        location: "Venture Lab, Patiala",
        type: "Internship",
        description:
          "Work hands-on with NFC hardware, embedded firmware, and secure device communication. Prototype wearable payment devices using microcontrollers, sensors, and encryption protocols."
      },
      {
        id: "TECH-02",
        title: "UI/UX Design Intern",
        department: "Product Design",
        location: "Venture Lab, Patiala",
        type: "Internship",
        description:
          "Design intuitive experiences for wearable technology. Craft user journeys, interface systems, and interaction flows optimized for mobile and wearable ecosystems."
      },
      {
        id: "TECH-03",
        title: "Full Stack App & Web Development Intern",
        department: "Engineering",
        location: "Venture Lab, Patiala",
        type: "Internship",
        description:
          "Build scalable platforms powering wearable payment infrastructure using modern frameworks, APIs, and cloud services."
      },
    ]
  },

  {
    bracket: "Analyst",
    description:
      "Drive research, intelligence, and strategic insights shaping the wearable fintech ecosystem.",
    roles: [
      {
        id: "ANL-01",
        title: "Research Analyst",
        department: "Strategy",
        location: "Venture Lab, Patiala",
        type: "Internship",
        description:
          "Conduct deep research on fintech, wearable technology, and digital identity trends that inform product direction and partnerships."
      },
      {
        id: "ANL-02",
        title: "Business Analyst",
        department: "Strategy",
        location: "Venture Lab, Patiala",
        type: "Internship",
        description:
          "Analyze business performance and develop data-driven growth strategies that help scale Cosmic Attire."
      }
    ]
  },

  {
    bracket: "Social Media",
    description:
      "Craft the visual identity and storytelling that shapes how the world sees Cosmic Attire.",
    roles: [
      {
        id: "SOC-01",
        title: "Cinematography Intern",
        department: "Media & Production",
        location: "Venture Lab, Patiala",
        type: "Internship",
        description:
          "Capture cinematic product visuals, behind-the-scenes footage, and storytelling content around wearable technology."
      },
      {
        id: "SOC-02",
        title: "Video Editing Intern",
        department: "Media & Production",
        location: "Venture Lab, Patiala",
        type: "Internship",
        description:
          "Edit engaging short-form and long-form content optimized for social media storytelling."
      }
    ]
  },

  {
    bracket: "Marketing",
    description:
      "Design and execute strategies that drive growth, awareness, and adoption.",
    roles: [
      {
        id: "MKT-01",
        title: "Customer Acquisition Specialist",
        department: "Growth Marketing",
        location: "Venture Lab, Patiala",
        type: "Internship",
        description:
          "Develop and optimize acquisition strategies across digital channels, partnerships, and marketing campaigns."
      },
      {
        id: "MKT-02",
        title: "Marketing Associate",
        department: "Marketing",
        location: "Venture Lab, Patiala",
        type: "Internship",
        description:
          "Execute brand campaigns and partnerships that expand the reach of Cosmic Attire’s wearable ecosystem."
      }
    ]
  },

  {
    bracket: "Leadership & Finance",
    description:
      "Collaborate with leadership on strategic initiatives shaping the company’s future.",
    roles: [
      {
        id: "INT-01",
        title: "Founder's Office & Finance Intern",
        department: "Leadership",
        location: "Venture Lab, Patiala",
        type: "Internship",
        description:
          "Work directly with the CEO on strategy, product launches, and operational execution in a fast-moving startup. and assist in financial modeling, budgeting, and fundraising preparation while building the financial backbone of the company."
      },
    ]
  }
];

/* ================================
   COMPONENT
================================ */

const Careers = () => {

  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    whyHire: "",
    experience: "",
    aboutCompany: ""
  });

  /* ================================
     FORM SUBMIT (UPDATED)
  ================================= */
const handleSubmit = async (e: any) => {
  e.preventDefault();
  if (!selectedRole) return;

  try {
    setLoading(true);

    const params = new URLSearchParams();

    params.append("role_id", selectedRole.id);
    params.append("role_title", selectedRole.title);
    params.append("name", formData.name);
    params.append("phone", formData.phone);
    params.append("email", formData.email);
    params.append("whyHire", formData.whyHire);
    params.append("experience", formData.experience);
    params.append("aboutCompany", formData.aboutCompany);

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: params
    });

    // Since no-cors prevents reading response,
    // we assume success if request completes

    setIsSubmitted(true);
    setSelectedRole(null);

    setFormData({
      name: "",
      phone: "",
      email: "",
      whyHire: "",
      experience: "",
      aboutCompany: ""
    });

  } catch (error: any) {
    console.error("Submission error:", error);
    alert("Application failed");
  } finally {
    setLoading(false);
  }
};

  /* ================================
     FORM CHANGE
  ================================= */

  const handleChange = (e: any) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  return (

    <div className="min-h-screen bg-background">

      <Header />

      <main className="pt-32 pb-24 px-6">

        {/* HERO */}

        <div className="text-center max-w-3xl mx-auto mb-24">

          <p className="overline mb-4">Careers</p>

          <h1 className="headline-lg mb-4">
            Join Cosmic Attire
          </h1>

          <p className="body-lg text-muted-foreground">
            Build the future of secure wearable technology.
          </p>

        </div>

        {/* SUCCESS MESSAGE */}

        {isSubmitted && (

          <div className="text-center mb-24">

            <Check className="mx-auto w-16 h-16 text-emerald-500 mb-6" />

            <h2 className="text-2xl font-medium">
              Application Submitted Successfully
            </h2>

          </div>

        )}

        {!isSubmitted && roleBrackets.map((bracket) => (

          <div key={bracket.bracket} className="mb-20">

            <h2 className="text-2xl font-semibold mb-2">
              {bracket.bracket}
            </h2>

            <p className="text-muted-foreground mb-8">
              {bracket.description}
            </p>

            <div className="space-y-6">

              {bracket.roles.map((role) => (

                <motion.div
                  key={role.id}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-8 transition-all duration-300 hover:shadow-xl"
                >

                  <div className="flex flex-col lg:flex-row justify-between gap-6">

                    <div>

                      <h3 className="text-xl font-medium mb-2">
                        {role.title}
                      </h3>

                      <p className="text-muted-foreground mb-4">
                        {role.description}
                      </p>

                      <div className="flex gap-6 text-sm text-muted-foreground">

                        <span className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          {role.department}
                        </span>

                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {role.location}
                        </span>

                        <span>{role.type}</span>

                      </div>

                    </div>

                    <Button
                      onClick={() => {
  setSelectedRole(role);
  setTimeout(() => {
    modalRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 50); // small delay lets the modal render first
}}
                    >
                      Apply Now
                    </Button>

                  </div>

                </motion.div>

              ))}

            </div>

          </div>

        ))}

        {/* APPLICATION MODAL */}

        <AnimatePresence>

          {selectedRole && (

            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) =>
                e.target === e.currentTarget && setSelectedRole(null)
              }
            >

              <motion.div
              ref={modalRef}
                className="glass-card-elevated p-10 max-w-2xl w-full"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
              >

                <div className="flex justify-between mb-6">

                  <h3 className="text-2xl font-semibold">
                    Apply for {selectedRole.title}
                  </h3>

                  <X
                    onClick={() => setSelectedRole(null)}
                    className="cursor-pointer"
                  />

                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >

                  <Input
                    name="name"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <Input
                    name="phone"
                    placeholder="Phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <textarea
                    name="whyHire"
                    rows={4}
                    placeholder="Why should we hire you?"
                    required
                    value={formData.whyHire}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 border border-border rounded-md px-4 py-3"
                  />

                  <textarea
                    name="experience"
                    rows={4}
                    placeholder="Any past experience?"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 border border-border rounded-md px-4 py-3"
                  />

                  <textarea
                    name="aboutCompany"
                    rows={4}
                    placeholder="What do you know about Cosmic Attire?"
                    required
                    value={formData.aboutCompany}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 border border-border rounded-md px-4 py-3"
                  />

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? "Submitting..." : "Submit Application"}
                  </Button>

                </form>

              </motion.div>

            </motion.div>

          )}

        </AnimatePresence>

      </main>

      <Footer />

    </div>
  );
};

export default Careers;