import React from 'react';
import { CalendarRange, Users, GamepadIcon, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { games, customers, rentals, getGameById, getCustomerById, formatCurrency } from '@/lib/demoData';
import { format } from 'date-fns';

const DashboardCard = ({ title, value, icon: Icon, href, color }: {
  title: string;
  value: number;
  icon: React.ElementType;
  href: string;
  color: string;
}) => {
  const navigate = useNavigate();
  
  return (
    <div
      onClick={() => navigate(href)}
      className={`cursor-pointer rounded-lg bg-white p-6 shadow-md transition-transform hover:scale-105 ${color}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
        <Icon className="h-8 w-8" />
      </div>
    </div>
  );
};

const RecentActivity = ({ rental }: { rental: any }) => {
  const game = getGameById(rental.game_id);
  const customer = getCustomerById(rental.customer_id);

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-4 last:border-0">
      <div>
        <p className="font-medium text-gray-900">{game?.title}</p>
        <p className="text-sm text-gray-500">Rented by {customer?.name}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">
          {formatCurrency(rental.total_amount)}
        </p>
        <p className="text-sm text-gray-500">
          {format(new Date(rental.rental_date), 'MMM dd, yyyy')}
        </p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const activeRentals = rentals.filter(r => r.status === 'active').length;
  const overdueRentals = rentals.filter(r => r.status === 'overdue').length;
  const availableGames = games.reduce((sum, game) => sum + game.stock_quantity, 0);

  const stats = {
    activeRentals,
    totalCustomers: customers.length,
    availableGames,
    overdueRentals,
  };

  const recentRentals = [...rentals]
    .sort((a, b) => new Date(b.rental_date).getTime() - new Date(a.rental_date).getTime())
    .slice(0, 5);

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Active Rentals"
          value={stats.activeRentals}
          icon={CalendarRange}
          href="/rentals"
          color="hover:bg-blue-50"
        />
        <DashboardCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={Users}
          href="/customers"
          color="hover:bg-green-50"
        />
        <DashboardCard
          title="Available Games"
          value={stats.availableGames}
          icon={GamepadIcon}
          href="/games"
          color="hover:bg-purple-50"
        />
        <DashboardCard
          title="Overdue Rentals"
          value={stats.overdueRentals}
          icon={AlertTriangle}
          href="/rentals"
          color="hover:bg-red-50"
        />
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Recent Activity</h2>
        <div className="rounded-lg bg-white p-6 shadow-md">
          {recentRentals.length > 0 ? (
            recentRentals.map((rental) => (
              <RecentActivity key={rental.id} rental={rental} />
            ))
          ) : (
            <p className="text-gray-600">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;