import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectDialog from "@/components/ProjectDialog";
import { toWebp } from "@/lib/img";
import { useState } from "react";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");

  type Project = {
    id: number;
    title: string;
    category: string;
    images: string[];
    description: string;
    details?: string;
    client?: string;
    year?: string;
    services?: string[];
  };

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
        "This project showcases a complete kitchen renovation with emphasis on clean lines, functional design, and premium materials. The space features custom cabinetry, integrated appliances, and sophisticated lighting that creates an inviting atmosphere perfect for both cooking and entertaining.",
      client: "Private Residence",
      year: "2024",
      services: ["Interior Design", "3D Rendering", "Material Selection"],
    },
    {
      id: 2,
      title: "Luxury Living Room",
      category: "interior",
      images: [
        "/assets/living-room-1.png",
        "/assets/living-room-2.png",
      ],
      description: "Elegant residential interior space with sophisticated furnishings",
      details:
        "A luxurious living room design that balances comfort with elegance. Rich textures, carefully curated furniture pieces, and a refined color palette create a space that feels both welcoming and prestigious.",
      client: "Luxury Apartment",
      year: "2024",
      services: ["Interior Rendering", "Space Planning"],
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
      year: "2023",
      services: ["Interior Design", "3D Rendering", "Furniture Selection"],
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
      id: 8,
      title: "Bathroom Design",
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
      ],
      description: "Modern bathroom visualization with spa elements",
      details:
        "A sophisticated bathroom design that transforms daily routines into luxurious experiences. Premium fixtures, elegant materials, and spa-inspired elements create a personal wellness sanctuary.",
      client: "Private Residence",
      year: "2024",
      services: ["Interior Rendering", "Material Selection", "Fixture Planning"],
    },
  ];

  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "interior", label: "Interior" },
    { id: "exterior", label: "Exterior" },
    { id: "commercial", label: "Commercial" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">Our Work</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight">Portfolio</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Explore our collection of stunning 3D visualizations and architectural renderings.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-smooth ${
                  filter === f.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.1}>
                <div
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3]">
                    <picture>
                      <source srcSet={toWebp(project.images[0], "thumb")} type="image/webp" />
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-700"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end p-6">
                      <p className="text-primary-foreground text-sm font-medium">View Details →</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-serif mb-1 group-hover:text-primary transition-smooth">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">{project.category}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ProjectDialog
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        project={selectedProject || projects[0]}
      />

      <Footer />
    </div>
  );
};

export default Portfolio;
