import React from 'react';
import { Metadata } from 'next';
import HomeFourMain from '@/pages/homes/home-4';

export const metadata: Metadata = {
  title: "Guilherme Brandão - Desenvolvedor Web | WordPress, Next.js, GA4, SEO",
  description: "Desenvolvedor web freelancer especializado em WordPress, Next.js, rastreamento GA4/GTM, SEO técnico e CRO. Sites de alta performance focados em conversão.",
};

const HomePageFour = () => {
  return (
    <HomeFourMain />
  );
};

export default HomePageFour;