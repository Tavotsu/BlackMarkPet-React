import React, { useEffect, useState } from 'react';
import OfferCard from '../molecules/OfferCard';
import axios from 'axios';

const OfertasDestacadas = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/productos/ofertas')
      .then(res => {
          const adaptedOffers = res.data.map(p => ({
              id: p.id,
              name: p.name,
              image: p.image,
              precioOriginal: Math.round(p.price * 1.2),
              precioOferta: p.price
          }));
          setOffers(adaptedOffers);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="bg-neutral-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">¡Ofertas Imperdibles!</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {offers.map((product) => (
            <OfferCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfertasDestacadas;