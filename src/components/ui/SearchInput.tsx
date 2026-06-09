import React from 'react';
import { ModuleType } from '../../enums';
import { Loader2 } from 'lucide-react';

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  onClear?: () => void;
  module?: ModuleType;
  size?: 'sm' | 'md' | 'lg';
  showClearButton?: boolean;
  loading?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onClear,
  module,
  size = 'md',
  showClearButton = true,
  loading = false,
  className = '',
  value,
  ...props
}) => {
  const moduleClass = module ? `input-module module-${module}` : '';
  const sizeClass = size !== 'md' ? `input-${size}` : '';

  const classes = [
    'input focus-visible pl-12',
    (showClearButton && value) || loading ? 'pr-14' : 'pr-4',
    moduleClass,
    sizeClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-[var(--text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <input
        type="search"
        className={classes}
        data-module={module}
        value={value}
        {...props}
      />

      {loading ? (
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--color-primary-500)]">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      ) : showClearButton && value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 w-12 flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--color-error-500)] transition-colors active:scale-90"
          aria-label="Limpiar búsqueda"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchInput;