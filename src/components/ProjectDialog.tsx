import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface ProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    category: string;
    image: string;
    description: string;
    details?: string;
    client?: string;
    year?: string;
    services?: string[];
  };
}

const ProjectDialog = ({ isOpen, onClose, project }: ProjectDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-background/80 backdrop-blur-sm p-2 hover:bg-background transition-smooth"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative w-full h-[400px] md:h-[500px]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <p className="text-xs uppercase tracking-wider text-primary-foreground/70 mb-2">
              {project.category}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-primary-foreground">
              {project.title}
            </h2>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {project.client && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                  Client
                </h3>
                <p className="font-medium">{project.client}</p>
              </div>
            )}
            {project.year && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                  Year
                </h3>
                <p className="font-medium">{project.year}</p>
              </div>
            )}
            {project.services && project.services.length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                  Services
                </h3>
                <p className="font-medium">{project.services.join(", ")}</p>
              </div>
            )}
          </div>

          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-serif">Project Overview</DialogTitle>
            <DialogDescription className="text-base leading-relaxed mt-4">
              {project.description}
            </DialogDescription>
          </DialogHeader>

          {project.details && (
            <div className="prose prose-neutral max-w-none">
              <p className="text-muted-foreground leading-relaxed">{project.details}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} detail 1`}
                className="w-full h-full object-cover hover:scale-105 transition-smooth"
              />
            </div>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} detail 2`}
                className="w-full h-full object-cover hover:scale-105 transition-smooth"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
