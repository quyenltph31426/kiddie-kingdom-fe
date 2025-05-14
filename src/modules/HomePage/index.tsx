'use client';

import H1 from '@/components/text/H1';
import H3 from '@/components/text/H3';
import BoxModule from '@/components/wrapper/BoxModule';
import Container from '@/components/wrapper/Container';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const HomePage = () => {
  return (
    <Container>
      <H1 className="text-tertiary-900">Home page</H1>

      <div className="mt-6 grid grid-cols-3 gap-10">
        <div className="h-[150px] rounded bg-primary-500"></div>
        <div className="h-[150px] rounded bg-green-500"></div>
        <div className="h-[150px] rounded bg-blue-500"></div>
      </div>

      <div className="mt-12 grid grid-cols-[1.5fr_1fr] gap-10">
        <BoxModule>
          <H3>Products</H3>

          <div className="mt-4"></div>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
              <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
          </ResponsiveContainer>
        </BoxModule>
      </div>
    </Container>
  );
};

export default HomePage;
