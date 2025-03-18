import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, XCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import RentalForm from '@/components/forms/RentalForm';
import { rentals, getGameById, getCustomerById, formatCurrency } from '@/lib/demoData';
import { Rental } from '@/types';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const Rentals = () => {
  const [rentalsData, setRentalsData] = useState<Rental[]>(rentals);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddRental = (data: Partial<Rental>) => {
    const newRental: Rental = {
      id: crypto.randomUUID(),
      game_id: data.game_id!,
      customer_id: data.customer_id!,
      rental_date: data.rental_date!,
      due_date: data.due_date!,
      total_amount: data.total_amount!,
      status: 'active',
      created_at: new Date().toISOString(),
    };

    setRentalsData([...rentalsData, newRental]);
    setIsAddModalOpen(false);
    toast.success('Rental created successfully');
  };

  const handleReturnRental = (rentalId: string) => {
    const updatedRentals = rentalsData.map(rental =>
      rental.id === rentalId
        ? {
            ...rental,
            status: 'returned',
            return_date: new Date().toISOString(),
          }
        : rental
    );

    setRentalsData(updatedRentals);
    toast.success('Rental marked as returned');
  };

  const handleCancelRental = (rentalId: string) => {
    const updatedRentals = rentalsData.filter(rental => rental.id !== rentalId);
    setRentalsData(updatedRentals);
    toast.success('Rental cancelled');
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'returned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Rentals</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Rental
        </Button>
      </div>

      {/* Rentals list */}
      <div className="rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Game
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Rental Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {rentalsData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No rentals available. Create your first rental to get started.
                  </td>
                </tr>
              ) : (
                rentalsData.map((rental) => {
                  const game = getGameById(rental.game_id);
                  const customer = getCustomerById(rental.customer_id);
                  
                  return (
                    <tr key={rental.id}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {game?.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {game?.platform}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {customer?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {customer?.phone}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {format(new Date(rental.rental_date), 'MMM dd, yyyy')}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {format(new Date(rental.due_date), 'MMM dd, yyyy')}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeClass(rental.status)}`}>
                          {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {formatCurrency(rental.total_amount)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div className="flex space-x-2">
                          {rental.status === 'active' && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleReturnRental(rental.id)}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleCancelRental(rental.id)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Rental Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Rental"
      >
        <RentalForm
          onSubmit={handleAddRental}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Rentals;