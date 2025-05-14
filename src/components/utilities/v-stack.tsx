import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/libs/common';

const vStackVariants = cva('flex flex-col', {
  variants: {
    align: {
      default: 'items-stretch',
      center: 'items-center items',
      start: 'items-start',
      end: 'items-end',
      baseline: 'items-baseline',
    },
    justify: {
      default: 'justify-start',
      center: 'justify-center',
      start: 'justify-start',
      between: 'justify-between',
      end: 'justify-end',
      evenly: 'justify-evenly',
      around: 'justify-around',
    },
    spacing: {
      0: 'gap-0',
      2: 'gap-[2px]',
      4: 'gap-1',
      6: 'gap-1.5',
      8: 'gap-2',
      12: 'gap-3',
      16: 'gap-4',
      20: 'gap-5',
      24: 'gap-6',
      32: 'gap-8',
      36: 'gap-9',
      40: 'gap-10',
      48: 'gap-12',
    },
  },
  defaultVariants: {
    spacing: 8,
    align: 'default',
    justify: 'default',
  },
});

export interface VStackProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof vStackVariants> {
  asChild?: boolean;
}

const VStack = React.forwardRef<HTMLDivElement, VStackProps>(
  ({ className, asChild = false, spacing, align, justify, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp className={cn(vStackVariants({ className, spacing, align, justify }))} ref={ref} {...props}>
        {children}
      </Comp>
    );
  }
);
VStack.displayName = 'VStack';

export { VStack, vStackVariants };
