import { createContext, useContext } from 'react';
import type { ToastTypeString } from '../toastDefinitions';
import type { ToastProps } from '../toastDefinitions';

export type { ToastProps } from '../toastDefinitions';

interface ToastContextType {
  addToast: (message: string, type?: ToastTypeString) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};