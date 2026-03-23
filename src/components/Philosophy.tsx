import { motion } from "framer-motion";

const principles = [
  "Safety over speed.",
  "Control over automation.",
  "Trust over growth hacks.",
];

const Philosophy = () => {
  return (
    <section className="section bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto"
        >
          <p className="overline mb-8">Platform Philosophy</p>

          <div className="space-y-4">
            {principles.map((principle, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-lg md:text-xl text-foreground/80 font-light"
              >
                {principle}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;
