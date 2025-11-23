import React from 'react';
import { Link } from 'react-router-dom'; // <--- ESTO FALTABA

const OfferCard = ({ product }) => {
  // Calculamos un descuento simulado si no viene en el producto
  const discount = product.discount || 20;
  const originalPrice = product.originalPrice || Math.round(product.price * 1.2);

  return (
    <div className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg border border-neutral-700 relative group">
      {/* Etiqueta de descuento */}
      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
        -{discount}% OFF
      </div>
      
      {/* Imagen */}
      <div className="h-64 overflow-hidden bg-white flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      
      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-3">
          <span className="text-gray-500 line-through text-sm">
            ${originalPrice.toLocaleString('es-CL')}
          </span>
          <span className="text-2xl font-bold text-white">
            ${Number(product.price).toLocaleString('es-CL')}
          </span>
        </div>
        
        {/* Botón usando Link */}
        <Link 
          to="/catalogo" 
          className="block w-full mt-4 bg-orange-standard hover:bg-orange-dark text-center text-white font-bold py-2 rounded transition-colors"
        >
          Ver Producto
        </Link>
      </div>
    </div>
  );
};

export default OfferCard;