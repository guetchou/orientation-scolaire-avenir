
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Orientation Pro Congo</h3>
            <p className="text-sm leading-relaxed">
              Votre partenaire de confiance pour l'orientation scolaire et professionnelle au Congo. 
              Nous vous guidons vers votre avenir avec expertise et passion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Liens Rapides */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tests" className="hover:text-primary transition-colors">Tests d'Orientation</Link>
              </li>
              <li>
                <Link to="/conseillers" className="hover:text-primary transition-colors">Nos Conseillers</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-primary transition-colors">Ressources</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">À Propos</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@orientationprocongo.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+242 00 000 000</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Brazzaville, République du Congo</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Newsletter</h3>
            <p className="text-sm">Restez informé de nos dernières actualités</p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded transition-colors">
                S'abonner
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Orientation Pro Congo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
