import {
  Home as HomeIcon,
  Building2,
  Palette,
  Box,
  Sparkles,
  Compass,
  PenTool,
  Layers,
} from "lucide-react";

export interface Project {
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

export const projects: Project[] = [
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

export const services = [
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

export const processSteps = [
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

export const stats = [
  { value: "500+", label: "Renders Delivered" },
  { value: "120+", label: "Happy Clients" },
  { value: "48h", label: "Typical Turnaround" },
  { value: "10+", label: "Years Experience" },
];

export const testimonials = [
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

export const clients = [
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

export const blogPosts = [
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

export type BlogPost = (typeof blogPosts)[number];

export const faqs = [
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

export const filters = [
  { id: "all", label: "All Work" },
  { id: "interior", label: "Interior" },
  { id: "exterior", label: "Exterior" },
  { id: "commercial", label: "Commercial" },
];
