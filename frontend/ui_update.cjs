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
  <body class="bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50 min-h-screen text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900">
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
        {label && <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <input
            ref={ref}
            className={\`w-full \${Icon ? 'pl-11' : 'px-4'} py-2.5 border rounded-xl bg-white/50 backdrop-blur-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:bg-white \${
              error
                ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500'
                : 'border-slate-200'
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
  const baseStyles = 'inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0';
  
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 hover:shadow-lg hover:shadow-indigo-500/30 focus-visible:ring-indigo-500 border border-transparent',
    secondary: 'bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md focus-visible:ring-slate-500',
    danger: 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 hover:shadow-lg hover:shadow-red-500/30 focus-visible:ring-red-500 border border-transparent',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 focus-visible:ring-slate-500 hover:scale-105',
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
  <div className={\`bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/60 \${className}\`}>
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
  <div className="flex flex-col items-center justify-center p-12 text-center bg-white/50 backdrop-blur-md rounded-2xl border border-dashed border-slate-300 shadow-sm animate-in fade-in zoom-in-95 duration-500">
    <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6 ring-8 ring-indigo-50/50">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">{description}</p>
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
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} />
      
      <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white w-full max-w-lg z-10 overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white/50">
          <h2 className="text-xl font-semibold text-slate-900 tracking-tight">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
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
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 p-4 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>

      <div className="w-full sm:max-w-md mt-6 px-10 py-12 bg-white/70 backdrop-blur-xl shadow-2xl border border-white/50 overflow-hidden rounded-3xl animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out z-10">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50/50 p-3 rounded-2xl ring-1 ring-indigo-100 shadow-sm">
            <PieChart className="w-8 h-8" />
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">FolioTracker</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">Welcome back</h1>
        <p className="text-center text-slate-500 mb-8 font-medium">Enter your details to access your portfolio.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input icon={Mail} label="Email address" placeholder="john@example.com" {...register('email')} error={errors.email?.message} />
          <Input icon={Lock} label="Password" type="password" placeholder="••••••••" {...register('password')} error={errors.password?.message} />
          <Button type="submit" className="w-full mt-2 py-3 text-base shadow-indigo-500/25" isLoading={isLoading}>Sign In</Button>
        </form>
        <p className="text-center text-sm text-slate-600 mt-8 font-medium">
          Don't have an account? <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors">Sign up</Link>
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
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 p-4 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="w-full sm:max-w-md mt-6 px-10 py-12 bg-white/70 backdrop-blur-xl shadow-2xl border border-white/50 overflow-hidden rounded-3xl animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out z-10">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50/50 p-3 rounded-2xl ring-1 ring-indigo-100 shadow-sm">
            <PieChart className="w-8 h-8" />
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">FolioTracker</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">Create an account</h1>
        <p className="text-center text-slate-500 mb-8 font-medium">Start tracking your investments today.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input icon={User} label="Full Name" placeholder="John Doe" {...register('name')} error={errors.name?.message} />
          <Input icon={Mail} label="Email address" placeholder="john@example.com" {...register('email')} error={errors.email?.message} />
          <Input icon={Lock} label="Password" type="password" placeholder="••••••••" {...register('password')} error={errors.password?.message} />
          <Button type="submit" className="w-full mt-4 py-3 text-base shadow-indigo-500/25" isLoading={isLoading}>Sign Up</Button>
        </form>
        <p className="text-center text-sm text-slate-600 mt-8 font-medium">
          Already have an account? <Link to="/" className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors">Sign in</Link>
        </p>
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
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/50 mb-6">
    <div>
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">{title}</h1>
      {description && <p className="mt-2 text-slate-500 font-medium">{description}</p>}
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
    <header className="h-16 bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm flex items-center justify-between px-6 shrink-0 sticky top-0 z-40">
      <div className="flex items-center gap-2 md:hidden">
        <PieChart className="w-6 h-6 text-indigo-600" />
        <span className="font-bold text-slate-900">FolioTracker</span>
      </div>
      <div className="hidden md:block flex-1" />
      <div className="flex items-center gap-6">
        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 hover:scale-105">
          <Bell className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200/60">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-semibold text-slate-900 leading-none">{user?.name}</span>
            <span className="text-xs text-slate-500 mt-1">{user?.email}</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-white uppercase">
            {user?.name?.charAt(0) || 'U'}
          </div>
        </div>
        <button 
          onClick={logout} 
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ml-2 hover:scale-105"
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
    <div className="min-h-screen flex bg-transparent">
      {/* Sidebar */}
      <aside className="w-64 bg-white/70 backdrop-blur-xl border-r border-white/40 shadow-xl shadow-slate-200/30 hidden md:flex flex-col z-30">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-200/50">
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
            <PieChart className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">FolioTracker</span>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                \`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 \${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-600 hover:bg-white/80 hover:text-indigo-600'
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
    <Card className="p-6 relative group overflow-hidden hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
          
          {trend && (
            <div className="mt-4 flex items-center gap-2">
              <span className={\`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-semibold \${trendUp ? 'bg-emerald-100/80 text-emerald-700' : 'bg-rose-100/80 text-rose-700'}\`}>
                {trendUp ? '+' : ''}{trend}
              </span>
              <span className="text-sm text-slate-500 font-medium">vs last month</span>
            </div>
          )}
        </div>
        <div className="p-3.5 bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-600 rounded-2xl shadow-inner border border-indigo-100/50 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6" />
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
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
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl shadow-slate-200/40 rounded-2xl overflow-hidden animate-in fade-in duration-700">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/60">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Asset Name</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Invested</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Current Value</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">P/L %</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {investments.map((inv) => {
              const invested = Number(inv.investedAmount);
              const current = Number(inv.currentValue);
              const plPercent = invested > 0 ? ((current - invested) / invested) * 100 : 0;
              const isProfit = plPercent >= 0;

              return (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors duration-200 group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-slate-900">{inv.investmentName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/10">
                      {inv.investmentType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700">
                    \${invested.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">
                    \${current.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={\`inline-flex items-center font-bold \${isProfit ? 'text-emerald-600' : 'text-rose-600'}\`}>
                      {isProfit ? '+' : ''}{plPercent.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">
                    {new Date(inv.purchaseDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {onEdit && (
                        <button onClick={() => onEdit(inv)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(inv)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500">
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
    <div className="space-y-8 animate-in fade-in duration-700 ease-out">
      <PageHeader 
        title="Overview" 
        description="Track your portfolio performance across all assets." 
      />
      
      {isSummaryLoading || !summary ? (
        <div className="h-40 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-slate-200 text-slate-500 gap-3">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="font-medium">Loading summary...</p>
        </div>
      ) : (
        <SummaryGrid summary={summary} />
      )}
      
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl text-indigo-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Recent Investments</h2>
          </div>
          <Link to="/investments" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
            View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {isInvLoading || !investments ? (
          <div className="h-64 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-slate-200 text-slate-500 gap-3">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="font-medium">Loading investments...</p>
          </div>
        ) : investments.length === 0 ? (
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-slate-200 p-12 text-center">
            <p className="text-slate-500 font-medium">No investments found. Add one to get started!</p>
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
    <div className="space-y-8 animate-in fade-in duration-700 ease-out">
      <PageHeader 
        title="Your Investments" 
        description="Manage and track your individual assets." 
        action={<Button onClick={handleAdd} className="shadow-indigo-500/25"><Plus className="w-5 h-5 mr-2" />Add Investment</Button>} 
      />

      <div className="flex flex-col sm:flex-row gap-4 bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-sm">
        <div className="flex-1">
          <Input 
            icon={Search} 
            placeholder="Search investments by name..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="bg-white/80"
          />
        </div>
        <Button variant="secondary" className="px-6 shrink-0 h-[46px]"><Filter className="w-4 h-4 mr-2 text-slate-500" />Filters</Button>
      </div>

      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-slate-200 text-slate-500 gap-3">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="font-medium">Loading investments...</p>
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState 
          icon={Briefcase}
          title={search ? "No matches found" : "No investments yet"}
          description={search ? "Try adjusting your search query." : "Add your first investment to start tracking your portfolio performance."}
          action={!search && <Button onClick={handleAdd}><Plus className="w-5 h-5 mr-2" />Add Investment</Button>}
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
`
};

Object.entries(files).forEach(([file, content]) => write(file, content));
console.log('UI Overhaul Script executed successfully.');
