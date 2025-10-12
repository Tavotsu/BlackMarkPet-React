import React from 'react';
import { Link } from 'react-router-dom';

const OfferCard = ({ product }) => {
  const { name, image, precioOriginal, precioOferta } = product;
  const descuento = Math.round(((precioOriginal - precioOferta) / precioOriginal) * 100);

  return (
    <Link to="/catalogo" className="group block bg-neutral-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-56 object-cover" />
        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {descuento}% OFF
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2 truncate">{name}</h3>
        <div className="flex items-baseline space-x-2">
          <p className="text-2xl font-bold text-white">${precioOferta.toLocaleString('es-CL')}</p>
          <p className="text-lg text-gray-500 line-through">${precioOriginal.toLocaleString('es-CL')}</p>
        </div>
      </div>
    </Link>
  );
};

export default OfferCard;