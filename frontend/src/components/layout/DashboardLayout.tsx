import { Outlet, NavLink } from 'react-router-dom';
import { Navbar } from './Navbar';
import { PieChart, LayoutDashboard, Briefcase, User } from 'lucide-react';

export const DashboardLayout = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Investments', path: '/investments', icon: Briefcase },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen flex bg-[#F8FFFA]">
      {/* Sidebar for Desktop/Tablet */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col z-30 fixed h-full">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-200">
          <PieChart className="w-6 h-6 text-green-500 shrink-0" />
          <span className="text-xl font-bold tracking-tight text-gray-900 truncate">Folio<span className="text-green-600">Tracker</span></span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                }`
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64 relative pb-16 md:pb-0">
        <Navbar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 flex justify-around items-center h-16 pb-safe">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-green-600' : 'text-gray-500 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
