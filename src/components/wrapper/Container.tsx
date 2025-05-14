import { cn } from '@/libs/common';
import React from 'react';

const Container = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('px-4 py-10 lg:px-8 ', className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
