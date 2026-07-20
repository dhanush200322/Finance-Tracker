import { api } from '../api/axios';
import { Investment, PortfolioSummary } from '../types';

export const authService = {
  register: async (data: any) => await api.post('/auth/register', data),
  login: async (data: any) => await api.post('/auth/login', data),
};

export const investmentService = {
  getAll: async (): Promise<Investment[]> => {
    const { data } = await api.get('/investments');
    return data;
  },
  create: async (payload: Partial<Investment>) => {
    const { data } = await api.post('/investments', payload);
    return data;
  },
  update: async ({ id, ...payload }: Partial<Investment> & { id: string }) => {
    const { data } = await api.put(`/investments/${id}`, payload);
    return data;
  },
  delete: async (id: string) => {
    const { data } = await api.delete(`/investments/${id}`);
    return data;
  }
};

export const portfolioService = {
  getSummary: async (): Promise<PortfolioSummary> => {
    const { data } = await api.get('/portfolio/summary');
    return data;
  }
};
