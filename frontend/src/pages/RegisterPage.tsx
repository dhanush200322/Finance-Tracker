import { useState } from 'react';
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
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });
  
  const watchPassword = watch('password', '');
  
  const calculateStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) score += 1;
    if (pass.match(/\\d/)) score += 1;
    if (pass.match(/[^a-zA-Z\\d]/)) score += 1;
    return score;
  };
  
  const strengthScore = calculateStrength(watchPassword);

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
          
          <div>
            <Input icon={Lock} label="Password" type="password" placeholder="••••••••" {...register('password')} error={errors.password?.message} />
            {watchPassword && (
              <div className="space-y-1.5 mt-2.5">
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-gray-500">Password strength</span>
                  <span className={
                    strengthScore <= 1 ? 'text-red-500' :
                    strengthScore === 2 ? 'text-amber-500' :
                    strengthScore === 3 ? 'text-green-500' :
                    'text-green-600'
                  }>
                    {strengthScore <= 1 ? 'Weak' : strengthScore === 2 ? 'Fair' : strengthScore === 3 ? 'Good' : 'Strong'}
                  </span>
                </div>
                <div className="flex gap-1 h-1.5">
                  {[1, 2, 3, 4].map((level) => (
                    <div 
                      key={level} 
                      className={`flex-1 rounded-full transition-colors duration-300 ${
                        strengthScore >= level 
                          ? (strengthScore <= 1 ? 'bg-red-500' : strengthScore === 2 ? 'bg-amber-500' : strengthScore === 3 ? 'bg-green-500' : 'bg-green-600')
                          : 'bg-gray-100'
                      }`} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <Button type="submit" className="w-full mt-4" isLoading={isLoading}>Sign Up</Button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account? <Link to="/" className="text-green-600 font-semibold hover:text-green-700 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
};
