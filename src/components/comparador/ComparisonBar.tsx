import React from 'react';

interface ComparisonBarProps {
  percentage: string | undefined;
}

export const ComparisonBar: React.FC<ComparisonBarProps> = ({ percentage }) => {
  if (!percentage || percentage === 'N/A') {
    return <span className="text-[var(--text-tertiary)] text-xs italic">N/A</span>;
  }

  const value = parseFloat(percentage.replace('%', ''));
  if (isNaN(value)) return <span className="text-[var(--text-tertiary)] text-xs italic">N/A</span>;

  const isGood = value < 0;

  const absValue = Math.min(Math.abs(value), 50);
  const width = `${(absValue / 50) * 100}%`;

  const colorClass = isGood
    ? 'bg-[var(--color-success-500)]'
    : 'bg-[var(--color-error-500)]';

  const textColorClass = isGood
    ? 'text-[var(--color-on-surface-success)]'
    : 'text-[var(--color-on-surface-error)]';

  return (
    <div className="flex flex-col gap-1 min-w-[100px]">
      <div className="flex justify-between items-center">
        <span className={`text-xs font-bold ${textColorClass}`}>
          {value > 0 ? '+' : ''}{value.toFixed(2)}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClass} transition-all duration-500 ease-out`}
          style={{ width }}
        />
      </div>
    </div>
  );
};

export default ComparisonBar;