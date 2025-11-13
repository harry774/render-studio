import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const Index = () => {
  const features = [
    "Photorealistic Rendering",
    "Fast Turnaround Times",
    "Unlimited Revisions",
    "Professional Team",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Professional 3D Rendering Studio
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight text-hero-text">
                You Dream,
                <br />
                We Design
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                Transform your architectural visions into stunning photorealistic visualizations. Expert 3D modeling,
                rendering, and design services for architects, developers, and designers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-base px-8">
                  <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    Free Consultation
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base px-8">
                  <Link to="/portfolio" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>View Portfolio</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80"
                  alt="Modern interior design visualization"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">Why Choose Us</p>
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Excellence in Every Detail</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We combine technical expertise with creative vision to deliver exceptional 3D visualizations
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <ScrollReveal key={feature} delay={index * 0.15}>
                <div className="bg-card p-6 rounded-xl text-center hover:shadow-lg transition-smooth">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{feature}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Modern architecture"
                  className="w-full h-auto"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">About Us</p>
                <h2 className="text-4xl md:text-5xl font-serif mb-6">Creating Timeless Visual Excellence</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We believe in holistic visualization — environments that exceed functionality to inspire optimism and
                  harmony. By uniting the most talented 3D artists and designers, our detailed approach to proportion,
                  aesthetics, and scale brings timeless sophistication to every project.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Carefully embracing your unique vision, we deliver a dynamic expression of your ideas through expert
                  rendering to tastefully tell your story.
                </p>
                <Button asChild size="lg" variant="outline">
                  <Link to="/services" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Explore Our Services</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 px-6 lg:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">Recent Work</p>
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Featured Projects</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
                title: "Modern Kitchen Design",
                category: "Interior",
              },
              {
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
                title: "Luxury Residence",
                category: "Exterior",
              },
              {
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
                title: "Commercial Office",
                category: "Commercial",
              },
            ].map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 0.15}>
                <Link to="/portfolio" className="group block">
                  <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-700"
                    />
                  </div>
                  <h3 className="text-xl font-serif mb-1 group-hover:text-primary transition-smooth">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">{project.category}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/portfolio" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Ready to Start Your Project?</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Let's collaborate to bring your architectural vision to life with stunning 3D visualizations
          </p>
          <Button asChild size="lg" className="text-base px-8">
            <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Get Started Today
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
