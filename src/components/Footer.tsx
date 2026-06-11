import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const navLinks = [
  { id: "home", label: "Home", path: "/" },
  { id: "services", label: "Services", path: "/services" },
  { id: "portfolio", label: "Portfolio", path: "/portfolio" },
  { id: "process", label: "Process", path: "/process" },
  { id: "about-us", label: "About Us", path: "/about" },
  { id: "blog", label: "Blog", path: "/blog" },
  { id: "contact", label: "Contact", path: "/contact" },
];

/* Smooth-scroll when the section exists on the current page; otherwise let the
   real href navigate to the standalone route. */
const handleAnchor = (e: React.MouseEvent, id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative surface-dark overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <img
              src="/assets/nav-logo.svg"
              alt="3D Renders Studio"
              className="h-11 w-auto mb-6"
            />
            <p className="text-white/55 leading-relaxed max-w-md mb-6 text-sm">
              Cinematic 3D visualizations for architects, developers and
              interior designers. Toronto-based, working nationally.
            </p>
            <a
              href="/contact"
              onClick={(e) => handleAnchor(e, "contact")}
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white hover:text-white/70 transition-smooth cursor-pointer"
            >
              Start a project
              <ArrowUpRight className="w-3.5 h-3.5 transition-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.28em] text-white/40 mb-4">Navigate</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.path}
                    onClick={(e) => handleAnchor(e, link.id)}
                    className="text-sm text-white/60 hover:text-white transition-smooth cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.28em] text-white/40 mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>Interior Rendering</li>
              <li>Exterior Visualization</li>
              <li>Architectural Design</li>
              <li>3D Modeling</li>
              <li>2D Drawings</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.28em] text-white/40 mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:info@3drendersstudio.com" className="flex items-start gap-2 text-white/60 hover:text-white transition-smooth cursor-pointer">
                  <Mail size={14} className="mt-0.5 flex-shrink-0" />
                  <span>info@3drendersstudio.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+14379826367" className="flex items-start gap-2 text-white/60 hover:text-white transition-smooth cursor-pointer">
                  <Phone size={14} className="mt-0.5 flex-shrink-0" />
                  <span>+1 (437) 982-6367</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/60">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span>Toronto, ON · Canada</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-white/35">
            <p>© {year} 3D Renders Studio</p>
            <p>Toronto · Serving Canada</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
