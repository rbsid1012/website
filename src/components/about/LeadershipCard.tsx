import { motion } from "framer-motion";

interface LeadershipCardProps {
  name: string;
  role: string;
  quote: string;
  image: string;
  index: number;
}

const LeadershipCard = ({ name, role, quote, image, index }: LeadershipCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative glass-card p-6 hover-lift"
      style={{
        background: 'hsla(0, 0%, 100%, 0.06)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid hsla(0, 0%, 100%, 0.1)',
        boxShadow: '0 8px 32px -8px hsla(0, 0%, 0%, 0.5)',
      }}
    >
      {/* Hover glow overlay */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 40px -10px hsl(var(--crimson) / 0.15)',
        }}
      />
      
      <div className="relative z-10 text-center">
        {/* Avatar */}
        <div className="relative mx-auto mb-5 w-28 h-28 md:w-32 md:h-32 overflow-hidden rounded-full border-2 border-white/10 group-hover:border-crimson/30 transition-colors duration-500">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* Name */}
        <h3 className="text-lg font-medium text-foreground mb-1">{name}</h3>
        
        {/* Role - Crimson accent */}
        <p className="text-sm font-medium text-crimson uppercase tracking-wider mb-4">{role}</p>
        
        {/* Quote */}
        <p className="text-sm text-muted-foreground italic leading-relaxed">"{quote}"</p>
      </div>
    </motion.div>
  );
};

export default LeadershipCard;
