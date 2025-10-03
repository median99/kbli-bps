import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button"; // Import Button component

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-4">
        <h1 className="mb-4 text-5xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Halaman tidak ditemukan.</p>
        <Button asChild> {/* Use asChild to render Button as a link */}
          <a href="/">Kembali ke Beranda</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;