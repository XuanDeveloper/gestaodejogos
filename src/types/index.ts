export interface Game {
  id: string;
  title: string;
  platform: string;
  genre: string;
  age_rating: string;
  daily_rate: number;
  weekly_rate: number;
  stock_quantity: number;
  created_at: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  created_at: string;
}

export interface Rental {
  id: string;
  game_id: string;
  customer_id: string;
  rental_date: string;
  due_date: string;
  return_date?: string;
  total_amount: number;
  late_fees?: number;
  status: 'active' | 'returned' | 'overdue';
  created_at: string;
}