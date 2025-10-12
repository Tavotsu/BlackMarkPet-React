import React from 'react';
import Hero from '../components/organisms/Hero';
import ProductosDestacados from '../components/organisms/ProductosDestacados';
import OfertasDestacadas from '../components/organisms/OfertasDestacadas'; 

const HomePage = () => {
  return (
    <div className="bg-neutral-900">
      <Hero />
      <ProductosDestacados />
      <OfertasDestacadas /> 
    </div>
  );
};

export default HomePage;