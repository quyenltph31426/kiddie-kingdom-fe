'use client';

import H1 from '@/components/text/H1';
import { VStack } from '@/components/utilities';
import Container from '@/components/wrapper/Container';
import React from 'react';
import RevenueChart from './components/RevenueChart';
import StatsCards from './components/StatsCards';
import TopCustomersChart from './components/TopCustomersChart';
import TopProducts from './components/TopProducts';
import TopProductsChart from './components/TopProductsChart';

const HomePage = () => {
  return (
    <Container>
      <H1 className="mb-6 font-orbitron">Trang chủ</H1>

      {/* Stats Cards with real API data */}
      <StatsCards />

      {/* Revenue Chart with real API data */}
      <VStack spacing={24} className="mt-8">
        <RevenueChart />

        <TopProducts />

        <TopProductsChart />

        <TopCustomersChart />
      </VStack>
    </Container>
  );
};

export default HomePage;
