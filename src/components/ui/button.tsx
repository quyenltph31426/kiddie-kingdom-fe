import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { Icons } from '@/assets/icons';
import { cn } from '@/libs/common';

const buttonVariants = cva(
  'inline-flex items-center active:scale-90 justify-center rounded-sm text-sm ring-offset-background transition-transform focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary-500 text-white hover:bg-primary-700 ',
        primary: 'bg-primary-700 text-white hover:bg-primary-800',
        white: 'text-tertiary-900 bg-white hover:text-white hover:bg-red-damask-500',
        outline: 'border-secondary-600 border text-secondary-600 shadow-[0px_1px_2px_0px_#1018280D] hover:bg-primary-700 hover:text-white',
        alert: 'bg-amaranth-600 text-white hover:bg-amaranth-700',
        gray: 'bg-[#5832201A] hover:bg-[#58322080] text-tertiary-900 border text-tertiary-900 border-[#58322026]',
        transparent: 'hover:bg-primary-700 hover:text-white bg-transparent',
        secondary: 'bg-secondary-500 text-white shadow-sm hover:bg-secondary-700',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        damask: 'text-white bg-red-damask-500 hover:bg-red-damask-600',
        dashed: 'border border-dashed border-primary-500 text-primary-500 hover:bg-primary-200',
        select: 'text-main-10 bg-[#091E420A] border rounded-sm',
      },
      size: {
        default: 'h-11 px-4 py-2 rounded',
        md: 'h-10 px-4 py-2',
        sm: 'h-9 rounded px-3',
        xs: 'h-8 rounded px-2 text-xs',
        lg: 'h-12 rounded px-6',
        icon: 'h-9 w-9',
      },
      rounded: {
        default: 'rounded-sm',
        full: 'rounded-full',
        md: 'rounded-md',
        none: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, rounded, children, loading, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, rounded }), {
          'pointer-events-none opacity-80': loading,
        })}
        ref={ref}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {children}
            {loading && <Icons.loading className="ml-4 animate-spin" />}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
