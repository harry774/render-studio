import PageShell from "@/components/PageShell";
import ProcessSection from "@/sections/ProcessSection";

const Process = () => (
  <PageShell
    path="/process"
    eyebrow="The Process"
    title={
      <>
        How we <em className="text-gradient-gold not-italic font-medium">work</em>.
      </>
    }
    intro="From your first drawings to print-ready renders in four predictable stages — with two free revision rounds baked into every engagement."
  >
    <ProcessSection />
  </PageShell>
);

export default Process;
