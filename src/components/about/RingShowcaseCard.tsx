import { motion } from "framer-motion";

interface RingShowcaseCardProps {
  name: string;
  feature: string;
  image: string;
  index: number;
}

const RingShowcaseCard = ({ name, feature, image, index }: RingShowcaseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative glass-card overflow-hidden hover-lift cursor-pointer"
      style={{
        background: 'hsla(0, 0%, 100%, 0.06)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid hsla(0, 0%, 100%, 0.1)',
        boxShadow: '0 8px 32px -8px hsla(0, 0%, 0%, 0.5)',
      }}
    >
      {/* Hover glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 60px -20px hsl(var(--crimson) / 0.2)',
        }}
      />
      
      {/* Ring Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-5">
        <h3 className="text-base font-medium text-foreground mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{feature}</p>
        <span className="text-xs font-medium text-crimson hover:underline">
          View details →
        </span>
      </div>
    </motion.div>
  );
};

export default RingShowcaseCard;
