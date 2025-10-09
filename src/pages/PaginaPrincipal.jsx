
import React from 'react';
import Hero from '../components/organisms/Hero';
import ProductosDestacados from '../components/organisms/ProductosDestacados';

const HomePage = () => {
  return (
    <div className="bg-neutral-900">
      <Hero />
      <ProductosDestacados />
    </div>
  );
};

export default HomePage;