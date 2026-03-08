import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertCircle, CreditCard, CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { orderService } from '../services/api';
import { Order } from '../types/index';
import toast from 'react-hot-toast';

export default function Payment() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    if (!orderId) return;
    try {
      const response = await orderService.getById(orderId);
      setOrder(response.data);

      // Si le paiement est déjà en cours ou complété, indiquer à l'utilisateur
      if (response.data.geniuspay_checkout_url) {
        // Le paiement a été initialisé, prêt à rediriger
      }
    } catch (err: any) {
      toast.error('Commande introuvable');
      navigate('/boutique');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    if (!order) return;

    if (!order.geniuspay_checkout_url) {
      toast.error('URL de paiement non disponible');
      return;
    }

    setProcessingPayment(true);
    // Rediriger vers le gateway de paiement GeniusPay
    window.location.href = order.geniuspay_checkout_url;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
            <AlertCircle className="w-6 h-6 text-red-400 mb-2" />
            <p className="text-red-400">Commande introuvable</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">Confirmez votre paiement</h1>
        <p className="text-gray-400 mb-12">
          Vous êtes sur le point de procéder au paiement de votre commande
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Résumé de la commande */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-primary-500/20 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Résumé de la commande</h2>
              
              <div className="space-y-4 pb-6 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Produit</span>
                  <span className="text-white font-semibold">
                    {order.product?.title || 'Carte iTunes'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Quantité</span>
                  <span className="text-white font-semibold">{order.quantity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Montant unitaire</span>
                  <span className="text-white font-semibold">
                    {order.product?.price_fcfa.toLocaleString() || 0} FCFA
                  </span>
                </div>
              </div>

              <div className="pt-6 flex justify-between items-center">
                <span className="text-xl font-bold text-gray-300">Total à payer</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary bg-clip-text text-transparent">
                  {order.total_fcfa.toLocaleString()} FCFA
                </span>
              </div>
            </div>

            {/* Informations de sécurité */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-green-400 mb-2">Paiement sécurisé</h4>
                  <p className="text-green-400/80 text-sm">
                    Votre paiement est protégé par GeniusPay. Vos informations bancaires sont traitées de manière sécurisée.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar avec bouton de paiement */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-primary-500/20 p-6 sticky top-4">
              <div className="space-y-6">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Montant à payer</p>
                  <p className="text-3xl font-bold text-primary-500">
                    {order.total_fcfa.toLocaleString()} FCFA
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-700">
                  <p className="text-gray-400 text-sm mb-4">
                    Cliquez sur le bouton ci-dessous pour procéder au paiement sécurisé.
                  </p>

                  <button
                    onClick={handlePayment}
                    disabled={processingPayment || !order.geniuspay_checkout_url}
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    {processingPayment ? 'Redirection...' : 'Passer au paiement'}
                  </button>
                </div>

                <div className="pt-6 border-t border-gray-700 text-xs text-gray-500">
                  <p>✓ Paiement chiffré et sécurisé</p>
                  <p>✓ Multiples moyens de paiement</p>
                  <p>✓ Livraison instantanée par email</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
