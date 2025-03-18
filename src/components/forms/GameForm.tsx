import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { Game } from '@/types';

interface GameFormProps {
  onSubmit: (data: Partial<Game>) => void;
  onCancel: () => void;
  initialData?: Game;
}

const GameForm: React.FC<GameFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    platform: initialData?.platform || '',
    genre: initialData?.genre || '',
    age_rating: initialData?.age_rating || '',
    daily_rate: initialData?.daily_rate || 0,
    weekly_rate: initialData?.weekly_rate || 0,
    stock_quantity: initialData?.stock_quantity || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Platform</label>
        <select
          value={formData.platform}
          onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          required
        >
          <option value="">Select Platform</option>
          <option value="PS5">PS5</option>
          <option value="Xbox Series X">Xbox Series X</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
          <option value="PS4">PS4</option>
          <option value="Xbox One">Xbox One</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Genre</label>
        <input
          type="text"
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Age Rating</label>
        <select
          value={formData.age_rating}
          onChange={(e) => setFormData({ ...formData, age_rating: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          required
        >
          <option value="">Select Rating</option>
          <option value="E">E (Everyone)</option>
          <option value="E10+">E10+ (Everyone 10+)</option>
          <option value="T">T (Teen)</option>
          <option value="M">M (Mature)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Daily Rate ($)</label>
        <input
          type="number"
          value={formData.daily_rate}
          onChange={(e) => setFormData({ ...formData, daily_rate: parseFloat(e.target.value) })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Weekly Rate ($)</label>
        <input
          type="number"
          value={formData.weekly_rate}
          onChange={(e) => setFormData({ ...formData, weekly_rate: parseFloat(e.target.value) })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
        <input
          type="number"
          value={formData.stock_quantity}
          onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          min="0"
          required
        />
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update Game' : 'Add Game'}
        </Button>
      </div>
    </form>
  );
};

export default GameForm;