import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import { productService } from '../services/api';
import { Product } from '../types/index';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAll();
      setProducts(response.data);
      setError(null);
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Erreur lors du chargement des produits';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
            <span className="text-gray-400">Chargement..</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-500 to-secondary bg-clip-text text-transparent">
              Notre Boutique
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choisissez la carte iTunes qui vous convient. Prix en Francs CFA.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3 text-red-400">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-primary-500/20 hover:border-primary-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/20"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary" />

              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="inline-block bg-gradient-to-br from-primary-500 to-secondary p-4 rounded-2xl mb-4">
                    <ShoppingCart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {product.title}
                  </h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-secondary bg-clip-text text-transparent">
                    {product.price_fcfa.toLocaleString()} FCFA
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Valeur</span>
                    <span className="text-white font-semibold">{product.amount_usd}€</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Disponible</span>
                    <span className={`font-semibold ${product.stock > 0 ? 'text-success' : 'text-danger'}`}>
                      {product.stock > 0 ? `${product.stock} en stock` : 'Épuisé'}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/commande/${product._id}`}
                  className={`block text-center font-bold py-3 rounded-xl transition-all duration-300 ${
                    product.stock > 0
                      ? 'bg-gradient-to-r from-primary-500 to-secondary text-white hover:shadow-lg hover:shadow-primary-500/50'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                  onClick={(e) => product.stock === 0 && e.preventDefault()}
                >
                  {product.stock > 0 ? 'Acheter' : 'Indisponible'}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && !loading && !error && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Aucun produit disponible pour le moment.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
