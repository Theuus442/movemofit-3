import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-slate-900 to-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
      <div className="relative z-10 text-center p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <h1 className="text-5xl font-extrabold mb-2">404</h1>
        <p className="text-white/80 mb-6">Este portal não existe.</p>
        <a href="/" className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-primary-foreground font-semibold">
          Voltar ao Oráculo
        </a>
      </div>
    </div>
  );
};

export default NotFound;
