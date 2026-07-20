import React from 'react';

export const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden transition-all duration-300 hover:border-green-200 hover:shadow-lg ${className}`}>
    {children}
  </div>
);
