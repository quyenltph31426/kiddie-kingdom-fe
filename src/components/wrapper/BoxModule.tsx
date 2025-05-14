import { cn } from '@/libs/common';
import React from 'react';

const BoxModule = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('rounded-md bg-[#fff] p-4', className)} {...props}>
      {children}
    </div>
  );
};

export default BoxModule;
