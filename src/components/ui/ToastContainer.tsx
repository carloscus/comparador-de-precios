import React from 'react';
import Toast from './Toast';
import type { ToastProps } from '../../toastDefinitions';

interface ToastContainerProps {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed z-[9999] flex flex-col gap-3"
      style={{
        top: '80px',
        right: '20px',
        maxHeight: 'calc(100vh - 100px)',
        overflow: 'hidden',
      }}
      aria-label="Notificaciones"
      role="region"
    >
      <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Toast {...toast} onClose={onClose} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToastContainer;