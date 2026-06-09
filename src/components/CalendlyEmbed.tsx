import { useEffect, useRef, useState } from "react";

interface CalendlyEmbedProps {
  /** Full Calendly inline-widget data-url, including colour params. */
  dataUrl: string;
  /** Pixel height of the embed; matches Calendly's recommended sizing. */
  height?: number;
}

/**
 * Loads the ~2.6 MB Calendly script + widget only when it scrolls near the
 * viewport. Until then nothing Calendly-related is fetched, keeping it off the
 * critical path. Functionality is identical to the original inline embed.
 */
const CalendlyEmbed = ({ dataUrl, height = 700 }: CalendlyEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  // Reveal (and trigger loading) once the embed gets close to the viewport.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || active) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [active]);

  // Inject the Calendly script only after we've decided to activate.
  useEffect(() => {
    if (!active) return;
    if (document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, [active]);

  return (
    <div ref={containerRef} style={{ minHeight: `${height}px` }}>
      {active ? (
        <div
          className="calendly-inline-widget"
          data-url={dataUrl}
          style={{ minWidth: "320px", height: `${height}px`, width: "100%" }}
        />
      ) : (
        <div
          className="flex items-center justify-center text-muted-foreground text-sm"
          style={{ height: `${height}px` }}
        >
          Loading calendar…
        </div>
      )}
    </div>
  );
};

export default CalendlyEmbed;
