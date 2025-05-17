'use client';
import MainLayout from '@/layouts/MainLayout';
import type { FCC } from '@/types';
import React from 'react';

const PaymentLayout: FCC = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default PaymentLayout;