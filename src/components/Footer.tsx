import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-semibold mb-4">3D RENDERS</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Expert 3D modeling, rendering, and design services for architectural visualization and creative projects.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-wider font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-smooth">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-smooth">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-smooth">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-smooth">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm uppercase tracking-wider font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Interior Rendering</li>
              <li>Exterior Visualization</li>
              <li>Architectural Design</li>
              <li>3D Modeling</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm uppercase tracking-wider font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-primary-foreground/70">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <span>info@3drendersstudio.com</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-primary-foreground/70">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-primary-foreground/70">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Toronto, ON, Canada</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8">
          <p className="text-center text-sm text-primary-foreground/70">
            © {currentYear} 3D Renders Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
