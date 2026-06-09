import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import type { ToastProps } from '../../toastDefinitions';

const iconMap = {
	success: { icon: CheckCircle, color: 'var(--color-on-surface-success)', bg: 'var(--color-input-tint-success-bg)' },
	error: { icon: XCircle, color: 'var(--color-on-surface-error)', bg: 'var(--color-input-tint-error-bg)' },
	warning: { icon: AlertTriangle, color: 'var(--color-on-surface-warning)', bg: 'var(--color-input-tint-warning-bg)' },
	info: { icon: Info, color: 'var(--color-on-surface-info)', bg: 'var(--color-input-tint-info-bg)' },
};

const Toast: React.FC<ToastProps> = ({ id, type, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const toastIcon = iconMap[type] || iconMap.info;
  const IconComponent = toastIcon.icon;

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(id), 200);
  };

  useEffect(() => {
    const timer = setTimeout(handleClose, 4000);
    return () => clearTimeout(timer);
  }, [id]);

  return (
    <div
      className={`
        pointer-events-auto transition-all duration-300 ease-out
        ${isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${isExiting ? 'translate-x-8 opacity-0' : ''}
      `}
      style={{
        maxWidth: '420px',
        width: '100%',
      }}
      role="alert"
      aria-live="assertive"
    >
      <div
        className="glass-card overflow-hidden"
        style={{
			borderLeft: `3px solid ${toastIcon.color}`,
			boxShadow: 'var(--shadow-md)',
        }}
      >
        <div className="flex items-start gap-3 p-4">
          <div
            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: toastIcon.bg }}
          >
            <IconComponent className="w-4 h-4" style={{ color: toastIcon.color }} />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-sm font-medium text-[var(--text-primary)] leading-relaxed">
              {message}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center hover:bg-[var(--bg-tertiary)] transition-colors text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
            aria-label="Cerrar notificación"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;