import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { orderService } from '../services/api';
import { Order } from '../types/index';
import toast from 'react-hot-toast';

const PAYMENT_METHODS = [
  { id: 'Orange Money', label: '🟠 Orange Money CI', number: '#144*1*1*07XXXXXXXX*MONTANT#' },
  { id: 'MTN MoMo', label: '🟡 MTN Mobile Money (MoMo)', number: '*152*1*07XXXXXXXX*MONTANT#' },
  { id: 'Wave', label: '🔵 Wave CI', number: 'Envoyer vers numero Wave' },
  { id: 'Moov Money', label: '💳 Moov Money', number: '*366*1*MONTANT#' }
];

export default function Payment() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<string>('Orange Money');
  const [transactionRef, setTransactionRef] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    if (!orderId) return;
    try {
      const response = await orderService.getById(orderId);
      setOrder(response.data);
      if (response.data.payment_method) {
        setSelectedMethod(response.data.payment_method);
      }
    } catch (err: any) {
      toast.error('Commande introuvable');
      navigate('/boutique');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!order || !selectedMethod || !transactionRef.trim()) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    setSubmitting(true);
    try {
      toast.success('Paiement en attente de validation');
      navigate(`/confirmation/${order._id}`);
    } catch (err: any) {
      toast.error('Erreur lors de la validation du paiement');
    } finally {
      setSubmitting(false);
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

  const currentMethod = PAYMENT_METHODS.find(m => m.id === selectedMethod);

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">Modes de Paiement</h1>
        <p className="text-gray-400 mb-12">
          Choisissez votre méthode de paiement pour valider votre commande
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {PAYMENT_METHODS.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedMethod === method.id
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{method.label}</h3>
                    <p className="text-gray-400 font-mono text-sm mb-3">
                      Composez: {method.number}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Montant: {order.total_fcfa.toLocaleString()} FCFA
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 mt-1 flex-shrink-0 ${
                    selectedMethod === method.id
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-600'
                  }`} />
                </div>
              </div>
            ))}

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
              <h4 className="font-bold text-blue-400 mb-3">📱 Instructions:</h4>
              <ol className="text-blue-400/80 text-sm space-y-2 list-decimal list-inside">
                <li>Composez le numéro depuis votre téléphone</li>
                <li>Remplacez MONTANT par {order.total_fcfa.toLocaleString()} FCFA</li>
                <li>Remplacez 07XXXXXXXX par votre numéro</li>
                <li>Confirmez la transaction</li>
                <li>Notez le numéro de transaction reçu dans le SMS</li>
              </ol>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-primary-500/20 p-6 sticky top-4">
              <h3 className="text-xl font-bold text-white mb-6">Validation</h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-700">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Montant à payer</p>
                  <p className="text-3xl font-bold text-primary-500">
                    {order.total_fcfa.toLocaleString()} FCFA
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Méthode</p>
                  <p className="text-white font-semibold">{selectedMethod}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Numéro de transaction
                  </label>
                  <input
                    type="text"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    placeholder="Ex: TRX123456789"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Reçu par SMS après paiement
                  </p>
                </div>

                <button
                  onClick={handleConfirmPayment}
                  disabled={submitting || !transactionRef.trim()}
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? 'Validation...' : 'Confirmer'}
                  {!submitting && <ArrowRight className="w-5 h-5" />}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700 text-xs text-gray-500">
                <p>✓ Validation sous 5-30 minutes</p>
                <p>✓ Code par email après validation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
