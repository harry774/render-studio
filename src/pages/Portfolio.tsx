import PageShell from "@/components/PageShell";
import PortfolioSection from "@/sections/PortfolioSection";

const Portfolio = () => (
  <PageShell
    path="/portfolio"
    eyebrow="Portfolio"
    title={
      <>
        Our 3D rendering <em className="text-gradient-gold not-italic font-medium">portfolio</em>.
      </>
    }
    intro="Photorealistic interiors, exteriors and commercial visualizations from a decade of projects across Canada. Browse the galleries below — every tile opens a full project."
  >
    <PortfolioSection />
  </PageShell>
);

export default Portfolio;
