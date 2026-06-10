import { motion, useInView, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ImageRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Unmasks an image bottom-to-top (clip-path wipe) while easing scale 1.06 → 1.
 * Wrap the <picture>/<img> directly — the parent should own rounding/overflow.
 *
 * The in-view trigger lives on an unclipped outer div: a fully clipped element
 * reports zero intersection to IntersectionObserver, which would deadlock the
 * reveal if it observed itself.
 */
const ImageReveal = ({ children, delay = 0, className = "" }: ImageRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={`h-full w-full ${className}`}>{children}</div>;
  }

  return (
    <div ref={ref} className={`h-full w-full ${className}`}>
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={isInView ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full"
      >
        <motion.div
          initial={{ scale: 1.06 }}
          animate={isInView ? { scale: 1 } : undefined}
          transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ImageReveal;
