import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-gray-200 mb-4 sm:mb-6">
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
      {description && <p className="mt-1 text-xs sm:text-sm text-gray-500 font-medium">{description}</p>}
    </div>
    {action && <div className="shrink-0 w-full sm:w-auto flex">{action}</div>}
  </div>
);
