
import React from 'react';
import Header from '../components/organisms/Header';
import Hero from '../components/organisms/Hero';
import Footer from '../components/organisms/Footer';
import ProductosDestacados from '../components/organisms/ProductosDestacados';

const HomePage = () => {
  return (
    <div className="bg-neutral-900">
      <Header />
      <Hero />
      <ProductosDestacados />
      <Footer />
    </div>
  );
};

export default HomePage;