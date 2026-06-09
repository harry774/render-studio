import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Home as HomeIcon,
  Building2,
  Palette,
  Box,
  Sparkles,
  Compass,
  PenTool,
  Layers,
  CheckCircle2,
  Star,
  Quote,
  Play,
  Send,
  Clock,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Award,
  Target,
  ExternalLink,
  Plus,
  Minus,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectDialog from "@/components/ProjectDialog";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import Typewriter from "@/components/Typewriter";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { toWebp } from "@/lib/img";

interface Project {
  id: number;
  title: string;
  category: string;
  images: string[];
  description: string;
  details?: string;
  client?: string;
  year?: string;
  services?: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Modern Kitchen Design",
    category: "interior",
    images: [
      "/assets/kitchen-1.png",
      "/assets/kitchen-2.png",
      "/assets/kitchen-3.png",
      "/assets/kitchen-4.png",
      "/assets/kitchen-5.png",
      "/assets/kitchen-6.png",
      "/assets/kitchen-7.png",
      "/assets/kitchen-8.png",
      "/assets/kitchen-9.png",
    ],
    description: "Contemporary kitchen with sleek cabinetry and modern fixtures",
    details:
      "A complete kitchen visualization with custom cabinetry, integrated appliances, and sophisticated lighting that creates an inviting atmosphere for both cooking and entertaining.",
    client: "Private Residence",
    year: "2024",
    services: ["Interior Design", "3D Rendering", "Material Selection"],
  },
  {
    id: 5,
    title: "Master Bedroom Suite",
    category: "interior",
    images: [
      "/assets/bedroom-1.png",
      "/assets/bedroom-2.png",
      "/assets/bedroom-3.png",
      "/assets/bedroom-4.png",
      "/assets/bedroom-5.png",
      "/assets/bedroom-6.png",
      "/assets/bedroom-7.png",
      "/assets/bedroom-8.png",
      "/assets/bedroom-9.png",
      "/assets/bedroom-10.png",
    ],
    description: "Luxurious bedroom interior with spa-like atmosphere",
    details:
      "A serene master bedroom retreat featuring calming colors, premium textiles, and thoughtful details. The design prioritizes comfort and relaxation while maintaining sophisticated aesthetics.",
    client: "Luxury Condo",
    year: "2024",
    services: ["Interior Design", "3D Rendering", "Furniture Selection"],
  },
  {
    id: 4,
    title: "Residential Exterior",
    category: "exterior",
    images: [
      "/assets/exterior-1.png",
      "/assets/exterior-2.png",
      "/assets/exterior-5.png",
      "/assets/exterior-6.png",
      "/assets/exterior-7.png",
      "/assets/exterior-8.png",
    ],
    description: "Contemporary home exterior visualization with landscaping",
    details:
      "A stunning residential exterior that seamlessly blends modern architecture with natural surroundings. Clean architectural lines, quality materials, and integrated landscaping create a harmonious and impressive street presence.",
    client: "Family Home",
    year: "2024",
    services: ["Exterior Rendering", "Landscape Design", "Material Studies"],
  },
  {
    id: 6,
    title: "Commercial Building",
    category: "exterior",
    images: [
      "/assets/exterior-3.png",
      "/assets/exterior-4.png",
      "/assets/exterior-11.png",
      "/assets/exterior-12.png",
    ],
    description: "Modern commercial architecture with iconic design",
    details:
      "A striking commercial building that makes a bold architectural statement. The design features innovative facade treatments, sustainable materials, and impressive scale that commands attention.",
    client: "Commercial Developer",
    year: "2024",
    services: ["Exterior Visualization", "Architectural Rendering", "Lighting Studies"],
  },
  {
    id: 3,
    title: "Commercial Office Space",
    category: "commercial",
    images: [
      "/assets/commercial-1.png",
      "/assets/commercial-2.png",
      "/assets/commercial-5.png",
      "/assets/commercial-6.png",
      "/assets/commercial-7.png",
      "/assets/commercial-8.png",
    ],
    description: "Modern office interior design with collaborative spaces",
    details:
      "A contemporary office environment designed to foster productivity and collaboration. Open-plan workspaces, private meeting areas, and thoughtful lighting create an inspiring professional atmosphere.",
    client: "Tech Startup",
    year: "2023",
    services: ["Commercial Design", "3D Visualization", "Space Planning"],
  },
  {
    id: 8,
    title: "Bathroom Visualizations",
    category: "interior",
    images: [
      "/assets/bathroom-1.png",
      "/assets/bathroom-2.png",
      "/assets/bathroom-3.png",
      "/assets/bathroom-4.png",
      "/assets/bathroom-5.png",
      "/assets/bathroom-6.png",
      "/assets/bathroom-7.png",
      "/assets/bathroom-8.png",
      "/assets/bathroom-9.png",
      "/assets/bathroom-10.png",
      "/assets/bathroom-11.png",
      "/assets/bathroom-12.png",
      "/assets/bathroom-13.png",
      "/assets/bathroom-14.png",
      "/assets/bathroom-15.png",
      "/assets/bathroom-16.png",
      "/assets/bathroom-17.png",
      "/assets/bathroom-18.png",
      "/assets/bathroom-19.png",
      "/assets/bathroom-20.png",
      "/assets/bathroom-21.png",
      "/assets/bathroom-22.png",
      "/assets/bathroom-23.png",
      "/assets/bathroom-24.png",
    ],
    description: "Modern bathroom visualization with spa elements",
    details:
      "A sophisticated bathroom design that transforms daily routines into luxurious experiences. Premium fixtures, elegant materials, and spa-inspired elements create a personal wellness sanctuary.",
    client: "Private Residence",
    year: "2024",
    services: ["Interior Rendering", "Material Selection", "Fixture Planning"],
  },
];

const services = [
  {
    icon: HomeIcon,
    title: "Interior Rendering",
    blurb:
      "Photoreal interiors that capture mood, material and natural light — from kitchens and baths to full-residence walkthroughs.",
    features: ["Residential", "Kitchen & Bath", "Lighting studies", "Furniture sets"],
  },
  {
    icon: Building2,
    title: "Exterior Visualization",
    blurb:
      "Architectural exteriors that sell the design before a brick is laid — facades, landscaping, day and dusk reveals.",
    features: ["Facades", "Site context", "Day & dusk", "Aerial views"],
  },
  {
    icon: Palette,
    title: "Architectural Design",
    blurb:
      "Concept-to-presentation visualization for architects and developers — pitch decks, leasing collateral, sales centres.",
    features: ["Concept boards", "Marketing renders", "Virtual tours", "Lookbooks"],
  },
  {
    icon: Box,
    title: "3D Modeling & 2D Drawings",
    blurb:
      "From custom furniture to full-building geometry, plus crisp 2D plans and elevations ready for permits and presentations.",
    features: ["Custom furniture", "Floor plans", "Elevations", "Technical models"],
  },
];

const processSteps = [
  {
    icon: Compass,
    step: "01",
    title: "Brief & References",
    description:
      "We start with your drawings, mood boards and creative direction. A discovery call clarifies scope, style and timeline.",
  },
  {
    icon: PenTool,
    step: "02",
    title: "Modeling & Camera Set",
    description:
      "Geometry is built to architectural accuracy. Camera angles are blocked out and approved before lighting begins.",
  },
  {
    icon: Layers,
    step: "03",
    title: "Materials & Lighting",
    description:
      "Photoreal materials, IES lighting, and grading passes. Two rounds of revisions baked into every engagement.",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "Final Delivery",
    description:
      "High-resolution renders delivered in print-ready formats. Walkthrough videos and 360s available on request.",
  },
];

const stats = [
  { value: "500+", label: "Renders Delivered" },
  { value: "120+", label: "Happy Clients" },
  { value: "48h", label: "Typical Turnaround" },
  { value: "10+", label: "Years Experience" },
];

const testimonials = [
  {
    quote:
      "The level of detail in their kitchen renders helped us close three pre-construction sales in the first month. Worth every dollar.",
    name: "Mark D.",
    role: "Residential Builder, Vaughan",
  },
  {
    quote:
      "Fast, responsive and genuinely talented. Their team treated our drawings like their own project — the lighting study was flawless.",
    name: "Priya S.",
    role: "Architect, Toronto",
  },
  {
    quote:
      "We tried two other studios before finding 3D Renders. The difference is night and day — these are the renders we put on the front of our brochure.",
    name: "Jonathan R.",
    role: "Interior Designer, Mississauga",
  },
  {
    quote:
      "Their exterior renders brought our entire site plan to life. The city planning board approved on first submission — the visuals made the difference.",
    name: "Sarah L.",
    role: "Urban Planner, Ottawa",
  },
  {
    quote:
      "I've worked with studios across North America. 3D Renders delivers the most photorealistic interiors I've seen — and they hit every deadline.",
    name: "David K.",
    role: "Real Estate Developer, Vancouver",
  },
  {
    quote:
      "The bathroom renders were so accurate that our tile supplier used them as their own marketing material. That says everything.",
    name: "Angela M.",
    role: "Interior Designer, Hamilton",
  },
  {
    quote:
      "We needed a full walkthrough for a luxury condo launch in 10 days. They delivered in 8 — with two revision rounds included. Phenomenal.",
    name: "Robert T.",
    role: "Marketing Director, Toronto",
  },
  {
    quote:
      "Their attention to natural lighting is unmatched. The dusk renders for our lakefront property generated more inquiries than any listing we've ever had.",
    name: "Christine W.",
    role: "Realtor, Muskoka",
  },
];

const clients = [
  {
    name: "Empire General Contracting",
    url: "https://www.instagram.com/empiregeneralcontracting_/",
  },
  {
    name: "CAL Designs",
    url: "#",
  },
  {
    name: "Meridian Homes",
    url: "#",
  },
  {
    name: "Northview Development Group",
    url: "#",
  },
  {
    name: "Pinnacle Design Studio",
    url: "#",
  },
  {
    name: "Crestwood Builders",
    url: "#",
  },
];

const blogPosts = [
  {
    id: 1,
    title: "Why Photorealistic 3D Renders Sell Homes Before They're Built",
    excerpt:
      "Pre-construction marketing has shifted from floor plans to cinematic visuals. Here's how high-fidelity renders accelerate sales cycles and reduce buyer hesitation.",
    category: "Industry Insights",
    date: "May 28, 2026",
    readTime: "5 min read",
    image: "/assets/kitchen-1.png",
    content: `Pre-construction marketing has fundamentally shifted. Buyers no longer trust artist sketches or basic floor plans — they expect to feel the space before a single brick is laid. High-fidelity 3D renders fill that gap with extraordinary precision.

When a prospective buyer walks into a sales centre and sees a photorealistic render of the exact kitchen they'll own — the grain of the marble, the warmth of the pendant lights at dusk, the way the island seats six comfortably — they don't just understand the space. They start to inhabit it emotionally.

That emotional connection is what closes pre-construction sales faster than any floor plan ever could.

**The Numbers Speak Clearly**

Developers who invest in premium visualization at launch consistently report shorter time-to-deposit and higher absorption rates in the first 30 days. Our clients have seen three to five pre-sales in the first month of a launch — directly attributing the renders as the deciding factor for buyers who hadn't yet visited the site.

**What Makes a Render Actually Sell**

Not all renders are equal. The difference between a good render and a great one comes down to three things: lighting that feels real, materials that feel tactile, and camera angles that tell a story. A render should never look like a catalogue — it should look like a photograph of a life already being lived.

We light every scene the way a cinematographer would — with intention, with mood, and with an understanding of how light changes from morning to evening. That's what transforms a 3D file into a sales tool.

**The Bottom Line**

If you're launching a pre-construction project without cinematic visualization, you're asking buyers to commit based on imagination alone. In today's market, that's a significant disadvantage. Invest in renders that sell the lifestyle, not just the layout.`,
  },
  {
    id: 2,
    title: "Interior Rendering vs. Interior Photography: When to Use Each",
    excerpt:
      "Both have their place in real estate marketing. We break down cost, flexibility, and impact — and explain why most developers now start with renders.",
    category: "Guide",
    date: "May 15, 2026",
    readTime: "4 min read",
    image: "/assets/bedroom-4.png",
    content: `Both 3D rendering and professional photography serve important roles in real estate and interior marketing — but they're not interchangeable, and using the wrong one at the wrong stage costs you time, money, and opportunity.

**When 3D Rendering Wins**

Renders are the obvious choice before construction is complete. But they're also the smarter choice in many post-construction scenarios:

- You need multiple versions (day/dusk, furnished/unfurnished, different finish packages)
- You want to show the space before furniture arrives
- You need to present a design that doesn't physically exist yet
- You're marketing internationally and can't stage a shoot

The flexibility of renders is unmatched. Want to see the kitchen with white cabinets instead of walnut? Takes hours, not weeks. That kind of iteration is impossible with photography.

**When Photography Wins**

Photography shines when you have a completed, beautifully staged space and need maximum authenticity. A skilled photographer can capture texture, depth, and atmosphere in ways that feel immediately real to a viewer who's seen too many renders.

For editorial features, magazine submissions, or luxury residential listings where the home is already complete and staged, photography is often the right call.

**The Hybrid Approach**

Most of our clients use both. Renders drive the pre-construction launch. Photography documents the completed project and feeds the portfolio. Each tool at the right stage of the project lifecycle — that's how the best studios market their work.`,
  },
  {
    id: 3,
    title: "The Role of Lighting in Architectural Visualization",
    excerpt:
      "Natural light, artificial warmth, golden hour — how the right lighting study transforms a good render into an emotional selling tool.",
    category: "Technical",
    date: "Apr 30, 2026",
    readTime: "6 min read",
    image: "/assets/bathroom-5.png",
    content: `Lighting is the single most powerful tool in architectural visualization — and the most commonly underestimated.

A perfectly modelled space with mediocre lighting looks flat, lifeless, and unconvincing. The same model, lit with care and intention, becomes a photograph you want to step into. The geometry hasn't changed. Only the light has.

**Natural Light as the Foundation**

We approach every project by understanding how real sunlight behaves in the actual location of the building. A Toronto penthouse at 4pm in October gets different light than a Vancouver townhome at noon in July. These distinctions matter — not just aesthetically, but because they make the render feel authentic to buyers who know the city.

We use physically accurate sun/sky simulation to capture this. The result is a render that feels like it was taken on a specific day, at a specific hour, in a specific place.

**The Magic of Dusk**

Dusk renders — sometimes called "hero shots" — are among the most powerful visuals in our toolkit. The 20-minute window when warm interior light spills out against a deep blue sky is one of the most emotionally compelling moments in architecture. We recreate it precisely, balancing interior and exterior exposure the way a photographer would.

For any exterior project, we always recommend at least one dusk render alongside the standard daylight version. The contrast between the two tells a fuller story.

**Artificial Light: Where Details Live**

Pendant fixtures, under-cabinet strips, recessed downlights — artificial light sources define the character of an interior. We light each fixture with IES profiles (real photometric data from manufacturers) so the light spread is accurate, not approximated.

The result is renders where you can almost feel the warmth of the room.`,
  },
  {
    id: 4,
    title: "How Developers Use 3D Walkthroughs to Win Planning Approvals",
    excerpt:
      "City councils and planning boards increasingly expect immersive visuals. We explore how walkthrough animations streamline the approval process.",
    category: "Case Study",
    date: "Apr 12, 2026",
    readTime: "5 min read",
    image: "/assets/kitchen-5.png",
    content: `Planning approval is one of the most consequential — and most stressful — stages of any development project. A single board meeting can stall a project by months. The right visual presentation can be the difference between approval and a request for more information.

3D walkthrough animations are increasingly the tool of choice for developers who want to walk planning boards through a project with clarity, context, and confidence.

**Why Walkthroughs Work in Planning Contexts**

Planning board members are often not architects or designers. They're civic officials, community representatives, and administrators trying to evaluate how a building will fit into its surroundings and serve its future residents.

A walkthrough animation lets them experience the building from the street, move through the lobby, understand the relationship between units and shared spaces, and see how the development interacts with adjacent properties — all without reading a single technical drawing.

That comprehension removes uncertainty. And uncertainty is what causes delays.

**What a Strong Planning Walkthrough Includes**

The most effective planning walkthroughs include: an approach from the street showing context and massing, a transition from exterior to interior demonstrating scale, key amenity spaces that demonstrate livability, and a rooftop or aerial perspective showing site coverage and green space.

We script every walkthrough with the approval audience in mind — not just the design team.

**The Result**

Developers who present with cinematic walkthroughs consistently report smoother, faster approval processes. One of our clients received first-submission approval for a 12-storey mixed-use building — a project that would have typically required two or three rounds of revisions. The planning officer cited the clarity of the visual presentation as a key factor.

Clear visuals don't just impress — they build trust. And trust moves projects forward.`,
  },
];

const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "Most interior renders are delivered within 48–72 hours. Larger projects with multiple scenes or exterior walkthroughs typically take 5–7 business days. Rush delivery is available.",
  },
  {
    question: "What do you need from us to get started?",
    answer: "Architectural drawings, floor plans, or CAD files are ideal. We also work from hand sketches, mood boards, and reference photos — whatever stage your project is at, we can quote it.",
  },
  {
    question: "How many revision rounds are included?",
    answer: "Every project includes two free revision rounds. This covers camera angle adjustments, material swaps, lighting tweaks, and minor geometry changes. Additional rounds are available at a flat rate.",
  },
  {
    question: "Do you work with clients outside of Toronto?",
    answer: "Absolutely. We work with architects, developers, and designers across Canada and internationally. Our entire workflow is remote — files in, renders out, no in-person meetings required.",
  },
  {
    question: "What file formats do you deliver?",
    answer: "We deliver high-resolution JPEGs and PNGs by default, print-ready at 300 DPI. We also offer layered PSDs, TIFFs, and video formats (MP4, MOV) for walkthrough animations on request.",
  },
];

const filters = [
  { id: "all", label: "All Work" },
  { id: "interior", label: "Interior" },
  { id: "exterior", label: "Exterior" },
  { id: "commercial", label: "Commercial" },
];

const getVisibleTestimonials = (startIndex: number) => {
  const result = [];
  for (let i = 0; i < 3; i++) {
    result.push(testimonials[(startIndex + i) % testimonials.length]);
  }
  return result;
};

const TestimonialsCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4500);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const go = (dir: "prev" | "next") => {
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
                <span className="h-px w-10 bg-accent" />
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

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {visible.map((t) => (
              <figure
                key={t.name}
                className="relative h-full p-8 lg:p-10 rounded-2xl bg-card border border-border shadow-soft transition-smooth hover:border-primary/30 hover:shadow-elegant animate-fade-in"
              >
                <Quote className="w-8 h-8 text-primary/30 mb-6" />
                <blockquote className="font-serif text-lg md:text-xl leading-snug text-foreground mb-8">
                  "{t.quote}"
                </blockquote>
                <figcaption className="flex items-center justify-between pt-6 border-t border-border">
                  <div>
                    <div className="font-medium text-sm text-foreground">{t.name}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{t.role}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

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
  const { toast } = useToast();
  const reduceMotion = useReducedMotion();

  // Hero parallax — hooks must be at top level
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<typeof blogPosts[0] | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Contact form
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const SERVICE_ID = "service_btyx9yp";
  const TEMPLATE_ID = "template_v0ef5sa";
  const PUBLIC_KEY = "5YBMvyFonfMZb39kj";

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

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, { ...formData }, PUBLIC_KEY);
      toast({ title: "Message sent.", description: "We'll get back to you within 24 hours." });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      toast({
        title: "Couldn't send message",
        description: "Please email info@3drendersstudio.com or try again shortly.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* ============================ HERO ============================ */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen w-full bg-background flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Hero background image — fades from left, desktop only */}
        <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute right-0 top-0 bottom-0 w-[65%]"
            style={{ maskImage: "linear-gradient(to right, transparent 0%, black 28%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 28%)" }}
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
          </div>
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
              <span className="text-gradient-gold italic">
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
                <div className="font-serif text-3xl lg:text-4xl text-primary">{s.value}</div>
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
              <span className="h-px w-10 bg-accent" />
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
      <section
        id="services"
        className="relative py-28 lg:py-36 px-6 lg:px-10 bg-muted/40 border-y border-border"
      >
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl mb-20">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-accent" />
                <span className="text-[10px] uppercase tracking-[0.32em] text-accent">Services</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance mb-6">
                Four crafts, <em className="text-gradient-gold not-italic font-medium">one</em> studio.
              </h2>
              <p className="text-foreground/65 leading-relaxed max-w-2xl">
                Whatever stage you're at — competition deck, pre-construction launch, or final marketing —
                we have the right deliverable for it.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden shadow-soft">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.08}>
                <div className="group relative h-full bg-card p-8 lg:p-12 transition-smooth hover:bg-background cursor-default">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center transition-smooth group-hover:bg-primary/10 group-hover:border-primary/20">
                      <s.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-light">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl mb-4 transition-smooth group-hover:text-primary">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">{s.blurb}</p>

                  <ul className="grid grid-cols-2 gap-2 pt-6 border-t border-border">
                    {s.features.map((f) => (
                      <li key={f} className="text-xs uppercase tracking-[0.16em] text-foreground/65 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Corner accent */}
                  <span className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-smooth">
                    <span className="absolute top-6 right-6 w-6 h-px bg-accent" />
                    <span className="absolute top-6 right-6 w-px h-6 bg-accent" />
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ PORTFOLIO ============================ */}
      <section id="portfolio" className="relative py-28 lg:py-36 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-10 bg-accent" />
                  <span className="text-[10px] uppercase tracking-[0.32em] text-accent">Portfolio</span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
                  Selected <em className="text-gradient-gold not-italic font-medium">work</em>.
                </h2>
              </div>
              <p className="text-foreground/65 leading-relaxed max-w-md">
                Each project below contains a full gallery — click any tile to step inside.
              </p>
            </div>
          </ScrollReveal>

          {/* Filter */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-12">
              {filters.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`px-5 py-2.5 rounded-full text-[11px] uppercase tracking-[0.22em] border transition-smooth cursor-pointer ${
                      active
                        ? "bg-accent text-background border-accent"
                        : "bg-transparent text-foreground/65 border-border hover:border-accent/40 hover:text-foreground"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.08}>
                <button
                  onClick={() => setSelected(p)}
                  className="group block w-full text-left cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-card mb-5 shadow-soft">
                    <picture>
                      <source srcSet={toWebp(p.images[0], "thumb")} type="image/webp" />
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        width={800}
                        height={1000}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-smooth" />

                    {/* Badge */}
                    <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-[0.22em] text-on-dark">
                      {p.category}
                    </div>

                    {/* Image count */}
                    <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-[0.22em] text-on-dark">
                      {p.images.length} renders
                    </div>

                    {/* Hover CTA */}
                    <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                      <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-smooth">
                        <span className="text-[10px] uppercase tracking-[0.28em] text-accent">
                          View Project
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-smooth">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl group-hover:text-accent transition-smooth">
                        {p.title}
                      </h3>
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ PROCESS ============================ */}
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
                <span className="h-px w-10 bg-accent" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden shadow-soft">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1}>
                <div className="group relative h-full bg-card p-8 transition-smooth hover:bg-background">
                  <span className="font-serif text-6xl text-accent/20 absolute top-6 right-6 transition-smooth group-hover:text-accent/45">
                    {step.step}
                  </span>
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
      </section>

      {/* ============================ ABOUT US ============================ */}
      <section
        id="about-us"
        className="relative py-28 lg:py-36 px-6 lg:px-10"
      >
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="h-px w-10 bg-accent" />
                <span className="text-[10px] uppercase tracking-[0.32em] text-accent">Our Story</span>
                <span className="h-px w-10 bg-accent" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance mb-8">
                A decade of turning <em className="text-gradient-gold not-italic font-medium">blueprints</em> into belief.
              </h2>
              <p className="text-foreground/65 leading-relaxed max-w-2xl mx-auto">
                What started as a one-person passion project in 2014 has grown into a trusted visualization
                studio serving architects, developers, and designers across Canada.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <p className="text-foreground/75 leading-relaxed text-lg font-light">
                  We founded 3D Renders Studio with a simple conviction: architects and developers
                  deserve visuals as compelling as their designs. Too many great projects were being
                  undersold by flat floor plans and rushed renders.
                </p>
                <p className="text-foreground/65 leading-relaxed">
                  Over ten years, we've refined our craft through hundreds of projects — from intimate
                  bathroom renovations to multi-storey construction. Every render that leaves
                  our studio is reviewed by a senior artist, lit with the precision of a film set,
                  and delivered on a timeline you can actually plan around.
                </p>
                <p className="text-foreground/65 leading-relaxed">
                  Today, our clients come back not just for the quality, but because we genuinely
                  care about their success. When your renders help close a sale or win an approval,
                  that's the outcome we measure ourselves by.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-8 rounded-2xl bg-card border border-border text-center shadow-soft">
                  <Award className="w-6 h-6 text-accent mx-auto mb-3" />
                  <div className="font-serif text-4xl text-primary mb-1">10+</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Years Experience</div>
                </div>
                <div className="p-8 rounded-2xl bg-card border border-border text-center shadow-soft">
                  <Users className="w-6 h-6 text-accent mx-auto mb-3" />
                  <div className="font-serif text-4xl text-primary mb-1">120+</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Happy Clients</div>
                </div>
                <div className="p-8 rounded-2xl bg-card border border-border text-center shadow-soft">
                  <Target className="w-6 h-6 text-accent mx-auto mb-3" />
                  <div className="font-serif text-4xl text-primary mb-1">500+</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Renders Delivered</div>
                </div>
                <div className="p-8 rounded-2xl bg-card border border-border text-center shadow-soft">
                  <Clock className="w-6 h-6 text-accent mx-auto mb-3" />
                  <div className="font-serif text-4xl text-primary mb-1">48h</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Avg. Turnaround</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================ BLOG ============================ */}
      <section
        id="blog"
        className="relative py-28 lg:py-36 px-6 lg:px-10 bg-muted/40 border-y border-border"
      >
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-10 bg-accent" />
                  <span className="text-[10px] uppercase tracking-[0.32em] text-accent">Journal</span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
                  Insights from the <em className="text-gradient-gold not-italic font-medium">studio</em>.
                </h2>
              </div>
              <p className="text-foreground/65 leading-relaxed max-w-md">
                Industry perspectives, technical deep-dives, and lessons learned from a decade of architectural visualization.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {blogPosts.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 0.1}>
                <article
                  onClick={() => setSelectedBlog(post)}
                  className="group relative rounded-2xl bg-card border border-border overflow-hidden shadow-soft transition-smooth hover:border-primary/30 hover:shadow-elegant hover:-translate-y-1 cursor-pointer"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <picture>
                      <source srcSet={toWebp(post.image, "thumb")} type="image/webp" />
                      <img
                        src={post.image}
                        alt={post.title}
                        width={800}
                        height={450}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-accent/90 text-background text-[10px] uppercase tracking-[0.18em] font-semibold">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6 lg:p-8">
                    <div className="flex items-center gap-4 mb-4 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl leading-snug mb-3 transition-smooth group-hover:text-accent">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-accent font-medium">
                      Read Article
                      <ArrowRight className="w-3.5 h-3.5 transition-smooth group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ TESTIMONIALS (Auto-scroll) ============================ */}
      <TestimonialsCarousel />

      {/* ============================ CLIENTS ============================ */}
      <section className="relative py-20 lg:py-28 px-6 lg:px-10 bg-muted/40 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="h-px w-10 bg-accent" />
                <span className="text-[10px] uppercase tracking-[0.32em] text-accent">Our Clients</span>
                <span className="h-px w-10 bg-accent" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-balance">
                Trusted by leading <em className="text-gradient-gold not-italic font-medium">builders</em> & designers.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {clients.map((client, i) => (
              <ScrollReveal key={client.name} delay={i * 0.06}>
                <a
                  href={client.url}
                  target={client.url !== "#" ? "_blank" : undefined}
                  rel={client.url !== "#" ? "noopener noreferrer" : undefined}
                  className="group flex flex-col items-center justify-center gap-3 p-6 lg:p-8 rounded-2xl bg-card border border-border transition-smooth hover:border-primary/30 hover:bg-background cursor-pointer text-center min-h-[120px]"
                >
                  <span className="font-serif text-lg md:text-xl text-foreground/90 group-hover:text-foreground transition-smooth leading-tight">
                    {client.name}
                  </span>
                  {client.url !== "#" && (
                    <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth" />
                  )}
                </a>
              </ScrollReveal>
            ))}
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
                <span className="h-px w-10 bg-accent" />
                <span className="text-[10px] uppercase tracking-[0.32em] text-accent">FAQ</span>
                <span className="h-px w-10 bg-accent" />
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
                    className="w-full flex items-center justify-between gap-4 p-6 lg:p-8 text-left cursor-pointer group"
                  >
                    <span className="font-serif text-lg md:text-xl text-foreground group-hover:text-accent transition-smooth">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center transition-smooth group-hover:border-accent group-hover:text-accent">
                      {openFaq === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                      <p className="text-foreground/70 leading-relaxed border-t border-border pt-5">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ CONTACT ============================ */}
      <section
        id="contact"
        className="relative py-28 lg:py-36 px-6 lg:px-10 bg-muted/40 border-t border-border overflow-hidden"
      >
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-10 bg-accent" />
                  <span className="text-[10px] uppercase tracking-[0.32em] text-accent">
                    Let's Talk
                  </span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[1.0] text-balance">
                  Have a project in mind?
                  <br />
                  <em className="text-gradient-gold not-italic font-medium">Bring it in.</em>
                </h2>
              </div>
              <p className="lg:col-span-4 text-foreground/65 leading-relaxed">
                Free 30-minute consultation. Drawings, mood boards, napkin sketches — whatever you've
                got, we'll quote it within one business day.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Contact info card */}
            <ScrollReveal direction="left" className="lg:col-span-5">
              <div className="bg-card border border-border rounded-2xl p-8 lg:p-10 h-full shadow-soft">
                <h3 className="font-serif text-2xl mb-8 text-foreground">Studio</h3>

                <div className="space-y-6 mb-10">
                  <a
                    href="mailto:info@3drendersstudio.com"
                    className="flex items-start gap-4 group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-smooth">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground mb-1">
                        Email
                      </div>
                      <div className="text-sm text-foreground group-hover:text-accent transition-smooth">
                        info@3drendersstudio.com
                      </div>
                    </div>
                  </a>

                  <a href="tel:+14379826367" className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-11 h-11 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-smooth">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground mb-1">
                        Phone
                      </div>
                      <div className="text-sm text-foreground group-hover:text-accent transition-smooth">
                        +1 (437) 982-6367
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Mon–Fri · 9am–6pm EST</div>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground mb-1">
                        Location
                      </div>
                      <div className="text-sm text-foreground">Toronto, Ontario</div>
                      <div className="text-xs text-muted-foreground mt-1">Canada — serving GTA & nationally</div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-border">
                  <h4 className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground mb-4">
                    Business Hours
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday – Friday</span>
                      <span className="text-foreground">9:00 — 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="text-foreground">10:00 — 16:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="text-muted-foreground/70">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact form */}
            <ScrollReveal direction="right" delay={0.1} className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-2xl p-8 lg:p-10 space-y-6 shadow-soft"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[10px] uppercase tracking-[0.24em] text-muted-foreground mb-2"
                    >
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="bg-background border-border focus-visible:ring-accent h-12"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[10px] uppercase tracking-[0.24em] text-muted-foreground mb-2"
                    >
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@studio.com"
                      className="bg-background border-border focus-visible:ring-accent h-12"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[10px] uppercase tracking-[0.24em] text-muted-foreground mb-2"
                  >
                    Phone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="bg-background border-border focus-visible:ring-accent h-12"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[10px] uppercase tracking-[0.24em] text-muted-foreground mb-2"
                  >
                    Project Brief *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us about your project — scope, timeline, references..."
                    className="bg-background border-border focus-visible:ring-accent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="group w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-accent text-background text-xs uppercase tracking-[0.22em] font-semibold hover:bg-accent/85 transition-smooth disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-glow"
                >
                  {isSending ? (
                    "Sending…"
                  ) : (
                    <>
                      Send Message
                      <Send className="w-3.5 h-3.5 transition-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-muted-foreground text-center pt-2">
                  We respond within 24 business hours — usually much faster.
                </p>
              </form>
            </ScrollReveal>
          </div>

          {/* Calendly */}
          <ScrollReveal delay={0.2}>
            <div className="mt-24 lg:mt-32">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="flex items-center justify-center gap-3 mb-5">
                  <span className="h-px w-10 bg-accent" />
                  <span className="text-[10px] uppercase tracking-[0.32em] text-accent">
                    Or Book Directly
                  </span>
                  <span className="h-px w-10 bg-accent" />
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-[1.1] text-balance">
                  Pick a 30-minute slot on our calendar.
                </h3>
              </div>
              <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-soft">
                <CalendlyEmbed dataUrl="https://calendly.com/nirali-215becig006/30min?background_color=161b24&text_color=e8dcc8&primary_color=c68a2e" />
              </div>
            </div>
          </ScrollReveal>

          {/* Final CTA strip */}
          <ScrollReveal delay={0.3}>
            <div className="mt-24 lg:mt-32 text-center max-w-3xl mx-auto">
              <p className="text-muted-foreground text-xs uppercase tracking-[0.32em] mb-6">
                Or simply email us
              </p>
              <a
                href="mailto:info@3drendersstudio.com"
                className="inline-block font-serif text-3xl md:text-5xl lg:text-6xl text-gradient-gold hover:opacity-90 transition-smooth cursor-pointer"
              >
                info@3drendersstudio.com
                <ArrowRight className="inline-block w-7 h-7 md:w-10 md:h-10 ml-3 text-accent" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />

      {/* ============================ BLOG MODAL ============================ */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/75 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl bg-card border border-border rounded-2xl overflow-hidden shadow-elegant my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute right-4 top-4 z-10 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-smooth cursor-pointer"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>

              {/* Hero image */}
              <div className="relative aspect-[16/7] overflow-hidden">
                <picture>
                  <source srcSet={toWebp(selectedBlog.image)} type="image/webp" />
                  <img src={selectedBlog.image} alt={selectedBlog.title} decoding="async" className="w-full h-full object-cover" />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/90 text-background text-[10px] uppercase tracking-[0.18em] font-semibold mb-4">
                    {selectedBlog.category}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-snug">
                    {selectedBlog.title}
                  </h2>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-5 px-8 py-5 border-b border-border text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{selectedBlog.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{selectedBlog.readTime}</span>
              </div>

              {/* Content */}
              <div className="px-8 py-8 md:px-10 md:py-10">
                {selectedBlog.content?.split('\n\n').map((para, i) => {
                  if (para.startsWith('**') && para.endsWith('**')) {
                    return (
                      <h3 key={i} className="font-serif text-xl md:text-2xl text-foreground mt-8 mb-3 first:mt-0">
                        {para.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  const parts = para.split(/(\*\*[^*]+\*\*)/g);
                  return (
                    <p key={i} className="text-foreground/75 leading-relaxed mb-5 text-base">
                      {parts.map((part, j) =>
                        part.startsWith('**') && part.endsWith('**')
                          ? <strong key={j} className="text-foreground font-semibold">{part.replace(/\*\*/g, '')}</strong>
                          : part
                      )}
                    </p>
                  );
                })}

                {/* CTA */}
                <div className="mt-10 pt-8 border-t border-border">
                  <p className="text-foreground/60 text-sm mb-4">Ready to elevate your next project?</p>
                  <button
                    onClick={() => { setSelectedBlog(null); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-background text-xs uppercase tracking-[0.18em] font-semibold hover:bg-accent/85 transition-smooth cursor-pointer"
                  >
                    Get a Free Consultation <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project dialog (controlled) */}
      <ProjectDialog
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
        project={selected || projects[0]}
      />
    </div>
  );
};

export default Index;
