import { useNavigate, Routes, Route } from 'react-router-dom';
import { LogOut, Music2 } from 'lucide-react';
import AdminDashboard from '../pages/AdminDashboard';

export default function AdminLayout() {
  const navigate = useNavigate();
  const adminEmail = localStorage.getItem('admin_email') || 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-primary-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-primary-500 to-secondary p-2 rounded-xl">
                <Music2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary bg-clip-text text-transparent">
                  Tableau de Bord Admin
                </h1>
                <p className="text-xs text-gray-400">{adminEmail}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-primary-500 hover:bg-primary-500/10 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}
