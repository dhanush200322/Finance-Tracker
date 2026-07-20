export interface User { id: string; name: string; email: string; }
export interface Investment { id: string; userId: string; investmentName: string; investmentType: string; investedAmount: number; currentValue: number; purchaseDate: string; createdAt: string; updatedAt: string; }
export interface PortfolioSummary { totalInvested: number; currentValue: number; profit: number; profitPercentage: number; }
