/**
 * Per-route document metadata. Used in two places:
 *  - PageShell sets document.title client-side on navigation
 *  - scripts/prerender.mjs bakes these into each route's static index.html,
 *    which is what Google's review bot reads (it doesn't run JS).
 */
export interface RouteMeta {
  title: string;
  description: string;
}

export const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    title: "3D Renderings Canada | GTA 3D Render, 2D Drawings & Walkthroughs",
    description:
      "Expert 3D Renderings, 2D Drawings, and 3D walkthroughs for architecture, interiors, and exteriors in Canada & GTA. Professional visualization and design services for homes, offices, and commercial spaces.",
  },
  "/portfolio": {
    title: "Portfolio — 3D Rendering Projects | 3D Renders Studio",
    description:
      "Browse our portfolio of photorealistic 3D renders: kitchens, bedrooms, bathrooms, residential exteriors and commercial spaces across Canada & GTA.",
  },
  "/services": {
    title: "3D Rendering Services | Interior, Exterior, Modeling & 2D Drawings",
    description:
      "Interior rendering, exterior visualization, architectural design and 3D modeling with 2D drawings — professional visualization services for architects, developers and designers.",
  },
  "/process": {
    title: "Our Process — How We Deliver 3D Renders | 3D Renders Studio",
    description:
      "Our four-stage rendering process: brief & references, modeling & camera set, materials & lighting, and final delivery. Two free revision rounds on every project.",
  },
  "/about": {
    title: "About Us — Canadian 3D Visualization Studio | 3D Renders Studio",
    description:
      "A Toronto-based studio of 3D artists with a decade of experience turning blueprints into photoreal visualizations for architects, developers and designers.",
  },
  "/blog": {
    title: "Blog — Architectural Visualization Insights | 3D Renders Studio",
    description:
      "Industry perspectives, technical deep-dives and lessons learned from a decade of architectural visualization: rendering, lighting, walkthroughs and more.",
  },
  "/contact": {
    title: "Contact Us — Get a Free Quote | 3D Renders Studio",
    description:
      "Get a free 30-minute consultation for your 3D rendering project. Email, call, or book directly on our calendar — quotes within one business day.",
  },
};
