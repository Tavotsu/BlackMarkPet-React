import React from 'react';
import Button from '../atoms/Button';

const CatalogProductCard = ({ product }) => {
  const { imageUrl, name, price } = product;

  // Función placeholder para el botón
  const handleAddToCart = () => {
    console.log(`Añadido al carrito: ${name}`);
    // Aquí va la lógica para añadir al estado global del carrito
  };

  return (
    <div className="bg-neutral-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
      <img src={imageUrl} alt={name} className="w-full h-56 object-cover" />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-300 text-lg font-semibold mt-auto mb-4">${price.toLocaleString('es-CL')}</p>
        <Button 
          onClick={handleAddToCart}
          className="w-full mt-auto"
        >
          Añadir al carrito
        </Button>
      </div>
    </div>
  );
};

export default CatalogProductCard;