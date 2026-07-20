import React from 'react';
import { Investment } from '../../types';
import { Edit2, Trash2 } from 'lucide-react';

interface InvestmentTableProps {
  investments: Investment[];
  onEdit?: (inv: Investment) => void;
  onDelete?: (inv: Investment) => void;
}

export const InvestmentTable: React.FC<InvestmentTableProps> = ({ investments, onEdit, onDelete }) => {
  if (investments.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-green-50/50 border-b border-gray-200">
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Asset Name</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Invested</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Value</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">P/L %</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {investments.map((inv) => {
              const invested = Number(inv.investedAmount);
              const current = Number(inv.currentValue);
              const plPercent = invested > 0 ? ((current - invested) / invested) * 100 : 0;
              const isProfit = plPercent >= 0;

              return (
                <tr key={inv.id} className="hover:bg-green-50/30 transition-colors duration-200 group">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{inv.investmentName}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                      {inv.investmentType}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${invested.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${current.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center text-sm font-semibold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                      {isProfit ? '+' : ''}{plPercent.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(inv.purchaseDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                      {onEdit && (
                        <button onClick={() => onEdit(inv)} className="p-2 sm:p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors focus:outline-none">
                          <Edit2 className="w-4 h-4 sm:w-4 sm:h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(inv)} className="p-2 sm:p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors focus:outline-none">
                          <Trash2 className="w-4 h-4 sm:w-4 sm:h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
