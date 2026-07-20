import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/axios';
import { User } from '../types';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await api.get<User>('/users/profile');
      return data;
    }
  });
};

export const useProfileMutations = () => {
  const queryClient = useQueryClient();
  const { logout, login } = useAuth();
  
  const updateMutation = useMutation({
    mutationFn: async (payload: Partial<User>) => {
      const { data } = await api.put<User>('/users/profile', payload);
      return data;
    },
    onSuccess: (updatedUser) => {
      toast.success('Profile updated successfully');
      queryClient.setQueryData(['profile'], updatedUser);
      const token = localStorage.getItem('token');
      if (token) {
        login(token, updatedUser);
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await api.delete('/users/profile');
    },
    onSuccess: () => {
      toast.success('Account deleted successfully');
      queryClient.clear();
      logout();
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete account');
    }
  });

  return {
    updateProfile: updateMutation.mutateAsync,
    deleteAccount: deleteMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
