import { cn } from '@/util/cn';
import * as React from 'react';

interface IInputProps extends React.ComponentProps<'input'> {
  isValid?: boolean;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ className, type, isValid, errorMessage, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            'flex w-full rounded-md border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm',
            'typo-button1 box-border h-[50px] bg-Cgray200 px-[16px] py-[14px] text-Cgray700 placeholder:text-Cgray400',
            'disabled:cursor-not-allowed disabled:bg-disable disabled:text-disable_text',
            isValid === undefined
              ? ''
              : isValid
                ? 'border border-main'
                : 'border border-warning text-warning',
            className,
          )}
          ref={ref}
          {...props}
        />
        {errorMessage && (
          <p className="typo-caption1 mt-[10px] px-[10px] text-warning">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
