import { useState } from 'react';
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
      const msg = err.response?.data?.message || 'Invalid credentials';
      if (msg === 'Kindly create an account to access') {
        toast(msg, {
          icon: '👋',
          style: {
            background: '#F0FDF4',
            color: '#15803D',
            border: '1px solid #BBF7D0',
            fontWeight: '500'
          }
        });
      } else {
        toast.error(msg);
      }
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
