'use client';

import { cn } from '@/util/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';

interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  state?: 'default' | 'success' | 'error';
  inputSize?: 'l' | 's';
  errorMessage?: string;
}

const inputVariants = cva(
  'box-border flex w-full rounded-md border-transparent bg-Cgray200 px-3 px-[16px] py-1 py-[14px] text-base text-Cgray700 caret-Cgray500 shadow-sm transition-colors placeholder:text-Cgray400 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-disable disabled:text-disable_text md:text-sm',
  {
    variants: {
      state: {
        default: '',
        success: 'border border-main',
        error: 'border border-warning text-warning caret-warning',
      },
      inputSize: {
        s: 'typo-button2 h-[36px]',
        l: 'typo-button1 h-[50px] py-[10px]',
      },
    },
    defaultVariants: {
      inputSize: 'l',
    },
  },
);

const errorTextVariants = cva('px-[10px] text-warning', {
  variants: {
    inputSize: {
      s: 'typo-caption2 mt-[8px]',
      l: 'typo-caption1 mt-[10px]',
    },
    defaultVariants: {
      inputSize: 'l',
    },
  },
});

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  (
    { className, type, state, errorMessage, inputSize = 'l', ...props },
    ref,
  ) => {
    const [isVisible, setIsVisible] = React.useState(false);

    return (
      <div className={`w-full ${className}`}>
        <div className="relative focus-within:text-Cgray700">
          <input
            type={
              type === 'password' ? (isVisible ? 'text' : 'password') : 'text'
            }
            className={cn(inputVariants({ state, inputSize }))}
            ref={ref}
            {...props}
          />
          <button
            onClick={() => setIsVisible((prev) => !prev)}
            className={`absolute right-[16px] top-1/2 -translate-y-1/2 focus-within:text-Cgray700 ${type !== 'password' && 'hidden'}
`}
          >
            {!isVisible ? (
              <EyeOff className="size-5 text-Cgray500" />
            ) : (
              <Eye className="size-5 text-Cgray500" />
            )}
          </button>
        </div>
        {errorMessage && (
          <p className={cn(errorTextVariants({ inputSize, className }))}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
