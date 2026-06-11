import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const sections = [
  { id: "home", label: "Home", path: "/" },
  { id: "services", label: "Services", path: "/services" },
  { id: "portfolio", label: "Portfolio", path: "/portfolio" },
  { id: "process", label: "Process", path: "/process" },
  { id: "about-us", label: "About Us", path: "/about" },
  { id: "blog", label: "Blog", path: "/blog" },
  { id: "contact", label: "Contact", path: "/contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /**
   * On the one-page home, smooth-scroll to the section. On standalone pages
   * (where the section isn't in the DOM) navigate to the real route instead.
   * The href stays a real path either way so crawlers see proper links.
   */
  const handleAnchor = (e: React.MouseEvent, id: string, path: string) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    } else {
      navigate(path);
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 surface-dark transition-smooth ${
        scrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.25)]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Small wordmark for header — white text on black */}
          <a
            href="/"
            onClick={(e) => handleAnchor(e, "home", "/")}
            className="cursor-pointer hover:opacity-80 transition-smooth"
            aria-label="3D Renders Studio — Home"
          >
            <img
              src="/assets/nav-logo.svg"
              alt="3D Renders Studio"
              className="h-11 w-auto mb-2"
            />
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <a
                  key={s.id}
                  href={s.path}
                  onClick={(e) => handleAnchor(e, s.id, s.path)}
                  className={`relative px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-smooth cursor-pointer ${
                    isActive ? "text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  {s.label}
                  {isActive && (
                    <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-white" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <a
            href="/contact"
            onClick={(e) => handleAnchor(e, "contact", "/contact")}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-background text-[11px] uppercase tracking-[0.16em] font-semibold hover:bg-accent/85 transition-smooth cursor-pointer"
          >
            Get Quote
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-smooth cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden surface-dark-elevated border-t border-white/10"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {sections.map((s) => {
                const isActive = active === s.id;
                return (
                  <a
                    key={s.id}
                    href={s.path}
                    onClick={(e) => handleAnchor(e, s.id, s.path)}
                    className={`text-left px-4 py-3 rounded-lg text-sm uppercase tracking-[0.18em] transition-smooth cursor-pointer ${
                      isActive ? "text-white bg-white/10" : "text-white/60 hover:bg-white/5"
                    }`}
                  >
                    {s.label}
                  </a>
                );
              })}
              <a
                href="/contact"
                onClick={(e) => handleAnchor(e, "contact", "/contact")}
                className="mt-3 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-accent text-background text-xs uppercase tracking-[0.18em] font-semibold cursor-pointer"
              >
                Get Quote
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navigation;
