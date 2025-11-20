import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface Project {
  title: string;
  category: string;
  images: string[];
  description: string;
  details?: string;
  client?: string;
  year?: string;
  services?: string[];
}

interface ProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectDialog = ({ isOpen, onClose, project }: ProjectDialogProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightboxOpen) setLightboxOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev ?? "";
    };
  }, [isOpen]);

  const openLightbox = (e: React.MouseEvent | undefined, src: string) => {
    e && e.stopPropagation();
    setLightboxSrc(src);
    setLightboxOpen(true);
  };

  // Close immediately and clear src to avoid race conditions
  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxSrc(null);
  };

  if (!project) return null;

  const imgs = project.images || [];
  let galleryImages: string[] = [];
  if (imgs.length === 0) galleryImages = ["", ""];
  else if (imgs.length === 1) galleryImages = [imgs[0], imgs[0]];
  else if (imgs.length === 2) galleryImages = [imgs[0], imgs[1]];
  else galleryImages = imgs.slice(1);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !lightboxOpen && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0">
        {!lightboxOpen && (
          <button
            onClick={() => onClose()}
            className="absolute right-4 top-4 z-50 rounded-full bg-background/80 backdrop-blur-sm p-2 hover:bg-background transition-smooth"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <div className="relative w-full h-[400px] md:h-[500px]">
          <img
            src={imgs && imgs.length > 0 ? imgs[0] : ""}
            alt={project.title}
            className="w-full h-full object-cover"
            onClick={(e) => imgs && imgs[0] && openLightbox(e, imgs[0])}
            style={{ cursor: imgs && imgs[0] ? "zoom-in" : "default" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-2">{project.category}</p>
            <h2 className="text-4xl md:text-5xl font-serif text-muted-foreground">{project.title}</h2>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {project.client && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Client</h3>
                <p className="font-medium">{project.client}</p>
              </div>
            )}
            {project.year && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Year</h3>
                <p className="font-medium">{project.year}</p>
              </div>
            )}
            {project.services && project.services.length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Services</h3>
                <p className="font-medium">{project.services.join(", ")}</p>
              </div>
            )}
          </div>

          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-serif">Project Overview</DialogTitle>
            <DialogDescription className="text-base leading-relaxed mt-4">{project.description}</DialogDescription>
          </DialogHeader>

          {project.details && (
            <div className="prose prose-neutral max-w-none">
              <p className="text-muted-foreground leading-relaxed">{project.details}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={img}
                  alt={`${project.title} detail ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-smooth"
                  onClick={(e) => openLightbox(e, img)}
                  style={{ cursor: img ? "zoom-in" : "default" }}
                />
              </div>
            ))}
          </div>
        </div>

        {lightboxOpen && lightboxSrc &&
          createPortal(
            <div className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-auto">
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  closeLightbox();
                }}
              />

              <div
                className="relative z-[100000] max-w-[90vw] max-h-[90vh] p-4 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeLightbox();
                  }}
                  className="absolute right-2 top-2 z-[100001] rounded-full bg-background/80 p-2 hover:bg-background transition-smooth pointer-events-auto"
                  aria-label="Close image"
                  data-testid="lightbox-close"
                >
                  <X className="h-5 w-5" />
                </button>

                <img
                  src={lightboxSrc}
                  alt="Enlarged project"
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl transform transition-all duration-300"
                />
              </div>
            </div>,
            document.body
          )}
      </DialogContent>
    </Dialog>
  );
};
export default ProjectDialog;