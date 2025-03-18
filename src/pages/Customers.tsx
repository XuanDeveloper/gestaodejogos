import React, { useState } from 'react';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import CustomerForm from '@/components/forms/CustomerForm';
import { customers, getActiveRentalsForCustomer } from '@/lib/demoData';
import { Customer } from '@/types';
import toast from 'react-hot-toast';

const Customers = () => {
  const [customersData, setCustomersData] = useState<Customer[]>(customers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const handleAddCustomer = (data: Partial<Customer>) => {
    const newCustomer: Customer = {
      id: crypto.randomUUID(),
      name: data.name!,
      phone: data.phone!,
      email: data.email,
      address: data.address,
      created_at: new Date().toISOString(),
    };

    setCustomersData([...customersData, newCustomer]);
    setIsAddModalOpen(false);
    toast.success('Customer added successfully');
  };

  const handleEditCustomer = (data: Partial<Customer>) => {
    if (!editingCustomer) return;

    const updatedCustomers = customersData.map(customer =>
      customer.id === editingCustomer.id ? { ...customer, ...data } : customer
    );

    setCustomersData(updatedCustomers);
    setEditingCustomer(null);
    toast.success('Customer updated successfully');
  };

  const handleDeleteCustomer = (customerId: string) => {
    const activeRentals = getActiveRentalsForCustomer(customerId);
    if (activeRentals > 0) {
      toast.error('Cannot delete customer with active rentals');
      return;
    }

    const updatedCustomers = customersData.filter(customer => customer.id !== customerId);
    setCustomersData(updatedCustomers);
    toast.success('Customer deleted successfully');
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Customers list */}
      <div className="rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Active Rentals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {customersData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No customers available. Add your first customer to get started.
                  </td>
                </tr>
              ) : (
                customersData.map((customer) => (
                  <tr key={customer.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {customer.name}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {customer.phone}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {customer.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {customer.address}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {getActiveRentalsForCustomer(customer.id)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setEditingCustomer(customer)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteCustomer(customer.id)}
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

      {/* Add Customer Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Customer"
      >
        <CustomerForm
          onSubmit={handleAddCustomer}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Customer Modal */}
      <Modal
        isOpen={!!editingCustomer}
        onClose={() => setEditingCustomer(null)}
        title="Edit Customer"
      >
        <CustomerForm
          initialData={editingCustomer!}
          onSubmit={handleEditCustomer}
          onCancel={() => setEditingCustomer(null)}
        />
      </Modal>
    </div>
  );
};

export default Customers;