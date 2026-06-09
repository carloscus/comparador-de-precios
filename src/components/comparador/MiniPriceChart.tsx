import React, { useMemo } from 'react';

interface MiniPriceChartProps {
    prices: { label: string; value: number | null }[];
    highlightCheapest?: boolean;
}

export const MiniPriceChart: React.FC<MiniPriceChartProps> = ({ prices, highlightCheapest = true }) => {
    const validPrices = prices.filter((p) => p.value !== null && p.value > 0) as { label: string; value: number }[];

    const chartMetrics = useMemo(() => {
        if (validPrices.length === 0) return null;
        return {
            max: Math.max(...validPrices.map((p) => p.value)),
            min: Math.min(...validPrices.map((p) => p.value)),
            range: null,
        };
    }, [validPrices]);

    if (!chartMetrics) {
        return <div className="h-10 flex items-center justify-center text-[var(--text-tertiary)] text-[11px] italic">Sin datos</div>;
    }

    const { max, min } = chartMetrics;

    return (
        <div className="flex items-end gap-1 h-12 w-full max-w-56 bg-[var(--bg-tertiary)]/20 p-1.5 rounded-lg border border-[var(--border-secondary)]/30 group">
            {prices.map((p, idx) => {
                const value = p.value || 0;
                const height = max > 0 ? (value / max) * 100 : 0;
                const isBase = idx === 0;
                const isCheapest = highlightCheapest && value === min && validPrices.length > 1 && !isBase;
                const isMostExpensive = value === max && validPrices.length > 1 && !isBase;

                const barClasses = [
                    'absolute bottom-0 w-full rounded-t-[3px]',
                    'transition-all duration-500 ease-out',
                    isBase
                        ? 'bg-[var(--color-primary-500)] shadow-sm'
                        : isCheapest
                            ? 'bg-[var(--color-success-500)] shadow-sm'
                            : isMostExpensive
                                ? 'bg-[var(--color-error-500)] shadow-sm'
                                : 'bg-[var(--text-secondary)] opacity-50',
                ].join(' ');

                return (
                    <div
                        key={idx}
                        className="relative flex-1 group/bar"
                        style={{ height: '100%' }}
                        title={`${p.label}: ${value > 0 ? `S/ ${value.toFixed(2)}` : 'N/A'}`}
                    >
                        <div
                            className={barClasses}
                            style={{ height: `${Math.max(height, 8)}%` }}
                        />

                        <div className="absolute -bottom-6 sm:-bottom-5 left-1/2 -translate-x-1/2 hidden group-hover/bar:block z-50">
                            <div className="bg-[var(--surface-elevated)] text-[var(--text-primary)] text-xs sm:text-sm font-mono font-bold py-1 px-2 rounded shadow-md border border-[var(--border-primary)] whitespace-nowrap">
                                {p.label}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MiniPriceChart;