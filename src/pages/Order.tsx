import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Loader, AlertCircle, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { productService, orderService } from '../services/api';
import { Product } from '../types/index';
import toast from 'react-hot-toast';

interface OrderFormData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  quantity: number;
}

export default function Order() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<OrderFormData>({
    defaultValues: {
      quantity: 1
    }
  });

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const quantity = watch('quantity');
  const total = product ? product.price_fcfa * quantity : 0;

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;
    try {
      const response = await productService.getById(id);
      setProduct(response.data);
      setError(null);
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Produit introuvable';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: OrderFormData) => {
    if (!product) return;

    setSubmitting(true);
    try {
      const response = await orderService.create({
        product_id: product._id,
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone,
        quantity: parseInt(data.quantity.toString()),
        total_fcfa: total,
      });

      if (response.data.checkout_url) {
        // Rediriger vers GeniusPay
        window.location.href = response.data.checkout_url;
      } else {
        toast.error('Erreur: URL de paiement introuvable');
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Erreur lors de la création de la commande';
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader className="w-12 h-12 text-primary-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-danger/10 border border-danger/30 rounded-lg p-6 flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-danger mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-danger mb-2">Erreur</h3>
              <p className="text-danger/80 mb-4">{error || 'Produit introuvable'}</p>
              <Link to="/boutique" className="text-primary-500 hover:underline">
                Retour à la boutique
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-12">Formulaire de Commande</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-primary-500/20 p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Vos informations</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nom complet
                    </label>
                    <input
                      {...register('customer_name', { required: 'Nom requis' })}
                      type="text"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition"
                      placeholder="Ex: Jean Dupont"
                    />
                    {errors.customer_name && (
                      <p className="text-danger text-sm mt-1">{errors.customer_name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      {...register('customer_email', {
                        required: 'Email requis',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email invalide' }
                      })}
                      type="email"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition"
                      placeholder="exemple@email.com"
                    />
                    {errors.customer_email && (
                      <p className="text-danger text-sm mt-1">{errors.customer_email.message}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      ⚠️ Vérifiez bien votre email. Votre code iTunes y sera envoyé.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Numéro de téléphone
                    </label>
                    <input
                      {...register('customer_phone', { required: 'Téléphone requis' })}
                      type="tel"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition"
                      placeholder="Ex: 07 XX XX XX XX"
                    />
                    {errors.customer_phone && (
                      <p className="text-danger text-sm mt-1">{errors.customer_phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Quantité
                    </label>
                    <select
                      {...register('quantity')}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none transition"
                    >
                      {[1, 2, 3, 4, 5].map(q => (
                        <option key={q} value={q}>{q} {q > 1 ? 'cartes' : 'carte'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-primary-500 to-secondary text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {submitting ? 'Redirection vers le paiement...' : 'Procéder au paiement'}
                {!submitting && <ArrowRight className="ml-2 w-5 h-5" />}
              </button>
            </form>
          </div>

          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-primary-500/20 p-6 sticky top-4">
              <h3 className="text-xl font-bold text-white mb-6">Récapitulatif</h3>

              <div className="space-y-4 pb-4 border-b border-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-400">Produit</span>
                  <span className="text-white font-semibold">{product.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Montant unitaire</span>
                  <span className="text-white">{product.price_fcfa.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Quantité</span>
                  <span className="text-white">{quantity}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-300">Total</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary bg-clip-text text-transparent">
                  {total.toLocaleString()} FCFA
                </span>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-xs text-gray-500 leading-relaxed">
                  💳 Vous serez redirigé vers le paiement sécurisé GeniusPay où vous pourrez choisir votre moyen de paiement préféré (Wave, Orange Money, MTN MoMo, Carte bancaire).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
