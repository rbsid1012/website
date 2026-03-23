import { motion } from "framer-motion";

interface TeamMemberCardProps {
  name: string;
  role: string;
  department: string;
  image: string;
  index: number;
}

const TeamMemberCard = ({ name, role, department, image, index }: TeamMemberCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative glass-card p-4 hover-lift"
      style={{
        background: 'hsla(0, 0%, 100%, 0.04)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid hsla(0, 0%, 100%, 0.08)',
        boxShadow: '0 4px 24px -4px hsla(0, 0%, 0%, 0.4)',
      }}
    >
      <div className="relative z-10 text-center">
        {/* Small Avatar */}
        <div className="relative mx-auto mb-3 w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-full border border-white/10 group-hover:border-crimson/30 transition-colors duration-500">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
          />
        </div>
        
        {/* Name */}
        <h4 className="text-sm font-medium text-foreground mb-1">{name}</h4>
        
        {/* Role - Crimson accent */}
        <p className="text-xs font-medium text-crimson uppercase tracking-wider mb-1">{role}</p>
        
        {/* Department badge */}
        <span className="inline-block text-[10px] text-muted-foreground/70 uppercase tracking-wider">
          {department}
        </span>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;
