'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React, { useRef, useState } from 'react';

const SearchComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Popover>
        <PopoverTrigger className="w-full lg:mr-10 xl:mr-24" asChild>
          <div className="">
            <input ref={inputRef} className="h-11 w-full max-w-[500px] rounded-full bg-white px-4 text-black" placeholder="Search..." />
          </div>
        </PopoverTrigger>
        <PopoverContent
          onInteractOutside={(e) => {
            // 👇 Không đóng khi click vào chính PopoverContent
            if (inputRef.current && (inputRef.current === e.target || inputRef.current.contains(e.target as Node))) {
              e.preventDefault();
            }
          }}
        >
          sss
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SearchComponent;
