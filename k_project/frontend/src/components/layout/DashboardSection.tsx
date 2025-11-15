import React from 'react';

interface DashboardSectionProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
}

const DashboardSection = ({ children, columns = 1 }: DashboardSectionProps) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-8`}>
      {children}
    </div>
  );
};

export default DashboardSection;