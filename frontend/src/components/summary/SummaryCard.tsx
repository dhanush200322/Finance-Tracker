import React from 'react';
import { Card } from '../ui/Card';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon: Icon, trend, trendUp }) => {
  return (
    <Card className="p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
          
          {trend && (
            <div className="mt-3 flex items-center gap-1.5">
              <span className={`inline-flex items-center text-xs font-semibold ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {trendUp ? '+' : ''}{trend}
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-green-50 text-green-600 rounded-lg">
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </Card>
  );
};
