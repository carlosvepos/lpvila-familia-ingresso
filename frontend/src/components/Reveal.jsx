import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.8, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const MaskedLine = ({ children, delay = 0, className = "" }) => (
  <motion.span
    className={`block overflow-hidden ${className}`}
    initial="hide"
    whileInView="show"
    viewport={{ once: true, amount: 0.15 }}
  >
    <motion.span
      className="block"
      variants={{ hide: { y: "112%" }, show: { y: "0%" } }}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </motion.span>
);
