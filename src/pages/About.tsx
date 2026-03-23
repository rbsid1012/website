import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadershipCard from "@/components/about/LeadershipCard";
import TeamMemberCard from "@/components/about/TeamMemberCard";
import JoinUsCard from "@/components/about/JoinUsCard";
import FilterPills from "@/components/about/FilterPills";
import { ArrowRight, Mail } from "lucide-react";
import siddhartha from "@/assets/Siddhartha_Founder.jpeg";
import krishang from "@/assets/Krishang_Bali.png";
import divyansh from "@/assets/Divyansh_Head of IOT.png";
import mehar from "@/assets/Mehar_Dua.png";

// Leadership data
const leaders = [
  {
    name: "Siddhartha Yadav",
    role: "Founder & CEO",
    quote: "Nothing changes if you change nothing.",
    image: siddhartha,
  },
  {
    name: "Krishang Bali",
    role: "Co-Founder",
    quote: "Shared belief, relentless effort, and zero ego build unstoppable companies.",
    image:krishang,
  },
  {
    name: "Divyansh Mehta",
    role: "VP Hardware Engineering",
    quote: "Where hardware meets intelligence, innovation begins.",
    image: divyansh,
  },
  {
    name: "Mehar Dua",
    role: "VP Marketing",
    quote: "Attention is earned, trust is built, and brands are remembered.",
    image: mehar,
  },
];

// Team members data
const teamMembers = [
  {
    name: "Riya Gupta",
    role: "AI and Prompt Engineering Lead",
    image: "/src/assets/Riya_Gupta_AI_Prompt.png",
    department: "AI and Prompt Engineering",
  },
  {
    name: "Vrinda Chhabra",
    role: "AI and Prompt Engineering Lead",
    image: "/src/assets/vrinda.png",
    department: "AI and Prompt Engineering",
  },
  {
    name: "Pranjal Mehra",
    role: "AI and Prompt Engineer",
    image: "/src/assets/Pranjal_Mehra_AI_Prompt.jpeg",
    department: "AI and Prompt Engineering",
  },
  {
    name: "Emily Zhang",
    role: "AI Research Intern",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces",
    department: "AI Research",
  },
  {
    name: "Bhoomi Mittal",
    role: "IoT Engineer",
    image: "/src/assets/Bhoomi_Mittal_IoT.heic",
    department: "IoT Engineering",
  },
  {
    name: "Hardik Chandna",
    role: "IoT Engineer",
    image: "/src/assets/Hardik_Chandna_IoT.jfif",
    department: "IoT Engineering",
  },
  {
    name: "Vishista",
    role: "IoT Engineer",
    image: "/src/assets/Vishista_IoT.png",
    department: "IoT Engineering",
  },
  {
    name: "Akshat",
    role: "IoT Engineer",
    image: "/src/assets/Akshat_IoT.jpeg",
    department: "IoT Engineering",
  },
  {
    name: "Bhoomi Garg",
    role: "Marketing",
    image: "/src/assets/Bhoomi_Garg_Marketing.jpg",
    department: "Marketing",
  },
  {
    name: "Arham Jain",
    role: "Social Media Manager",
    image: "/src/assets/Arham_Jain_Social_Media.jpg",
    department: "Social Media",
  },
  {
    name: "Krish Gakhar",
    role: "Social Media Manager",
    image: "/src/assets/Krish_Gakhar_Social_Media.jpg",
    department: "Social Media",
  },
  {
    name: "Parth Setia",
    role: "Social Media Manager",
    image: "/src/assets/Parth_Setia_Social_Media.jpg",
    department: "Social Media",
  },
];

const filterOptions = ["All Teams", "IoT Engineering", "AI Research", "Marketing", "Social"];

const About = () => {
  const [activeFilter, setActiveFilter] = useState("All Teams");

  const filteredTeam = activeFilter === "All Teams"
    ? teamMembers
    : teamMembers.filter((m) => m.department === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="section-narrow">
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="overline mb-4">Our Team</p>
              <h1 className="headline-lg mb-6">
                The Minds Behind <span className="text-crimson font-medium">Omni Key</span>
              </h1>
              <p className="body-lg max-w-3xl mx-auto">
                We are a collective of visionaries, engineers, and designers obsessed with
                blending the cosmos of technology with the intimacy of the human form.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="section-narrow">
          <div className="container-wide">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-light text-center mb-12"
            >
              Leadership
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {leaders.map((leader, index) => (
                <LeadershipCard key={leader.name} {...leader} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="section-narrow">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center rounded-3xl p-10 md:p-14"
              style={{
                background: 'hsla(0, 0%, 100%, 0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid hsla(0, 0%, 100%, 0.1)',
                boxShadow: '0 8px 40px -8px hsla(0, 0%, 0%, 0.6)',
              }}
            >
              <h2 className="text-2xl md:text-3xl font-light mb-8">Our Philosophy</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  We believe technology should disappear. Not because it's not powerful,
                  but because it's so well integrated into our lives that we forget it's there.
                </p>
                <p>
                  Omni Key is our first step toward a future where your digital identity
                  is as secure and intuitive as your heartbeat.
                </p>
                <p>
                  Every decision we make is guided by one question:{" "}
                  <span className="text-foreground font-medium">"Would we be proud to wear this?"</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        {/* <section className="section-narrow">
          <div className="container-wide">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-light text-center mb-8"
            >
              Our Team
            </motion.h2>

            
            <div className="mb-12">
              <FilterPills
                filters={filterOptions}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
            </div>

            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredTeam.map((member, index) => (
                <TeamMemberCard
                  key={member.name}
                  {...member}
                  index={index}
                />
              ))}

              <JoinUsCard delay={filteredTeam.length * 0.05} />
            </div>
          </div>
        </section> */}

        {/* Bottom CTA Section */}
        <section className="section-narrow">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center rounded-3xl p-10 md:p-14"
              style={{
                background: 'hsla(0, 0%, 100%, 0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid hsla(0, 0%, 100%, 0.1)',
                boxShadow: '0 8px 40px -8px hsla(0, 0%, 0%, 0.6)',
              }}
            >
              <h2 className="text-2xl md:text-3xl font-light mb-4">
                Build the Future <span className="text-crimson font-medium">With Us</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Whether you're looking to join our team or collaborate on projects,
                we'd love to hear from you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/careers"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  See Careers
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="mailto:team@cosmicattire.com"
                  className="btn-ghost inline-flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Contact Team
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
