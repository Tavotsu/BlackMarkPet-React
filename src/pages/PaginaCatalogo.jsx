import React, { useState, useEffect } from 'react';
import FilterSidebar from '../components/organisms/FilterSidebar';
import CatalogProductCard from '../components/molecules/CatalogProductCard';
import axios from 'axios';

const PaginaCatalogo = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/productos');
        setAllProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'Todos') {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(p => p.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, allProducts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white text-center mb-10">Catálogo de Productos</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar onSelectCategory={setSelectedCategory} selectedCategory={selectedCategory} />
        <main className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                <CatalogProductCard key={product.id} product={product} />
                ))
            ) : (
                <p className="text-white">No se encontraron productos en esta categoría.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaginaCatalogo;