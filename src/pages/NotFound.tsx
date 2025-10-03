import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button"; // Import Button component

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground p-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-extrabold text-primary">404</h1>
        <p className="text-2xl font-semibold text-muted-foreground">Oops! Halaman tidak ditemukan.</p>
        <p className="text-md text-muted-foreground max-w-md mx-auto">
          Sepertinya Anda tersesat. Halaman yang Anda cari mungkin telah dihapus, namanya diubah, atau tidak pernah ada.
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Kembali ke Beranda</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;