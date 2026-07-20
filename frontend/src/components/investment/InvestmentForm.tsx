import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useInvestmentMutations } from '../../hooks/useInvestments';
import { Investment } from '../../types';

const schema = z.object({
  investmentName: z.string().min(1, 'Name is required'),
  investmentType: z.string().min(1, 'Type is required'),
  investedAmount: z.number().min(0.01, 'Must be positive'),
  currentValue: z.number().min(0.01, 'Must be positive'),
  purchaseDate: z.string().min(1, 'Date is required'),
});

type FormValues = z.infer<typeof schema>;

export const InvestmentForm: React.FC<{ onClose: () => void, defaultValues?: Investment }> = ({ onClose, defaultValues }) => {
  const { createInvestment, updateInvestment, isCreating, isUpdating } = useInvestmentMutations();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({ 
    resolver: zodResolver(schema),
    defaultValues: defaultValues ? {
      ...defaultValues,
      purchaseDate: new Date(defaultValues.purchaseDate).toISOString().split('T')[0]
    } : undefined
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        purchaseDate: new Date(defaultValues.purchaseDate).toISOString().split('T')[0]
      });
    } else {
      reset({ investmentName: '', investmentType: '', investedAmount: 0, currentValue: 0, purchaseDate: '' });
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data: FormValues) => {
    if (defaultValues) {
      await updateInvestment({ id: defaultValues.id, ...data, purchaseDate: new Date(data.purchaseDate).toISOString() });
    } else {
      await createInvestment({ ...data, purchaseDate: new Date(data.purchaseDate).toISOString() });
    }
    onClose();
  };

  const isLoading = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Investment Name" placeholder="e.g. Apple Inc." {...register('investmentName')} error={errors.investmentName?.message} />
      <Input label="Asset Type" placeholder="e.g. Stock, Crypto" {...register('investmentType')} error={errors.investmentType?.message} />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Invested Amount ($)" type="number" step="0.01" {...register('investedAmount', { valueAsNumber: true })} error={errors.investedAmount?.message} />
        <Input label="Current Value ($)" type="number" step="0.01" {...register('currentValue', { valueAsNumber: true })} error={errors.currentValue?.message} />
      </div>
      <Input label="Purchase Date" type="date" {...register('purchaseDate')} error={errors.purchaseDate?.message} />
      <div className="flex gap-3 justify-end pt-4">
        <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>Cancel</Button>
        <Button type="submit" isLoading={isLoading}>{defaultValues ? 'Update' : 'Save'} Investment</Button>
      </div>
    </form>
  );
};
