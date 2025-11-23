import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const PaginaOfertas = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://backend-bmp-express-production.up.railway.app/api/productos');
        const data = response.data;
        const productList = Array.isArray(data) ? data : (data.products || []);
        
        setProducts(productList.slice(0, 3));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const offerPrice = Number(product.price); 

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, price: offerPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      background: '#333',
      color: '#fff',
      iconColor: '#f97316'
    });
    Toast.fire({ icon: 'success', title: '¡Oferta agregada al carrito!' });
  };

  return (
    <div className="bg-neutral-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-4 pt-10">
          Super <span className="text-orange-standard ">Ofertas</span>
        </h1>
        <p className="text-center text-gray-400 mb-12">
          ¡Aprovecha estos descuentos exclusivos por tiempo limitado!
        </p>

        {loading ? (
          <p className="text-center text-white text-xl">Cargando ofertas...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length > 0 ? (
              products.map(product => (
                <div key={product.id} className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg border border-neutral-700 relative group">
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                    -20% OFF
                  </div>
                  
                  <div className="h-64 overflow-hidden bg-white flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-gray-500 line-through text-sm">
                        ${Math.round(product.price * 1.2).toLocaleString('es-CL')}
                      </span>
                      <span className="text-2xl font-bold text-white">
                        ${Number(product.price).toLocaleString('es-CL')}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-orange-standard hover:bg-orange-dark text-white font-bold py-2 rounded transition-colors"
                    >
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-white col-span-3">No hay ofertas disponibles por el momento.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginaOfertas;