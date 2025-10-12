// src/pages/PaginaCatalogo.jsx
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { defaultProducts } from '../data/defaultProducts'; // <-- 1. Importar los productos

// ... (El componente CatalogProductCard no cambia)
const CatalogProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-neutral-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white">{product.name}</h3>
        <p className="text-white font-semibold mt-2 mb-1">${product.price.toLocaleString('es-CL')}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="mt-auto w-full bg-orange-standard hover:bg-orange-dark text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
        >
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
};


const PaginaCatalogo = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // <-- 2. Lógica actualizada
    let storedProducts = JSON.parse(localStorage.getItem('products'));

    if (!storedProducts || storedProducts.length === 0) {
      // Si no hay productos en localStorage, carga los productos por defecto
      localStorage.setItem('products', JSON.stringify(defaultProducts));
      storedProducts = defaultProducts;
    }
    
    setProducts(storedProducts);
  }, []);

  // ... (la función handleAddToCart no cambia)
  const handleAddToCart = (productToAdd) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === productToAdd.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...productToAdd, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    Swal.fire({
      title: "¡Añadido!",
      text: `${productToAdd.name} ha sido añadido al carrito.`,
      icon: "success",
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: '#333',
      color: '#fff'
    });
  };

  return (
    // ... (El JSX de la página no cambia)
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white">Nuestro Catálogo</h1>
        <p className="text-neutral-400 mt-2">Explora nuestra selección de productos para tu mascota.</p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <CatalogProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      ) : (
        <p className="text-center text-neutral-400 text-xl">
          Aún no hay productos en el catálogo. ¡El administrador debe añadir algunos!
        </p>
      )}
    </main>
  );
};

export default PaginaCatalogo;