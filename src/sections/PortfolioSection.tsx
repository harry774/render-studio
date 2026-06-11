import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ImageReveal from "@/components/ImageReveal";
import ProjectDialog from "@/components/ProjectDialog";
import Tick from "@/sections/Tick";
import { projects, filters, type Project } from "@/data/content";
import { toWebp } from "@/lib/img";

const PortfolioSection = () => {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="relative py-28 lg:py-36 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Tick />
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
                  <ImageReveal>
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
                  </ImageReveal>
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

      {/* Project dialog (controlled) */}
      <ProjectDialog
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
        project={selected || projects[0]}
      />
    </section>
  );
};

export default PortfolioSection;
