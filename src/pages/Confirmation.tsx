import { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Clock, Mail, ShoppingBag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { orderService } from '../services/api';
import { Order } from '../types/index';
import toast from 'react-hot-toast';

export default function Confirmation() {
  const { orderId } = useParams<{ orderId: string }>();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchOrder();
    // Vérifier le statut du paiement toutes les 5 secondes pendant 2 minutes
    const interval = setInterval(checkPaymentStatus, 5000);
    const timeout = setTimeout(() => clearInterval(interval), 120000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [orderId]);

  const fetchOrder = async () => {
    if (!orderId) return;
    try {
      const response = await orderService.getById(orderId);
      setOrder(response.data);
    } catch (err: any) {
      toast.error('Commande introuvable');
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async () => {
    if (!orderId) return;
    try {
      const response = await orderService.checkPaymentStatus(orderId);
      setPaymentStatus(response.data.payment_status);
    } catch (err: any) {
      console.error('Erreur lors de la vérification du statut:', err);
    }
  };

  const getStatusDisplay = () => {
    if (status === 'error') {
      return {
        icon: AlertCircle,
        color: 'danger',
        title: 'Erreur de paiement',
        subtitle: 'Le paiement a échoué. Veuillez réessayer.',
        bgColor: 'bg-danger/20',
        borderColor: 'border-danger/30',
      };
    }

    switch (paymentStatus) {
      case 'completed':
        return {
          icon: CheckCircle2,
          color: 'success',
          title: 'Paiement réussi !',
          subtitle: 'Votre code iTunes vous sera envoyé par email',
          bgColor: 'bg-success/20',
          borderColor: 'border-success/30',
        };
      case 'pending':
      case 'processing':
        return {
          icon: Clock,
          color: 'primary',
          title: 'Paiement en cours...',
          subtitle: 'Nous traitons votre paiement',
          bgColor: 'bg-primary-500/20',
          borderColor: 'border-primary-500/30',
        };
      case 'failed':
        return {
          icon: AlertCircle,
          color: 'danger',
          title: 'Paiement échoué',
          subtitle: 'Une erreur est survenue. Veuillez réessayer.',
          bgColor: 'bg-danger/20',
          borderColor: 'border-danger/30',
        };
      case 'cancelled':
        return {
          icon: AlertCircle,
          color: 'alert',
          title: 'Paiement annulé',
          subtitle: 'Vous avez annulé la transaction',
          bgColor: 'bg-alert/20',
          borderColor: 'border-alert/30',
        };
      default:
        return {
          icon: Clock,
          color: 'primary',
          title: 'Commande enregistrée',
          subtitle: 'Veuillez patiente pendant que nous vérifions votre paiement',
          bgColor: 'bg-primary-500/20',
          borderColor: 'border-primary-500/30',
        };
    }
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

  const statusDisplay = getStatusDisplay();
  const StatusIcon = statusDisplay.icon;

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-${statusDisplay.color} rounded-full mb-6 ${paymentStatus === 'completed' ? 'animate-bounce' : ''}`}>
            <StatusIcon className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {statusDisplay.title}
          </h1>
          <p className="text-gray-400 text-lg">
            {statusDisplay.subtitle}
          </p>
        </div>

        {order && (
          <>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-primary-500/20 p-8 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <ShoppingBag className="w-6 h-6 text-primary-500" />
                <h2 className="text-2xl font-bold text-white">Récapitulatif de la commande</h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b border-gray-700">
                  <span className="text-gray-400">Numéro</span>
                  <span className="text-white font-mono text-sm">{order._id.slice(0, 8)}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-gray-700">
                  <span className="text-gray-400">Montant</span>
                  <span className="text-primary-500 font-bold">{order.total_fcfa.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-gray-700">
                  <span className="text-gray-400">Quantité</span>
                  <span className="text-white">{order.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Statut</span>
                  <span className={`${statusDisplay.bgColor} text-${statusDisplay.color} px-3 py-1 rounded-full text-sm capitalize`}>
                    {paymentStatus || 'En attente'}
                  </span>
                </div>
              </div>
            </div>

            <div className={`${statusDisplay.bgColor} border ${statusDisplay.borderColor} rounded-xl p-6 mb-8`}>
              <div className="flex items-start space-x-3">
                <Mail className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-bold mb-2">Informations importantes</h3>
                  {paymentStatus === 'completed' ? (
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>✓ Votre paiement a été reçu</li>
                      <li>✓ Code iTunes envoyé à: <span className="text-white font-semibold">{order.customer_email}</span></li>
                      <li>✓ Vérifiez vos spams si nécessaire</li>
                      <li>✓ Support: support@itunes-ci.com</li>
                    </ul>
                  ) : (
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>📧 Confirmation envoyée à: <span className="text-white font-semibold">{order.customer_email}</span></li>
                      <li>⏱️ Vérification du paiement en cours...</li>
                      <li>💡 Cette page se met à jour automatiquement</li>
                      <li>❓ Besoin d'aide? Contactez support@itunes-ci.com</li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="text-center space-y-4">
          <Link
            to="/boutique"
            className="inline-flex items-center justify-center bg-gradient-to-r from-primary-500 to-secondary text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
          >
            Retour à la boutique
          </Link>
          <p className="text-gray-500 text-sm">
            Besoin d'aide ? Contactez{' '}
            <a href="mailto:support@itunes-ci.com" className="text-primary-500 hover:underline">
              support@itunes-ci.com
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
