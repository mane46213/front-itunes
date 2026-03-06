import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 border-t border-primary-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-primary-500 font-bold text-lg mb-4">iTunes CI</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Plateforme de vente de cartes de recharge iTunes pour la Côte d'Ivoire.
              Livraison instantanée par email.
            </p>
          </div>

          <div>
            <h3 className="text-primary-500 font-bold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-primary-500 text-sm transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/boutique" className="text-gray-400 hover:text-primary-500 text-sm transition-colors">
                  Boutique
                </a>
              </li>
              <li>
                <a href="/admin" className="text-gray-400 hover:text-primary-500 text-sm transition-colors">
                  Admin
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-primary-500 font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-primary-500" />
                <span>support@itunes-ci.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-primary-500" />
                <span>+225 05 56 26 28 28</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-primary-500" />
                <span>Abidjan, Côte d'Ivoire</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 iTunes CI. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
