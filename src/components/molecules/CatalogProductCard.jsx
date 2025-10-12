// src/components/molecules/CatalogProductCard.jsx
import React from 'react';
import Swal from 'sweetalert2';

const CatalogProductCard = ({ product }) => {
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    Swal.fire({
      title: "¡Añadido!",
      text: `${product.name} ha sido añadido al carrito.`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });

    // Actualizar el contador del carrito en el header
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="bg-neutral-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img className="w-full h-56 object-cover" src={product.image} alt={product.name} />
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
        <p className="text-white text-2xl font-bold mb-4">${product.price.toLocaleString('es-CL')}</p>
        <button 
          onClick={handleAddToCart}
          className="w-full bg-orange-standard text-white font-bold py-2 px-4 rounded-md hover:bg-orange-dark transition-colors duration-300"
        >
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

export default CatalogProductCard;