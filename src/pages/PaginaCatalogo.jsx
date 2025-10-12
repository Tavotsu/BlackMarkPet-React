// src/pages/PaginaCatalogo.jsx
import React, { useState, useEffect } from 'react';
import FilterSidebar from '../components/organisms/FilterSidebar';
import CatalogProductCard from '../components/molecules/CatalogProductCard';
import { defaultProducts } from '../data/defaultProducts';

const PaginaCatalogo = () => {
  const [products, setProducts] = useState(defaultProducts);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    if (selectedCategory === 'Todos') {
      setProducts(defaultProducts);
    } else {
      const filtered = defaultProducts.filter(p => p.category === selectedCategory);
      setProducts(filtered);
    }
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white text-center mb-10">Catálogo de Productos</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar 
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <main className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <CatalogProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaginaCatalogo;