import { Link } from 'react-router-dom';
import { Music2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-primary-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-primary-500 to-secondary p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Music2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary bg-clip-text text-transparent">
                iTunes CI
              </h1>
              <p className="text-xs text-gray-400">Recharge iTunes en CI</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-primary-500 transition-colors duration-200 font-medium"
            >
              Accueil
            </Link>
            <Link
              to="/boutique"
              className="text-gray-300 hover:text-primary-500 transition-colors duration-200 font-medium"
            >
              Boutique
            </Link>
            <Link
              to="/boutique"
              className="bg-gradient-to-r from-primary-500 to-secondary text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105"
            >
              Acheter maintenant
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
