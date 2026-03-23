import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Demo = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check authentication
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus !== "true") {
      navigate("/auth");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="overline mb-3 text-[10px]">Exclusive Access</p>
            <h1 className="text-2xl md:text-4xl font-light mb-3">
              Omni Key Demo Experience
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Watch how the Omni Key smart ring transforms everyday payments and safety 
              with next-generation NFC technology.
            </p>
          </motion.div>

          {/* Video Player Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card-elevated overflow-hidden"
          >
            <div 
              className="relative aspect-video bg-background/50 flex items-center justify-center cursor-pointer group"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {!isPlaying ? (
                <>
                  {/* Placeholder thumbnail */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-background/80" />
                  
                  {/* Play button */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative z-10 w-20 h-20 rounded-full bg-foreground/10 backdrop-blur-sm border border-foreground/20 flex items-center justify-center group-hover:bg-foreground/15 transition-colors"
                  >
                    <Play className="w-8 h-8 text-foreground ml-1" />
                  </motion.div>

                  {/* Duration badge */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded text-xs text-muted-foreground">
                    3:24
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    Demo video playing...
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Video chapters/sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 grid sm:grid-cols-3 gap-4"
          >
            {[
              { time: "0:00", title: "Introduction", desc: "Meet the Omni key ring" },
              { time: "1:12", title: "Tap-to-Pay", desc: "Seamless NFC payments" },
              { time: "2:30", title: "Safety Features", desc: "SOS and kill switch" },
            ].map((chapter, index) => (
              <div
                key={index}
                className="glass-card p-4 cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-250"
              >
                <span className="text-xs text-muted-foreground">{chapter.time}</span>
                <h3 className="text-sm font-medium mt-1">{chapter.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{chapter.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Additional content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Ready to experience it yourself?
            </p>
            <a href="#products" onClick={() => navigate("/")} className="btn-primary text-sm">
              Explore the Collection
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Demo;
