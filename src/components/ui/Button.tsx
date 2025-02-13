import { cn } from '@/util/cn';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-[10px] whitespace-nowrap rounded-md transition-colors focus-visible:outline-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        solid: [
          'bg-main',
          'typo-button1',
          'text-white',
          'hover:opacity-90',
          'disabled:bg-disable disabled:text-disable_text',
        ],
        default: [
          'bg-default',
          'text-main',
          'typo-button1',
          'hover:opacity-90',
          'disabled:bg-disable disabled:text-disable_text',
        ],
        outline: [
          'border border-main',
          'text-main',
          'typo-button1',
          'hover:bg-default',
          'disabled:border-disable disabled:text-disable_text',
        ],
        text: [
          'text-main',
          'typo-button1',
          'hover:text-opacity-80',
          'disabled:text-disable_text',
        ],
      },
      size: {
        default: 'h-[46px] w-[332px]',
        sm: 'h-10 w-[120px]',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, icon, children, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {icon}
        {children}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
