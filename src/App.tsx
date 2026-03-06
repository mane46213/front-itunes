import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Order from './pages/Order';
import Confirmation from './pages/Confirmation';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayout';

function ProtectedRoute({ element }: { element: React.ReactNode }) {
  const token = localStorage.getItem('admin_token');
  return token ? element : <Navigate to="/admin/login" />;
}

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/boutique" element={<Shop />} />
        <Route path="/commande/:id" element={<Order />} />
        <Route path="/confirmation/:orderId" element={<Confirmation />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute element={<AdminLayout />} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

