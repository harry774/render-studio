import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useInView,
  AnimatePresence,
  MotionConfig,
  animate,
} from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Quote,
  Play,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ImageReveal from "@/components/ImageReveal";
import Typewriter from "@/components/Typewriter";
import Tick from "@/sections/Tick";
import ServicesSection from "@/sections/ServicesSection";
import PortfolioSection from "@/sections/PortfolioSection";
import ProcessSection from "@/sections/ProcessSection";
import AboutSection from "@/sections/AboutSection";
import BlogSection from "@/sections/BlogSection";
import ContactSection from "@/sections/ContactSection";
import { stats, testimonials, clients, faqs } from "@/data/content";
import { toWebp } from "@/lib/img";

/* Stat value that counts up the first time it enters the viewport — "500+" → 0…500+ */
const CountUp = ({ value, className = "" }: { value: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView || !match) return;
    if (reduceMotion) {
      setDisplay(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, target, reduceMotion]);

  if (!match) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
};

const getVisibleTestimonials = (startIndex: number) => {
  const result = [];
  for (let i = 0; i < 3; i++) {
    result.push(testimonials[(startIndex + i) % testimonials.length]);
  }
  return result;
};

const TestimonialsCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduceMotion = useReducedMotion();

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4500);
  }, []);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const go = (dir: "prev" | "next") => {
    setDirection(dir === "next" ? 1 : -1);
    setCurrent((prev) => dir === "next"
      ? (prev + 1) % testimonials.length
      : (prev - 1 + testimonials.length) % testimonials.length
    );
    resetTimer();
  };

  const visible = getVisibleTestimonials(current);

  return (
    <section className="relative py-28 lg:py-36 px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Tick />
                <span className="text-[10px] uppercase tracking-[0.32em] text-accent">Client Words</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
                Trusted by people who <em className="text-gradient-gold not-italic font-medium">care</em> about detail.
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => go("prev")}
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-smooth cursor-pointer"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => go("next")}
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-smooth cursor-pointer"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="relative" onMouseEnter={pauseTimer} onMouseLeave={resetTimer}>
          <motion.div
            drag={reduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go("next");
              else if (info.offset.x > 60) go("prev");
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 cursor-grab active:cursor-grabbing"
          >
            {visible.map((t, idx) => (
              <motion.figure
                key={`${current}-${t.name}`}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 48 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full p-8 lg:p-10 rounded-2xl bg-card border border-border shadow-soft transition-smooth hover:border-primary/30 hover:shadow-elegant"
              >
                <Quote className="w-8 h-8 text-primary/30 mb-6" />
                <blockquote className="font-serif text-lg md:text-xl leading-snug text-foreground mb-8">
                  "{t.quote}"
                </blockquote>
                <figcaption className="pt-6 border-t border-border">
                  <div className="font-medium text-sm text-foreground">{t.name}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{t.role}</div>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>

          <div className="flex items-center justify-center gap-2 mt-10">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setCurrent(idx); resetTimer(); }}
                className={`h-1.5 rounded-full transition-smooth cursor-pointer ${
                  idx === current ? "w-8 bg-accent" : "w-3 bg-border hover:bg-foreground/30"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface IndexProps {
  initialHash?: string;
}

const Index = ({ initialHash }: IndexProps) => {
  const reduceMotion = useReducedMotion();

  // Hero parallax — hooks must be at top level
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Honour incoming hash from legacy routes / direct links
  useEffect(() => {
    const hash = initialHash || window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [initialHash]);

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* ============================ HERO ============================ */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen w-full bg-background flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Hero background image — fades from left, desktop only, gentle parallax on scroll */}
        <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-[65%]"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 28%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 28%)",
              ...(reduceMotion ? {} : { y: heroY, scale: heroScale, opacity: heroOpacity }),
            }}
          >
            <picture>
              <source srcSet={toWebp("/assets/kitchen-1.png")} type="image/webp" />
              <img
                src="/assets/kitchen-1.png"
                alt=""
                aria-hidden="true"
                width={1600}
                height={1067}
                className="w-full h-full object-cover object-center"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220_18%_8%/0.35)] via-[hsl(220_18%_8%/0.15)] to-transparent" />
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[hsl(220_18%_8%)] to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-10 pt-28 pb-12 flex flex-col items-center text-center">
          {/* Typewriter headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              We create{" "}
              <span className="text-gradient-gold-bright italic">
                <Typewriter
                  phrases={[
                    "stunning renders",
                    "photoreal interiors",
                    "cinematic visuals",
                    "exterior views",
                    "3D walkthroughs",
                  ]}
                  typingSpeed={70}
                  deletingSpeed={35}
                  pauseDuration={2000}
                />
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-base md:text-lg text-foreground/90 leading-relaxed mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            Cinematic 3D visualizations for architects, developers and interior
            designers across Canada — photoreal, on-brief, and consistently fast.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-accent text-background text-xs uppercase tracking-[0.2em] font-semibold hover:bg-accent/85 transition-smooth cursor-pointer shadow-glow"
            >
              Free Consultation
              <ArrowUpRight className="w-4 h-4 transition-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#portfolio"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-foreground/25 text-foreground text-xs uppercase tracking-[0.2em] font-medium hover:border-accent hover:text-accent transition-smooth cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              View Portfolio
            </a>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0 }}
          className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden shadow-soft">
            {stats.map((s) => (
              <div key={s.label} className="bg-card p-6 text-center">
                <CountUp value={s.value} className="block font-serif text-3xl lg:text-4xl text-primary" />
                <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ============================ MARQUEE / TRUSTED ============================ */}
      <section className="relative py-10 border-y border-border bg-muted/50 overflow-hidden">
        <div
          className="flex gap-16 whitespace-nowrap animate-marquee"
          style={{ width: "max-content" }}
        >
          {[...Array(2)].map((_, dupIdx) => (
            <div key={dupIdx} className="flex items-center gap-16 pr-16">
              {[
                "Photorealistic Rendering",
                "Fast Turnaround",
                "Toronto · Canada",
                "Architectural Visualization",
                "Interior · Exterior · Commercial",
                "2D Drawings & 3D Walkthroughs",
                "Trusted by Architects & Developers",
              ].map((text, i) => (
                <div
                  key={`${dupIdx}-${i}`}
                  className="flex items-center gap-16"
                >
                  <span className="text-sm uppercase tracking-[0.3em] text-foreground/60 font-light">
                    {text}
                  </span>
                  <span className="text-accent text-xs">✦</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============================ ABOUT / INTRO STRIP ============================ */}
      <section className="relative py-28 lg:py-36 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <ScrollReveal direction="left" className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-elegant">
              <ImageReveal>
                <picture>
                  <source srcSet={toWebp("/assets/bedroom-4.png")} type="image/webp" />
                  <img
                    src="/assets/bedroom-4.png"
                    alt="Luxury bedroom render"
                    width={1000}
                    height={1250}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </ImageReveal>
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-[hsl(216_50%_15%/0.75)] backdrop-blur-md border border-white/15">
                <Sparkles className="w-4 h-4 text-accent flex-shrink-0" />
                <p className="text-xs uppercase tracking-[0.22em] text-white">
                  Photoreal — never AI-stamped
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15} className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <Tick />
              <span className="text-[10px] uppercase tracking-[0.32em] text-accent">About the Studio</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8 text-balance">
              A small Canadian studio of <em className="text-gradient-gold not-italic font-medium">obsessive</em> 3D artists.
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-5 max-w-2xl">
              We craft visualizations the way a cinematographer lights a film — with attention to mood,
              material, and the way light actually behaves at 6:42pm in a Toronto living room.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-10 max-w-2xl">
              Every render leaves the studio reviewed by a senior artist. Every project gets two free
              revision rounds. Every client gets a real human on the other end of email.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
              {[
                "Senior-Reviewed",
                "2 Free Revisions",
                "NDA Friendly",
                "Print-Ready Files",
                "Day & Dusk Versions",
                "Rush Delivery",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs text-foreground/70"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================ SERVICES ============================ */}
      <ServicesSection />

      {/* ============================ PORTFOLIO ============================ */}
      <PortfolioSection />

      {/* ============================ PROCESS (scroll-linked timeline) ============================ */}
      <ProcessSection />

      {/* ============================ ABOUT US ============================ */}
      <AboutSection />

      {/* ============================ BLOG ============================ */}
      <BlogSection />

      {/* ============================ TESTIMONIALS (Auto-scroll) ============================ */}
      <TestimonialsCarousel />

      {/* ============================ CLIENTS ============================ */}
      <section className="relative py-20 lg:py-28 px-6 lg:px-10 bg-muted/40 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Tick />
                <span className="text-[10px] uppercase tracking-[0.32em] text-accent">Our Clients</span>
                <Tick origin="right" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-balance">
                Trusted by leading <em className="text-gradient-gold not-italic font-medium">builders</em> & designers.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {clients.map((client, i) => {
              const isLink = client.url !== "#";
              const inner = (
                <>
                  <span className="font-serif text-lg md:text-xl text-foreground/90 group-hover:text-foreground leading-tight transition-all duration-500 ease-out group-hover:tracking-[0.03em]">
                    {client.name}
                  </span>
                  {isLink && (
                    <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth" />
                  )}
                </>
              );
              const cardClass =
                "group flex flex-col items-center justify-center gap-3 p-6 lg:p-8 rounded-2xl bg-card border border-border transition-smooth hover:border-primary/30 text-center min-h-[120px]";
              return (
                <ScrollReveal key={client.name} delay={i * 0.06}>
                  {isLink ? (
                    <a
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${cardClass} hover:bg-background cursor-pointer`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={cardClass}>{inner}</div>
                  )}
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================ FAQ ============================ */}
      <section
        id="faq"
        className="relative py-28 lg:py-36 px-6 lg:px-10"
      >
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Tick />
                <span className="text-[10px] uppercase tracking-[0.32em] text-accent">FAQ</span>
                <Tick origin="right" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
                Common <em className="text-gradient-gold not-italic font-medium">questions</em>.
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="rounded-2xl bg-card border border-border overflow-hidden transition-smooth hover:border-primary/20">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-panel-${i}`}
                    className="w-full flex items-center justify-between gap-4 p-6 lg:p-8 text-left cursor-pointer group"
                  >
                    <span className="font-serif text-lg md:text-xl text-foreground group-hover:text-accent transition-smooth">
                      {faq.question}
                    </span>
                    {/* Plus morphs into minus — vertical bar rotates flat */}
                    <span className="relative flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center transition-smooth group-hover:border-accent group-hover:text-accent">
                      <span className="absolute w-3.5 h-px bg-current" />
                      <motion.span
                        animate={{ rotate: openFaq === i ? 0 : 90 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute w-3.5 h-px bg-current"
                      />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                          <p className="text-foreground/70 leading-relaxed border-t border-border pt-5">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ CONTACT ============================ */}
      <ContactSection />

      <Footer />
    </div>
    </MotionConfig>
  );
};

export default Index;
