import { useEffect, useState } from 'react';
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
