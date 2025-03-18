import { Game, Customer, Rental } from '@/types';
import { format, addDays, isAfter } from 'date-fns';

// Demo Games Data
export const games: Game[] = [
  {
    id: '1',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    platform: 'Nintendo Switch',
    genre: 'Action-Adventure',
    age_rating: 'E10+',
    daily_rate: 5.99,
    weekly_rate: 29.99,
    stock_quantity: 3,
    created_at: '2024-03-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Final Fantasy XVI',
    platform: 'PS5',
    genre: 'RPG',
    age_rating: 'M',
    daily_rate: 6.99,
    weekly_rate: 34.99,
    stock_quantity: 2,
    created_at: '2024-03-15T10:00:00Z'
  },
  {
    id: '3',
    title: 'Starfield',
    platform: 'Xbox Series X',
    genre: 'RPG',
    age_rating: 'M',
    daily_rate: 6.99,
    weekly_rate: 34.99,
    stock_quantity: 4,
    created_at: '2024-03-15T10:00:00Z'
  }
];

// Demo Customers Data
export const customers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '(555) 123-4567',
    email: 'john@example.com',
    address: '123 Main St, City',
    created_at: '2024-03-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '(555) 987-6543',
    email: 'jane@example.com',
    address: '456 Oak Ave, Town',
    created_at: '2024-03-15T10:00:00Z'
  }
];

// Demo Rentals Data
export const rentals: Rental[] = [
  {
    id: '1',
    game_id: '1',
    customer_id: '1',
    rental_date: '2024-03-15T10:00:00Z',
    due_date: '2024-03-22T10:00:00Z',
    total_amount: 29.99,
    status: 'active',
    created_at: '2024-03-15T10:00:00Z'
  },
  {
    id: '2',
    game_id: '2',
    customer_id: '2',
    rental_date: '2024-03-10T10:00:00Z',
    due_date: '2024-03-17T10:00:00Z',
    total_amount: 34.99,
    status: 'overdue',
    created_at: '2024-03-10T10:00:00Z'
  }
];

// Helper function to get rental status
export const getRentalStatus = (rental: Rental): 'active' | 'returned' | 'overdue' => {
  if (rental.return_date) return 'returned';
  return isAfter(new Date(), new Date(rental.due_date)) ? 'overdue' : 'active';
};

// Helper function to get game by ID
export const getGameById = (id: string): Game | undefined => {
  return games.find(game => game.id === id);
};

// Helper function to get customer by ID
export const getCustomerById = (id: string): Customer | undefined => {
  return customers.find(customer => customer.id === id);
};

// Helper function to get active rentals for a customer
export const getActiveRentalsForCustomer = (customerId: string): number => {
  return rentals.filter(rental => 
    rental.customer_id === customerId && 
    !rental.return_date && 
    rental.status === 'active'
  ).length;
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};