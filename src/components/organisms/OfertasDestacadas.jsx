import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const OfertasDestacadas = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/productos');
        const data = response.data;
        
        let productList = [];
        if (Array.isArray(data)) {
          productList = data;
        } else if (data && Array.isArray(data.products)) {
          productList = data.products;
        }

        const simulatedOffers = productList.slice(0, 3).map(product => ({
          ...product,
          price: Number(product.price),
          originalPrice: Math.round(Number(product.price) * 1.2),
        }));

        setOffers(simulatedOffers);
      } catch (error) {
        console.error(error);
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));

    const Toast = Swal.mixin({
      toast: true, position: 'top-end', showConfirmButton: false, timer: 1500,
      background: '#333', color: '#fff', iconColor: '#f97316'
    });
    Toast.fire({ icon: 'success', title: 'Agregado al carrito' });
  };

  return (
    <section className="py-12 bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Ofertas <span className="text-orange-standard">Imperdibles</span>
        </h2>
        
        {loading ? (
           <p className="text-center text-gray-400">Buscando ofertas...</p>
        ) : offers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-neutral-900 rounded-lg overflow-hidden shadow-lg border border-neutral-700 relative group">
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                  -20% OFF
                </div>
                
                <div className="h-64 w-full bg-white flex items-center justify-center overflow-hidden">
                  <img 
                    src={offer.image} 
                    alt={offer.name} 
                    className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{offer.name}</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-gray-500 line-through text-sm">
                      ${offer.originalPrice.toLocaleString('es-CL')}
                    </span>
                    <span className="text-2xl font-bold text-white">
                      ${offer.price.toLocaleString('es-CL')}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => addToCart(offer)}
                    className="block w-full text-center bg-orange-standard hover:bg-orange-dark text-white font-bold py-2 rounded transition-colors"
                  >
                    Comprar Ahora
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border-2 border-dashed border-neutral-600 rounded-lg">
            <p className="text-gray-400">No hay ofertas disponibles.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OfertasDestacadas;