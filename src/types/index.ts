export interface Info {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

export interface AdminStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  activeUsers: number;
} 