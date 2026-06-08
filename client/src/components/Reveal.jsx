import { motion } from "framer-motion";

const variants = {
  up: { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -40 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: 60 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } },
};

export default function Reveal({
  children,
  dir = "up",
  delay = 0,
  className = "",
  amount = 0.25,
}) {
  return (
    <motion.div
      className={className}
      variants={variants[dir]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
