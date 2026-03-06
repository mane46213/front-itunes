import { useState, useEffect } from 'react';
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Clock,
  CheckCircle,
  Send,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { adminService } from '../services/api';
import { Order, Stats } from '../types/index';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [itunesCodes, setItunesCodes] = useState('');
  const [delivering, setDelivering] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, ordersRes] = await Promise.all([
        adminService.getStats(),
        adminService.getOrders()
      ]);
      setStats(statsRes.data);
      setOrders(ordersRes.data);
    } catch (err: any) {
      toast.error('Erreur lors du chargement des données');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeliver = async () => {
    if (!selectedOrder || !itunesCodes.trim()) {
      toast.error('Veuillez saisir les codes iTunes');
      return;
    }

    const codes = itunesCodes.split('\n').filter(code => code.trim());
    if (codes.length !== selectedOrder.quantity) {
      toast.error(`Vous devez entrer ${selectedOrder.quantity} code(s)`);
      return;
    }

    setDelivering(true);
    try {
      await adminService.deliverOrder(selectedOrder._id, codes);
      toast.success('Commande livrée et email envoyé');
      setSelectedOrder(null);
      setItunesCodes('');
      loadData();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Erreur lors de la livraison');
    } finally {
      setDelivering(false);
    }
  };

  const handleCancel = async (orderId: string) => {
    if (!confirm('Êtes-vous sûr ?')) return;

    try {
      await adminService.cancelOrder(orderId);
      toast.success('Commande annulée');
      loadData();
    } catch (err: any) {
      toast.error('Erreur lors de l\'annulation');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  const pendingOrders = orders.filter(o => o.status === 'pending');

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-primary-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Commandes Totales</p>
              <p className="text-3xl font-bold text-white">{stats?.totalOrders || 0}</p>
            </div>
            <div className="bg-primary-500/10 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-primary-500" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">En Attente</p>
              <p className="text-3xl font-bold text-blue-400">{stats?.pendingOrders || 0}</p>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-success/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Livrées</p>
              <p className="text-3xl font-bold text-success">{stats?.deliveredOrders || 0}</p>
            </div>
            <div className="bg-success/10 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-secondary/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Revenue (Aujourd'hui)</p>
              <p className="text-3xl font-bold text-secondary">
                {stats?.todayRevenue?.toLocaleString() || 0} FCFA
              </p>
            </div>
            <div className="bg-secondary/10 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-secondary" />
            </div>
          </div>
        </div>
      </div>

      {/* Commandes en attente */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-primary-500/20 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-primary-500" />
          Commandes en attente ({pendingOrders.length})
        </h2>

        {pendingOrders.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Aucune commande en attente</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Client</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Montant</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Méthode</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Ref Tx</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.map(order => (
                  <tr key={order._id} className="border-b border-gray-700 hover:bg-gray-800/50 transition">
                    <td className="py-4 px-4 text-white">{order.customer_name}</td>
                    <td className="py-4 px-4 text-gray-400 text-sm">{order.customer_email}</td>
                    <td className="py-4 px-4 text-primary-500 font-bold">{order.total_fcfa.toLocaleString()} FCFA</td>
                    <td className="py-4 px-4 text-gray-400">{order.payment_method}</td>
                    <td className="py-4 px-4 text-gray-400 font-mono text-sm">{order.transaction_ref || '-'}</td>
                    <td className="py-4 px-4 flex gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="bg-success/20 hover:bg-success/30 text-success px-3 py-1 rounded-lg text-sm transition flex items-center gap-1"
                      >
                        <Send className="w-4 h-4" />
                        Livrer
                      </button>
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="bg-danger/20 hover:bg-danger/30 text-danger px-3 py-1 rounded-lg text-sm transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Livraison */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-primary-500/30 rounded-2xl p-8 max-w-2xl w-full">
            <h3 className="text-2xl font-bold text-white mb-6">
              Livrer codes iTunes
            </h3>

            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <p className="text-gray-400 text-sm mb-2">Client: {selectedOrder.customer_name}</p>
              <p className="text-gray-400 text-sm mb-2">Email: {selectedOrder.customer_email}</p>
              <p className="text-primary-500 font-bold">À envoyer: {selectedOrder.quantity} code(s)</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Codes iTunes (un par ligne)
              </label>
              <textarea
                value={itunesCodes}
                onChange={(e) => setItunesCodes(e.target.value)}
                className="w-full h-32 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                placeholder="XXXX-XXXX-XXXX-XXXX"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDeliver}
                disabled={delivering}
                className="flex-1 bg-success hover:bg-success/90 text-white font-bold py-2 rounded-lg transition disabled:opacity-50"
              >
                {delivering ? 'Envoi...' : 'Valider et Envoyer Email'}
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded-lg transition"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
