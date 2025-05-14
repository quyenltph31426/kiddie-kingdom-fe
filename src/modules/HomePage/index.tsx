'use client';
import { VStack } from '@/components/utilities';
import Container from '@/components/wrapper/Container';
import React from 'react';
import Banner from './components/Banner';
import Brand from './components/Brand';
import Category from './components/Category';
import ProductBestSeller from './components/ProductBestSeller';

const HomePage = () => {
  return (
    <Container className="mt-10">
      <VStack spacing={48}>
        <Banner />

        <Category />

        <ProductBestSeller />

        <Brand />
      </VStack>

      <div className="h-[300px]"></div>
    </Container>
  );
};

export default HomePage;
