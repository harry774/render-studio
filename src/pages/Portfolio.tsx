import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Modern Kitchen Design",
      category: "interior",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
      description: "Contemporary kitchen with sleek cabinetry",
    },
    {
      id: 2,
      title: "Luxury Living Room",
      category: "interior",
      image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
      description: "Elegant residential interior space",
    },
    {
      id: 3,
      title: "Commercial Office Space",
      category: "commercial",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      description: "Modern office interior design",
    },
    {
      id: 4,
      title: "Residential Exterior",
      category: "exterior",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      description: "Contemporary home exterior visualization",
    },
    {
      id: 5,
      title: "Master Bedroom Suite",
      category: "interior",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
      description: "Luxurious bedroom interior",
    },
    {
      id: 6,
      title: "Commercial Building",
      category: "exterior",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      description: "Modern commercial architecture",
    },
    {
      id: 7,
      title: "Restaurant Interior",
      category: "commercial",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      description: "Contemporary dining space design",
    },
    {
      id: 8,
      title: "Bathroom Design",
      category: "interior",
      image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
      description: "Modern bathroom visualization",
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
          <div className="max-w-3xl animate-fade-in">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">Our Work</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight">Portfolio</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore our collection of stunning 3D visualizations and architectural renderings.
            </p>
          </div>
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
              <div
                key={project.id}
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end p-6">
                    <p className="text-primary-foreground text-sm">{project.description}</p>
                  </div>
                </div>
                <h3 className="text-xl font-serif mb-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">{project.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
