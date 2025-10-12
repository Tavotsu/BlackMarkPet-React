import React from 'react';
import OfferCard from '../molecules/OfferCard';

const featuredOffers = [
  { id: 1, name: 'Comida para Perros Adultos', precioOriginal: 25990, precioOferta: 15990, category: 'Alimentos', image: 'https://cdn.shopify.com/s/files/1/0102/3742/files/Ganador_936ee4de-362b-4b41-894f-0fbad4ba9e04.jpg?v=1611158640' },
  { id: 2, name: 'Pelota de Goma Resistente', precioOriginal: 7990, precioOferta: 4990, category: 'Juguetes', image: 'https://www.bpets.cl/cdn/shop/files/Pelota-Fetch-Goma-Natural-Beco-para-perros_2048x.jpg?v=1731114255' },
  { id: 3, name: 'Shampoo Hipoalergénico', precioOriginal: 12500, precioOferta: 9990 , category: 'Higiene', image: 'https://dragpharma.cl/wp-content/uploads/2023/05/CANISH-HIPOALERGENICOP.jpg' },
];

const OfertasDestacadas = () => {
  return (
    <section className="bg-neutral-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
           ¡Ofertas Imperdibles! 
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredOffers.map((product) => (
            <OfferCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfertasDestacadas;