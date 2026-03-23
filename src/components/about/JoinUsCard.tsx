import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, ArrowRight } from "lucide-react";

interface JoinUsCardProps {
  delay?: number;
}

const JoinUsCard = ({ delay = 0 }: JoinUsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative p-4 rounded-xl border-2 border-dashed border-white/20 hover:border-crimson/40 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[180px]"
      style={{
        background: 'hsla(0, 0%, 100%, 0.02)',
      }}
    >
      {/* Hover glow */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 40px -15px hsl(var(--crimson) / 0.2)',
        }}
      />
      
      <div className="relative z-10 text-center">
        {/* Plus icon */}
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full border border-crimson/30 bg-crimson/10 group-hover:bg-crimson/20 transition-colors">
          <Plus className="w-6 h-6 text-crimson" />
        </div>
        
        <h4 className="text-base font-medium text-foreground mb-1">You?</h4>
        <p className="text-xs text-muted-foreground mb-4">Join our growing team</p>
        
        <Link
          to="/careers"
          className="inline-flex items-center gap-1 text-xs font-medium text-crimson hover:underline"
        >
          View Open Roles
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default JoinUsCard;
