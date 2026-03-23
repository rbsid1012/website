import { motion } from "framer-motion";

interface FilterPillsProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterPills = ({ filters, activeFilter, onFilterChange }: FilterPillsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-2"
    >
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
            activeFilter === filter
              ? "text-white"
              : "text-muted-foreground hover:text-foreground"
          }`}
          style={{
            background: activeFilter === filter 
              ? 'hsl(var(--crimson))' 
              : 'hsla(0, 0%, 100%, 0.06)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: activeFilter === filter 
              ? '1px solid hsl(var(--crimson))' 
              : '1px solid hsla(0, 0%, 100%, 0.1)',
            boxShadow: activeFilter === filter 
              ? '0 0 20px -5px hsl(var(--crimson) / 0.5)' 
              : 'none',
          }}
        >
          {filter}
        </button>
      ))}
    </motion.div>
  );
};

export default FilterPills;
