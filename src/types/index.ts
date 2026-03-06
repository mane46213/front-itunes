export interface Product {
  _id: string;
  title: string;
  amount_usd: number;
  price_fcfa: number;
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  product: Product | string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  quantity: number;
  total_fcfa: number;
  payment_method: 'Orange Money' | 'MTN MoMo' | 'Wave' | 'Moov Money';
  transaction_ref?: string;
  status: 'pending' | 'paid' | 'delivered' | 'cancelled';
  itunes_codes?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Stats {
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  todayRevenue: number;
}

export interface Admin {
  id: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  admin: Admin;
}
