import { SummaryGrid } from '../components/summary/SummaryGrid';
import { InvestmentTable } from '../components/investment/InvestmentTable';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { useInvestments, usePortfolioSummary } from '../hooks/useInvestments';

export const DashboardPage = () => {
  const { data: summary, isLoading: isSummaryLoading } = usePortfolioSummary();
  const { data: investments, isLoading: isInvLoading } = useInvestments();

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Overview" 
        description="Track your portfolio performance across all assets." 
      />
      
      {isSummaryLoading || !summary ? (
        <div className="h-40 flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 text-gray-500 gap-3">
          <div className="w-6 h-6 border-2 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <p className="text-sm font-medium">Loading summary...</p>
        </div>
      ) : (
        <SummaryGrid summary={summary} />
      )}
      
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-50 rounded-lg text-green-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Recent Investments</h2>
          </div>
          <Link to="/investments" className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1 group px-3 py-1.5 rounded-md hover:bg-green-50 transition-colors">
            View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {isInvLoading || !investments ? (
          <div className="h-64 flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 text-gray-500 gap-3">
            <div className="w-6 h-6 border-2 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            <p className="text-sm font-medium">Loading investments...</p>
          </div>
        ) : investments.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
            <p className="text-gray-500 text-sm font-medium">No investments found. Add one to get started!</p>
          </div>
        ) : (
          <InvestmentTable investments={investments.slice(0, 5)} />
        )}
      </div>
    </div>
  );
};
