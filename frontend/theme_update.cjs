const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'src');

function write(file, content) {
  const p = file.startsWith('index.html') ? path.join(__dirname, file) : path.join(root, file);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content.trim() + '\n', 'utf8');
}

const files = {
  'index.html': `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <title>Finance Portfolio Tracker</title>
    <style>
      body {
        font-family: 'Inter', sans-serif;
      }
    </style>
  </head>
  <body class="bg-[#F8FFFA] min-h-screen text-gray-900 antialiased selection:bg-green-100 selection:text-green-900">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,

  'components/ui/Input.tsx': `
import React, { forwardRef, InputHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full text-left">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <input
            ref={ref}
            className={\`w-full \${Icon ? 'pl-11' : 'px-4'} py-2.5 border rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all duration-300 shadow-sm hover:border-gray-300 \${
              error
                ? 'border-red-300 focus:ring-red-500/30 focus:border-red-500'
                : 'border-gray-200'
            } \${className}\`}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-sm font-medium text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
`,

  'components/ui/Button.tsx': `
import React, { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', isLoading, className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-b from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-lg hover:shadow-green-500/20 focus-visible:ring-green-500 border border-green-600 hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm focus-visible:ring-gray-500',
    danger: 'bg-gradient-to-b from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:shadow-red-500/20 focus-visible:ring-red-500 border border-red-600 hover:-translate-y-0.5 active:translate-y-0',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500',
  };

  return (
    <button className={\`\${baseStyles} \${variants[variant]} \${className}\`} disabled={isLoading || props.disabled} {...props}>
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};
`,

  'components/ui/Card.tsx': `
import React from 'react';

export const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={\`bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden transition-all duration-300 hover:border-green-200 hover:shadow-lg \${className}\`}>
    {children}
  </div>
);
`,

  'components/ui/EmptyState.tsx': `
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-dashed border-gray-300 shadow-sm transition-all duration-300">
    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 max-w-sm mb-8 leading-relaxed text-sm">{description}</p>
    {action && <div>{action}</div>}
  </div>
);
`,

  'components/ui/Modal.tsx': `
import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} />
      
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-lg z-10 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
`,

  'components/layout/PageHeader.tsx': `
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 mb-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
      {description && <p className="mt-1 text-sm text-gray-500 font-medium">{description}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);
`,

  'components/layout/Navbar.tsx': `
import React from 'react';
import { LogOut, Bell, PieChart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  
  return (
    <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 shrink-0 sticky top-0 z-40">
      <div className="flex items-center gap-2 md:hidden">
        <PieChart className="w-6 h-6 text-green-500" />
        <span className="font-bold text-gray-900">Folio<span className="text-green-600">Tracker</span></span>
      </div>
      <div className="hidden md:block flex-1" />
      <div className="flex items-center gap-6">
        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500">
          <Bell className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-semibold text-gray-900 leading-none">{user?.name}</span>
            <span className="text-xs text-gray-500 mt-1">{user?.email}</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            {user?.name?.charAt(0) || 'U'}
          </div>
        </div>
        <button 
          onClick={logout} 
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ml-2"
          title="Sign out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
`,

  'components/layout/DashboardLayout.tsx': `
import React from 'react';
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
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col z-30">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-200">
          <PieChart className="w-6 h-6 text-green-500" />
          <span className="text-xl font-bold tracking-tight text-gray-900">Folio<span className="text-green-600">Tracker</span></span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                \`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-300 \${
                  isActive
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                }\`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
`,

  'components/summary/SummaryCard.tsx': `
import React from 'react';
import { Card } from '../ui/Card';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon: Icon, trend, trendUp }) => {
  return (
    <Card className="p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
          
          {trend && (
            <div className="mt-3 flex items-center gap-1.5">
              <span className={\`inline-flex items-center text-xs font-semibold \${trendUp ? 'text-green-600' : 'text-red-600'}\`}>
                {trendUp ? '+' : ''}{trend}
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-green-50 text-green-600 rounded-lg">
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </Card>
  );
};
`,

  'components/summary/SummaryGrid.tsx': `
import React from 'react';
import { SummaryCard } from './SummaryCard';
import { DollarSign, Wallet, TrendingUp, Activity } from 'lucide-react';
import { PortfolioSummary } from '../../types';

export const SummaryGrid: React.FC<{ summary: PortfolioSummary }> = ({ summary }) => {
  const profitNum = Number(summary.profit);
  const isProfit = profitNum >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryCard
        title="Total Invested"
        value={\`$\${Number(summary.totalInvested).toLocaleString(undefined, { minimumFractionDigits: 2 })}\`}
        icon={Wallet}
      />
      <SummaryCard
        title="Current Value"
        value={\`$\${Number(summary.currentValue).toLocaleString(undefined, { minimumFractionDigits: 2 })}\`}
        icon={DollarSign}
      />
      <SummaryCard
        title="Total Profit/Loss"
        value={\`$\${Math.abs(profitNum).toLocaleString(undefined, { minimumFractionDigits: 2 })}\`}
        icon={Activity}
        trendUp={isProfit}
      />
      <SummaryCard
        title="Return on Inv."
        value={\`\${Number(summary.profitPercentage).toFixed(2)}%\`}
        icon={TrendingUp}
        trend={isProfit ? 'Profit' : 'Loss'}
        trendUp={isProfit}
      />
    </div>
  );
};
`,

  'components/investment/InvestmentTable.tsx': `
import React from 'react';
import { Investment } from '../../types';
import { Edit2, Trash2 } from 'lucide-react';

interface InvestmentTableProps {
  investments: Investment[];
  onEdit?: (inv: Investment) => void;
  onDelete?: (inv: Investment) => void;
}

export const InvestmentTable: React.FC<InvestmentTableProps> = ({ investments, onEdit, onDelete }) => {
  if (investments.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-50/50 border-b border-gray-200">
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Asset Name</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Invested</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Value</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">P/L %</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {investments.map((inv) => {
              const invested = Number(inv.investedAmount);
              const current = Number(inv.currentValue);
              const plPercent = invested > 0 ? ((current - invested) / invested) * 100 : 0;
              const isProfit = plPercent >= 0;

              return (
                <tr key={inv.id} className="hover:bg-green-50/30 transition-colors duration-200 group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{inv.investmentName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                      {inv.investmentType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    \${invested.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    \${current.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={\`inline-flex items-center text-sm font-semibold \${isProfit ? 'text-green-600' : 'text-red-600'}\`}>
                      {isProfit ? '+' : ''}{plPercent.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(inv.purchaseDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {onEdit && (
                        <button onClick={() => onEdit(inv)} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(inv)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
`,

  'pages/LoginPage.tsx': `
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { PieChart, Mail, Lock } from 'lucide-react';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const schema = z.object({ 
  email: z.string().email('Invalid email'), 
  password: z.string().min(1, 'Password is required') 
});
type FormValues = z.infer<typeof schema>;

export const LoginPage = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });
  
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const res = await authService.login(data);
      login(res.data.accessToken, res.data.user);
      toast.success('Welcome back!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-green-50 to-white">
      <div className="w-full sm:max-w-md px-8 py-10 bg-white shadow-xl shadow-green-900/5 border border-gray-100 rounded-2xl">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <PieChart className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold tracking-tight text-gray-900">Folio<span className="text-green-600">Tracker</span></span>
          </div>
        </div>
        <h1 className="text-xl font-bold text-center text-gray-900 mb-2">Welcome back</h1>
        <p className="text-center text-gray-500 mb-8 text-sm">Enter your details to access your portfolio.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input icon={Mail} label="Email address" placeholder="john@example.com" {...register('email')} error={errors.email?.message} />
          <Input icon={Lock} label="Password" type="password" placeholder="••••••••" {...register('password')} error={errors.password?.message} />
          <Button type="submit" className="w-full mt-2" isLoading={isLoading}>Sign In</Button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account? <Link to="/register" className="text-green-600 font-semibold hover:text-green-700 transition-colors">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
`,

  'pages/RegisterPage.tsx': `
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { PieChart, User, Mail, Lock } from 'lucide-react';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const schema = z.object({ 
  name: z.string().min(1, 'Name is required'), 
  email: z.string().email('Invalid email'), 
  password: z.string().min(8, 'Password must be at least 8 characters') 
});
type FormValues = z.infer<typeof schema>;

export const RegisterPage = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });
  
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const res = await authService.register(data);
      login(res.data.accessToken, res.data.user);
      toast.success('Account created successfully!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-green-50 to-white">
      <div className="w-full sm:max-w-md px-8 py-10 bg-white shadow-xl shadow-green-900/5 border border-gray-100 rounded-2xl">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <PieChart className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold tracking-tight text-gray-900">Folio<span className="text-green-600">Tracker</span></span>
          </div>
        </div>
        <h1 className="text-xl font-bold text-center text-gray-900 mb-2">Create an account</h1>
        <p className="text-center text-gray-500 mb-8 text-sm">Start tracking your investments today.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input icon={User} label="Full Name" placeholder="John Doe" {...register('name')} error={errors.name?.message} />
          <Input icon={Mail} label="Email address" placeholder="john@example.com" {...register('email')} error={errors.email?.message} />
          <Input icon={Lock} label="Password" type="password" placeholder="••••••••" {...register('password')} error={errors.password?.message} />
          <Button type="submit" className="w-full mt-4" isLoading={isLoading}>Sign Up</Button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account? <Link to="/" className="text-green-600 font-semibold hover:text-green-700 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
};
`,

  'pages/DashboardPage.tsx': `
import React from 'react';
import { SummaryGrid } from '../components/summary/SummaryGrid';
import { InvestmentTable } from '../components/investment/InvestmentTable';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { useInvestments, usePortfolioSummary } from '../hooks/useInvestments';

export const DashboardPage = () => {
  const { data: summary, isLoading: isSummaryLoading } = usePortfolioSummary();
  const { data: investments, isLoading: isInvLoading } = useInvestments();

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Overview" 
        description="Track your portfolio performance across all assets." 
      />
      
      {isSummaryLoading || !summary ? (
        <div className="h-40 flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 text-gray-500 gap-3">
          <div className="w-6 h-6 border-2 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <p className="text-sm font-medium">Loading summary...</p>
        </div>
      ) : (
        <SummaryGrid summary={summary} />
      )}
      
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-50 rounded-lg text-green-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Recent Investments</h2>
          </div>
          <Link to="/investments" className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1 group px-3 py-1.5 rounded-md hover:bg-green-50 transition-colors">
            View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {isInvLoading || !investments ? (
          <div className="h-64 flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 text-gray-500 gap-3">
            <div className="w-6 h-6 border-2 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            <p className="text-sm font-medium">Loading investments...</p>
          </div>
        ) : investments.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
            <p className="text-gray-500 text-sm font-medium">No investments found. Add one to get started!</p>
          </div>
        ) : (
          <InvestmentTable investments={investments.slice(0, 5)} />
        )}
      </div>
    </div>
  );
};
`,

  'pages/InvestmentsPage.tsx': `
import React, { useState } from 'react';
import { InvestmentTable } from '../components/investment/InvestmentTable';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Plus, Search, Filter, Briefcase } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { InvestmentForm } from '../components/investment/InvestmentForm';
import { DeleteDialog } from '../components/investment/DeleteDialog';
import { PageHeader } from '../components/layout/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { useInvestments, useInvestmentMutations } from '../hooks/useInvestments';
import { Investment } from '../types';

export const InvestmentsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | undefined>(undefined);
  const [deletingInvestment, setDeletingInvestment] = useState<Investment | undefined>(undefined);
  const [search, setSearch] = useState('');

  const { data: investments = [], isLoading } = useInvestments();
  const { deleteInvestment, isDeleting } = useInvestmentMutations();

  const filtered = investments.filter(inv => inv.investmentName.toLowerCase().includes(search.toLowerCase()));

  const handleEdit = (inv: Investment) => {
    setEditingInvestment(inv);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingInvestment(undefined);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingInvestment) {
      await deleteInvestment(deletingInvestment.id);
      setDeletingInvestment(undefined);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Your Investments" 
        description="Manage and track your individual assets." 
        action={<Button onClick={handleAdd}><Plus className="w-4 h-4 mr-2" />Add Investment</Button>} 
      />

      <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex-1">
          <Input 
            icon={Search} 
            placeholder="Search investments by name..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="bg-white"
          />
        </div>
        <Button variant="secondary" className="px-5 shrink-0"><Filter className="w-4 h-4 mr-2 text-gray-500" />Filters</Button>
      </div>

      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 text-gray-500 gap-3">
          <div className="w-6 h-6 border-2 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <p className="text-sm font-medium">Loading investments...</p>
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState 
          icon={Briefcase}
          title={search ? "No matches found" : "No investments yet"}
          description={search ? "Try adjusting your search query." : "Add your first investment to start tracking your portfolio performance."}
          action={!search && <Button onClick={handleAdd}><Plus className="w-4 h-4 mr-2" />Add Investment</Button>}
        />
      ) : (
        <InvestmentTable investments={filtered} onEdit={handleEdit} onDelete={setDeletingInvestment} />
      )}

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editingInvestment ? "Edit Investment" : "New Investment"}>
        <InvestmentForm onClose={() => setIsFormOpen(false)} defaultValues={editingInvestment} />
      </Modal>
      
      <Modal isOpen={!!deletingInvestment} onClose={() => setDeletingInvestment(undefined)} title="Delete Investment">
        <DeleteDialog onClose={() => setDeletingInvestment(undefined)} onConfirm={handleDeleteConfirm} isLoading={isDeleting} />
      </Modal>
    </div>
  );
};
`,

  'pages/ProfilePage.tsx': `
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/layout/PageHeader';
import { User, Mail, AlertTriangle } from 'lucide-react';
import { useProfile, useProfileMutations } from '../hooks/useProfile';
import { Modal } from '../components/ui/Modal';
import { Card } from '../components/ui/Card';

const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(100, 'Name cannot exceed 100 characters'),
  email: z.string().email('Invalid email address')
});
type FormValues = z.infer<typeof schema>;

export const ProfilePage = () => {
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const { updateProfile, deleteAccount, isUpdating, isDeleting } = useProfileMutations();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '' }
  });

  useEffect(() => {
    if (profile) {
      reset({ name: profile.name, email: profile.email });
    }
  }, [profile, reset]);

  const onSubmit = async (data: FormValues) => {
    await updateProfile(data);
  };

  const handleDelete = async () => {
    await deleteAccount();
    setIsDeleteModalOpen(false);
  };

  if (isProfileLoading || !profile) {
    return (
      <div className="space-y-8 max-w-3xl">
        <PageHeader title="Profile Settings" description="Manage your account settings and preferences." />
        <div className="h-64 flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 text-gray-500 gap-3">
          <div className="w-6 h-6 border-2 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <p className="text-sm font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <PageHeader 
        title="Profile Settings" 
        description="Manage your account settings and preferences." 
      />

      <Card className="p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input 
            icon={User} 
            label="Full Name" 
            placeholder="John Doe" 
            {...register('name')} 
            error={errors.name?.message} 
          />
          <Input 
            icon={Mail} 
            label="Email Address" 
            placeholder="john@example.com" 
            {...register('email')} 
            error={errors.email?.message} 
          />
          <div className="pt-2 flex justify-end">
            <Button type="submit" isLoading={isUpdating} className="px-6">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>

      <Card className="p-8 border-red-200">
        <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Danger Zone</h2>
            <p className="text-gray-500 text-sm">Permanently delete your account and all associated investments.</p>
          </div>
          <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)} className="shrink-0">
            Delete Account
          </Button>
        </div>
      </Card>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Account">
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Are you absolutely sure?</h3>
          <p className="text-gray-500 mb-8 text-sm">This action cannot be undone. This will permanently delete your account and remove all of your investment data from our servers.</p>
          
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)} disabled={isDeleting}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete} isLoading={isDeleting}>Yes, delete my account</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
`
};

Object.entries(files).forEach(([file, content]) => write(file, content));
console.log('Parrot Green theme applied!');
