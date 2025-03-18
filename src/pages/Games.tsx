import React, { useState } from 'react';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import GameForm from '@/components/forms/GameForm';
import { games } from '@/lib/demoData';
import { Game } from '@/types';
import toast from 'react-hot-toast';

const Games = () => {
  const [gamesData, setGamesData] = useState<Game[]>(games);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  const handleAddGame = (data: Partial<Game>) => {
    const newGame: Game = {
      id: crypto.randomUUID(),
      title: data.title!,
      platform: data.platform!,
      genre: data.genre!,
      age_rating: data.age_rating!,
      daily_rate: data.daily_rate!,
      weekly_rate: data.weekly_rate!,
      stock_quantity: data.stock_quantity!,
      created_at: new Date().toISOString(),
    };

    setGamesData([...gamesData, newGame]);
    setIsAddModalOpen(false);
    toast.success('Game added successfully');
  };

  const handleEditGame = (data: Partial<Game>) => {
    if (!editingGame) return;

    const updatedGames = gamesData.map(game =>
      game.id === editingGame.id ? { ...game, ...data } : game
    );

    setGamesData(updatedGames);
    setEditingGame(null);
    toast.success('Game updated successfully');
  };

  const handleDeleteGame = (gameId: string) => {
    const updatedGames = gamesData.filter(game => game.id !== gameId);
    setGamesData(updatedGames);
    toast.success('Game deleted successfully');
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Games</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Game
        </Button>
      </div>

      {/* Games list */}
      <div className="rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Genre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Age Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Daily Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {gamesData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No games available. Add your first game to get started.
                  </td>
                </tr>
              ) : (
                gamesData.map((game) => (
                  <tr key={game.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {game.title}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {game.platform}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {game.genre}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {game.age_rating}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      ${game.daily_rate.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {game.stock_quantity}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setEditingGame(game)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteGame(game.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Game Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Game"
      >
        <GameForm
          onSubmit={handleAddGame}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Game Modal */}
      <Modal
        isOpen={!!editingGame}
        onClose={() => setEditingGame(null)}
        title="Edit Game"
      >
        <GameForm
          initialData={editingGame!}
          onSubmit={handleEditGame}
          onCancel={() => setEditingGame(null)}
        />
      </Modal>
    </div>
  );
};

export default Games;