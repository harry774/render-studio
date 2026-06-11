import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import Tick from "@/sections/Tick";
import { processSteps } from "@/data/content";

/* A node on the process timeline — ignites gold as the drawn line reaches it */
const ProcessNode = ({
  progress,
  threshold,
  reduceMotion,
}: {
  progress: ReturnType<typeof useSpring>;
  threshold: number;
  reduceMotion: boolean | null;
}) => {
  const opacity = useTransform(progress, [threshold, threshold + 0.08], [0, 1]);
  const scale = useTransform(progress, [threshold, threshold + 0.08], [0.4, 1]);
  return (
    <div className="relative">
      <span className="absolute left-0 top-1/2 -mt-1 w-2 h-2 rounded-full bg-border" />
      <motion.span
        style={reduceMotion ? {} : { opacity, scale }}
        className="absolute left-0 top-1/2 -mt-1 w-2 h-2 rounded-full bg-accent shadow-glow"
      />
    </div>
  );
};

const ProcessSection = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 0.85", "end 0.6"] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 22, restDelta: 0.001 });

  return (
    <section
      id="process"
      className="relative py-28 lg:py-36 px-6 lg:px-10 bg-muted/40 border-y border-border overflow-hidden"
    >
      {/* subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="max-w-3xl mb-20">
            <div className="flex items-center gap-3 mb-6">
              <Tick />
              <span className="text-[10px] uppercase tracking-[0.32em] text-accent">The Process</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance mb-6">
              Predictable, <em className="text-gradient-gold not-italic font-medium">repeatable</em> craft.
            </h2>
            <p className="text-foreground/65 leading-relaxed max-w-2xl">
              Four stages — same on every project, whether it's a single bathroom or a 32-unit
              pre-construction launch.
            </p>
          </div>
        </ScrollReveal>

        <div ref={trackRef} className="relative">
          {/* Timeline — a gold hairline draws itself across as you scroll */}
          <div className="relative h-2 mb-10 hidden lg:block" aria-hidden="true">
            <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
            <motion.div
              style={{ scaleX: reduceMotion ? 1 : lineProgress }}
              className="absolute inset-x-0 top-1/2 h-px origin-left bg-gradient-to-r from-accent/40 via-accent to-accent"
            />
            <div className="absolute inset-0 grid grid-cols-4">
              {processSteps.map((step, i) => (
                <ProcessNode
                  key={step.step}
                  progress={lineProgress}
                  threshold={i / 4 + 0.015}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden shadow-soft">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1}>
                <div className="group relative h-full bg-card p-8 transition-smooth hover:bg-background">
                  <motion.span
                    initial={{ color: "hsla(36, 72%, 48%, 0.18)" }}
                    whileInView={{ color: "hsla(36, 72%, 48%, 0.7)" }}
                    viewport={{ once: true, margin: "-140px" }}
                    transition={{ duration: 0.9, delay: 0.25 + i * 0.18, ease: "easeOut" }}
                    className="font-serif text-6xl absolute top-6 right-6"
                  >
                    {step.step}
                  </motion.span>
                  <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-6">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
