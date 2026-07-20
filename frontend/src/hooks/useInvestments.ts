import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { investmentService, portfolioService } from '../services/api';
import toast from 'react-hot-toast';

export const useInvestments = () => {
  return useQuery({
    queryKey: ['investments'],
    queryFn: investmentService.getAll
  });
};

export const usePortfolioSummary = () => {
  return useQuery({
    queryKey: ['portfolio-summary'],
    queryFn: portfolioService.getSummary
  });
};

export const useInvestmentMutations = () => {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['investments'] });
    queryClient.invalidateQueries({ queryKey: ['portfolio-summary'] });
  };

  const createMutation = useMutation({
    mutationFn: investmentService.create,
    onSuccess: () => {
      toast.success('Investment added successfully');
      invalidate();
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to add investment');
    }
  });

  const updateMutation = useMutation({
    mutationFn: investmentService.update,
    onSuccess: () => {
      toast.success('Investment updated successfully');
      invalidate();
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to update investment');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: investmentService.delete,
    onSuccess: () => {
      toast.success('Investment deleted successfully');
      invalidate();
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete investment');
    }
  });

  return {
    createInvestment: createMutation.mutateAsync,
    updateInvestment: updateMutation.mutateAsync,
    deleteInvestment: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
