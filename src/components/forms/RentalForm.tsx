import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { Rental, Game, Customer } from '@/types';
import { games, customers } from '@/lib/demoData';
import { addDays } from 'date-fns';

interface RentalFormProps {
  onSubmit: (data: Partial<Rental>) => void;
  onCancel: () => void;
}

const RentalForm: React.FC<RentalFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    game_id: '',
    customer_id: '',
    rental_type: 'daily', // 'daily' or 'weekly'
    duration: 1,
  });

  const selectedGame = games.find(g => g.id === formData.game_id);

  const calculateTotal = () => {
    if (!selectedGame) return 0;
    const rate = formData.rental_type === 'daily' ? selectedGame.daily_rate : selectedGame.weekly_rate;
    return rate * formData.duration;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rentalDate = new Date();
    const dueDate = addDays(rentalDate, 
      formData.rental_type === 'daily' ? formData.duration : formData.duration * 7
    );

    onSubmit({
      game_id: formData.game_id,
      customer_id: formData.customer_id,
      rental_date: rentalDate.toISOString(),
      due_date: dueDate.toISOString(),
      total_amount: calculateTotal(),
      status: 'active',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Game</label>
        <select
          value={formData.game_id}
          onChange={(e) => setFormData({ ...formData, game_id: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          required
        >
          <option value="">Select Game</option>
          {games.map((game) => (
            <option key={game.id} value={game.id} disabled={game.stock_quantity === 0}>
              {game.title} ({game.platform}) - {game.stock_quantity} available
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Customer</label>
        <select
          value={formData.customer_id}
          onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          required
        >
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name} ({customer.phone})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Rental Type</label>
        <select
          value={formData.rental_type}
          onChange={(e) => setFormData({ ...formData, rental_type: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          required
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Duration ({formData.rental_type === 'daily' ? 'Days' : 'Weeks'})
        </label>
        <input
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          min="1"
          required
        />
      </div>

      {selectedGame && (
        <div className="rounded-lg bg-gray-50 p-4">
          <h3 className="text-sm font-medium text-gray-900">Rental Summary</h3>
          <div className="mt-2 space-y-1 text-sm text-gray-600">
            <p>Rate: ${formData.rental_type === 'daily' ? selectedGame.daily_rate : selectedGame.weekly_rate} per {formData.rental_type === 'daily' ? 'day' : 'week'}</p>
            <p>Duration: {formData.duration} {formData.rental_type === 'daily' ? 'days' : 'weeks'}</p>
            <p className="text-lg font-semibold text-gray-900">Total: ${calculateTotal().toFixed(2)}</p>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-end space-x-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Create Rental
        </Button>
      </div>
    </form>
  );
};

export default RentalForm;