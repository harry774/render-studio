import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-bg text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-serif font-semibold tracking-tight">
              3D RENDERS
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm uppercase tracking-wider transition-smooth hover:text-muted ${
                  isActive(link.path) ? "text-primary-foreground" : "text-primary-foreground/70"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button
              asChild
              variant="outline"
              className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-nav-bg transition-smooth"
            >
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary-foreground/10 transition-smooth z-50"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 top-20 bg-nav-bg z-40 animate-fade-in">
            <div className="flex flex-col space-y-2 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-base uppercase tracking-wider transition-smooth hover:text-primary-foreground px-4 py-3 rounded ${
                    isActive(link.path)
                      ? "text-primary-foreground bg-primary-foreground/10"
                      : "text-primary-foreground/70"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button
                asChild
                variant="outline"
                size="lg"
                className="mt-4 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-nav-bg"
              >
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
