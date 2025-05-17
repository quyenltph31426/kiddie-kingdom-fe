'use client';

import H1 from '@/components/text/H1';
import Container from '@/components/wrapper/Container';
import React from 'react';
import PerformanceMetrics from './components/PerformanceMetrics';
import RecentOrders from './components/RecentOrders';
import RevenueChart from './components/RevenueChart';
import SalesByCategoryChart from './components/SalesByCategoryChart';
import StatsCards from './components/StatsCards';
import TopProducts from './components/TopProducts';
import WeeklyOrdersChart from './components/WeeklyOrdersChart';

const HomePage = () => {
  return (
    <Container>
      <H1 className="mb-6 font-orbitron">Dashboard</H1>

      {/* Stats Cards */}
      <StatsCards />

      {/* Charts Section */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="col-span-2">
          <RevenueChart />
        </div>
        <SalesByCategoryChart />
        <WeeklyOrdersChart />
      </div>

      {/* Recent Orders & Activity */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <RecentOrders />
        <TopProducts />
      </div>

      {/* Additional Metrics */}
      <div className="mt-8">
        <PerformanceMetrics />
      </div>
    </Container>
  );
};

export default HomePage;
