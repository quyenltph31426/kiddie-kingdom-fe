'use client';

import { cn } from '@/libs/common';
import React from 'react';
import ReactQuill from 'react-quill-new';
type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const QuillEditor = ({ value, onChange, className }: Props) => {
  return (
    <div className={cn('pb-14', className)}>
      <ReactQuill value={value} onChange={onChange} className="h-[380px] !font-poppins" />
    </div>
  );
};

export default QuillEditor;
