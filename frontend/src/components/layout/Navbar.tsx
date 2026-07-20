import { LogOut, Bell, PieChart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  
  return (
    <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-40">
      <div className="flex items-center gap-2 md:hidden">
        <PieChart className="w-6 h-6 text-green-500 shrink-0" />
        <span className="font-bold text-gray-900 truncate">Folio<span className="text-green-600">Tracker</span></span>
      </div>
      <div className="hidden md:block flex-1" />
      <div className="flex items-center gap-2 sm:gap-6 ml-auto">
        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500">
          <Bell className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-gray-200">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-semibold text-gray-900 leading-none truncate max-w-[150px]">{user?.name}</span>
            <span className="text-xs text-gray-500 mt-1 truncate max-w-[150px]">{user?.email}</span>
          </div>
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
            {user?.name?.charAt(0) || 'U'}
          </div>
        </div>
        <button 
          onClick={logout} 
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ml-1 sm:ml-2"
          title="Sign out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
