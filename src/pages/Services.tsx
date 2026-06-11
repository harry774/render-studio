import PageShell from "@/components/PageShell";
import ServicesSection from "@/sections/ServicesSection";

const Services = () => (
  <PageShell
    path="/services"
    eyebrow="Services"
    title={
      <>
        3D visualization <em className="text-gradient-gold not-italic font-medium">services</em>.
      </>
    }
    intro="Interior rendering, exterior visualization, architectural design, and 3D modeling with 2D drawings — everything architects, developers and designers need to sell a space before it exists."
  >
    <ServicesSection />
  </PageShell>
);

export default Services;
