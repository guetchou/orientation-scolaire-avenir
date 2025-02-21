
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"}
    `}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className={`font-heading text-2xl font-bold ${isScrolled ? "text-primary" : "text-primary"}`}>
              Orientation Pro Congo
            </span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/tests" className={`hover:text-primary transition-colors ${isScrolled ? "text-gray-700" : "text-gray-800"}`}>
              Tests
            </Link>
            <Link to="/conseillers" className={`hover:text-primary transition-colors ${isScrolled ? "text-gray-700" : "text-gray-800"}`}>
              Conseillers
            </Link>
            <Link to="/resources" className={`hover:text-primary transition-colors ${isScrolled ? "text-gray-700" : "text-gray-800"}`}>
              Ressources
            </Link>
            <Link to="/contact" className={`hover:text-primary transition-colors ${isScrolled ? "text-gray-700" : "text-gray-800"}`}>
              Contact
            </Link>
          </div>

          {/* Boutons Auth Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline">Connexion</Button>
            </Link>
            <Link to="/register">
              <Button>S'inscrire</Button>
            </Link>
          </div>

          {/* Menu Mobile Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/tests" 
              className="block py-2 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tests
            </Link>
            <Link 
              to="/conseillers" 
              className="block py-2 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Conseillers
            </Link>
            <Link 
              to="/resources" 
              className="block py-2 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ressources
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="space-y-2 pt-4 border-t">
              <Link to="/login" className="block">
                <Button variant="outline" className="w-full">Connexion</Button>
              </Link>
              <Link to="/register" className="block">
                <Button className="w-full">S'inscrire</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
