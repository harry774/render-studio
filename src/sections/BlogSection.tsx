import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ImageReveal from "@/components/ImageReveal";
import Tick from "@/sections/Tick";
import { blogPosts, type BlogPost } from "@/data/content";
import { toWebp } from "@/lib/img";

const BlogSection = () => {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  const goToContact = () => {
    setSelectedBlog(null);
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.location.href = "/contact";
  };

  return (
    <section
      id="blog"
      className="relative py-28 lg:py-36 px-6 lg:px-10 bg-muted/40 border-y border-border"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Tick />
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
                  <ImageReveal>
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
                  </ImageReveal>
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
                    onClick={goToContact}
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
    </section>
  );
};

export default BlogSection;
