import { Investment, PortfolioSummary, User } from '../types';
export const mockUser: User = { id: '1', name: 'John Doe', email: 'john@example.com' };
export const mockSummary: PortfolioSummary = { totalInvested: 50000, currentValue: 62000, profit: 12000, profitPercentage: 24 };
export const mockInvestments: Investment[] = [
  { id: '1', userId: '1', investmentName: 'Apple Inc.', investmentType: 'Stock', investedAmount: 15000, currentValue: 18500, purchaseDate: '2023-01-15T10:00:00Z', createdAt: '', updatedAt: '' },
  { id: '2', userId: '1', investmentName: 'Vanguard S&P 500', investmentType: 'ETF', investedAmount: 20000, currentValue: 25000, purchaseDate: '2022-06-20T10:00:00Z', createdAt: '', updatedAt: '' },
  { id: '3', userId: '1', investmentName: 'Bitcoin', investmentType: 'Crypto', investedAmount: 15000, currentValue: 18500, purchaseDate: '2023-05-10T10:00:00Z', createdAt: '', updatedAt: '' }
];
