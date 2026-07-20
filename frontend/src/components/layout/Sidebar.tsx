import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PieChart, UserCircle } from 'lucide-react';

export const Sidebar = () => {
  const links = [
    { to: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { to: '/investments', icon: <PieChart className="w-5 h-5" />, label: 'Investments' },
    { to: '/profile', icon: <UserCircle className="w-5 h-5" />, label: 'Profile' },
  ];
  return (
    <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col h-full shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="flex items-center gap-2 text-indigo-600">
          <PieChart className="w-6 h-6" />
          <span className="text-xl font-bold tracking-tight">FolioTracker</span>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
