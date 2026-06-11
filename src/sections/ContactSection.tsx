import { useState } from "react";
import { ArrowRight, Mail, MapPin, Phone, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import ScrollReveal from "@/components/ScrollReveal";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import Tick from "@/sections/Tick";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const SERVICE_ID = "service_btyx9yp";
const TEMPLATE_ID = "template_v0ef5sa";
const PUBLIC_KEY = "5YBMvyFonfMZb39kj";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, { ...formData }, PUBLIC_KEY);
      toast({ title: "Message sent.", description: "We'll get back to you within 24 hours." });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      toast({
        title: "Couldn't send message",
        description: "Please email info@3drendersstudio.com or try again shortly.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-28 lg:py-36 px-6 lg:px-10 bg-muted/40 border-t border-border overflow-hidden"
    >
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <Tick />
                <span className="text-[10px] uppercase tracking-[0.32em] text-accent">
                  Let's Talk
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[1.0] text-balance">
                Have a project in mind?
                <br />
                <em className="text-gradient-gold not-italic font-medium">Bring it in.</em>
              </h2>
            </div>
            <p className="lg:col-span-4 text-foreground/65 leading-relaxed">
              Free 30-minute consultation. Drawings, mood boards, napkin sketches — whatever you've
              got, we'll quote it within one business day.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Contact info card */}
          <ScrollReveal direction="left" className="lg:col-span-5">
            <div className="bg-card border border-border rounded-2xl p-8 lg:p-10 h-full shadow-soft">
              <h3 className="font-serif text-2xl mb-8 text-foreground">Studio</h3>

              <div className="space-y-6 mb-10">
                <a
                  href="mailto:info@3drendersstudio.com"
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-smooth">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground mb-1">
                      Email
                    </div>
                    <div className="text-sm text-foreground group-hover:text-accent transition-smooth">
                      info@3drendersstudio.com
                    </div>
                  </div>
                </a>

                <a href="tel:+14379826367" className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-11 h-11 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-smooth">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground mb-1">
                      Phone
                    </div>
                    <div className="text-sm text-foreground group-hover:text-accent transition-smooth">
                      +1 (437) 982-6367
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Mon–Fri · 9am–6pm EST</div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground mb-1">
                      Location
                    </div>
                    <div className="text-sm text-foreground">Toronto, Ontario</div>
                    <div className="text-xs text-muted-foreground mt-1">Canada — serving GTA & nationally</div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <h4 className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground mb-4">
                  Business Hours
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday – Friday</span>
                    <span className="text-foreground">9:00 — 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="text-foreground">10:00 — 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="text-muted-foreground/70">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact form */}
          <ScrollReveal direction="right" delay={0.1} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-2xl p-8 lg:p-10 space-y-6 shadow-soft"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[10px] uppercase tracking-[0.24em] text-muted-foreground mb-2"
                  >
                    Name *
                  </label>
                  <div className="field-underline">
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="bg-background border-border focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[10px] uppercase tracking-[0.24em] text-muted-foreground mb-2"
                  >
                    Email *
                  </label>
                  <div className="field-underline">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@studio.com"
                      className="bg-background border-border focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-[10px] uppercase tracking-[0.24em] text-muted-foreground mb-2"
                >
                  Phone
                </label>
                <div className="field-underline">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="bg-background border-border focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-[10px] uppercase tracking-[0.24em] text-muted-foreground mb-2"
                >
                  Project Brief *
                </label>
                <div className="field-underline">
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us about your project — scope, timeline, references..."
                    className="bg-background border-border focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="group w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-accent text-background text-xs uppercase tracking-[0.22em] font-semibold hover:bg-accent/85 transition-smooth disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-glow"
              >
                {isSending ? (
                  "Sending…"
                ) : (
                  <>
                    Send Message
                    <Send className="w-3.5 h-3.5 transition-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-muted-foreground text-center pt-2">
                We respond within 24 business hours — usually much faster.
              </p>
            </form>
          </ScrollReveal>
        </div>

        {/* Calendly */}
        <ScrollReveal delay={0.2}>
          <div className="mt-24 lg:mt-32">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="flex items-center justify-center gap-3 mb-5">
                <Tick />
                <span className="text-[10px] uppercase tracking-[0.32em] text-accent">
                  Or Book Directly
                </span>
                <Tick origin="right" />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl leading-[1.1] text-balance">
                Pick a 30-minute slot on our calendar.
              </h3>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-soft">
              <CalendlyEmbed dataUrl="https://calendly.com/nirali-215becig006/30min?background_color=161b24&text_color=e8dcc8&primary_color=c68a2e" />
            </div>
          </div>
        </ScrollReveal>

        {/* Final CTA strip */}
        <ScrollReveal delay={0.3}>
          <div className="mt-24 lg:mt-32 text-center max-w-3xl mx-auto">
            <p className="text-muted-foreground text-xs uppercase tracking-[0.32em] mb-6">
              Or simply email us
            </p>
            <a
              href="mailto:info@3drendersstudio.com"
              className="inline-block font-serif text-3xl md:text-5xl lg:text-6xl text-gradient-gold hover:opacity-90 transition-smooth cursor-pointer"
            >
              info@3drendersstudio.com
              <ArrowRight className="inline-block w-7 h-7 md:w-10 md:h-10 ml-3 text-accent" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
