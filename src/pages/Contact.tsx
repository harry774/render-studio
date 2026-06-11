import PageShell from "@/components/PageShell";
import ContactSection from "@/sections/ContactSection";

const Contact = () => (
  <PageShell
    path="/contact"
    eyebrow="Contact"
    title={
      <>
        Let's <em className="text-gradient-gold not-italic font-medium">talk</em>.
      </>
    }
    intro="Send us your drawings, mood boards or napkin sketches — we'll quote your project within one business day. Or book a free 30-minute consultation directly on our calendar."
  >
    <ContactSection />
  </PageShell>
);

export default Contact;
