import { ReactNode, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Tick from "@/sections/Tick";
import { ROUTE_META } from "@/lib/seo";

interface PageShellProps {
  /** Route path used to look up the document title, e.g. "/portfolio" */
  path: string;
  eyebrow: string;
  title: ReactNode;
  intro: string;
  children: ReactNode;
}

/**
 * Layout for standalone section pages (/portfolio, /services, …). Each page
 * gets its own h1 + intro so the server-rendered HTML is distinct per URL —
 * required for Google Ads sitelink review, which doesn't execute JS.
 */
const PageShell = ({ path, eyebrow, title, intro, children }: PageShellProps) => {
  useEffect(() => {
    const meta = ROUTE_META[path];
    if (meta) document.title = meta.title;
    window.scrollTo(0, 0);
  }, [path]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <header className="relative pt-40 pb-16 lg:pt-48 lg:pb-20 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Tick />
              <span className="text-[10px] uppercase tracking-[0.32em] text-accent">{eyebrow}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-balance mb-6">
              {title}
            </h1>
            <p className="text-foreground/65 leading-relaxed max-w-2xl">{intro}</p>
          </div>
        </header>
        <main>{children}</main>
        <Footer />
      </div>
    </MotionConfig>
  );
};

export default PageShell;
