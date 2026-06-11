import { Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ImageReveal from "@/components/ImageReveal";
import Tick from "@/sections/Tick";
import { toWebp } from "@/lib/img";

const AboutSection = () => (
  <section id="about-us" className="relative py-28 lg:py-36 px-6 lg:px-10">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Tick />
            <span className="text-[10px] uppercase tracking-[0.32em] text-accent">Our Story</span>
            <Tick origin="right" />
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
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
            <ImageReveal>
              <picture>
                <source srcSet={toWebp("/assets/exterior-1.png")} type="image/webp" />
                <img
                  src="/assets/exterior-1.png"
                  alt="Residential exterior render"
                  width={1200}
                  height={900}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </ImageReveal>
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-[hsl(216_50%_15%/0.75)] backdrop-blur-md border border-white/15">
              <Sparkles className="w-4 h-4 text-accent flex-shrink-0" />
              <p className="text-xs uppercase tracking-[0.22em] text-white">
                Studio work — residential exterior
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default AboutSection;
