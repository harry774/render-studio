import { motion } from "framer-motion";

/* Gold eyebrow tick — draws itself in when the section header scrolls into view */
const Tick = ({ origin = "left" }: { origin?: "left" | "right" }) => (
  <motion.span
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    className={`h-px w-10 bg-accent ${origin === "left" ? "origin-left" : "origin-right"}`}
  />
);

export default Tick;
