import React from 'react';

interface SkeletonCardProps {
  lines?: number;
  className?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ lines = 4, className = '' }) => (
  <div className={`glass-card p-6 animate-pulse ${className}`}>
    <div className="h-4 w-3/4 bg-[var(--bg-tertiary)] rounded-lg mb-4" />
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-3 bg-[var(--bg-tertiary)] rounded-md mb-3"
        style={{ width: `${Math.max(40, 100 - i * 15)}%` }}
      />
    ))}
  </div>
);

interface SkeletonTableProps {
  rows?: number;
  cols?: number;
}

export const SkeletonTable: React.FC<SkeletonTableProps> = ({ rows = 5, cols = 5 }) => (
  <div className="animate-pulse rounded-xl overflow-hidden border border-[var(--border-primary)]">
    <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] px-4 py-3">
      <div className="flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-[var(--bg-tertiary)] rounded-md flex-1"
            style={{ maxWidth: i === 0 ? '80px' : i === 1 ? '120px' : '100px' }}
          />
        ))}
      </div>
    </div>
    {Array.from({ length: rows }).map((_, rowIdx) => (
      <div
        key={rowIdx}
        className="border-b border-[var(--border-primary)] last:border-b-0 px-4 py-4"
        style={{ backgroundColor: rowIdx % 2 === 0 ? 'var(--surface-primary)' : 'var(--bg-secondary)' }}
      >
        <div className="flex gap-4">
          {Array.from({ length: cols }).map((_, colIdx) => (
            <div
              key={colIdx}
              className="h-3 bg-[var(--bg-tertiary)] rounded-md flex-1"
              style={{ maxWidth: colIdx === 0 ? '60px' : colIdx === 1 ? '100px' : '80px' }}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);

interface SkeletonLineProps {
  width?: string;
  className?: string;
}

export const SkeletonLine: React.FC<SkeletonLineProps> = ({ width = '100%', className = '' }) => (
  <div className={`h-4 bg-[var(--bg-tertiary)] rounded-md animate-pulse ${className}`} style={{ width }} />
);

export const SkeletonCircle: React.FC<{ size?: number; className?: string }> = ({ size = 40, className = '' }) => (
  <div
    className={`animate-pulse bg-[var(--bg-tertiary)] rounded-full ${className}`}
    style={{ width: size, height: size }}
  />
);