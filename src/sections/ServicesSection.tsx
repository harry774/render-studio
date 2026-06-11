import ScrollReveal from "@/components/ScrollReveal";
import Tick from "@/sections/Tick";
import { services } from "@/data/content";

const ServicesSection = () => (
  <section
    id="services"
    className="relative py-28 lg:py-36 px-6 lg:px-10 bg-muted/40 border-y border-border"
  >
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Tick />
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
);

export default ServicesSection;
