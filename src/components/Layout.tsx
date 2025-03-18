import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  GamepadIcon,
  Users,
  CalendarRange,
  LogOut,
} from 'lucide-react';
import Button from './ui/Button';
import { translations } from '@/lib/translations';

const Layout = () => {
  const { signOut } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: translations.dashboard.title, href: '/', icon: LayoutDashboard },
    { name: translations.games.title, href: '/games', icon: GamepadIcon },
    { name: translations.customers.title, href: '/customers', icon: Users },
    { name: translations.rentals.title, href: '/rentals', icon: CalendarRange },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full bg-white shadow-lg lg:w-64">
          <div className="flex h-16 items-center justify-center border-b px-4">
            <h1 className="text-center text-xl font-bold text-gray-900 lg:text-left">
              {translations.auth.title}
            </h1>
          </div>
          <nav className="mt-6 px-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    mt-2 flex items-center rounded-md px-4 py-2 text-sm font-medium
                    ${
                      location.pathname === item.href
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 p-4 lg:bottom-4 lg:left-4 lg:right-4">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout