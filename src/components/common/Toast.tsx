import { cn } from '@/util/cn';
import { type VariantProps, cva } from 'class-variance-authority';
import React, { forwardRef, useEffect, useState } from 'react';

import CheckIcon from '../../assets/icon/check_icon.svg';
import WarningIcon from '../../assets/icon/warning_icon.svg';
import { Button } from '../ui/Button';

const ToastVariants = cva(
  'typo-head4 flex h-[64px] w-fit items-center rounded-[20px] border border-main bg-BG p-[16px] text-white transition-opacity duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: '',
        success: '',
        error: 'border-warning',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ToastVariants> {
  duration?: number; // 표시 시간 (ms)
  onDismiss?: () => void; // fade out 후 호출
  btnText?: string;
  onBtnClick?: () => void;
}

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant = 'default',
      children,
      duration = 3000,
      onDismiss,
      btnText,
      onBtnClick,
      ...props
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);

    // 컴포넌트 마운트 후 fade in 효과 적용
    useEffect(() => {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }, [duration]);

    // fade out 애니메이션(300ms) 후 onDismiss 호출
    useEffect(() => {
      if (!visible) {
        const timer = setTimeout(() => {
          onDismiss && onDismiss();
        }, 300);
        return () => clearTimeout(timer);
      }
    }, [visible, onDismiss]);

    return (
      <div
        className={cn(
          ToastVariants({ variant, className }),
          visible ? 'opacity-100' : 'opacity-0',
        )}
        ref={ref}
        {...props}
      >
        {variant === 'success' ? (
          <CheckIcon className="mr-[10px]" />
        ) : variant === 'error' ? (
          <WarningIcon className="mr-[10px]" />
        ) : null}
        {children}
        {btnText && (
          <Button
            onClick={onBtnClick}
            className={`typo-button2 ml-[16px] h-[32px] w-[67px] ${variant === 'error' ? 'bg-warning' : ''}`}
          >
            {btnText}
          </Button>
        )}
      </div>
    );
  },
);

Toast.displayName = 'Toast';

export { Toast, ToastVariants };
