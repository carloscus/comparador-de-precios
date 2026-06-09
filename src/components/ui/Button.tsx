import React from 'react';
import { ModuleType } from '../../enums';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  module?: ModuleType;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  module,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'btn focus-visible';

  const variantClasses = {
    primary: module ? 'btn-module' : 'bg-[var(--color-primary-500)] text-[var(--color-btn-primary-text)] hover:bg-[var(--color-primary-600)]',
    outline: 'border border-[var(--border-primary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]',
    ghost: 'bg-transparent hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]',
    link: 'bg-transparent text-[var(--color-info-500)] hover:text-[var(--color-info-600)] underline'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const moduleClass = module ? `btn-module-${module} module-${module}` : '';
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = (disabled || loading) ? 'opacity-50 cursor-not-allowed' : '';

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    moduleClass,
    widthClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      data-module={module}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="loading-spinner mr-2" />
      )}
      {!loading && leftIcon && (
        <span className="mr-2">{leftIcon}</span>
      )}
      {children}
      {!loading && rightIcon && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;