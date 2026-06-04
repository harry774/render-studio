import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background text-foreground overflow-hidden px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div className="relative text-center">
        <p className="text-[10px] uppercase tracking-[0.32em] text-accent mb-6">Page Not Found</p>
        <h1 className="font-serif text-[20vw] md:text-[16rem] leading-none text-gradient-gold mb-6">404</h1>
        <p className="text-foreground/70 mb-10 max-w-md mx-auto">
          The page you're looking for isn't here. Perhaps it never was.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-accent text-accent-foreground text-xs uppercase tracking-[0.22em] font-medium hover:bg-accent/90 transition-smooth cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Return Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
