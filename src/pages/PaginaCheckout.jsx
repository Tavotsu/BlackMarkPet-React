import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const PaginaCheckout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    address: '', apartment: '', region: 'Los Lagos', commune: 'Puerto Montt', indications: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(cartTotal);

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
    } else {
      navigate('/login'); // Si no está logueado, al login
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    Swal.fire({
      title: "Procesando...",
      text: "Conectando con el banco...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      // ENVIAR ORDEN AL BACKEND
      const response = await axios.post('http://localhost:3001/api/orders', {
        userId: user.id, // ID real de Neon
        total: total,
        items: cartItems.map(item => ({
          id: item.id,        // ID del producto
          quantity: item.quantity,
          price: item.price
        }))
      });

      // Si el backend responde OK (201)
      if (response.status === 201) {
        const orderData = {
          ...response.data,
          items: cartItems,
          total: total,
          customer: { ...user, ...formData }
        };
        
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        localStorage.removeItem('cart'); 
        window.dispatchEvent(new Event('storage')); // Actualizar contador carrito

        Swal.close();
        navigate('/pago-exitoso');
      }

    } catch (error) {
      console.error("Error en checkout:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al procesar tu pedido en el servidor.",
        icon: "error",
        confirmButtonColor: '#d33'
      });
      // Opcional: navigate('/pago-fallido');
    }
  };

  if (!user) return null; // Evita renderizar si redirige

  return (
    <div className="bg-neutral-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Finalizar Compra</h1>
        <form onSubmit={handleSubmit}>
          <div className="bg-neutral-800 p-8 rounded-lg shadow-lg">
            
            {/* Resumen */}
            <h2 className="text-xl font-bold mb-6">Resumen</h2>
            <div className="space-y-4 mb-8 max-h-60 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center text-neutral-300 border-b border-neutral-700 pb-2">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                </div>
              ))}
            </div>
            <div className="text-right text-2xl font-bold mb-8 text-orange-standard">
              Total: ${total.toLocaleString('es-CL')}
            </div>

            {/* Datos Cliente */}
            <h2 className="text-xl font-bold mb-4">Datos de Envío</h2>
            <div className="grid grid-cols-1 gap-4 mb-6">
              <p className="text-gray-400">Cliente: {user.name} ({user.email})</p>
              <input type="text" name="address" placeholder="Dirección" onChange={handleInputChange} className="p-3 bg-neutral-700 rounded text-white" required />
              <div className="grid grid-cols-2 gap-4">
                 <select name="commune" className="p-3 bg-neutral-700 rounded text-white">
                    <option>Puerto Montt</option>
                    <option>Puerto Varas</option>
                 </select>
                 <input type="text" name="apartment" placeholder="Depto (Opcional)" onChange={handleInputChange} className="p-3 bg-neutral-700 rounded text-white" />
              </div>
            </div>
            
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-md transition-colors text-lg">
              Confirmar y Pagar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaginaCheckout;