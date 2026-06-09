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
  const confirmColors = {
    danger: 'btn-danger',
    warning: 'btn-warning',
    info: 'btn-primary',
  };

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} size="sm"
      actions={
        <>
          <button onClick={onCancel} className="btn btn-ghost">
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`btn ${confirmColors[variant]}`}
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