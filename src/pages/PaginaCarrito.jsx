// src/pages/PaginaCarrito.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PaginaCarrito = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData);
  }, []);

  const updateCartAndLocalStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (productId, change) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        // Asegura que la cantidad no sea menor a 1
        return { ...item, quantity: Math.max(1, item.quantity + change) };
      }
      return item;
    });
    updateCartAndLocalStorage(updatedCart);
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    updateCartAndLocalStorage(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 flex-grow w-full">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Tu Carrito de Compras</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-neutral-400">Tu carrito está vacío.</p>
          <Link to="/catalogo" className="mt-4 inline-block bg-orange-standard hover:bg-orange-dark text-white font-bold py-2 px-6 rounded transition duration-300">
            Ver Productos
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="cart-item flex items-center justify-between bg-neutral-800 p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div>
                    <p className="font-bold text-white text-lg">{item.name}</p>
                    <p className="text-neutral-400 text-sm">${item.price.toLocaleString('es-CL')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center space-x-3">
                    <button onClick={() => handleQuantityChange(item.id, -1)} className="bg-neutral-700 w-8 h-8 rounded hover:bg-neutral-600 text-white">-</button>
                    <span className="text-white text-lg font-bold">{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)} className="bg-neutral-700 w-8 h-8 rounded hover:bg-neutral-600 text-white">+</button>
                  </div>
                  <p className="text-white font-semibold w-24 text-center">${(item.price * item.quantity).toLocaleString('es-CL')}</p>
                  <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-400 font-bold">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-4 border-t border-neutral-700 text-right">
            <h2 className="text-2xl font-bold text-white">
              Total: <span className="text-orange-standard">${calculateTotal().toLocaleString('es-CL')}</span>
            </h2>
            <button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition duration-300">
              Proceder al Pago
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default PaginaCarrito;