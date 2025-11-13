import { Building2, Home, Palette, Box } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Interior Rendering",
      description:
        "Photorealistic interior visualizations that bring your design concepts to life. From residential spaces to commercial interiors, we create stunning renders that capture every detail.",
      features: ["Residential Interiors", "Commercial Spaces", "Kitchen & Bath Design", "Lighting Studies"],
    },
    {
      icon: Building2,
      title: "Exterior Visualization",
      description:
        "Architectural exterior renderings that showcase your building designs in their best light. Perfect for presentations, marketing, and design development.",
      features: ["Building Facades", "Landscape Integration", "Day & Night Views", "Contextual Renderings"],
    },
    {
      icon: Palette,
      title: "Architectural Design",
      description:
        "Complete architectural visualization services from concept to final presentation. We help architects and developers communicate their vision effectively.",
      features: ["Conceptual Design", "Design Development", "Marketing Materials", "Virtual Tours"],
    },
    {
      icon: Box,
      title: "3D Modeling",
      description:
        "Detailed 3D models for any purpose. From furniture to full buildings, we create accurate, high-quality models ready for rendering or production.",
      features: ["Product Modeling", "Furniture Design", "Custom Objects", "Technical Modeling"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">Our Services</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight">
                Expert 3D Rendering Services
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We provide comprehensive 3D visualization services tailored to architects, designers, and developers who
                demand excellence in every detail.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 lg:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.15}>
                <div className="bg-card p-8 lg:p-10 rounded-2xl hover:shadow-xl transition-smooth">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-serif mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="text-sm text-muted-foreground flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Ready to Start Your Project?</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Let's discuss how we can bring your vision to life with our expert 3D rendering services.
          </p>
          <Button asChild size="lg" className="text-base px-8">
            <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Get in Touch</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
