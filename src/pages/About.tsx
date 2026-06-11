import PageShell from "@/components/PageShell";
import AboutSection from "@/sections/AboutSection";

const About = () => (
  <PageShell
    path="/about"
    eyebrow="About Us"
    title={
      <>
        The studio behind the <em className="text-gradient-gold not-italic font-medium">renders</em>.
      </>
    }
    intro="A small Canadian team of obsessive 3D artists, turning blueprints into belief since 2014. Every render is senior-reviewed and lit with the precision of a film set."
  >
    <AboutSection />
  </PageShell>
);

export default About;
