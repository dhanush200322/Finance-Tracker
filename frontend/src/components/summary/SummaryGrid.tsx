import React from 'react';
import { SummaryCard } from './SummaryCard';
import { DollarSign, Wallet, TrendingUp, Activity } from 'lucide-react';
import { PortfolioSummary } from '../../types';

export const SummaryGrid: React.FC<{ summary: PortfolioSummary }> = ({ summary }) => {
  const profitNum = Number(summary.profit);
  const isProfit = profitNum >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryCard
        title="Total Invested"
        value={`$${Number(summary.totalInvested).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
        icon={Wallet}
      />
      <SummaryCard
        title="Current Value"
        value={`$${Number(summary.currentValue).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
        icon={DollarSign}
      />
      <SummaryCard
        title="Total Profit/Loss"
        value={`$${Math.abs(profitNum).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
        icon={Activity}
        trendUp={isProfit}
      />
      <SummaryCard
        title="Return on Inv."
        value={`${Number(summary.profitPercentage).toFixed(2)}%`}
        icon={TrendingUp}
        trend={isProfit ? 'Profit' : 'Loss'}
        trendUp={isProfit}
      />
    </div>
  );
};
