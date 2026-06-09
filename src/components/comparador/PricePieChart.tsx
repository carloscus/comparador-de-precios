import React, { useState, useCallback, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface PricePieChartProps {
  data: Array<{
    name: string;
    value: number;
    color?: string;
    details?: Record<string, unknown>;
  }>;
  title?: string;
  ariaLabel?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  synchronized?: boolean;
  onSegmentClick?: (data: { name: string; value: number }) => void;
  onHover?: (data: { name: string; value: number } | null) => void;
}

const PieLabel = ({ name, percent }: { name?: string; percent?: number }) => {
  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 640;
  const fontSize = isSmallScreen ? '12px' : '14px';
  
  return (
    <text
      style={{
        fontSize,
        fontWeight: 600,
        fill: 'var(--text-primary)',
        pointerEvents: 'none',
        textShadow: '0 1px 2px rgba(0,0,0,0.2)',
        paintOrder: 'stroke'
      }}
      stroke="var(--surface-primary)"
      strokeWidth="0.5"
    >
      {name || ''}: {((percent ?? 0) * 100).toFixed(0)}%
    </text>
  );
};

const CustomLegend = ({ payload }: { payload?: Array<{ color: string; value: string }> }) => {
  if (!payload || payload.length === 0) return null;

  return (
    <div className="mt-3 px-2">
      <ul className="flex flex-wrap justify-center gap-x-3 gap-y-2">
        {payload.map((entry, index) => (
          <li key={`legend-${index}`} className="flex items-center gap-2 text-sm sm:text-base">
            <span className="w-3 h-3 rounded-full border border-[var(--border-primary)] flex-shrink-0" style={{ backgroundColor: entry.color }} />
            <span className="text-[var(--text-secondary)] font-medium">{entry.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const getColors = () => [
  getComputedStyle(document.documentElement).getPropertyValue('--color-primary-500').trim() || '#00a86b',
  getComputedStyle(document.documentElement).getPropertyValue('--color-secondary-500').trim() || '#4f46e5',
  getComputedStyle(document.documentElement).getPropertyValue('--color-warning-500').trim() || '#d97706',
  getComputedStyle(document.documentElement).getPropertyValue('--color-error-500').trim() || '#dc2626',
  getComputedStyle(document.documentElement).getPropertyValue('--color-success-500').trim() || '#16a34a',
  getComputedStyle(document.documentElement).getPropertyValue('--color-info-500').trim() || '#2563eb',
  getComputedStyle(document.documentElement).getPropertyValue('--color-error-400').trim() || '#f87171',
  getComputedStyle(document.documentElement).getPropertyValue('--color-warning-400').trim() || '#fbbf24',
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    payload: {
      name: string;
      value: number;
      details?: Record<string, unknown>;
      percent?: number;
    };
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload
}) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const total = payload.reduce((sum: number, item: { value: number }) => sum + item.value, 0);
    const percent = total > 0 ? ((data.value / total) * 100).toFixed(2) : '0';

    return (
      <div
        className="glass p-3 rounded-lg border border-[var(--border-primary)] shadow-lg min-w-[140px] sm:min-w-[160px] max-w-[calc(100vw-32px)]"
        role="tooltip"
        aria-live="polite"
      >
        <p className="font-bold text-sm sm:text-base text-[var(--text-primary)] mb-1">{data.name}</p>
        <p className="text-[var(--color-on-surface-primary)] font-mono font-bold text-base sm:text-lg">
          S/ {data.value.toFixed(2)}
        </p>
        <p className="text-[var(--text-secondary)] text-xs sm:text-sm">
          {percent}% del total
        </p>
        {data.payload.details && (
          <div className="mt-2 pt-2 border-t border-[var(--border-primary)]">
            {Object.entries(data.payload.details).map(([key, value]) => (
              <p key={key} className="text-xs text-[var(--text-tertiary)]">
                {key}: {String(value)}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }
  return null;
};

const PricePieChart: React.FC<PricePieChartProps> = ({
  data,
  title,
  ariaLabel,
  showLegend = true,
  showTooltip = true,
  synchronized = false,
  onSegmentClick,
  onHover
}) => {
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);

  const chartData = useMemo(() =>
    data.map((item, index) => ({
      ...item,
      percent: total > 0 ? (item.value / total) : 0,
      color: item.color || getColors()[index % getColors().length],
    })), [data, total]
  );

  type SegmentEntry = { name: string; value: number; percent?: number };

  const handleSegmentClick = useCallback((entry: SegmentEntry) => {
    setActiveSegment(entry.name);
    onSegmentClick?.({ name: entry.name, value: entry.value });
  }, [onSegmentClick]);

  const handleMouseEnter = useCallback((entry: SegmentEntry) => {
    setHoveredSegment(entry.name);
    onHover?.({ name: entry.name, value: entry.value });
  }, [onHover]);

  const handleMouseLeave = useCallback(() => {
    setHoveredSegment(null);
    onHover?.(null);
  }, [onHover]);

  const accessibleDescription = useMemo(() => {
    const segments = chartData
      .map(item => `${item.name}: S/ ${item.value.toFixed(2)} (${(item.percent * 100).toFixed(2)}%)`)
      .join(', ');
    return `Gráfico circular mostrando distribución de precios. ${segments}. Total: S/ ${total.toFixed(2)}`;
  }, [chartData, total]);

  return (
    <div className="w-full" role="img" aria-label={ariaLabel || title || 'Gráfico circular de precios'}>
      {title && <h3 className="text-base sm:text-lg font-semibold mb-3 text-[var(--text-primary)]">{title}</h3>}

      <div className="sr-only" aria-live="polite">
        {accessibleDescription}
      </div>

      <div className="sr-only" aria-label="Tabla de datos accesibles">
        <table>
          <caption>Datos del gráfico circular</caption>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Valor (S/)</th>
              <th>Porcentaje</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.value.toFixed(2)}</td>
                <td>{(item.percent * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>{total.toFixed(2)}</td>
              <td>100%</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="h-60 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={chartData.length > 1 ? PieLabel : false}
              outerRadius={70}
              innerRadius={20}
              dataKey="value"
              onClick={handleSegmentClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: onSegmentClick ? 'pointer' : 'default' }}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="var(--surface-primary)"
                  strokeWidth={2}
                  style={{
                    opacity: hoveredSegment && hoveredSegment !== entry.name ? 0.6 : 1,
                    filter: hoveredSegment === entry.name ? 'brightness(1.1)' : 'none',
                    transform: hoveredSegment === entry.name ? 'scale(1.03)' : 'scale(1)',
                    transformOrigin: 'center',
                  }}
                />
              ))}
            </Pie>
            {showTooltip && (
              <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={{ fontSize: '12px', zIndex: 1000 }}
              />
            )}
            {showLegend && <CustomLegend payload={chartData.map(d => ({ color: d.color, value: d.name }))} />}
          </PieChart>
        </ResponsiveContainer>
      </div>

      {activeSegment && (
        <div
          className="mt-2 p-2 bg-[var(--color-input-tint-success-bg)] rounded text-[13px] text-[var(--color-on-surface-success)]"
          role="status"
          aria-live="polite"
        >
          Seleccionado: {activeSegment}
        </div>
      )}
    </div>
  );
};

export default PricePieChart;