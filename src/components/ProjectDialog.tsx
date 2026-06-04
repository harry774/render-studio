import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { toWebp } from "@/lib/img";

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = () => setLightboxIndex(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") { closeLightbox(); return; }
      if (e.key === "ArrowRight") setLightboxIndex((i) => ((i ?? 0) + 1) % imgs.length);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => ((i ?? 0) - 1 + imgs.length) % imgs.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev ?? ""; };
  }, [isOpen]);

  if (!project) return null;
  const imgs = project.images || [];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && lightboxIndex === null && onClose()}>
      <DialogContent className="max-w-6xl max-h-[92vh] overflow-y-auto p-0 bg-card border border-border rounded-2xl">
        <VisuallyHidden><DialogTitle>{project?.title ?? "Project Gallery"}</DialogTitle></VisuallyHidden>
        {/* Close button */}
        {lightboxIndex === null && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-50 rounded-full bg-background/80 backdrop-blur-sm p-2 hover:bg-background transition-smooth cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <div className="p-6 md:p-8">
          {/* Photo grid — all images */}
          <div className="columns-2 md:columns-3 gap-3 space-y-3">
            {imgs.map((img, idx) => (
              <div
                key={idx}
                className="break-inside-avoid overflow-hidden rounded-xl cursor-zoom-in group"
                onClick={() => setLightboxIndex(idx)}
              >
                <picture>
                  <source srcSet={toWebp(img, "thumb")} type="image/webp" />
                  <img
                    src={img}
                    alt={`${project.title} ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </picture>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && imgs.length > 0 &&
          createPortal(
            <div
              className="fixed inset-0 z-[99999] flex items-center justify-center"
              style={{ pointerEvents: "all" }}
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/95"
                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              />

              {/* Close */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                className="absolute right-5 top-5 z-[100002] w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/30 transition-smooth cursor-pointer"
                aria-label="Close"
                style={{ pointerEvents: "all" }}
              >
                <X className="h-5 w-5 text-white" />
              </button>

              {/* Prev */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => ((i ?? 0) - 1 + imgs.length) % imgs.length); }}
                className="absolute left-5 top-1/2 -translate-y-1/2 z-[100002] w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/30 transition-smooth cursor-pointer"
                aria-label="Previous"
                style={{ pointerEvents: "all" }}
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>

              {/* Image */}
              <div
                className="relative z-[100001] max-w-[88vw] max-h-[88vh] flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
                style={{ pointerEvents: "all" }}
              >
                <picture>
                  <source srcSet={toWebp(imgs[lightboxIndex])} type="image/webp" />
                  <img
                    src={imgs[lightboxIndex]}
                    alt={`Enlarged ${lightboxIndex + 1}`}
                    decoding="async"
                    className="max-w-full max-h-[84vh] object-contain rounded-lg shadow-2xl"
                  />
                </picture>
                <div className="mt-3 text-white/50 text-xs tracking-widest">
                  {lightboxIndex + 1} / {imgs.length}
                </div>
              </div>

              {/* Next */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => ((i ?? 0) + 1) % imgs.length); }}
                className="absolute right-5 top-1/2 -translate-y-1/2 z-[100002] w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/30 transition-smooth cursor-pointer"
                aria-label="Next"
                style={{ pointerEvents: "all" }}
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>,
            document.body
          )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
