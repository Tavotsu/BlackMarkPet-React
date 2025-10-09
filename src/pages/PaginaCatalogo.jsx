import React, { useState, useEffect } from 'react';
import FilterSidebar from '../components/organisms/FilterSidebar';
import CatalogProductCard from '../components/molecules/CatalogProductCard';

const allProducts = [
  { id: 1, name: 'Comida para Perros Adultos', price: 25990, category: 'Alimentos', imageUrl: 'https://cdn.shopify.com/s/files/1/0102/3742/files/Ganador_936ee4de-362b-4b41-894f-0fbad4ba9e04.jpg?v=1611158640' },
  { id: 2, name: 'Pelota de Goma Resistente', price: 7990, category: 'Juguetes', imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_824701-MLC45802213349_052021-O.jpg' },
  { id: 3, name: 'Shampoo Hipoalergénico', price: 12500, category: 'Higiene', imageUrl: 'https://acdn-us.mitiendanube.com/stores/880/994/products/mb-higiene-16-66c6c089cdaecefa6817006689517501-1024-1024.jpg' },
  { id: 4, name: 'Correa de Paseo Retráctil', price: 15990, category: 'Accesorios', imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_994998-MLC43580550057_092020-O.jpg' },
  { id: 5, name: 'Comida para Gatos Esterilizados', price: 28990, category: 'Alimentos', imageUrl: 'https://www.cat-oh.com/wp-content/uploads/2021/04/MicrosoftTeams-image-1-5-e1619623091396-600x600.png' },
  { id: 6, name: 'Rascador para Gatos', price: 19990, category: 'Juguetes', imageUrl: 'https://sodimac.scene7.com/is/image/SodimacCL/5770014_01?wid=1500&hei=1500&qlt=70' },
  { id: 7, name: 'Arena Sanitaria para Gatos', price: 11990, category: 'Higiene', imageUrl: 'https://www.lider.cl/preunic/images/product/206014-2.jpg' },
  { id: 8, name: 'Cama Acolchada para Mascotas', price: 22990, category: 'Accesorios', imageUrl: 'https://i.ebayimg.com/images/g/a~QAAOSw-s5g~8oY/s-l1600.jpg' },
];

const CatalogPage = () => {
  const [products, setProducts] = useState(allProducts);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    if (selectedCategory === 'Todos') {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter(p => p.category === selectedCategory);
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
          {/* Aquí vamos a agregar la paginación más adelante */}
        </main>
      </div>
    </div>
  );
};

export default CatalogPage;