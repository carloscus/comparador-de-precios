import React from 'react';
import { Modal } from './Modal';

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger',
}) => {
  const confirmBtn = {
    danger: {
      bg: '#dc2626',
      hover: '#b91c1c',
    },
    warning: {
      bg: 'var(--color-primary-500)',
      hover: 'var(--color-primary-600)',
    },
    info: {
      bg: 'var(--color-primary-500)',
      hover: 'var(--color-primary-600)',
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} size="sm"
      actions={
        <>
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-primary)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--border-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all"
            style={{
              backgroundColor: confirmBtn[variant].bg,
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = confirmBtn[variant].hover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = confirmBtn[variant].bg}
          >
            {confirmText}
          </button>
        </>
      }
    >
      <p className="text-[var(--text-secondary)]">{message}</p>
    </Modal>
  );
};

export default ConfirmModal;