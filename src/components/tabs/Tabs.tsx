'use client';

import { cn } from '@/libs/common';
import type { FC } from 'react';

interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}
interface Props {
  data: Option[];
  onChange: (value: string | number) => void;
  value: string | number;
  layoutId: string;
  className?: string;
}

const Tabs: FC<Props> = ({ data, onChange, value, layoutId, className }) => {
  return (
    <div className={cn('rounded-xl border-[#FFFFFF26] bg-[#FFFFFF26] p-1 text-sm', className)}>
      <ul className="flex flex-wrap gap-4">
        {data.map((tab) => (
          <li
            onClick={() => {
              onChange(tab.value);
            }}
            className={cn(
              'cursor-pointer rounded-md px-4 py-2 text-center font-semibold text-gray-500',
              value === tab.value ? 'bg-red-damask-500 text-white' : 'hover:text-primary-300',
              { 'pointer-events-none cursor-not-allowed text-gray-500 opacity-75': tab?.disabled }
            )}
            key={tab.value}
          >
            {tab.label}
            {/* {value === tab.value ? (
              <motion.div
                layoutId={layoutId}
                className="absolute bottom-0 z-10 h-[.125rem] w-full bg-primary-400"
                initial={{ width: '0' }}
                animate={{ width: '100%' }}
                exit={{ width: 0 }}
              />
            ) : null} */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
