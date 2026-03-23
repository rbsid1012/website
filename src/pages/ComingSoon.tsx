import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="w-6 h-px bg-crimson inline-block mb-6" />
          <p className="text-xs uppercase tracking-widest text-crimson mb-4">
            Stay Tuned
          </p>
          <h1 className="text-5xl font-light mb-4">Coming Soon</h1>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            We're working on something exciting. Check back soon.
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoon;