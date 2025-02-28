'use client';

import React, { ReactNode, createContext, useContext, useState } from 'react';

import { Toast } from './Toast';

interface ToastItem {
  id: number;
  message: string;
  variant: 'default' | 'success' | 'error';
  duration: number;
  btnText?: string;
  onClick?: () => void;
}

interface ToastContextType {
  showToast: (
    message: string,
    variant?: 'default' | 'success' | 'error',
    options?: { duration?: number; btnText?: string; onClick?: () => void },
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (
    message: string,
    variant: 'default' | 'success' | 'error' = 'default',
    options?: { duration?: number; btnText?: string; onClick?: () => void },
  ) => {
    const id = Date.now();
    const duration = options?.duration ?? 3000;
    setToasts((prev) => [
      ...prev,
      {
        id,
        message,
        variant,
        duration,
        btnText: options?.btnText,
        onClick: options?.onClick,
      },
    ]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-[40px] left-1/2 flex -translate-x-1/2 transform flex-col gap-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            duration={toast.duration}
            onDismiss={() => removeToast(toast.id)}
            btnText={toast.btnText}
            onClick={toast.onClick}
          >
            {toast.message}
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
