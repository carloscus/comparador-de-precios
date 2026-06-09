import { useState, useCallback } from 'react';
import type { ToastProps, ToastTypeString } from '../toastDefinitions';

export const useToasts = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastTypeString = 'info') => {
    const id = crypto.randomUUID();
    setToasts((prevToasts) => [...prevToasts, { id, message, type, onClose: () => removeToast(id) }]);

    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, [removeToast]);

  return { toasts, addToast, removeToast };
};